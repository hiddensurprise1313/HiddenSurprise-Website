import basicPkgRealImg from '../assets/pkg_basic_real.jpg';
import premiumPkgRealImg from '../assets/pkg_premium_real.jpg';
import elitePkgRealImg from '../assets/pkg_elite_real.jpg';
import flowerBouquetImg from '../assets/flower_bouquet_real.jpg';
import chocolateBouquetImg from '../assets/chocolate_bouquet_real.jpg';
import bannerEntryImg from '../assets/banner_entry_real.jpg';

export const SERVICE_CATEGORIES = [
  {
    id: 'signature',
    name: 'Official Packages',
    badge: '👑 Official Packages',
    description: 'Our signature Basic, Premium, and Elite celebration venue experiences with all-inclusive amenities.'
  },
  {
    id: 'outdoor',
    name: 'Outdoor Service',
    badge: '🏕️ Outdoor Service',
    description: 'Electrifying open-air surprises engineered for maximum thrill and stealth.'
  },
  {
    id: 'special',
    name: 'Special Romantic',
    badge: '✨ Special Romantic',
    description: 'Exclusive, intimate romantic experiences crafted for lifelong memories.'
  }
];

export const CURATED_SERVICES = [
  // ----------------- OFFICIAL PACKAGES (WITH REAL CELEBRATION PHOTOGRAPHY) -----------------
  {
    id: 'basic-package',
    category: 'signature',
    categoryName: 'Official Package',
    number: '01',
    title: 'Basic Package',
    tagline: 'Essential celebration setup with floral panel & cake',
    duration: '45 Mins',
    badgeText: 'POPULAR CHOICE',
    desc: 'Complete private celebration space makeover featuring rich background balloon arch decor, glowing neon board, floral panel with decorated cake table, and 1/2 kg designer cake.',
    image: basicPkgRealImg,
    highlights: [
      'Background Balloon Decor',
      'Happy Birthday / Other Occasions Neon Board',
      'Air Conditioned Private Celebration Space',
      'Floral Panel with Cake Table',
      'Cake 1/2 Kg (Flavours Optional)',
      'Time: 45 Mins Duration'
    ]
  },
  {
    id: 'premium-package',
    category: 'signature',
    categoryName: 'Official Package',
    number: '02',
    title: 'Premium Package',
    tagline: 'Grand celebration with 5.1 big screen audio & games',
    duration: '1.5 Hours',
    badgeText: 'MOST REQUESTED',
    desc: 'Elevated luxury experience featuring warm lighting, customized big screen video project with 5.1 surround sound, welcome drinks, celebration sash & crown, fun indoor games & photo hangings.',
    image: premiumPkgRealImg,
    highlights: [
      'Background Balloon Decor & Warm Light Setup',
      'Happy Birthday / Other Occasions Neon Board',
      'Air Conditioned Space & Floral Panel with Cake Table',
      'Celebration Sash & Crown for the Celebrant',
      'Welcome Drinks & Entry Song Moment',
      'Customized Video Project on Big Screen (5.1 Sound System)',
      'Fun Indoor Games & DJ Songs on Big Screen',
      '4 Photo Hanging Keepsakes & 1/2 Kg Cake (Flavours Optional)',
      'Time: 1.5 Hours Duration'
    ]
  },
  {
    id: 'elite-package',
    category: 'signature',
    categoryName: 'Official Package',
    number: '03',
    title: 'Elite Package',
    tagline: 'The ultimate VIP celebration with OTT screening & dinner for 2',
    duration: '2 Hours',
    badgeText: 'VIP SIGNATURE',
    desc: 'The pinnacle of private luxury celebrations! Includes all Premium features plus Personalized Access to OTT Platform on big screen with 5.1 sound, 8 photo hanging memory timeline, and gourmet dining for 2 persons.',
    image: elitePkgRealImg,
    highlights: [
      'Background Balloon Decor & Warm Light Setup',
      'Happy Birthday / Other Occasions Neon Board & Air Conditioned Space',
      'Floral Panel with Cake Table, Celebration Sash & Crown',
      'Welcome Drinks & Special Entry Song Reveal',
      'Customized Video Project on Big Screen (5.1 Sound System)',
      'Personalised Access OTT Platform Watching on Big Screen (5.1 Sound)',
      'Fun Indoor Games & DJ Songs on Big Screen',
      '8 Photo Hanging Memory Timeline',
      'Cake 1/2 Kg (Flavours Optional) + Gourmet Food (2 Persons Included)',
      'Time: 2 Hours Duration'
    ]
  },

  // ----------------- OUTDOOR SERVICE -----------------
  {
    id: 'door-surprise-12',
    category: 'outdoor',
    categoryName: 'Outdoor Service',
    number: '04',
    title: "12 O'Clock Door Surprise",
    tagline: 'The magical midnight doorstep reveal',
    duration: 'Midnight Reveal',
    badgeText: 'STEALTH SERVICE',
    desc: 'Surprise bell ring at 11:59 PM sharp with gourmet cake, glowing helium balloons, sparklers & live acoustic guitarist.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85',
    highlights: [
      '11:59 PM sharp stealth doorstep arrival',
      '1kg Premium designer cake (Choco Truffle / Red Velvet)',
      '50+ Helium glowing balloon ceiling cloud',
      'Live acoustic guitarist singing 3 personalized songs',
      'Sparkler fountain candles & photo cards'
    ]
  },
  {
    id: 'car-trunk-surprise',
    category: 'outdoor',
    categoryName: 'Outdoor Service',
    number: '05',
    title: 'Car Trunk Surprise',
    tagline: 'Pop the boot for an explosion of wonder',
    duration: '60 Mins',
    badgeText: 'INSTANT HIT',
    desc: 'Secretly decorated trunk with cascading fairy lights, glowing neon LED sign, foil balloon cloud, and personalized gift hamper.',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=85',
    highlights: [
      'Stealth trunk decor setup at your chosen location',
      'Custom glowing neon LED sign & foil balloons',
      'Luxury wooden keepsake gift hamper & chocolates',
      'Dry ice low fog smoke effect upon boot opening',
      'Instant memory polaroid cards with wooden clips'
    ]
  },

  // ----------------- SPECIAL ROMANTIC -----------------
  {
    id: 'candle-light-dinner',
    category: 'special',
    categoryName: 'Special Romantic',
    number: '06',
    title: 'Candle Light Dinner',
    tagline: 'An intimate romantic sanctuary for two',
    duration: '2.5 Hours',
    badgeText: 'ROMANTIC OASIS',
    desc: 'Rooftop or garden sheer canopy cabana lined with 100+ warm LED candles, fresh rose petal pathway & 3-course private dining.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    highlights: [
      'Boho sheer white canopy tent with ambient fairy curtains',
      '100+ Warm glowing LED candles & rose petal walkway',
      'Curated 3-course gourmet dining experience',
      'Dedicated personal butler with stealth service',
      'Chilled sparkling cider & gourmet Belgian dessert'
    ]
  },
  {
    id: 'private-movie-time',
    category: 'special',
    categoryName: 'Special Romantic',
    number: '07',
    title: 'Private Movie Time',
    tagline: 'Cinematic private screening under the stars',
    duration: '3 Hours',
    badgeText: 'CINEMATIC LUXURY',
    desc: 'Intimate theater or open-air starry projection screening with plush floor cushions, fairy lights, popcorn bar & interval gift reveal.',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=85',
    highlights: [
      'HD Projector with 120-inch wide cinematic display',
      'Plush velvet floor mattresses, pillows & warm blankets',
      'Surprise memory montage video played before the movie',
      'Gourmet butter popcorn bar, nachos & custom mocktails',
      'Secret gift & flower reveal during interval'
    ]
  },
  {
    id: 'love-proposal',
    category: 'special',
    categoryName: 'Special Romantic',
    number: '08',
    title: 'Love Proposal',
    tagline: 'The fairytale proposal they will say YES to',
    duration: '2 Hours',
    badgeText: 'FAIRYTALE MOMENT',
    desc: 'Giant 4ft illuminated "MARRY ME" LED marquee letters, red carpet walkway with 200+ flickering candles, low fog entry & sparkler blast.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85',
    highlights: [
      'Giant 4ft illuminated "MARRY ME" LED marquee letters',
      'Red carpet walkway lined with 200+ warm candles & roses',
      'Dense low-lying dry ice fog dramatic entry',
      'Cold-fire sparkler fountain blast on the "YES!" moment',
      'Professional photographer & 4K cinematic highlight video'
    ]
  }
];

// ----------------- DEDICATED ADDITIONAL SERVICES (BOUQUETS & BANNER) -----------------
export const ADDITIONAL_SERVICES = [
  {
    id: 'flower-bouquet',
    category: 'addons',
    categoryName: 'Additional Service',
    number: '01',
    title: 'Flower Bouquet',
    tagline: 'Handcrafted luxury Dutch roses & exotic florals',
    duration: 'Handcrafted Add-On',
    badgeText: 'FRESH FLORALS',
    desc: 'Exquisite hand-tied bouquet crafted with fresh long-stem Dutch red roses, exotic lilies, gypsophila baby’s breath & customized wax-sealed message card.',
    image: flowerBouquetImg,
    highlights: [
      'Fresh premium long-stem Dutch roses & exotic florals',
      'Luxury matte wrapping paper with gold foil edge & satin bow',
      'Personalized handwritten wax-sealed love note',
      'Flower hydration pack to ensure 48h freshness',
      'Secret midnight handover by stealth concierge'
    ]
  },
  {
    id: 'chocolate-bouquet',
    category: 'addons',
    categoryName: 'Additional Service',
    number: '02',
    title: 'Chocolate Bouquet',
    tagline: 'Decadent Ferrero Rocher & gourmet sweet hamper',
    duration: 'Artisan Add-On',
    badgeText: 'SWEET TREAT',
    desc: 'Artisan sweet bouquet arranged with golden Ferrero Rocher pralines, Cadbury Dairy Milk Silk, Lindt truffles, fairy twinkle lights & gold embellishments.',
    image: chocolateBouquetImg,
    highlights: [
      '16+ Golden Ferrero Rocher & Cadbury Silk bars arranged as flowers',
      'Integrated battery-operated micro fairy twinkle lights',
      'Luxury dual-tone velvet wrap with gold ribbon garnish',
      'Customized celebration tag with your personal photo',
      'Keepsake gift hamper box presentation'
    ]
  },
  {
    id: 'banner-entry',
    category: 'addons',
    categoryName: 'Additional Service',
    number: '03',
    title: 'Banner Entry',
    tagline: 'VIP red carpet reveal & grand personalized welcome banner',
    duration: 'Grand Entrance',
    badgeText: 'VIP REVEAL',
    desc: 'Breathtaking dramatic entrance featuring a customized 8ft wide high-definition celebration banner, plush red carpet walkway, 4 cold sparkler fountains & rose petal shower.',
    image: bannerEntryImg,
    highlights: [
      'Customized 8ft wide HD photo celebration welcome banner',
      'Plush VIP red carpet walkway with gold stanchions & ropes',
      '4 Electronic cold sparkler fountain pyros upon entrance',
      'Fresh rose petal shower cannon on the special reveal',
      'Ambient spotlight illumination for red carpet photos'
    ]
  }
];
