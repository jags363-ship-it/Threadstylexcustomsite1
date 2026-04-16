// ─────────────────────────────────────────────────────────────
// THREADSTYLEZ — FULL APPAREL CATALOGUE v11
// All changes from Threadstylez update prompt applied
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
  crew_back_b:   'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Black-.jpg',
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
  longsleeve_black: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85',
  longsleeve_white: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85',
  socks_crew:    'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&q=85',
  socks_ankle:   'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&q=85',
  socks_perf:    'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&q=85',
  flatbrim_cap:  'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=85',
  baseball_cap:  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85',
  joggers_black: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=85',
  joggers_grey:  'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=85',
  shorts_black:  'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=600&q=85',
  perf_top_black:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=85',
  perf_top_white:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=85',
  tote_black:    '/blank-placeholder.svg',
  tote_white:    '/blank-placeholder.svg',
  // IG Official branded product photos
  ig_hoodie_black_front:   '/IG_Hoodie_Front.jpg',
  ig_hoodie_grey_front:    '/IG_Hoodie_Gray_Front.jpg',
  ig_hoodie_hgrey_front:   '/IG_Hoodie_Heather_Grey_Front.jpg',
  ig_hoodie_back:          '/IG_Hoodie_Back.jpg',
  ig_sweatshirt_black:     '/IG_Sweatshirt_Front_Black.jpg',
};

// ── Per-product accurate material/sport images ────────────────
const IG = {
  // Basketball — mesh polyester sublimation jerseys
  bball_mens_jersey:   'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=85',
  bball_mens_ss:       'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=85',
  bball_womens_jersey: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&q=85',
  bball_shorts:        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=85',
  bball_kit:           'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=85',
  // Soccer — polyester sublimation kits
  soccer_mens:         'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&q=85',
  soccer_womens:       'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&q=85',
  soccer_shorts:       'https://images.unsplash.com/photo-1617296538902-887900d9b592?w=600&q=85',
  soccer_kit:          'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=600&q=85',
  soccer_gk:           'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=85',
  // Volleyball — sublimation polyester kit
  volleyball:          'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=85',
  // Flag football — sublimation jersey + shorts
  flag_football:       'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&q=85',
  // Cricket — whites cotton/poly
  cricket_whites:      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=85',
  cricket_tee:         'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=85',
  // Softball — dryfit moisture-wicking polyester
  softball:            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=85',
  // Track — lightweight polyester singlet & modest long sleeve
  track_singlet:       'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=85',
  track_modest:        'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=600&q=85',
  // Martial arts — spandex/polyester compression rashguard & fight shorts
  rashguard:           'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=85',
  fight_shorts:        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=85',
  // Racket sports — moisture-wicking polyester pique polo
  racket_polo:         'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=85',
  // 5K — moisture-wicking polyester event tee
  fivek_tee:           'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=85',
  // Modest wear — polyester/spandex hijab, full-sleeve jersey, track pants
  sports_hijab:        'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=600&q=85',
  modest_jersey:       'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=600&q=85',
  modest_pants:        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=85',
  // Tote bag — canvas merchandise
  tote:                'https://images.unsplash.com/photo-1597484662317-c89c3df82f48?w=600&q=85',
};

const COLORS = {
  black:     { id:'black',     name:'Black',        hex:'#000000' },
  white:     { id:'white',     name:'White',        hex:'#FFFFFF' },
  navy:      { id:'navy',      name:'Navy Blue',    hex:'#1B2A4A' },
  royal:     { id:'royal',     name:'Royal Blue',   hex:'#2563EB' },
  red:       { id:'red',       name:'Red',          hex:'#DC2626' },
  maroon:    { id:'maroon',    name:'Maroon',       hex:'#7F1D1D' },
  forest:    { id:'forest',    name:'Forest Green', hex:'#166534' },
  kelly:     { id:'kelly',     name:'Kelly Green',  hex:'#16A34A' },
  green:     { id:'green',     name:'Green',        hex:'#22C55E' },
  purple:    { id:'purple',    name:'Purple',       hex:'#7C3AED' },
  gold:      { id:'gold',      name:'Gold',         hex:'#C8A951' },
  orange:    { id:'orange',    name:'Orange',       hex:'#EA580C' },
  grey:      { id:'grey',      name:'Heather Grey', hex:'#9CA3AF' },
  charcoal:  { id:'charcoal',  name:'Charcoal',     hex:'#374151' },
  brown:     { id:'brown',     name:'Chocolate',    hex:'#4B2E20' },
  lightblue: { id:'lightblue', name:'Light Blue',   hex:'#38BDF8' },
  pink:      { id:'pink',      name:'Pink',         hex:'#EC4899' },
  teal:      { id:'teal',      name:'Teal',         hex:'#0D9488' },
  cardinal:  { id:'cardinal',  name:'Cardinal',     hex:'#9F1239' },
  oxford:    { id:'oxford',    name:'Oxford Grey',  hex:'#6B7280' },
};

function allColors(img: string) {
  return Object.values(COLORS).map(col => ({ ...col, image: img }));
}
function sportColors(img: string, ...keys: (keyof typeof COLORS)[]) {
  return keys.map(k => ({ ...COLORS[k], image: img }));
}

const SOCCER_M_AGES = ['U6','U8','U10','U12','U14','U16','Open','30+'];
const SOCCER_F_AGES = ['U6','U8','U10','U12','U14','15+'];
const BBALL_M_AGES  = ['U10','U13','14-17','Open'];
const BBALL_F_AGES  = ['U10','U13','14+'];
const OPEN_AGES     = ['Open'];
const IND_AGES      = ['6-9','10-12','13-16','17-19','19-30','30-45','45+'];

export const products: Product[] = [

  // ═══════════════════════════════════════
  // BASKETBALL — Men's → Women's → Other → (IG Merch standalone)
  // ═══════════════════════════════════════
  {
    id: 'basketball-jersey-mens',
    name: "Men's Basketball Game Jersey (Sleeveless)",
    price: 35, originalPrice: 48,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.bball_mens_jersey,'black','white','navy','royal','red','kelly','purple','gold'),
    description: "Men's sleeveless mesh basketball jersey with full sublimation. Name, number, and team logo included. Official style available.",
    features: ['Full Sublimation Print','Moisture-Wicking Mesh','Name, Number, Logo','Official Style Available','Min 2 per order'],
    thumbnail: IG.bball_mens_jersey,
    category: 'jersey', categoryLabel: "Men's Basketball Jersey",
    sports: ['Basketball'], ageCategories: BBALL_M_AGES, teamOrderMin: 2,
    badge: 'Official Style', customPrint: true,
  },
  {
    id: 'basketball-jersey-mens-ss',
    name: "Men's Basketball Short Sleeve Jersey",
    price: 35, originalPrice: 48,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.bball_mens_ss,'black','white','navy','royal','red','kelly','purple','gold'),
    description: "Men's short sleeve basketball jersey. Full sublimation with name, number, and team logo. Great for cooler gyms or player preference.",
    features: ['Short Sleeve Cut','Full Sublimation','Moisture-Wicking Mesh','Name, Number, Logo','Official Style Available'],
    thumbnail: IG.bball_mens_ss,
    category: 'jersey', categoryLabel: "Men's Basketball Jersey (Short Sleeve)",
    sports: ['Basketball'], ageCategories: BBALL_M_AGES, teamOrderMin: 2,
    badge: 'Short Sleeve', customPrint: true,
  },
  {
    id: 'basketball-jersey-womens',
    name: "Women's Basketball Game Jersey",
    price: 35, originalPrice: 48,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.bball_womens_jersey,'black','white','navy','royal','red','kelly','purple','gold'),
    description: "Women's cut basketball jersey with full sublimation. Name, number, and team logo included. Official style available.",
    features: ["Women's Cut",'Full Sublimation Print','Moisture-Wicking Mesh','Name, Number, Logo','Official Style Available'],
    thumbnail: IG.bball_womens_jersey,
    category: 'jersey', categoryLabel: "Women's Basketball Jersey",
    sports: ['Basketball'], ageCategories: BBALL_F_AGES, teamOrderMin: 2,
    badge: 'Official Style', customPrint: true,
  },
  {
    id: 'basketball-shorts',
    name: 'Basketball Game Shorts',
    price: 28, originalPrice: 38,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.bball_shorts,'black','white','navy','royal','red','kelly','purple','gold'),
    description: 'Wide-cut basketball shorts matching the game jersey. Full sublimation available.',
    features: ['Moisture-Wicking Mesh','Elastic Waist + Drawcord','Full Sublimation','Pairs with Jersey'],
    thumbnail: IG.bball_shorts,
    category: 'shorts', categoryLabel: 'Basketball Shorts',
    sports: ['Basketball'], ageCategories: [...BBALL_M_AGES, ...BBALL_F_AGES], teamOrderMin: 2,
    badge: 'Basketball', customPrint: true,
  },
  {
    id: 'basketball-kit',
    name: 'Basketball Full Team Kit (Jersey + Shorts)',
    price: 58, originalPrice: 80,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.bball_kit,'black','white','navy','royal','red','kelly','purple'),
    description: 'Complete basketball kit with jersey + shorts. Name, number, team logo included. Official style available.',
    features: ['Jersey + Shorts Set','Full Sublimation','Name, Number, Logo','Male & Female Cuts','Official Style Available'],
    thumbnail: IG.bball_kit,
    category: 'jersey', categoryLabel: 'Basketball Full Kit',
    sports: ['Basketball'], ageCategories: [...BBALL_M_AGES, ...BBALL_F_AGES], teamOrderMin: 2,
    badge: 'Full Kit', customPrint: true,
  },

  // ═══════════════════════════════════════
  // SOCCER — Men's → Women's → Other
  // ═══════════════════════════════════════
  {
    id: 'soccer-jersey-mens',
    name: "Men's Soccer Match Jersey",
    price: 32, originalPrice: 45,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.soccer_mens,'black','white','navy','royal','red','forest','kelly','orange','purple','gold'),
    description: "Men's custom soccer match jersey with full sublimation. Home/away options. Name, number, logo, country flag. Official style available.",
    features: ['Full Sublimation','Home & Away Options','Name, Number, Flag, Logo','Official Style Available'],
    thumbnail: IG.soccer_mens,
    category: 'jersey', categoryLabel: "Men's Soccer Jersey",
    sports: ['Soccer'], ageCategories: SOCCER_M_AGES, teamOrderMin: 2,
    badge: 'Official Style', customPrint: true,
  },
  {
    id: 'soccer-jersey-womens',
    name: "Women's Soccer Match Jersey",
    price: 32, originalPrice: 45,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.soccer_womens,'black','white','navy','royal','red','forest','kelly','orange','purple','gold'),
    description: "Women's soccer jersey with full sublimation. Long-sleeve modest version available. Name, number, logo, country flag. Official style available.",
    features: ["Women's Cut",'Full Sublimation','Long-Sleeve Modest Version Available','Name, Number, Flag, Logo','Official Style Available'],
    thumbnail: IG.soccer_womens,
    category: 'jersey', categoryLabel: "Women's Soccer Jersey",
    sports: ['Soccer'], ageCategories: SOCCER_F_AGES, teamOrderMin: 2,
    badge: 'Official Style', modest: true, customPrint: true,
  },
  {
    id: 'soccer-shorts',
    name: 'Soccer Match Shorts',
    price: 22, originalPrice: 30,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.soccer_shorts,'black','white','navy','royal','red','forest','kelly','orange'),
    description: 'Lightweight soccer shorts to match your team jersey. Elastic waist with drawcord. Custom color and logo.',
    features: ['100% Polyester','Elastic Waist + Drawcord','Custom Color & Logo','Pairs with Match Jersey'],
    thumbnail: IG.soccer_shorts,
    category: 'shorts', categoryLabel: 'Soccer Shorts',
    sports: ['Soccer'], ageCategories: [...SOCCER_M_AGES, ...SOCCER_F_AGES], teamOrderMin: 2,
    badge: 'Soccer', customPrint: true,
  },
  {
    id: 'soccer-kit',
    name: 'Soccer Full Match Kit (Jersey + Shorts)',
    price: 48, originalPrice: 68,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.soccer_kit,'black','white','navy','royal','red','forest','kelly','orange','gold'),
    description: 'Complete soccer match kit — jersey + shorts. Full sublimation with name, number, country flag, team logo. Official style available.',
    features: ['Jersey + Shorts Set','Full Sublimation','Name, Number, Flag, Logo','Home & Away Option','Official Style Available'],
    thumbnail: IG.soccer_kit,
    category: 'jersey', categoryLabel: 'Soccer Full Kit',
    sports: ['Soccer'], ageCategories: [...SOCCER_M_AGES, ...SOCCER_F_AGES], teamOrderMin: 2,
    badge: 'Full Kit', modest: true, customPrint: true,
  },
  {
    id: 'soccer-gk',
    name: 'Soccer Goalkeeper Kit',
    price: 55, originalPrice: 75,
    sizes: ['XS','S','M','L','XL','2XL'],
    colors: sportColors(IG.soccer_gk,'black','royal','forest','orange','purple'),
    description: 'Padded goalkeeper jersey and shorts set in contrast colorway. Long sleeve. Custom print.',
    features: ['Padded Elbows & Shoulders','Contrast Colorway','Long Sleeve','Full Sublimation Print'],
    thumbnail: IG.soccer_gk,
    category: 'jersey', categoryLabel: 'Goalkeeper Kit',
    sports: ['Soccer'], ageCategories: [...SOCCER_M_AGES, ...SOCCER_F_AGES], teamOrderMin: 2,
    badge: 'Goalkeeper', customPrint: true,
  },

  // ═══════════════════════════════════════
  // VOLLEYBALL
  // ═══════════════════════════════════════
  {
    id: 'volleyball-kit',
    name: 'Volleyball Team Kit (Jersey + Shorts)',
    price: 52, originalPrice: 72,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.volleyball,'black','white','navy','royal','red','kelly','purple','gold'),
    description: "Volleyball jersey + shorts kit. Women's modest version (long shorts + sleeved jersey) available. Full sublimation.",
    features: ['Jersey + Shorts Set','Full Sublimation','Modest Version Available','Name, Number, Logo'],
    thumbnail: IG.volleyball,
    category: 'jersey', categoryLabel: 'Volleyball Kit',
    sports: ['Volleyball'], ageCategories: OPEN_AGES, teamOrderMin: 2,
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
    features: ['Jersey + Shorts','Flag Belt Loops','Full Sublimation','Name, Number, Logo'],
    thumbnail: IG.flag_football,
    category: 'jersey', categoryLabel: 'Flag Football Kit',
    sports: ['Flag Football'], ageCategories: OPEN_AGES, teamOrderMin: 2,
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
    colors: [{ ...COLORS.white, image: IG.cricket_whites }],
    description: 'Traditional cricket whites — long-sleeve shirt and trousers. Team logo embroidered or printed.',
    features: ['Traditional White','Long Sleeve Option','Team Name & Logo','Full Match Kit'],
    thumbnail: IG.cricket_whites,
    category: 'jersey', categoryLabel: 'Cricket Whites',
    sports: ['Cricket'], ageCategories: OPEN_AGES, teamOrderMin: 2,
    badge: 'Full Kit', customPrint: true,
  },
  {
    id: 'cricket-training',
    name: 'Cricket Training Tee',
    price: 25, originalPrice: 35,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.cricket_tee,'black','white','navy','royal','red','forest'),
    description: 'Custom cricket training tee for practice and warm-ups.',
    features: ['Moisture-Wicking Polyester','Custom Team Colors','Name & Number Optional'],
    thumbnail: IG.cricket_tee,
    category: 'tshirt', categoryLabel: 'Cricket Tee',
    sports: ['Cricket'], ageCategories: OPEN_AGES, teamOrderMin: 2,
    badge: 'Cricket', customPrint: true,
  },

  // ═══════════════════════════════════════
  // SOFTBALL — dryfit shirts only (no official style, no jersey)
  // ═══════════════════════════════════════
  {
    id: 'softball-dryfit',
    name: 'Softball Performance Dryfit Shirt',
    price: 25, originalPrice: 35,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.softball,'black','white','navy','royal','red','kelly','orange','grey'),
    description: 'Custom dryfit performance shirt for softball. Moisture-wicking fabric with custom team name and number.',
    features: ['100% Moisture-Wicking Polyester','Custom Team Colors','Name & Number Optional'],
    thumbnail: IG.softball,
    category: 'tshirt', categoryLabel: 'Softball Dryfit Shirt',
    sports: ['Softball'], ageCategories: OPEN_AGES, teamOrderMin: 2,
    badge: 'Softball', customPrint: true,
  },

  // ═══════════════════════════════════════
  // TRACK & FIELD
  // ═══════════════════════════════════════
  {
    id: 'track-singlet',
    name: 'Athletics Sprint Singlet',
    price: 28, originalPrice: 40,
    sizes: ['XS','S','M','L','XL','2XL'],
    colors: sportColors(IG.track_singlet,'black','white','navy','royal','red','kelly','gold','orange'),
    description: 'Lightweight competition singlet for track & field. Full sublimation with country flag, name, and number.',
    features: ['Lightweight 3.5oz Polyester','Full Sublimation','Country Flag Option','Body-Mapped Ventilation'],
    thumbnail: IG.track_singlet,
    category: 'jersey', categoryLabel: 'Athletics Singlet',
    sports: ['Track & Field'], ageCategories: IND_AGES, teamOrderMin: 2,
    badge: 'Individual OK', customPrint: true,
  },
  {
    id: 'track-long-sleeve',
    name: 'Athletics Long-Sleeve Modest Jersey',
    price: 32, originalPrice: 45,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.track_modest,'black','white','navy','royal','red','kelly','teal'),
    description: 'Full-sleeve modest athletics jersey for Muslim women athletes competing in Track & Field.',
    features: ['Full Sleeve Coverage','Non-Transparent','Moisture-Wicking','Custom Print'],
    thumbnail: IG.track_modest,
    category: 'jersey', categoryLabel: 'Modest Athletics Jersey',
    sports: ['Track & Field'], ageCategories: IND_AGES, teamOrderMin: 2,
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
    colors: sportColors(IG.rashguard,'black','navy','royal','red','forest','purple','gold'),
    description: 'Long-sleeve compression rashguard for judo, wrestling, BJJ, and MMA. Full sublimation.',
    features: ['85% Polyester / 15% Spandex','Long Sleeve','Four-Way Stretch','Anti-Microbial','Custom Print'],
    thumbnail: IG.rashguard,
    category: 'jersey', categoryLabel: 'Rashguard',
    sports: ['Martial Arts'], ageCategories: IND_AGES, teamOrderMin: 2,
    badge: 'Individual OK', customPrint: true,
  },
  {
    id: 'martial-fight-shorts',
    name: 'MMA / Grappling Fight Shorts',
    price: 38, originalPrice: 52,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.fight_shorts,'black','navy','royal','red','forest','purple'),
    description: 'Flexible fight shorts with split hem for maximum mobility.',
    features: ['Split Hem for Mobility','Hook-and-Loop + Drawcord','Full Sublimation','Custom Logo'],
    thumbnail: IG.fight_shorts,
    category: 'shorts', categoryLabel: 'Fight Shorts',
    sports: ['Martial Arts'], ageCategories: IND_AGES, teamOrderMin: 2,
    badge: 'Individual OK', customPrint: true,
  },

  // ═══════════════════════════════════════
  // RACKET SPORTS
  // ═══════════════════════════════════════
  {
    id: 'racket-polo',
    name: 'Racket Sports Performance Polo',
    price: 32, originalPrice: 45,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.racket_polo,'black','white','navy','royal','red','kelly','gold'),
    description: 'Breathable performance polo for tennis, table tennis, badminton, and pickleball.',
    features: ['Moisture-Wicking Polyester Pique','Stretch Fabric','UV Protection','Team Logo'],
    thumbnail: IG.racket_polo,
    category: 'jersey', categoryLabel: 'Racket Sports Polo',
    sports: ['Tennis','Table Tennis','Badminton','Pickleball'], ageCategories: IND_AGES, teamOrderMin: 2,
    badge: 'Individual OK', customPrint: true,
  },

  // ═══════════════════════════════════════
  // 5K RUN (renamed from "5K Run for Sudan")
  // ═══════════════════════════════════════
  {
    id: 'fivek-tee',
    name: '5K Run Event Tee',
    price: 22, originalPrice: 30,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.fivek_tee,'black','white','navy','royal','red','kelly','grey','green'),
    description: 'Custom event tee for the 5K Run. Lightweight moisture-wicking fabric with event logo and participant name.',
    features: ['Moisture-Wicking Polyester','Custom Event Logo','Name Optional','All Colors Available'],
    thumbnail: IG.fivek_tee,
    category: 'tshirt', categoryLabel: '5K Run Tee',
    sports: ['5K Run'], ageCategories: IND_AGES, teamOrderMin: 2,
    badge: '5K Run', customPrint: true,
  },

  // ═══════════════════════════════════════
  // ALL SPORTS — CORE APPAREL
  // ═══════════════════════════════════════

  // Hoodie — price unified at $40, all standard colors
  {
    id: 'hoodie',
    name: 'Custom Team Pullover Hoodie',
    price: 40, originalPrice: 55,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,    image: TS.hoodie_black,  backImage: TS.hoodie_back_b },
      { ...COLORS.white,    image: TS.hoodie_white,  backImage: TS.hoodie_back_w },
      { ...COLORS.grey,     image: TS.hoodie_grey,   backImage: TS.hoodie_back_b },
      { ...COLORS.charcoal, image: TS.hoodie_bh,     backImage: TS.hoodie_back_b },
      { ...COLORS.navy,     image: TS.hoodie_black,  backImage: TS.hoodie_back_b },
      { ...COLORS.royal,    image: TS.hoodie_black,  backImage: TS.hoodie_back_b },
      { ...COLORS.green,    image: TS.hoodie_black,  backImage: TS.hoodie_back_b },
      { ...COLORS.forest,   image: TS.hoodie_black,  backImage: TS.hoodie_back_b },
      { ...COLORS.red,      image: TS.hoodie_red,    backImage: TS.hoodie_back_b },
      { ...COLORS.purple,   image: TS.hoodie_black,  backImage: TS.hoodie_back_b },
      { ...COLORS.gold,     image: TS.hoodie_grey,   backImage: TS.hoodie_back_b },
      { ...COLORS.maroon,   image: TS.hoodie_red,    backImage: TS.hoodie_back_b },
      { ...COLORS.cardinal, image: TS.hoodie_red,    backImage: TS.hoodie_back_b },
      { ...COLORS.orange,   image: TS.hoodie_red,    backImage: TS.hoodie_back_b },
      { ...COLORS.teal,     image: TS.hoodie_black,  backImage: TS.hoodie_back_b },
    ],
    description: 'Premium 8.5oz fleece hoodie. All standard colors: Black, White, Grey, Green, Blue, Royal Blue and more. Full custom print.',
    features: ['65% Premium Cotton / 35% Polyester','3-Panel Hood with Drawcord','Pouch Pocket','Custom Name, Number & Logo','Black, White, Grey, Green, Blue, Royal Blue available'],
    thumbnail: TS.hoodie_black,
    category: 'hoodie', categoryLabel: 'Hoodie',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },

  // Crewneck sweatshirt — back-view image added
  {
    id: 'crewneck',
    name: 'Custom Team Crewneck Sweatshirt',
    price: 32, originalPrice: 45,
    sizes: ['XS','S','M','L','XL','2XL','3XL','4XL'],
    colors: [
      { ...COLORS.black,    image: TS.crew_black, backImage: TS.crew_back_b },
      { ...COLORS.white,    image: TS.crew_white, backImage: TS.crew_back_b },
      { ...COLORS.grey,     image: TS.crew_grey,  backImage: TS.crew_back_b },
      { ...COLORS.charcoal, image: TS.crew_bh,    backImage: TS.crew_back_b },
      { ...COLORS.navy,     image: TS.crew_black, backImage: TS.crew_back_b },
      { ...COLORS.royal,    image: TS.crew_black, backImage: TS.crew_back_b },
      { ...COLORS.red,      image: TS.crew_black, backImage: TS.crew_back_b },
      { ...COLORS.forest,   image: TS.crew_black, backImage: TS.crew_back_b },
      { ...COLORS.green,    image: TS.crew_black, backImage: TS.crew_back_b },
      { ...COLORS.purple,   image: TS.crew_black, backImage: TS.crew_back_b },
      { ...COLORS.maroon,   image: TS.crew_black, backImage: TS.crew_back_b },
      { ...COLORS.cardinal, image: TS.crew_black, backImage: TS.crew_back_b },
      { ...COLORS.gold,     image: TS.crew_grey,  backImage: TS.crew_back_b },
      { ...COLORS.orange,   image: TS.crew_black, backImage: TS.crew_back_b },
    ],
    description: 'Classic crewneck sweatshirt for training camp and travel wear. Front & back view available.',
    features: ['65% Ring-Spun Cotton / 35% Polyester','Reactive-Dyed','Cuffed Hem','Custom Print Ready','Front & Back View Available'],
    thumbnail: TS.crew_black,
    category: 'sweatshirt', categoryLabel: 'Crewneck',
    sports: ['All Sports'], teamOrderMin: 2,
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
      { ...COLORS.green,    image: TS.pants_black },
      { ...COLORS.purple,   image: TS.pants_black },
      { ...COLORS.maroon,   image: TS.pants_red   },
      { ...COLORS.cardinal, image: TS.pants_red   },
      { ...COLORS.gold,     image: TS.pants_grey  },
      { ...COLORS.orange,   image: TS.pants_red   },
      { ...COLORS.teal,     image: TS.pants_black },
    ],
    description: 'Premium fleece sweatpants with elastic waistband, side pockets, and cuffed hem.',
    features: ['65% Ring-Spun Cotton / 35% Polyester','Elastic Waist + Drawcord','Side & Back Pockets','Custom Logo & Name'],
    thumbnail: TS.pants_black,
    category: 'sweatpants', categoryLabel: 'Sweatpants',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },

  // Heavy cotton tee — grey, navy, royal blue, green added
  {
    id: 'tshirt-heavy',
    name: 'Custom Heavy Cotton Tee',
    price: 22, originalPrice: 30,
    sizes: ['S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,    image: TS.heavy_black    },
      { ...COLORS.white,    image: TS.heavy_white    },
      { ...COLORS.grey,     image: TS.heavy_ash      },
      { ...COLORS.navy,     image: TS.heavy_navy     },
      { ...COLORS.royal,    image: TS.heavy_navy     },
      { ...COLORS.green,    image: TS.heavy_black    },
      { ...COLORS.forest,   image: TS.heavy_black    },
      { ...COLORS.red,      image: TS.heavy_red      },
      { ...COLORS.charcoal, image: TS.heavy_charcoal },
      { ...COLORS.orange,   image: TS.heavy_orange   },
      { ...COLORS.oxford,   image: TS.heavy_oxford   },
      { ...COLORS.maroon,   image: TS.heavy_red      },
      { ...COLORS.purple,   image: TS.heavy_black    },
      { ...COLORS.gold,     image: TS.heavy_ash      },
      { ...COLORS.teal,     image: TS.heavy_black    },
    ],
    description: 'Heavyweight 6oz cotton tee. Now available in Grey, Navy, Royal Blue, Green, and more.',
    features: ['6oz 65% Cotton / 35% Polyester','Tear-Away Label','Custom Print Ready','Grey, Navy, Royal Blue, Green + more'],
    thumbnail: TS.heavy_black,
    category: 'tshirt', categoryLabel: 'Heavy Tee',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },

  // Long sleeve tee — new
  {
    id: 'longsleeve-tee',
    name: 'Custom Long Sleeve T-Shirt',
    price: 28, originalPrice: 38,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,    image: TS.longsleeve_black },
      { ...COLORS.white,    image: TS.longsleeve_white },
      { ...COLORS.grey,     image: TS.longsleeve_black },
      { ...COLORS.navy,     image: TS.longsleeve_black },
      { ...COLORS.royal,    image: TS.longsleeve_black },
      { ...COLORS.green,    image: TS.longsleeve_black },
      { ...COLORS.forest,   image: TS.longsleeve_black },
      { ...COLORS.red,      image: TS.longsleeve_black },
      { ...COLORS.charcoal, image: TS.longsleeve_black },
      { ...COLORS.maroon,   image: TS.longsleeve_black },
    ],
    description: 'Performance-friendly long sleeve tee. Great for layering and modest coverage. Custom team print available.',
    features: ['60% Cotton / 40% Polyester','Long Sleeve Coverage','Moisture-Friendly Blend','Custom Name, Number & Logo'],
    thumbnail: TS.longsleeve_black,
    category: 'longsleeve', categoryLabel: 'Long Sleeve Tee',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },

  // Performance top — expanded
  {
    id: 'performance-top',
    name: 'Athletic Performance Top',
    price: 30, originalPrice: 42,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,    image: TS.perf_top_black },
      { ...COLORS.white,    image: TS.perf_top_white },
      { ...COLORS.navy,     image: TS.perf_top_black },
      { ...COLORS.royal,    image: TS.perf_top_black },
      { ...COLORS.red,      image: TS.perf_top_black },
      { ...COLORS.forest,   image: TS.perf_top_black },
      { ...COLORS.green,    image: TS.perf_top_black },
      { ...COLORS.charcoal, image: TS.perf_top_black },
    ],
    description: 'Moisture-wicking, athletic-cut performance top. Ergonomic seams, anti-odor treatment, 4-way stretch.',
    features: ['100% Moisture-Wicking Polyester','Athletic Cut — Ergonomic Seams','4-Way Stretch','Anti-Odor Treatment','Custom Team Print'],
    thumbnail: TS.perf_top_black,
    category: 'tshirt', categoryLabel: 'Performance Top',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },

  // Joggers — new
  {
    id: 'joggers',
    name: 'Athletic Joggers',
    price: 38, originalPrice: 52,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,    image: TS.joggers_black },
      { ...COLORS.grey,     image: TS.joggers_grey  },
      { ...COLORS.charcoal, image: TS.joggers_black },
      { ...COLORS.navy,     image: TS.joggers_black },
      { ...COLORS.royal,    image: TS.joggers_black },
      { ...COLORS.green,    image: TS.joggers_black },
      { ...COLORS.forest,   image: TS.joggers_black },
      { ...COLORS.maroon,   image: TS.joggers_black },
    ],
    description: 'Slim-tapered athletic joggers. Great for warm-ups, travel, and casual training days.',
    features: ['Slim-Tapered Fit','Elastic Cuff + Drawcord Waist','Side Pockets','Custom Logo Optional','Soft-Touch Fleece Interior'],
    thumbnail: TS.joggers_black,
    category: 'joggers', categoryLabel: 'Joggers',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },

  // Standalone activewear shorts — new
  {
    id: 'activewear-shorts',
    name: 'Athletic Activewear Shorts',
    price: 26, originalPrice: 36,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,    image: TS.shorts_black },
      { ...COLORS.grey,     image: TS.shorts_black },
      { ...COLORS.navy,     image: TS.shorts_black },
      { ...COLORS.royal,    image: TS.shorts_black },
      { ...COLORS.red,      image: TS.shorts_black },
      { ...COLORS.green,    image: TS.shorts_black },
      { ...COLORS.charcoal, image: TS.shorts_black },
    ],
    description: 'Versatile activewear shorts. Lightweight, quick-dry fabric. Works standalone or paired with any jersey.',
    features: ['100% Quick-Dry Polyester','Elastic Waist + Drawcord','Side Pockets','Custom Logo Optional'],
    thumbnail: TS.shorts_black,
    category: 'shorts', categoryLabel: 'Activewear Shorts',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },

  // Socks — crew, ankle, performance (new)
  {
    id: 'socks-crew',
    name: 'Athletic Crew Socks',
    price: 8, originalPrice: 12,
    sizes: ['S/M','L/XL'],
    colors: sportColors(TS.socks_crew,'black','white','navy','royal','red','grey','green'),
    description: 'Classic crew length athletic socks. Cushioned sole, reinforced heel and toe.',
    features: ['80% Cotton / 20% Nylon','Cushioned Sole','Reinforced Heel & Toe','Custom Team Color'],
    thumbnail: TS.socks_crew,
    category: 'socks', categoryLabel: 'Crew Socks',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },
  {
    id: 'socks-ankle',
    name: 'Athletic Ankle Socks',
    price: 7, originalPrice: 10,
    sizes: ['S/M','L/XL'],
    colors: sportColors(TS.socks_ankle,'black','white','navy','royal','red','grey','green'),
    description: 'Low-cut ankle socks. Perfect for warm weather and running.',
    features: ['80% Cotton / 20% Nylon','Low-Cut Ankle Height','Arch Support Band','Custom Team Color'],
    thumbnail: TS.socks_ankle,
    category: 'socks', categoryLabel: 'Ankle Socks',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },
  {
    id: 'socks-performance',
    name: 'Performance Athletic Socks',
    price: 12, originalPrice: 18,
    sizes: ['S/M','L/XL'],
    colors: sportColors(TS.socks_perf,'black','white','navy','royal','red','grey','green'),
    description: 'High-performance moisture-wicking socks with compression arch support and anti-blister lining.',
    features: ['Moisture-Wicking Blend','Compression Arch Support','Anti-Blister Lining','Odor Control','Custom Team Color'],
    thumbnail: TS.socks_perf,
    category: 'socks', categoryLabel: 'Performance Socks',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },

  // Headwear — flat brim + baseball cap (general/sport catalog, NOT IG Merch)
  {
    id: 'flatbrim-cap',
    name: 'Custom Flat Brim Cap',
    price: 25, originalPrice: 35,
    sizes: ['One Size'],
    colors: allColors(TS.flatbrim_cap),
    description: 'Structured flat brim snapback cap. 6-panel design with embroidered team logo.',
    features: ['6-Panel Structured','Flat Brim','Snapback Closure','Embroidered Logo','All Colors Available'],
    thumbnail: TS.flatbrim_cap,
    category: 'hat', categoryLabel: 'Flat Brim Cap',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },
  {
    id: 'baseball-cap',
    name: 'Custom Baseball Cap',
    price: 22, originalPrice: 32,
    sizes: ['One Size'],
    colors: allColors(TS.baseball_cap),
    description: 'Classic curved-brim baseball cap with adjustable strap. Embroidered team logo on front.',
    features: ['6-Panel Unstructured','Curved Brim','Adjustable Strap Back','Embroidered Logo','All Colors Available'],
    thumbnail: TS.baseball_cap,
    category: 'hat', categoryLabel: 'Baseball Cap',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },
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
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'All Sports', customPrint: true,
  },

  // Modest wear
  {
    id: 'sports-hijab',
    name: 'Performance Sports Hijab',
    price: 18, originalPrice: 25,
    sizes: ['One Size'],
    colors: sportColors(IG.sports_hijab,'black','white','navy','royal','red','forest','kelly','teal','purple','gold','grey','charcoal','lightblue','pink'),
    description: 'Lightweight, breathable sports hijab. Secure non-slip fit. Team color matching available.',
    features: ['95% Polyester / 5% Spandex','Moisture-Wicking','Secure Non-Slip Design','Team Color Matching'],
    thumbnail: IG.sports_hijab,
    category: 'modest', categoryLabel: 'Sports Hijab',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },
  {
    id: 'modest-jersey-women',
    name: "Women's Full-Sleeve Modest Jersey",
    price: 40, originalPrice: 55,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.modest_jersey,'black','white','navy','royal','red','forest','teal','purple','gold'),
    description: 'Full-sleeve jersey for Muslim women athletes. Non-transparent, breathable, fully customizable.',
    features: ['Full Sleeve Coverage','Non-Transparent Fabric','Moisture-Wicking','Custom Name, Number, Logo'],
    thumbnail: IG.modest_jersey,
    category: 'modest', categoryLabel: "Women's Modest Jersey",
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },
  {
    id: 'modest-track-pants',
    name: "Women's Modest Track Pants",
    price: 35, originalPrice: 48,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: sportColors(IG.modest_pants,'black','navy','royal','forest','charcoal','teal','purple'),
    description: 'Non-transparent, breathable full-length track pants. Loose modest fit with elastic waist.',
    features: ['Non-Transparent','Loose Modest Fit','Elastic Waist + Drawcord','Side Pockets','Custom Color & Logo'],
    thumbnail: IG.modest_pants,
    category: 'modest', categoryLabel: "Women's Track Pants",
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },

  // ═══════════════════════════════════════════════════════════
  // IG MERCH — STANDALONE SECTION ONLY
  // Hat removed. Tote bag added. Hoodie price unified at $40.
  // IG Merch does NOT appear in individual sport pages.
  // ═══════════════════════════════════════════════════════════
  {
    id: 'ig-hoodie-black',
    name: 'Islamic Games Official Hoodie',
    price: 40, originalPrice: 55,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,    image: TS.ig_hoodie_black_front,  backImage: TS.ig_hoodie_back },
      { ...COLORS.charcoal, image: TS.ig_hoodie_hgrey_front,  backImage: TS.ig_hoodie_back },
      { ...COLORS.grey,     image: TS.ig_hoodie_grey_front,   backImage: TS.ig_hoodie_back },
      { ...COLORS.white,    image: TS.hoodie_white,           backImage: TS.ig_hoodie_back },
      { ...COLORS.navy,     image: TS.ig_hoodie_black_front,  backImage: TS.ig_hoodie_back },
      { ...COLORS.royal,    image: TS.ig_hoodie_black_front,  backImage: TS.ig_hoodie_back },
      { ...COLORS.green,    image: TS.ig_hoodie_black_front,  backImage: TS.ig_hoodie_back },
    ],
    description: 'Official Islamic Games 2026 merchandise hoodie. IG logo printed on chest. "I\'m Strong Inside! I\'m Strong Outside!" on back. Black, White, Grey, Green, Blue, Royal Blue available.',
    features: ['Official IG 2026 Logo on Chest','Back Print: "I\'m Strong Inside! I\'m Strong Outside!"','65% Cotton / 35% Polyester','Pouch Pocket','Sizes XS–3XL'],
    thumbnail: TS.ig_hoodie_black_front,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 2,
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
      { ...COLORS.grey,  image: TS.tee_white, backImage: TS.tee_black_b },
      { ...COLORS.navy,  image: TS.tee_black, backImage: TS.tee_black_b },
    ],
    description: 'Official Islamic Games 2026 T-shirt. IG logo on chest and event details on back.',
    features: ['Official IG 2026 Logo','55% Cotton / 45% Polyester','Front chest logo + back event print','Sizes XS–3XL'],
    thumbnail: TS.tee_white,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'IG Official', customPrint: true,
  },
  {
    id: 'ig-sweatshirt',
    name: 'Islamic Games Official Crewneck Sweatshirt',
    price: 35, originalPrice: 48,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black,    image: TS.ig_sweatshirt_black, backImage: TS.crew_back_b },
      { ...COLORS.grey,     image: TS.crew_grey,           backImage: TS.crew_back_b },
      { ...COLORS.charcoal, image: TS.crew_bh,             backImage: TS.crew_back_b },
      { ...COLORS.white,    image: TS.crew_white,          backImage: TS.crew_back_b },
    ],
    description: 'Official Islamic Games 2026 crewneck sweatshirt with IG logo on chest. Classic fleece feel, great for athletes and fans. Front & back view available.',
    features: ['Official IG 2026 Logo on Chest','65% Cotton / 35% Polyester','Cuffed Hem','Sizes XS–3XL','Front & Back View'],
    thumbnail: TS.ig_sweatshirt_black,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'IG Official', customPrint: true,
  },
  {
    id: 'ig-sweatpants',
    name: 'Islamic Games Official Sweatpants',
    price: 32, originalPrice: 45,
    sizes: ['S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black, image: TS.pants_black },
      { ...COLORS.grey,  image: TS.pants_grey  },
    ],
    description: 'Official Islamic Games 2026 sweatpants with IG logo on the leg. Pairs with the IG hoodie or crewneck.',
    features: ['Official IG 2026 Logo on Leg','65% Cotton / 35% Polyester','Elastic Waist + Drawcord','Side Pockets'],
    thumbnail: TS.pants_black,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'IG Official', customPrint: true,
  },
  // Tote bag — replaces removed hat
  {
    id: 'ig-tote',
    name: 'Islamic Games Official Tote Bag',
    price: 15, originalPrice: 22,
    sizes: ['One Size'],
    colors: [
      { ...COLORS.black, image: TS.tote_black },
      { ...COLORS.white, image: TS.tote_white },
      { ...COLORS.navy,  image: TS.tote_black },
    ],
    description: 'Heavy-duty canvas tote bag with Islamic Games 2026 logo. Perfect for event days, gear, and fan merchandise.',
    features: ['12oz Canvas','IG 2026 Logo Print','Reinforced Handles','15"x16" Size'],
    thumbnail: IG.tote,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 2,
    badge: 'IG Official', customPrint: true,
  },
];

export const productInfo = products[0];

// Sports list: Swimming removed, 5K Run for Sudan → 5K Run
export const SPORTS_LIST = [
  'Basketball','Soccer','Volleyball','Flag Football','Cricket',
  'Softball','Track & Field','Martial Arts','Tennis','Table Tennis',
  'Archery','Arm Wrestling','Fitness Course','Pickleball',
  '5K Run','Bike Ride','Badminton','Ultimate Frisbee',
];

export const ALL_SPORTS = SPORTS_LIST;

export const CATEGORIES_LIST = [
  { id: 'ig-merch',   label: 'IG Merchandise',   emoji: '🏅' },
  { id: 'jersey',     label: 'Jerseys & Kits',    emoji: '🏆' },
  { id: 'shorts',     label: 'Shorts',             emoji: '🩳' },
  { id: 'hoodie',     label: 'Hoodies',            emoji: '🧥' },
  { id: 'sweatshirt', label: 'Crewnecks',          emoji: '👕' },
  { id: 'sweatpants', label: 'Sweatpants',         emoji: '🏃' },
  { id: 'joggers',    label: 'Joggers',            emoji: '🏃' },
  { id: 'tshirt',     label: 'T-Shirts',           emoji: '👕' },
  { id: 'longsleeve', label: 'Long Sleeve Tees',   emoji: '👕' },
  { id: 'socks',      label: 'Socks',              emoji: '🧦' },
  { id: 'hat',        label: 'Caps & Headwear',    emoji: '🧢' },
  { id: 'modest',     label: 'Modest Wear',        emoji: '🧕' },
];

// IG Merch is NEVER mixed into sport-specific pages
export function getProductsBySport(sport: string): Product[] {
  if (!sport || sport === 'All Sports') return products.filter(p => p.category !== 'ig-merch');
  return products.filter(p =>
    p.category !== 'ig-merch' &&
    (p.sports.includes(sport) || p.sports.includes('All Sports'))
  );
}

export function getProductsByCategory(cat: string): Product[] {
  if (!cat || cat === 'all') return products;
  return products.filter(p => p.category === cat);
}

export function getIGMerchProducts(): Product[] {
  return products.filter(p => p.category === 'ig-merch');
}

// Jersey page sort: Men's → Women's → Other → (IG Merch separate)
export function getJerseyPageProducts(sport?: string): Product[] {
  const pool = sport ? getProductsBySport(sport) : products.filter(p => p.category !== 'ig-merch');
  const mens   = pool.filter(p => p.category === 'jersey' && p.name.toLowerCase().includes("men's"));
  const womens = pool.filter(p => p.category === 'jersey' && p.name.toLowerCase().includes("women's"));
  const other_jerseys = pool.filter(p => p.category === 'jersey' && !p.name.toLowerCase().includes("men's") && !p.name.toLowerCase().includes("women's"));
  const rest   = pool.filter(p => p.category !== 'jersey');
  return [...mens, ...womens, ...other_jerseys, ...rest];
}
