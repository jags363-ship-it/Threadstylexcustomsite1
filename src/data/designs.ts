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
  basketball:   'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400',
  soccer:       'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400',
  volleyball:   'https://images.pexels.com/photos/3649578/pexels-photo-3649578.jpeg?auto=compress&cs=tinysrgb&w=400',
  swimming:     'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg?auto=compress&cs=tinysrgb&w=400',
  track:        'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=400',
  cricket:      'https://images.pexels.com/photos/3452280/pexels-photo-3452280.jpeg?auto=compress&cs=tinysrgb&w=400',
  flagfootball: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=400',
  tennis:       'https://images.pexels.com/photos/8224716/pexels-photo-8224716.jpeg?auto=compress&cs=tinysrgb&w=400',
  badminton:    'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=400',
  martial:      'https://images.pexels.com/photos/4428291/pexels-photo-4428291.jpeg?auto=compress&cs=tinysrgb&w=400',
  weightlift:   'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400',
  cycling:      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400',
  teamwear:     'https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=400',
  modest:       'https://images.pexels.com/photos/3621183/pexels-photo-3621183.jpeg?auto=compress&cs=tinysrgb&w=400',
  ceremony:     'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=400',
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
