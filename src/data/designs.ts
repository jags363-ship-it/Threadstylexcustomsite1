// ─────────────────────────────────────────────────────────────
// DESIGNS — Islamic Games 2026 sport action images (Unsplash/Pexels free)
// All Christmas / Winter / Halloween designs REMOVED
// ─────────────────────────────────────────────────────────────

export interface Design {
  id: string;
  name: string;
  thumbnailSrc: string;
  fullSrc: string;
  sport?: string;
  isBlank?: boolean;
}

// Free high-quality sports images (Unsplash/Pexels CDN — no watermark, free to use)
const SPORTS_IMAGES = {
  basketball:   'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80',
  soccer:       'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&q=80',
  volleyball:   'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&q=80',
  swimming:     'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80',
  track:        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80',
  cricket:      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80',
  flagfootball: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&q=80',
  tennis:       'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80',
  badminton:    'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80',
  martial:      'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80',
  weightlift:   'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
  cycling:      'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=400&q=80',
  teamwear:     'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=400&q=80',
  modest:       'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  ceremony:     'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
  training:     'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80',
};

export const designs: Design[] = [
  {
    id: 'blank',
    name: 'No Design (Blank Apparel)',
    thumbnailSrc: '/blank-placeholder.svg',
    fullSrc: '/blank-placeholder.svg',
    isBlank: true,
  },
  { id: 'basketball', name: 'Basketball', thumbnailSrc: SPORTS_IMAGES.basketball, fullSrc: SPORTS_IMAGES.basketball, sport: 'Basketball' },
  { id: 'soccer', name: 'Soccer / Football', thumbnailSrc: SPORTS_IMAGES.soccer, fullSrc: SPORTS_IMAGES.soccer, sport: 'Soccer' },
  { id: 'volleyball', name: 'Volleyball', thumbnailSrc: SPORTS_IMAGES.volleyball, fullSrc: SPORTS_IMAGES.volleyball, sport: 'Volleyball' },
  { id: 'swimming', name: 'Swimming', thumbnailSrc: SPORTS_IMAGES.swimming, fullSrc: SPORTS_IMAGES.swimming, sport: 'Swimming' },
  { id: 'track', name: 'Track & Field', thumbnailSrc: SPORTS_IMAGES.track, fullSrc: SPORTS_IMAGES.track, sport: 'Track & Field' },
  { id: 'cricket', name: 'Cricket', thumbnailSrc: SPORTS_IMAGES.cricket, fullSrc: SPORTS_IMAGES.cricket, sport: 'Cricket' },
  { id: 'flagfootball', name: 'Flag Football', thumbnailSrc: SPORTS_IMAGES.flagfootball, fullSrc: SPORTS_IMAGES.flagfootball, sport: 'Flag Football' },
  { id: 'tennis', name: 'Tennis / Table Tennis', thumbnailSrc: SPORTS_IMAGES.tennis, fullSrc: SPORTS_IMAGES.tennis, sport: 'Tennis' },
  { id: 'badminton', name: 'Badminton', thumbnailSrc: SPORTS_IMAGES.badminton, fullSrc: SPORTS_IMAGES.badminton, sport: 'Badminton' },
  { id: 'martial', name: 'Martial Arts / Combat', thumbnailSrc: SPORTS_IMAGES.martial, fullSrc: SPORTS_IMAGES.martial, sport: 'Martial Arts' },
  { id: 'weightlift', name: 'Weightlifting / Fitness', thumbnailSrc: SPORTS_IMAGES.weightlift, fullSrc: SPORTS_IMAGES.weightlift, sport: 'Weightlifting' },
  { id: 'cycling', name: 'Cycling / 5K Run', thumbnailSrc: SPORTS_IMAGES.cycling, fullSrc: SPORTS_IMAGES.cycling, sport: 'Cycling' },
  { id: 'teamwear', name: 'Custom Team Wear', thumbnailSrc: SPORTS_IMAGES.teamwear, fullSrc: SPORTS_IMAGES.teamwear },
  { id: 'modest', name: 'Modest / Islamic Sportswear', thumbnailSrc: SPORTS_IMAGES.modest, fullSrc: SPORTS_IMAGES.modest },
  { id: 'ceremony', name: 'Ceremony / Opening Day', thumbnailSrc: SPORTS_IMAGES.ceremony, fullSrc: SPORTS_IMAGES.ceremony },
  { id: 'training', name: 'Training / Practice', thumbnailSrc: SPORTS_IMAGES.training, fullSrc: SPORTS_IMAGES.training },
];
