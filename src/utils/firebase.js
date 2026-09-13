// Hidden Surprise Real-time Firebase Firestore Analytics Engine
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  getDocs,
  where
} from 'firebase/firestore';

const STORAGE_KEY_FIREBASE = 'hs_firebase_config';

// Retrieve saved Firebase configuration
export const getSavedFirebaseConfig = () => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY_FIREBASE);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to parse saved Firebase config', e);
    }
  }
  return null;
};

// Save Firebase config to localStorage
export const saveFirebaseConfig = (config) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_FIREBASE, JSON.stringify(config));
  // Re-initialize Firebase with the new config
  return initFirebase(config);
};

// Initialize or retrieve Firebase App & Firestore
let firebaseApp = null;
let firestoreDb = null;

export const initFirebase = (customConfig = null) => {
  try {
    const config = customConfig || getSavedFirebaseConfig();
    if (!config || !config.apiKey || !config.projectId) {
      return null;
    }

    if (getApps().length > 0) {
      firebaseApp = getApp();
    } else {
      firebaseApp = initializeApp(config);
    }

    firestoreDb = getFirestore(firebaseApp);
    return firestoreDb;
  } catch (err) {
    console.error('Firebase initialization error:', err);
    return null;
  }
};

export const isFirebaseConnected = () => {
  return firestoreDb !== null || initFirebase() !== null;
};

// Log a real-time event to Firestore collection 'hs_analytics_events'
export const logFirestoreEvent = async (eventData) => {
  try {
    const db = firestoreDb || initFirebase();
    if (!db) return false;

    const eventsRef = collection(db, 'hs_analytics_events');
    await addDoc(eventsRef, {
      ...eventData,
      serverTime: serverTimestamp(),
      createdTime: Date.now()
    });
    return true;
  } catch (err) {
    console.warn('Firestore event log failed:', err);
    return false;
  }
};

// Real-time listener for Admin Dashboard
export const subscribeToRealtimeAnalytics = (onUpdate, onError) => {
  try {
    const db = firestoreDb || initFirebase();
    if (!db) {
      onError && onError('Firebase not configured. Please enter your Firebase project credentials.');
      return () => {};
    }

    const eventsRef = collection(db, 'hs_analytics_events');
    const q = query(eventsRef, orderBy('timestamp', 'desc'), limit(1500));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveEvents = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        liveEvents.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp || data.createdTime || Date.now()
        });
      });

      onUpdate(liveEvents);
    }, (err) => {
      console.error('Realtime Firestore snapshot error:', err);
      onError && onError(err.message || 'Error listening to real-time events.');
    });

    return unsubscribe;
  } catch (err) {
    console.error('subscribeToRealtimeAnalytics error:', err);
    onError && onError(err.message);
    return () => {};
  }
};
