export const OCCASIONS = [
  { id: 'birthday', name: 'Birthday Bash', icon: 'Cake', desc: 'Epic birthday surprises, midnight cakes, balloons & party decor' },
  { id: 'anniversary', name: 'Romantic Anniversary', icon: 'Heart', desc: 'Candlelight setups, rose petals, violinists & private dining' },
  { id: 'proposal', name: 'Dream Proposal', icon: 'Sparkles', desc: 'Unforgettable "Marry Me" letters, smoke bombs & fairytale ambiance' },
  { id: 'long-distance', name: 'Long Distance Love', icon: 'Send', desc: 'Bridge the distance with doorstep surprises, personalized hampers & video cards' },
  { id: 'baby-shower', name: 'Baby Shower & Gender Reveal', icon: 'Baby', desc: 'Pastel balloon arches, custom favors & heartwarming reveals' },
  { id: 'apology', name: 'Sweet Apology', icon: 'Smile', desc: 'Melt their heart with oversized teddy bears, custom apologies & sweets' }
];

export const EXPERIENCE_TYPES = [
  {
    id: 'room-decor',
    name: 'Luxury Room / Venue Decor',
    basePrice: 1999,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    desc: 'Metallic helium balloons, fairy string lights, ceiling streamers, customized photo bunting & floor candles.'
  },
  {
    id: 'midnight-delivery',
    name: 'Midnight Serenade & Delivery',
    basePrice: 2499,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    desc: 'Surprise bell ring at 12:00 AM sharp with live guitarist, gourmet cake, sparkling bouquet & party poppers.'
  },
  {
    id: 'car-boot',
    name: 'Car Boot / Trunk Surprise',
    basePrice: 2999,
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    desc: 'Open the car trunk to reveal an explosion of fairy lights, helium balloons, custom neon sign & gift boxes.'
  },
  {
    id: 'candlelight-cabana',
    name: 'Rooftop Candlelight Cabana',
    basePrice: 4999,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    desc: 'Boho canopy tent, glowing path of roses, customized dining table, private butler and ambient music setup.'
  },
  {
    id: 'flashmob-musician',
    name: 'Live Musician & Flashmob',
    basePrice: 3499,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    desc: 'Professional acoustic singer or violinist plays their favorite songs at a public or private venue.'
  },
  {
    id: 'luxury-hamper',
    name: 'Bespoke Surprise Gift Hamper',
    basePrice: 1499,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    desc: 'Handcrafted luxury wooden keepsake box packed with personalized goodies, perfumes, chocolates & polaroids.'
  }
];

export const ADDONS = [
  { id: 'cake-gourmet', name: '1kg Gourmet Designer Cake (Belgian Choco / Red Velvet)', price: 799, category: 'Treats', icon: 'Cake' },
  { id: 'bouquet-roses', name: '50 Fresh Red Dutch Roses Bouquet', price: 999, category: 'Florals', icon: 'Flower' },
  { id: 'polaroid-garland', name: '20 Polaroid Memory Garland with Wooden Clips', price: 499, category: 'Personalized', icon: 'Image' },
  { id: 'musician-acoustic', name: 'Live Acoustic Guitarist (30 Mins)', price: 1799, category: 'Entertainment', icon: 'Music' },
  { id: 'neon-sign', name: 'Custom Neon LED Sign (Rental or Keep)', price: 1299, category: 'Decor', icon: 'Sun' },
  { id: 'fog-entry', name: 'Dry Ice Smoke / Low Fog Dramatic Entry', price: 899, category: 'Effects', icon: 'Cloud' },
  { id: 'drone-video', name: 'Drone & Cinematic 4K Highlight Video', price: 2499, category: 'Media', icon: 'Video' },
  { id: 'giant-teddy', name: '5-Foot Giant Fluffy Teddy Bear', price: 1499, category: 'Gifts', icon: 'Gift' }
];

export const PACKAGES = [
  {
    id: 'pkg-midnight-magic',
    title: 'The Midnight Starfall',
    tagline: 'Make 12:00 AM an unforgettable cinematic memory',
    price: 3999,
    originalPrice: 5499,
    category: 'popular',
    badge: 'Bestseller',
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    features: [
      'Surprise doorstep arrival at exactly 11:59 PM',
      '1kg Premium Choco Truffle / Red Velvet Cake',
      '50 Helium Glowing Balloon Ceiling Spread',
      'Live Guitarist singing 3 personalized songs',
      'Sparkler fountain candles & confetti blast',
      '15 Memory Polaroid Hanging String'
    ]
  },
  {
    id: 'pkg-romantic-canopy',
    title: 'Fairytale Canopy & Candlelight',
    tagline: 'Boho luxury dining & private romantic sanctuary',
    price: 6499,
    originalPrice: 8999,
    category: 'romantic',
    badge: 'Most Romantic',
    rating: 5.0,
    reviewsCount: 218,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    features: [
      'Bespoke white sheer canopy tent with fairy curtains',
      '100+ Warm LED pillar candles & fresh rose petal walkway',
      'Gourmet 3-course private candlelight dining setup',
      'Customized acrylic LED nameplate keepsakes',
      'Bluetooth ambient speaker setup with custom playlist',
      'Personalized surprise message reveal box'
    ]
  },
  {
    id: 'pkg-car-boot-wonder',
    title: 'Secret Trunk Glow Wonder',
    tagline: 'Steal their breath away the moment the trunk pops open',
    price: 3499,
    originalPrice: 4799,
    category: 'trending',
    badge: 'Instant Hit',
    rating: 4.8,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    features: [
      'Full SUV / Sedan trunk transformation',
      'Cascade of pastel & chrome balloons',
      'Custom illuminated LED message ("Happy Birthday" / "Marry Me")',
      'Deluxe gift box with hidden photo album',
      'Mini cupcake bouquet & cold fire sparklers',
      'Surprise pop-out balloon effect'
    ]
  },
  {
    id: 'pkg-proposal-grand',
    title: 'The Royal "Marry Me" Extravaganza',
    tagline: 'She will say YES before you even ask',
    price: 12999,
    originalPrice: 16999,
    category: 'proposal',
    badge: 'Signature VIP',
    rating: 5.0,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    features: [
      '4-Foot Giant Warm Light-Up "MARRY ME" letters',
      'Red carpet pathway lined with 200+ glass candle lanterns',
      'Pyrotechnic cold firework fountains on ring reveal',
      'Live Violinist playing romantic medley',
      'Dedicated photographer & 4K cinematic video reel',
      'Champagne flutes & Belgian chocolate tower'
    ]
  },
  {
    id: 'pkg-birthday-fiesta',
    title: 'Ultimate Neon Party Explosion',
    tagline: 'Transform any room or lounge into a high-energy wonderland',
    price: 4999,
    originalPrice: 6999,
    category: 'birthday',
    badge: 'Party Favorite',
    rating: 4.9,
    reviewsCount: 280,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    features: [
      'Double organic balloon arch with chrome accents',
      'High-brightness custom Neon Sign ("It’s My Birthday" / "Party Time")',
      'Metallic shimmer backdrop wall with LED spot beams',
      'Party prop hamper with custom sash, crowns & whistles',
      'Dessert table decoration & custom milestone board',
      'High-volume confetti air cannon'
    ]
  },
  {
    id: 'pkg-hamper-luxury',
    title: 'The Hidden Surprise Mystery Trunk',
    tagline: 'Multi-layer puzzle box of luxury surprises & curated gifts',
    price: 2799,
    originalPrice: 3999,
    category: 'gifts',
    badge: 'Deliver Anywhere',
    rating: 4.9,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    features: [
      'Handmade wooden treasure trunk with golden vintage lock',
      'Secret key hidden inside a scent wax sealed envelope',
      'Curated artisanal treats, customized engraved keychain & mug',
      '10 Pop-up message cards with memory photographs',
      'Scented soy wax candle & mini fairy light inside',
      'Customized video QR code on the lid'
    ]
  }
];

export const UNBOXING_REWARDS = [
  { code: 'VIPUPGRADE', discount: 'Free Cold Sparklers', desc: 'Complimentary 2x electronic cold sparkler fountains added to your reveal!' },
  { code: 'FREECAKE', discount: 'Free Gourmet Cake', desc: 'Complimentary 1/2 kg Chocolate Truffle Cake added to your celebration!' },
  { code: 'POLAROID', discount: 'Free Polaroid Garland', desc: 'Complimentary 15-photo Polaroid memory garland with wooden clips!' },
  { code: 'ROSEBOUQUET', discount: 'Free Flower Bouquet', desc: 'Complimentary fresh hand-tied Dutch rose celebration bouquet!' }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Midnight 25th Birthday Surprise',
    category: 'birthday',
    location: 'Penthouse Suite',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    tag: 'Midnight Special'
  },
  {
    id: 2,
    title: 'Sunset Beach "Marry Me" Proposal',
    category: 'proposal',
    location: 'Private Shoreline',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    tag: 'Dream Proposal'
  },
  {
    id: 3,
    title: 'Romantic 1st Anniversary Cabana',
    category: 'romantic',
    location: 'Rooftop Lounge',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    tag: 'Candlelight'
  },
  {
    id: 4,
    title: 'Trunk Surprise for Boyfriend',
    category: 'trending',
    location: 'City Viewpoint',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    tag: 'Car Trunk'
  },
  {
    id: 5,
    title: 'Luxury Keepsake Hamper Unboxing',
    category: 'gifts',
    location: 'Doorstep Delivery',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    tag: 'Custom Trunk'
  },
  {
    id: 6,
    title: 'Golden Jubilee 50th Anniversary',
    category: 'romantic',
    location: 'Private Villa',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    tag: 'Anniversary'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aarav & Simran',
    occasion: '1st Wedding Anniversary',
    rating: 5,
    comment: 'The team pulled off the most magical rooftop surprise! My wife had tears of joy when the guitarist started playing our wedding song. Every single detail from the candles to the customized photo cards was perfection.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    city: 'Mumbai'
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    occasion: 'Surprise Proposal',
    rating: 5,
    comment: 'She said YES! The 4-foot giant MARRY ME marquee letters on the beach with the cold sparklers looked straight out of a movie. Hidden Surprise handled everything discreetly without her suspecting a thing!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    city: 'Goa'
  },
  {
    id: 3,
    name: 'Pooja Verma',
    occasion: 'Midnight Birthday for Bestie',
    rating: 5,
    comment: 'At 11:59 PM they rang the bell with a gorgeous cake, balloon cloud and the singer was so talented. Best birthday surprise ever. Their customer support on WhatsApp was responsive 24/7.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    city: 'Bengaluru'
  }
];

export const FAQS = [
  {
    q: 'How secretly do you execute the surprise?',
    a: '100% stealth guarantee! We coordinate directly with you on a private channel, coordinate discreet entry or delivery, and ensure the recipient has zero clue until the big reveal.'
  },
  {
    q: 'How far in advance should I book?',
    a: 'While we recommend booking 24-48 hours in advance, we also offer express same-day emergency surprise setups within 3-4 hours in select locations!'
  },
  {
    q: 'Can I customize packages or add custom requests?',
    a: 'Absolutely! Our interactive Surprise Builder allows you to combine any elements, and our event concierges can tailor anything from custom cakes to private drone operators.'
  },
  {
    q: 'How does payment and booking confirmation work?',
    a: 'You can book directly via WhatsApp with an initial deposit or full booking. We support all major UPI, Net Banking, Credit/Debit cards, and instant invoices.'
  }
];
