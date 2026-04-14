// ─────────────────────────────────────────────────────────────
// ISLAMIC GAMES 2026 — FULL APPAREL CATALOGUE v8
// Sport-first structure. One image per sport category.
// Modest options flagged. Market pricing.
// Islamic Games Merch category added.
// ─────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  sizes: string[];
  colors: Array<{ id: string; name: string; hex: string; image: string; backImage?: string }>;
  description: string;
  features: string[];
  thumbnail: string;
  category: string;
  categoryLabel: string;
  sports: string[];
  ageCategories?: string[];
  teamOrderMin: number;
  badge?: string;
  modest?: boolean;
  customPrint: true;
}

// ── Real ThreadStylez product images ──────────────────────────
const TS = {
  hoodie_black:  'https://threadstylez.com/wp-content/uploads/2023/11/Front-Black-TSPH.png',
  hoodie_white:  'https://threadstylez.com/wp-content/uploads/2023/11/Front-White-TSPH.png',
  hoodie_grey:   'https://threadstylez.com/wp-content/uploads/2023/11/Front-Grey-TSPH.png',
  hoodie_red:    'https://threadstylez.com/wp-content/uploads/2023/11/Front-Red-TSPH.png',
  hoodie_bh:     'https://threadstylez.com/wp-content/uploads/2023/11/Front-Black-Heather-TSPH.png',
  hoodie_back_b: 'https://threadstylez.com/wp-content/uploads/2023/11/Back-Black-TSPH.png',
  hoodie_back_w: 'https://threadstylez.com/wp-content/uploads/2023/11/Back-White-TSPH.png',
  crew_black:    'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Black-.jpg',
  crew_white:    'https://threadstylez.com/wp-content/uploads/2024/09/TSS-White-.jpg',
  crew_grey:     'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Grey-2.jpg',
  crew_bh:       'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Heather-Black.jpg',
  pants_black:   'https://threadstylez.com/wp-content/uploads/2023/12/Main-Front.png',
  pants_white:   'https://threadstylez.com/wp-content/uploads/2023/12/WHITE.png',
  pants_grey:    'https://threadstylez.com/wp-content/uploads/2023/12/Heather-Grey.png',
  pants_red:     'https://threadstylez.com/wp-content/uploads/2023/12/Red.png',
  tee_black:     'https://threadstylez.com/wp-content/uploads/2024/08/TST-Black.jpg',
  tee_black_b:   'https://threadstylez.com/wp-content/uploads/2024/08/TST-Black-Back.jpg',
  tee_white:     'https://threadstylez.com/wp-content/uploads/2024/08/TST-White.jpg',
  heavy_black:   'https://threadstylez.com/wp-content/uploads/2023/11/TSCT-Side.jpg',
  heavy_white:   'https://threadstylez.com/wp-content/uploads/2023/11/TSCT-White-Main.jpg',
  heavy_navy:    'https://threadstylez.com/wp-content/uploads/2023/11/NAvy-2-1.jpg',
  heavy_red:     'https://threadstylez.com/wp-content/uploads/2023/11/Red-3-1.jpg',
  heavy_charcoal:'https://threadstylez.com/wp-content/uploads/2023/11/cHARCOAL-2-1.jpg',
  heavy_ash:     'https://threadstylez.com/wp-content/uploads/2023/11/Ash-2-1.jpg',
  heavy_orange:  'https://threadstylez.com/wp-content/uploads/2023/11/Orange-2-1.jpg',
  heavy_oxford:  'https://threadstylez.com/wp-content/uploads/2023/11/Oxford-2.jpg',
  cap:           'https://threadstylez.com/wp-content/uploads/2024/10/TSBH-main-3.png',
  baseball_cap:  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85',
};

// ── Islamic Games action photos (Muslim athletes) ─────────────
const IG = {
  basketball_hijab: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=85',
  soccer_hijab:     'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&q=85',
  volleyball:       'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=85',
  swimming:         'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=85',
  track_hijab:      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=85',
  cricket:          'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=85',
  martial:          'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=85',
  tennis:           'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=85',
  badminton:        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=85',
  flag_football:    'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&q=85',
  weightlift:       'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=85',
  cycling:          'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=600&q=85',
  ceremony:         'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=85',
  team_group:       'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=600&q=85',
  softball:         'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=85',
  archery:          'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=85',
  frisbee:          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=85',
  pickleball:       'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=85',
  arm_wrestling:    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=85',
  ig_merch:         'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=85',
};

// ── 18-color palette ──────────────────────────────────────────
const COLORS = {
  black:      { id:'black',      name:'Black',        hex:'#000000' },
  white:      { id:'white',      name:'White',        hex:'#FFFFFF' },
  navy:       { id:'navy',       name:'Navy Blue',    hex:'#1B2A4A' },
  royal:      { id:'royal',      name:'Royal Blue',   hex:'#2563EB' },
  red:        { id:'red',        name:'Red',          hex:'#DC2626' },
  maroon:     { id:'maroon',     name:'Maroon',       hex:'#7F1D1D' },
  forest:     { id:'forest',     name:'Forest Green', hex:'#166534' },
  kelly:      { id:'kelly',      name:'Kelly Green',  hex:'#16A34A' },
  purple:     { id:'purple',     name:'Purple',       hex:'#7C3AED' },
  gold:       { id:'gold',       name:'Gold',         hex:'#C8A951' },
  orange:     { id:'orange',     name:'Orange',       hex:'#EA580C' },
  grey:       { id:'grey',       name:'Heather Grey', hex:'#9CA3AF' },
  charcoal:   { id:'charcoal',   name:'Charcoal',     hex:'#374151' },
  brown:      { id:'brown',      name:'Chocolate',    hex:'#4B2E20' },
  lightblue:  { id:'lightblue',  name:'Light Blue',   hex:'#38BDF8' },
  pink:       { id:'pink',       name:'Pink',         hex:'#EC4899' },
  teal:       { id:'teal',       name:'Teal',         hex:'#0D9488' },
  cardinal:   { id:'cardinal',   name:'Cardinal',     hex:'#9F1239' },
  oxford:     { id:'oxford',     name:'Oxford Grey',  hex:'#6B7280' },
};

function c(...keys: (keyof typeof COLORS)[]): Array<{id:string;name:string;hex:string;image:string}> {
  return keys.map(k => ({ ...COLORS[k], image: '' }));
}
function allColors(img: string) {
  return Object.values(COLORS).map(col => ({ ...col, image: img }));
}
function sportColors(img: string, ...keys: (keyof typeof COLORS)[]) {
  return keys.map(k => ({ ...COLORS[k], image: img }));
}

// Age categories
const SOCCER_M_AGES = ['U6','U8','U10','U12','U14','U16','Open','30+'];
const SOCCER_F_AGES = ['U6','U8','U10','U12','U14','15+'];
const BBALL_M_AGES  = ['U10','U13','14-17','Open'];
const BBALL_F_AGES  = ['U10','U13','14+'];
const OPEN_AGES     = ['Open'];
const IND_AGES      = ['6-9','10-12','13-16','17-19','19-30','30-45','45+'];

export const products: Product[] = [

  // ═══════════════════════════════════════
  // ISLAMIC GAMES OFFICIAL MERCHANDISE
  // ═══════════════════════════════════════
  {
    id: 'ig-hoodie-black',
    name: 'Islamic Games Official Hoodie — Black',
    price: 38, originalPrice: 55,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,   image: TS.hoodie_black,  backImage: TS.hoodie_back_b },
      { ...COLORS.charcoal,image: TS.hoodie_bh,     backImage: TS.hoodie_back_b },
      { ...COLORS.grey,    image: TS.hoodie_grey,   backImage: TS.hoodie_back_b },
    ],
    description: 'Official Islamic Games 2026 merchandise hoodie. Islamic Games logo printed on chest. Available in black, charcoal, and grey.',
    features: ['Official IG 2026 Logo','65% Cotton / 35% Polyester','Pouch Pocket','Sizes XS–3XL','Limited edition merch'],
    thumbnail: TS.hoodie_black,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'IG Official', customPrint: true,
  },
  {
    id: 'ig-tshirt',
    name: 'Islamic Games Official T-Shirt',
    price: 20, originalPrice: 28,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.white, image: TS.tee_white, backImage: TS.tee_black_b },
      { ...COLORS.black, image: TS.tee_black, backImage: TS.tee_black_b },
    ],
    description: 'Official Islamic Games 2026 T-shirt. Lightweight cotton-poly blend with IG logo on chest and event details on back.',
    features: ['Official IG 2026 Logo','55% Cotton / 45% Polyester','Front chest logo + back event print','Sizes XS–3XL'],
    thumbnail: TS.tee_white,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'IG Official', customPrint: true,
  },
  {
    id: 'ig-sweatshirt',
    name: 'Islamic Games Official Crewneck Sweatshirt',
    price: 35, originalPrice: 48,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,   image: TS.crew_black },
      { ...COLORS.grey,    image: TS.crew_grey  },
      { ...COLORS.charcoal,image: TS.crew_bh    },
    ],
    description: 'Official Islamic Games 2026 crewneck sweatshirt with embroidered logo. Classic fleece feel, great for athletes and fans.',
    features: ['Official IG 2026 Logo','65% Cotton / 35% Polyester','Cuffed Hem','Sizes XS–3XL'],
    thumbnail: TS.crew_black,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'IG Official', customPrint: true,
  },
  {
    id: 'ig-sweatpants',
    name: 'Islamic Games Official Sweatpants',
    price: 32, originalPrice: 45,
    sizes: ['S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,   image: TS.pants_black },
      { ...COLORS.grey,    image: TS.pants_grey  },
    ],
    description: 'Official Islamic Games 2026 sweatpants with printed IG logo on the leg. Pairs with the IG hoodie or crewneck.',
    features: ['Official IG 2026 Logo on Leg','65% Cotton / 35% Polyester','Elastic Waist + Drawcord','Side Pockets'],
    thumbnail: TS.pants_black,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'IG Official', customPrint: true,
  },
  {
    id: 'ig-cap',
    name: 'Islamic Games Official Cap',
    price: 18, originalPrice: 25,
    sizes: ['One Size'],
    colors: [
      { ...COLORS.black, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85' },
      { ...COLORS.navy,  image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85' },
      { ...COLORS.white, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85' },
    ],
    description: 'Official Islamic Games 2026 structured snapback cap with embroidered IG logo on front panel.',
    features: ['Official IG 2026 Logo','Structured 6-Panel','Snapback Closure','Embroidered Logo'],
    thumbnail: TS.cap,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'IG Official', customPrint: true,
  },
  {
    id: 'ig-tote',
    name: 'Islamic Games Official Tote Bag',
    price: 15, originalPrice: 22,
    sizes: ['One Size'],
    colors: [
      { ...COLORS.black, image: 'https://images.unsplash.com/photo-1597484662317-c89c3df82f48?w=600&q=85' },
      { ...COLORS.white, image: 'https://images.unsplash.com/photo-1597484662317-c89c3df82f48?w=600&q=85' },
      { ...COLORS.navy,  image: 'https://images.unsplash.com/photo-1597484662317-c89c3df82f48?w=600&q=85' },
    ],
    description: 'Heavy-duty canvas tote bag with Islamic Games 2026 logo. Perfect for event days, gear, and fan merchandise.',
    features: ['12oz Canvas','IG 2026 Logo Print','Reinforced Handles','15"x16" Size'],
    thumbnail: 'https://images.unsplash.com/photo-1597484662317-c89c3df82f48?w=600&q=85',
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'IG Official', customPrint: true,
  },

  // ═══════════════════════════════════════
  // BASKETBALL
  // ═══════════════════════════════════════
  {
    id: 'basketball-jersey',
    name: 'Basketball Game Jersey',
    price: 35, originalPrice: 48,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.basketball_hijab,'black','white','navy','royal','red','kelly','purple','gold'),
    description: 'Sleeveless mesh basketball jersey with full sublimation. Name, number, and team logo included. For male and female divisions.',
    features: ['Full Sublimation Print','Moisture-Wicking Mesh','Name, Number, Logo','Male & Female Cuts','Min 1 individual'],
    thumbnail: IG.basketball_hijab,
    category: 'jersey', categoryLabel: 'Basketball Jersey',
    sports: ['Basketball'],
    ageCategories: [...BBALL_M_AGES, ...BBALL_F_AGES],
    teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },
  {
    id: 'basketball-shorts',
    name: 'Basketball Game Shorts',
    price: 28, originalPrice: 38,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.basketball_hijab,'black','white','navy','royal','red','kelly','purple','gold'),
    description: 'Wide-cut basketball shorts matching the game jersey. Full sublimation available.',
    features: ['Moisture-Wicking Mesh','Elastic Waist + Drawcord','Full Sublimation','Pairs with Jersey'],
    thumbnail: IG.basketball_hijab,
    category: 'shorts', categoryLabel: 'Basketball Shorts',
    sports: ['Basketball'],
    ageCategories: [...BBALL_M_AGES, ...BBALL_F_AGES],
    teamOrderMin: 5,
    badge: 'Team Min 5', customPrint: true,
  },
  {
    id: 'basketball-kit',
    name: 'Basketball Full Team Kit',
    price: 58, originalPrice: 80,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.basketball_hijab,'black','white','navy','royal','red','kelly','purple'),
    description: 'Complete basketball kit — jersey + shorts. Name, number, team logo included. Best value for teams.',
    features: ['Jersey + Shorts Set','Full Sublimation','Name, Number, Logo','Male & Female','Min 5 per team'],
    thumbnail: IG.basketball_hijab,
    category: 'jersey', categoryLabel: 'Basketball Full Kit',
    sports: ['Basketball'],
    ageCategories: [...BBALL_M_AGES, ...BBALL_F_AGES],
    teamOrderMin: 5,
    badge: 'Full Kit', customPrint: true,
  },

  // ═══════════════════════════════════════
  // SOCCER
  // ═══════════════════════════════════════
  {
    id: 'soccer-jersey',
    name: 'Soccer Match Jersey',
    price: 32, originalPrice: 45,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.soccer_hijab,'black','white','navy','royal','red','forest','kelly','orange','purple','gold'),
    description: 'Custom soccer match jersey with full sublimation. Home/away options. Long-sleeve modest version available. Includes name, number, logo, country flag.',
    features: ['Full Sublimation','Home & Away Options','Long-Sleeve Modest Version Available','Name, Number, Flag, Logo','Male & Female Cuts'],
    thumbnail: IG.soccer_hijab,
    category: 'jersey', categoryLabel: 'Soccer Jersey',
    sports: ['Soccer'],
    ageCategories: [...SOCCER_M_AGES, ...SOCCER_F_AGES],
    teamOrderMin: 1,
    badge: 'Individual OK', modest: true, customPrint: true,
  },
  {
    id: 'soccer-shorts',
    name: 'Soccer Match Shorts',
    price: 22, originalPrice: 30,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.soccer_hijab,'black','white','navy','royal','red','forest','kelly','orange'),
    description: 'Lightweight soccer shorts to match your team jersey. Elastic waist with drawcord. Custom color and logo.',
    features: ['100% Polyester','Elastic Waist + Drawcord','Custom Color & Logo','Pairs with Match Jersey'],
    thumbnail: IG.soccer_hijab,
    category: 'shorts', categoryLabel: 'Soccer Shorts',
    sports: ['Soccer'],
    ageCategories: [...SOCCER_M_AGES, ...SOCCER_F_AGES],
    teamOrderMin: 10,
    badge: 'Team Min 10', customPrint: true,
  },
  {
    id: 'soccer-kit',
    name: 'Soccer Full Match Kit',
    price: 48, originalPrice: 68,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.soccer_hijab,'black','white','navy','royal','red','forest','kelly','orange','gold'),
    description: 'Complete soccer match kit — jersey + shorts. Full sublimation with name, number, country flag, team logo.',
    features: ['Jersey + Shorts Set','Full Sublimation','Name, Number, Flag, Logo','Home & Away Option','Goalkeeper Version Available'],
    thumbnail: IG.soccer_hijab,
    category: 'jersey', categoryLabel: 'Soccer Full Kit',
    sports: ['Soccer'],
    ageCategories: [...SOCCER_M_AGES, ...SOCCER_F_AGES],
    teamOrderMin: 10,
    badge: 'Full Kit', modest: true, customPrint: true,
  },
  {
    id: 'soccer-gk',
    name: 'Soccer Goalkeeper Kit',
    price: 55, originalPrice: 75,
    sizes: ['XS','S','M','L','XL','2XL'],
    colors: sportColors(IG.soccer_hijab,'black','royal','forest','orange','purple'),
    description: 'Padded goalkeeper jersey and shorts set in contrast colorway. Long sleeve. Custom print.',
    features: ['Padded Elbows & Shoulders','Contrast Colorway','Long Sleeve','Full Sublimation Print'],
    thumbnail: IG.soccer_hijab,
    category: 'jersey', categoryLabel: 'Goalkeeper Kit',
    sports: ['Soccer'],
    ageCategories: [...SOCCER_M_AGES, ...SOCCER_F_AGES],
    teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  // ═══════════════════════════════════════
  // VOLLEYBALL
  // ═══════════════════════════════════════
  {
    id: 'volleyball-kit',
    name: 'Volleyball Team Kit',
    price: 52, originalPrice: 72,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.volleyball,'black','white','navy','royal','red','kelly','purple','gold'),
    description: 'Volleyball jersey + shorts kit. Women\'s modest version (long shorts + sleeved jersey) available. Full sublimation.',
    features: ['Jersey + Shorts Set','Full Sublimation','Modest Version Available','Name, Number, Logo','Min 5 per team'],
    thumbnail: IG.volleyball,
    category: 'jersey', categoryLabel: 'Volleyball Kit',
    sports: ['Volleyball'],
    ageCategories: OPEN_AGES,
    teamOrderMin: 5,
    badge: 'Full Kit', modest: true, customPrint: true,
  },

  // ═══════════════════════════════════════
  // FLAG FOOTBALL
  // ═══════════════════════════════════════
  {
    id: 'flagfootball-kit',
    name: 'Flag Football Jersey + Shorts',
    price: 52, originalPrice: 72,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.flag_football,'black','white','navy','royal','red','kelly','orange','gold'),
    description: 'Flag football jersey and wide-cut shorts. Flag belt loops built into shorts. Full sublimation.',
    features: ['Jersey + Shorts','Flag Belt Loops','Full Sublimation','Name, Number, Logo','Min 7 per team'],
    thumbnail: IG.flag_football,
    category: 'jersey', categoryLabel: 'Flag Football Kit',
    sports: ['Flag Football'],
    ageCategories: OPEN_AGES,
    teamOrderMin: 7,
    badge: 'Full Kit', customPrint: true,
  },

  // ═══════════════════════════════════════
  // CRICKET
  // ═══════════════════════════════════════
  {
    id: 'cricket-whites',
    name: 'Cricket Match Whites Kit',
    price: 65, originalPrice: 88,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [{ ...COLORS.white, image: IG.cricket }],
    description: 'Traditional cricket whites — long-sleeve shirt and trousers. Team logo embroidered or printed.',
    features: ['Traditional White','Long Sleeve Option','Team Name & Logo','Full Match Kit','Min 11 per team'],
    thumbnail: IG.cricket,
    category: 'jersey', categoryLabel: 'Cricket Whites',
    sports: ['Cricket'],
    ageCategories: OPEN_AGES,
    teamOrderMin: 11,
    badge: 'Full Kit', customPrint: true,
  },
  {
    id: 'cricket-training',
    name: 'Cricket Training Tee',
    price: 25, originalPrice: 35,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.cricket,'black','white','navy','royal','red','forest'),
    description: 'Custom cricket training tee for practice and warm-ups.',
    features: ['Moisture-Wicking Polyester','Custom Team Colors','Name & Number Optional'],
    thumbnail: IG.cricket,
    category: 'tshirt', categoryLabel: 'Cricket Tee',
    sports: ['Cricket'],
    ageCategories: OPEN_AGES,
    teamOrderMin: 5,
    badge: 'Cricket', customPrint: true,
  },

  // ═══════════════════════════════════════
  // SOFTBALL
  // ═══════════════════════════════════════
  {
    id: 'softball-jersey',
    name: 'Softball Jersey',
    price: 38, originalPrice: 52,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.softball,'black','white','navy','royal','red','kelly','orange'),
    description: 'Custom softball jersey with full sublimation, name, number, and team logo.',
    features: ['Full Sublimation','Name, Number, Logo','Button-Up or Pull-Over','Custom Colors','Min 9 per team'],
    thumbnail: IG.softball,
    category: 'jersey', categoryLabel: 'Softball Jersey',
    sports: ['Softball'],
    ageCategories: OPEN_AGES,
    teamOrderMin: 9,
    badge: 'Softball', customPrint: true,
  },

  // ═══════════════════════════════════════
  // TRACK & FIELD / ATHLETICS
  // ═══════════════════════════════════════
  {
    id: 'track-singlet',
    name: 'Athletics Sprint Singlet',
    price: 28, originalPrice: 40,
    sizes: ['XS','S','M','L','XL','2XL'],
    colors: sportColors(IG.track_hijab,'black','white','navy','royal','red','kelly','gold','orange'),
    description: 'Lightweight competition singlet for track & field. Full sublimation with country flag, name, and number.',
    features: ['Lightweight 3.5oz Polyester','Full Sublimation','Country Flag Option','Body-Mapped Ventilation','Individual OK'],
    thumbnail: IG.track_hijab,
    category: 'jersey', categoryLabel: 'Athletics Singlet',
    sports: ['Track & Field'],
    ageCategories: IND_AGES,
    teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },
  {
    id: 'track-long-sleeve',
    name: 'Athletics Long-Sleeve Modest Jersey',
    price: 32, originalPrice: 45,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.track_hijab,'black','white','navy','royal','red','kelly','teal'),
    description: 'Full-sleeve modest athletics jersey for Muslim women athletes competing in Track & Field.',
    features: ['Full Sleeve Coverage','Non-Transparent','Moisture-Wicking','Custom Print','Individual OK'],
    thumbnail: IG.track_hijab,
    category: 'jersey', categoryLabel: 'Modest Athletics Jersey',
    sports: ['Track & Field'],
    ageCategories: IND_AGES,
    teamOrderMin: 1,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },

  // ═══════════════════════════════════════
  // MARTIAL ARTS
  // ═══════════════════════════════════════
  {
    id: 'martial-rashguard',
    name: 'Martial Arts Compression Rashguard',
    price: 35, originalPrice: 48,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.martial,'black','navy','royal','red','forest','purple','gold'),
    description: 'Long-sleeve compression rashguard for judo, wrestling, BJJ, and MMA. Full sublimation.',
    features: ['85% Polyester / 15% Spandex','Long Sleeve','Four-Way Stretch','Anti-Microbial','Custom Print'],
    thumbnail: IG.martial,
    category: 'jersey', categoryLabel: 'Rashguard',
    sports: ['Martial Arts'],
    ageCategories: IND_AGES,
    teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },
  {
    id: 'martial-fight-shorts',
    name: 'MMA / Grappling Fight Shorts',
    price: 38, originalPrice: 52,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.martial,'black','navy','royal','red','forest','purple'),
    description: 'Flexible fight shorts with split hem for maximum mobility.',
    features: ['Split Hem for Mobility','Hook-and-Loop + Drawcord','Full Sublimation','Custom Logo'],
    thumbnail: IG.martial,
    category: 'shorts', categoryLabel: 'Fight Shorts',
    sports: ['Martial Arts'],
    ageCategories: IND_AGES,
    teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  // ═══════════════════════════════════════
  // TENNIS / TABLE TENNIS / BADMINTON / PICKLEBALL
  // ═══════════════════════════════════════
  {
    id: 'racket-polo',
    name: 'Racket Sports Performance Polo',
    price: 32, originalPrice: 45,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.tennis,'black','white','navy','royal','red','kelly','gold'),
    description: 'Breathable performance polo for tennis, table tennis, badminton, and pickleball. Custom team logo.',
    features: ['Moisture-Wicking Polyester Pique','Stretch Fabric','UV Protection','Team Logo','Women\'s Cut Available'],
    thumbnail: IG.tennis,
    category: 'jersey', categoryLabel: 'Racket Sports Polo',
    sports: ['Tennis','Table Tennis','Badminton','Pickleball'],
    ageCategories: IND_AGES,
    teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  // ═══════════════════════════════════════
  // SWIMMING
  // ═══════════════════════════════════════
  {
    id: 'swim-parka',
    name: 'Swim Team Warm-Up Parka',
    price: 72, originalPrice: 98,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.swimming,'black','navy','royal','red','forest','purple'),
    description: 'Ultra-absorbent microfiber parka for poolside warm-up. Custom team logo and name.',
    features: ['100% Microfiber','Ultra-Absorbent','Deep Pockets','Custom Team Logo','Hooded Design'],
    thumbnail: IG.swimming,
    category: 'jacket', categoryLabel: 'Swim Parka',
    sports: ['Swimming'],
    ageCategories: IND_AGES,
    teamOrderMin: 5,
    badge: 'Swimming', customPrint: true,
  },
  {
    id: 'burkini',
    name: "Women's Modest Swimsuit (Burkini)",
    price: 68, originalPrice: 92,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.swimming,'black','navy','royal','forest','teal','purple'),
    description: 'Competition-grade modest swimsuit. Full coverage. Chlorine-resistant. Custom team color and logo.',
    features: ['Chlorine-Resistant Lycra','Full Coverage','Hydrodynamic Fit','Fast-Drying','Custom Color & Logo'],
    thumbnail: IG.swimming,
    category: 'jersey', categoryLabel: 'Modest Swimsuit',
    sports: ['Swimming'],
    ageCategories: IND_AGES,
    teamOrderMin: 1,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },

  // ═══════════════════════════════════════
  // ARCHERY / ARM WRESTLING / FITNESS / 5K / BIKE RIDE / FRISBEE
  // ═══════════════════════════════════════
  {
    id: 'general-performance-tee',
    name: 'Custom Performance T-Shirt',
    price: 18, originalPrice: 25,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: allColors(TS.tee_black),
    description: 'Lightweight moisture-wicking tee for all individual sports — archery, arm wrestling, fitness, 5K, bike ride, and ultimate frisbee.',
    features: ['55% Cotton / 45% Polyester','Moisture-Wicking','Custom Name, Number & Logo','All Colors Available'],
    thumbnail: TS.tee_black,
    category: 'tshirt', categoryLabel: 'Performance Tee',
    sports: ['Archery','Arm Wrestling','Fitness Course','5K Run for Sudan','Bike Ride','Ultimate Frisbee'],
    ageCategories: IND_AGES,
    teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  // ═══════════════════════════════════════
  // ALL SPORTS — CORE APPAREL
  // ═══════════════════════════════════════
  {
    id: 'hoodie',
    name: 'Custom Team Pullover Hoodie',
    price: 40, originalPrice: 55,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,    image: TS.hoodie_black,   backImage: TS.hoodie_back_b },
      { ...COLORS.white,    image: TS.hoodie_white,   backImage: TS.hoodie_back_w },
      { ...COLORS.grey,     image: TS.hoodie_grey,    backImage: TS.hoodie_back_b },
      { ...COLORS.red,      image: TS.hoodie_red,     backImage: TS.hoodie_back_b },
      { ...COLORS.charcoal, image: TS.hoodie_bh,      backImage: TS.hoodie_back_b },
      { ...COLORS.navy,     image: TS.hoodie_black,   backImage: TS.hoodie_back_b },
      { ...COLORS.royal,    image: TS.hoodie_black,   backImage: TS.hoodie_back_b },
      { ...COLORS.forest,   image: TS.hoodie_black,   backImage: TS.hoodie_back_b },
      { ...COLORS.purple,   image: TS.hoodie_black,   backImage: TS.hoodie_back_b },
      { ...COLORS.gold,     image: TS.hoodie_grey,    backImage: TS.hoodie_back_b },
      { ...COLORS.maroon,   image: TS.hoodie_red,     backImage: TS.hoodie_back_b },
      { ...COLORS.cardinal, image: TS.hoodie_red,     backImage: TS.hoodie_back_b },
      { ...COLORS.orange,   image: TS.hoodie_red,     backImage: TS.hoodie_back_b },
      { ...COLORS.teal,     image: TS.hoodie_black,   backImage: TS.hoodie_back_b },
    ],
    description: 'Premium 8.5oz fleece hoodie for team warm-ups, travel, and training. Full custom print — name, number, logo.',
    features: ['65% Premium Cotton / 35% Polyester','3-Panel Hood with Drawcord','Pouch Pocket','Custom Name, Number & Logo'],
    thumbnail: TS.hoodie_black,
    category: 'hoodie', categoryLabel: 'Hoodie',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },
  {
    id: 'crewneck',
    name: 'Custom Team Crewneck Sweatshirt',
    price: 32, originalPrice: 45,
    sizes: ['XS','S','M','L','XL','2XL','3XL','4XL'],
    colors: [
      { ...COLORS.black,    image: TS.crew_black },
      { ...COLORS.white,    image: TS.crew_white },
      { ...COLORS.grey,     image: TS.crew_grey  },
      { ...COLORS.charcoal, image: TS.crew_bh    },
      { ...COLORS.navy,     image: TS.crew_black },
      { ...COLORS.royal,    image: TS.crew_black },
      { ...COLORS.red,      image: TS.crew_black },
      { ...COLORS.forest,   image: TS.crew_black },
      { ...COLORS.purple,   image: TS.crew_black },
      { ...COLORS.maroon,   image: TS.crew_black },
      { ...COLORS.cardinal, image: TS.crew_black },
      { ...COLORS.gold,     image: TS.crew_grey  },
      { ...COLORS.orange,   image: TS.crew_black },
    ],
    description: 'Classic crewneck sweatshirt for training camp and travel wear. Custom print available.',
    features: ['65% Ring-Spun Cotton / 35% Polyester','Reactive-Dyed','Cuffed Hem','Custom Print Ready'],
    thumbnail: TS.crew_black,
    category: 'sweatshirt', categoryLabel: 'Crewneck',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },
  {
    id: 'sweatpants',
    name: 'Custom Team Sweatpants',
    price: 38, originalPrice: 52,
    sizes: ['S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,    image: TS.pants_black },
      { ...COLORS.white,    image: TS.pants_white },
      { ...COLORS.grey,     image: TS.pants_grey  },
      { ...COLORS.red,      image: TS.pants_red   },
      { ...COLORS.charcoal, image: TS.pants_black },
      { ...COLORS.navy,     image: TS.pants_black },
      { ...COLORS.royal,    image: TS.pants_black },
      { ...COLORS.forest,   image: TS.pants_black },
      { ...COLORS.purple,   image: TS.pants_black },
      { ...COLORS.maroon,   image: TS.pants_black },
      { ...COLORS.cardinal, image: TS.pants_red   },
      { ...COLORS.gold,     image: TS.pants_grey  },
      { ...COLORS.orange,   image: TS.pants_red   },
      { ...COLORS.teal,     image: TS.pants_black },
    ],
    description: 'Premium fleece sweatpants with elastic waistband, side pockets, and cuffed hem.',
    features: ['65% Ring-Spun Cotton / 35% Polyester','Elastic Waist + Drawcord','Side & Back Pockets','Custom Logo & Name'],
    thumbnail: TS.pants_black,
    category: 'sweatpants', categoryLabel: 'Sweatpants',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },
  {
    id: 'tshirt-heavy',
    name: 'Custom Heavy Cotton Tee',
    price: 22, originalPrice: 30,
    sizes: ['S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,    image: TS.heavy_black   },
      { ...COLORS.white,    image: TS.heavy_white   },
      { ...COLORS.navy,     image: TS.heavy_navy    },
      { ...COLORS.red,      image: TS.heavy_red     },
      { ...COLORS.charcoal, image: TS.heavy_charcoal},
      { ...COLORS.grey,     image: TS.heavy_ash     },
      { ...COLORS.orange,   image: TS.heavy_orange  },
      { ...COLORS.oxford,   image: TS.heavy_oxford  },
      { ...COLORS.royal,    image: TS.heavy_navy    },
      { ...COLORS.maroon,   image: TS.heavy_red     },
      { ...COLORS.forest,   image: TS.heavy_black   },
      { ...COLORS.purple,   image: TS.heavy_black   },
      { ...COLORS.gold,     image: TS.heavy_ash     },
      { ...COLORS.teal,     image: TS.heavy_black   },
    ],
    description: 'Heavyweight 6oz cotton tee for fan shirts, staff wear, and casual team gear.',
    features: ['6oz 65% Cotton / 35% Polyester','Tear-Away Label','Custom Print Ready'],
    thumbnail: TS.heavy_black,
    category: 'tshirt', categoryLabel: 'Heavy Tee',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },

  // ═══════════════════════════════════════
  // MODEST / ISLAMIC SPORTSWEAR
  // ═══════════════════════════════════════
  {
    id: 'sports-hijab',
    name: 'Performance Sports Hijab',
    price: 18, originalPrice: 25,
    sizes: ['One Size'],
    colors: sportColors(IG.track_hijab,'black','white','navy','royal','red','forest','kelly','teal','purple','gold','grey','charcoal','lightblue','pink'),
    description: 'Lightweight, breathable sports hijab. Secure non-slip fit. Team color matching available.',
    features: ['95% Polyester / 5% Spandex','Moisture-Wicking','Secure Non-Slip Design','Team Color Matching'],
    thumbnail: IG.track_hijab,
    category: 'modest', categoryLabel: 'Sports Hijab',
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },
  {
    id: 'modest-jersey-women',
    name: "Women's Full-Sleeve Modest Jersey",
    price: 40, originalPrice: 55,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.track_hijab,'black','white','navy','royal','red','forest','teal','purple','gold'),
    description: 'Full-sleeve jersey for Muslim women athletes. Non-transparent, breathable, fully customizable.',
    features: ['Full Sleeve Coverage','Non-Transparent Fabric','Moisture-Wicking','Custom Name, Number, Logo'],
    thumbnail: IG.track_hijab,
    category: 'modest', categoryLabel: "Women's Modest Jersey",
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },
  {
    id: 'modest-track-pants',
    name: "Women's Modest Track Pants",
    price: 35, originalPrice: 48,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.track_hijab,'black','navy','royal','forest','charcoal','teal','purple'),
    description: 'Non-transparent, breathable full-length track pants. Loose modest fit with elastic waist.',
    features: ['Non-Transparent','Loose Modest Fit','Elastic Waist + Drawcord','Side Pockets','Custom Color & Logo'],
    thumbnail: IG.track_hijab,
    category: 'modest', categoryLabel: "Women's Track Pants",
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },

  // ═══════════════════════════════════════
  // ACCESSORIES
  // ═══════════════════════════════════════
  {
    id: 'snapback-cap',
    name: 'Custom Team Snapback Cap',
    price: 22, originalPrice: 30,
    sizes: ['One Size'],
    colors: allColors(TS.cap),
    description: 'Structured 6-panel snapback with embroidered team logo on front panel.',
    features: ['6-Panel Structured','Embroidered Logo','Snapback Closure','All Colors Available'],
    thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85',
    category: 'hat', categoryLabel: 'Snapback Cap',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },
  {
    id: 'tracksuit-elite',
    name: 'Elite Ceremony Tracksuit',
    price: 95, originalPrice: 130,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.ceremony,'black','navy','royal','forest','charcoal','red','purple'),
    description: 'Premium ceremony-grade tracksuit for opening/closing events and team travel. Country name, flag, and logo.',
    features: ['Full Jacket + Pants','Custom Sublimation','Country Flag, Name, Logo','Opening Ceremony Grade'],
    thumbnail: IG.ceremony,
    category: 'jacket', categoryLabel: 'Ceremony Tracksuit',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'Ceremony', customPrint: true,
  },
];

export const productInfo = products[0];

// ── Exports used by ProductConfiguration ─────────────────────
export const SPORTS_LIST = [
  'Basketball','Soccer','Volleyball','Flag Football','Cricket',
  'Softball','Track & Field','Martial Arts','Tennis','Table Tennis',
  'Archery','Arm Wrestling','Fitness Course','Pickleball',
  '5K Run for Sudan','Bike Ride','Badminton','Ultimate Frisbee',
  'Swimming',
];

export const ALL_SPORTS = SPORTS_LIST;

export const CATEGORIES_LIST = [
  { id: 'ig-merch',    label: 'IG Merchandise', emoji: '🏅' },
  { id: 'jersey',      label: 'Jerseys & Kits',  emoji: '🏆' },
  { id: 'shorts',      label: 'Shorts',           emoji: '🩳' },
  { id: 'hoodie',      label: 'Hoodies',          emoji: '🧥' },
  { id: 'sweatshirt',  label: 'Crewnecks',        emoji: '👕' },
  { id: 'sweatpants',  label: 'Sweatpants',       emoji: '🏃' },
  { id: 'tshirt',      label: 'T-Shirts',         emoji: '👕' },
  { id: 'modest',      label: 'Modest Wear',      emoji: '🧕' },
  { id: 'hat',         label: 'Caps & Accessories',emoji: '🧢' },
  { id: 'jacket',      label: 'Jackets',           emoji: '🥋' },
];

export function getProductsBySport(sport: string): Product[] {
  if (!sport || sport === 'All Sports') return products;
  return products.filter(p =>
    p.sports.includes(sport) ||
    p.sports.includes('All Sports') ||
    p.category === 'ig-merch'
  );
}

export function getProductsByCategory(cat: string): Product[] {
  if (!cat || cat === 'all') return products;
  return products.filter(p => p.category === cat);
}
