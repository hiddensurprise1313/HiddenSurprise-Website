export const SERVICE_CATEGORIES = [
  {
    id: 'outdoor',
    name: 'Outdoor Service',
    badge: '🏕️ Outdoor Service',
    description: 'Electrifying open-air surprises engineered for maximum thrill and stealth.'
  },
  {
    id: 'special',
    name: 'Special Surprise',
    badge: '✨ Special Surprise',
    description: 'Exclusive, intimate romantic experiences crafted for lifelong memories.'
  },
  {
    id: 'indoor',
    name: 'Indoor Surprise',
    badge: '🏠 Indoor Surprise',
    description: 'Jaw-dropping room makeovers and celebrations inside homes, hotels, or venues.'
  }
];

export const CURATED_SERVICES = [
  // ----------------- OUTDOOR SERVICE -----------------
  {
    id: 'door-surprise-12',
    category: 'outdoor',
    categoryName: 'Outdoor Service',
    number: '01',
    title: "12 O'Clock Door Surprise",
    tagline: 'The magical midnight doorstep reveal',
    desc: 'Surprise bell ring at 11:59 PM sharp with gourmet cake, glowing helium balloons, sparklers & live acoustic guitarist.',
    price: 2499,
    originalPrice: 3499,
    image: '/photos/photo_1.webp',
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
    number: '02',
    title: 'Car Trunk Surprise',
    tagline: 'Pop the boot for an explosion of wonder',
    desc: 'Secretly decorated trunk with cascading fairy lights, glowing neon LED sign, foil balloon cloud, and personalized gift hamper.',
    price: 2999,
    originalPrice: 4299,
    image: '/photos/photo_4.webp',
    highlights: [
      'Stealth trunk decor setup at your chosen location',
      'Custom glowing neon LED sign & foil balloons',
      'Luxury wooden keepsake gift hamper & chocolates',
      'Dry ice low fog smoke effect upon boot opening',
      'Instant memory polaroid cards with wooden clips'
    ]
  },
  {
    id: 'on-the-spot-surprise',
    category: 'outdoor',
    categoryName: 'Outdoor Service',
    number: '03',
    title: 'On the Spot Surprise',
    tagline: 'Spontaneous live flashmob anywhere, anytime',
    desc: 'Unannounced live musician or flashmob serenades your loved one in public, at a cafe, beach, or rooftop gathering.',
    price: 3499,
    originalPrice: 4999,
    image: '/photos/photo_15.webp',
    highlights: [
      'Professional acoustic singer or violinist setup',
      'Customized 3-song playlist prepared in advance',
      '50 Fresh Dutch red roses bouquet handover',
      'High-energy confetti cannons burst',
      'Full 4K video recording of the candid reaction'
    ]
  },

  // ----------------- SPECIAL SURPRISE -----------------
  {
    id: 'candle-light-dinner',
    category: 'special',
    categoryName: 'Special Surprise',
    number: '01',
    title: 'Candle Light Dinner',
    tagline: 'An intimate romantic sanctuary for two',
    desc: 'Rooftop or garden sheer canopy cabana lined with 100+ warm LED candles, fresh rose petal pathway & 3-course private dining.',
    price: 4999,
    originalPrice: 6999,
    image: '/photos/photo_18.webp',
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
    categoryName: 'Special Surprise',
    number: '02',
    title: 'Private Movie Time',
    tagline: 'Cinematic private screening under the stars',
    desc: 'Intimate theater or open-air starry projection screening with plush floor cushions, fairy lights, popcorn bar & interval gift reveal.',
    price: 5499,
    originalPrice: 7499,
    image: '/photos/photo_21.webp',
    highlights: [
      'HD Projector with 120-inch wide cinematic display',
      'Plush velvet floor mattresses, pillows & warm blankets',
      'Surprise memory montage video played before the movie',
      'Gourmet butter popcorn bar, nachos & custom mocktails',
      'Secret gift & flower reveal during interval'
    ]
  },

  // ----------------- INDOOR SURPRISE -----------------
  {
    id: 'birthday-surprise',
    category: 'indoor',
    categoryName: 'Indoor Surprise',
    number: '01',
    title: 'Birthday Surprise',
    tagline: 'Complete room transformation before they arrive',
    desc: 'Full bedroom or venue makeover with metallic helium balloon ceiling spread, custom neon glow sign & 1kg designer cake.',
    price: 1999,
    originalPrice: 2999,
    image: '/photos/photo_28.webp',
    highlights: [
      '60+ Metallic helium balloons & ceiling streamers',
      'Personalized neon "Happy Birthday" glow sign',
      '1kg Gourmet designer cake (Truffle / Red Velvet)',
      '15 Memory polaroid garland with fairy lights',
      'Birthday sash, glitter party props & confetti popper'
    ]
  },
  {
    id: 'anniversary-surprise',
    category: 'indoor',
    categoryName: 'Indoor Surprise',
    number: '02',
    title: 'Anniversary Surprise',
    tagline: 'Rekindle timeless romance with breathtaking decor',
    desc: 'Romantic bedroom/living setup with heart balloon arches, 100+ warm LED candles, memory photo pathway & live acoustic serenade.',
    price: 2799,
    originalPrice: 3999,
    image: '/photos/photo_32.webp',
    highlights: [
      'Cascading red & champagne gold heart balloon arch',
      'Glowing rose petal pathway leading to celebration space',
      'Framed photo memory timeline of your journey together',
      'Artisan chocolates & non-alcoholic sparkling wine',
      'Acoustic love song recording or live guitarist option'
    ]
  },
  {
    id: 'bride-to-be',
    category: 'indoor',
    categoryName: 'Indoor Surprise',
    number: '03',
    title: 'Bride to Be',
    tagline: 'Celebrate the bride with unforgettable glam',
    desc: 'Chic bachelorette & bridal shower glam setup with pastel balloon archway, custom sash, photo props & champagne floral table.',
    price: 2999,
    originalPrice: 4499,
    image: '/photos/photo_45.webp',
    highlights: [
      'Pastel & rose gold luxury balloon arch backdrop',
      'Custom "Bride to Be" silk sash, tiara & props set',
      'Instagrammable photo booth with giant diamond ring balloon',
      'Signature celebration mocktail welcome station',
      'Custom bridal trivia game cards & keepsake box'
    ]
  },
  {
    id: 'friends-reunion',
    category: 'indoor',
    categoryName: 'Indoor Surprise',
    number: '04',
    title: 'Friends Reunion',
    tagline: 'Relive golden nostalgia with your favorite circle',
    desc: 'Epic polaroid throwback wall, group party games hamper, late-night snack tower & cozy ambient fairy lights setup.',
    price: 2499,
    originalPrice: 3799,
    image: '/photos/photo_52.webp',
    highlights: [
      'Throwback memory polaroid garland with decades of photos',
      'Custom party game hamper & funny quote props',
      'Late-night artisan snack tower & dessert board',
      'Curated nostalgic playlist & warm ambient lighting',
      'Personalized keepsake gift bags for all friends'
    ]
  },
  {
    id: 'love-proposal',
    category: 'indoor',
    categoryName: 'Indoor Surprise',
    number: '05',
    title: 'Love Proposal',
    tagline: 'The fairytale proposal they will say YES to',
    desc: 'Giant 4ft illuminated "MARRY ME" LED marquee letters, red carpet walkway with 200+ flickering candles, low fog entry & sparkler blast.',
    price: 6999,
    originalPrice: 9999,
    image: '/photos/photo_57.webp',
    highlights: [
      'Giant 4ft illuminated "MARRY ME" LED marquee letters',
      'Red carpet walkway lined with 200+ warm candles & roses',
      'Dense low-lying dry ice fog dramatic entry',
      'Cold-fire sparkler fountain blast on the "YES!" moment',
      'Professional photographer & 4K cinematic highlight video'
    ]
  }
];
