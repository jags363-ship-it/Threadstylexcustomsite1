// ─────────────────────────────────────────────────────────────
// DESIGNS — Islamic Games 2026 athlete photos (local uploads)
// ─────────────────────────────────────────────────────────────

export interface Design {
  id: string;
  name: string;
  thumbnailSrc: string;
  fullSrc: string;
  sport?: string;
  isBlank?: boolean;
}

// Local uploaded athlete photos
const ATHLETE_PHOTOS = {
  hijabi_soccer:      '/hijabi_soccer.webp',
  sports_hijab:       '/sports_hijab.webp',
  basketball:         '/basketball.jpg',
  hijabi_basketball:  '/hijabi_basketball.webp',
};

// Pexels fallbacks for sports we don't have uploaded photos for
const PEXELS = {
  volleyball:   'https://images.pexels.com/photos/3649578/pexels-photo-3649578.jpeg?auto=compress&cs=tinysrgb&w=400',
  cricket:      'https://images.pexels.com/photos/3452280/pexels-photo-3452280.jpeg?auto=compress&cs=tinysrgb&w=400',
  flagfootball: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=400',
  tennis:       'https://images.pexels.com/photos/8224716/pexels-photo-8224716.jpeg?auto=compress&cs=tinysrgb&w=400',
  badminton:    'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=400',
  martial:      'https://images.pexels.com/photos/4428291/pexels-photo-4428291.jpeg?auto=compress&cs=tinysrgb&w=400',
  cycling:      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400',
  training:     'https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg?auto=compress&cs=tinysrgb&w=400',
};

export const designs: Design[] = [
  {
    id: 'blank',
    name: 'No Design (Blank Apparel)',
    thumbnailSrc: '/blank-placeholder.svg',
    fullSrc: '/blank-placeholder.svg',
    isBlank: true,
  },
  // Uploaded athlete photos first
  { id: 'basketball',        name: 'Basketball',                   thumbnailSrc: ATHLETE_PHOTOS.basketball,        fullSrc: ATHLETE_PHOTOS.basketball,        sport: 'Basketball' },
  { id: 'hijabi-basketball', name: 'Basketball — Women\'s',         thumbnailSrc: ATHLETE_PHOTOS.hijabi_basketball,  fullSrc: ATHLETE_PHOTOS.hijabi_basketball,  sport: 'Basketball' },
  { id: 'soccer',            name: 'Soccer',                       thumbnailSrc: ATHLETE_PHOTOS.hijabi_soccer,      fullSrc: ATHLETE_PHOTOS.hijabi_soccer,      sport: 'Soccer' },
  { id: 'track',             name: 'Track & Field',                thumbnailSrc: ATHLETE_PHOTOS.sports_hijab,       fullSrc: ATHLETE_PHOTOS.sports_hijab,       sport: 'Track & Field' },
  // Pexels fallbacks
  { id: 'volleyball',        name: 'Volleyball',                   thumbnailSrc: PEXELS.volleyball,    fullSrc: PEXELS.volleyball,    sport: 'Volleyball' },
  { id: 'cricket',           name: 'Cricket',                      thumbnailSrc: PEXELS.cricket,       fullSrc: PEXELS.cricket,       sport: 'Cricket' },
  { id: 'flagfootball',      name: 'Flag Football',                thumbnailSrc: PEXELS.flagfootball,  fullSrc: PEXELS.flagfootball,  sport: 'Flag Football' },
  { id: 'tennis',            name: 'Tennis / Table Tennis',        thumbnailSrc: PEXELS.tennis,        fullSrc: PEXELS.tennis,        sport: 'Tennis' },
  { id: 'badminton',         name: 'Badminton',                    thumbnailSrc: PEXELS.badminton,     fullSrc: PEXELS.badminton,     sport: 'Badminton' },
  { id: 'martial',           name: 'Martial Arts',                 thumbnailSrc: PEXELS.martial,       fullSrc: PEXELS.martial,       sport: 'Martial Arts' },
  { id: 'cycling',           name: 'Cycling / Bike Ride',          thumbnailSrc: PEXELS.cycling,       fullSrc: PEXELS.cycling,       sport: 'Bike Ride' },
  { id: 'training',          name: 'Training / Practice',          thumbnailSrc: PEXELS.training,      fullSrc: PEXELS.training },
];
