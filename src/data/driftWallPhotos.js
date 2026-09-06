// 57 Real Celebration Photos from Hidden Surprise
export const DRIFT_WALL_PHOTOS = Array.from({ length: 57 }, (_, i) => {
  const id = i + 1;
  const categories = [
    { cat: 'birthday', tag: 'Midnight Birthday', loc: 'Hyderabad • Banjara Hills' },
    { cat: 'proposal', tag: 'Marry Me Cabana', loc: 'Hyderabad • Jubilee Hills' },
    { cat: 'romantic', tag: 'Romantic Suite Decor', loc: 'Hyderabad • Gachibowli' },
    { cat: 'trending', tag: 'Luxury Car Boot Surprise', loc: 'Hyderabad • Madhapur' },
    { cat: 'gifts', tag: 'Exclusive Hamper & Blooms', loc: 'Hyderabad • Financial Dist' },
    { cat: 'romantic', tag: 'Rooftop Candlelight Dinner', loc: 'Hyderabad • Hitec City' },
    { cat: 'birthday', tag: 'Neon Glow Milestone Party', loc: 'Hyderabad • Kondapur' },
    { cat: 'proposal', tag: 'Fairy Tale Rose Pathway', loc: 'Hyderabad • Secunderabad' }
  ];

  const meta = categories[i % categories.length];

  const titles = [
    'Midnight Moonlight Cabana',
    'Grand "Marry Me" Arch & Lights',
    'Luxury Trunk Surprise with Helium Balloons',
    'Golden Jubilee Anniversary Suite',
    'Neon Halo Birthday Setup',
    'Candlelit Romantic Terrace',
    'Secret Garden Proposal Setup',
    'Black & Gold Premium Celebration',
    'Illuminated Rose Petal Pathway',
    'Starry Canopy Dinner Date',
    'Crystal Chandelier Romance',
    'Floral Arch Milestone Birthday',
    'Luxury Car Boot Glow Surprise',
    'Vintage Fairy Lights Picnic',
    'Penthouse Romantic Makeover',
    'Personalized Memory Lane Gallery',
    'Sunset Skyline Surprise Date',
    'Grand Balloon Cascade & Fireworks'
  ];

  const title = `${titles[i % titles.length]} #${id}`;
  const baseUrl = import.meta.env.BASE_URL || './';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return {
    id,
    image: `${cleanBase}photos/photo_${id}.jpg`,
    title,
    category: meta.cat,
    tag: meta.tag,
    location: meta.loc
  };
});

export default DRIFT_WALL_PHOTOS;
