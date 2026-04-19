// ─────────────────────────────────────────────────────────────
// NATIONAL GAMES PORTAL — APPAREL CATALOGUE v15
// Flow: 1) Sportswear  2) Team Apparel  3) Islamic Games Merch
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

const IMG = {
  dry_fit_ls_unisex:   '/Long Sleeve Performance Top - Unisex.jpeg',
  dry_fit_ls_women:    '/Long Sleeve Athletic Top - Women.jpeg',
  dry_fit_ss:          '/Athletic Performance Top - Short Sleeve.jpeg',
  shorts:              '/Athletic Shorts.jpeg',
  joggers:             '/Athletic Joggers - Men.jpeg',
  joggers_men:         '/Athletic Joggers - Men.jpeg',
  joggers_women:       '/Athletic Joggers - Women.jpeg',
  leggings:            '/Athletic Leggings - Men.jpeg',
  arm_sleeves:         '/Arm sleeves.jpeg',
  hijab:               '/Sports Hijab.jpeg',
  hijab_hat:           '/Sports Hijab w. Hat.jpeg',
  ls_undershirt:       '/Long Sleeve Cooling Undershirt - Women.jpeg',
  cotton_ss:           '/Athletic Performance Top - Short Sleeve.jpeg',
  bball_jersey:        '/Basketball Game Jersey (Sleeveless).jpeg',
  bball_shorts:        '/Basketball Shorts.jpeg',
  soccer_jersey_u:     '/Soccer Jersey - Unisex.jpeg',
  soccer_jersey_w:     '/Soccer Jersey - Women.jpeg',
  football_jersey:     '/Football Jersey.jpeg',
  softball_jersey_m:   '/Softball Jersey - Men.jpeg',
  softball_jersey_w:   '/Softball Jersey -Women.jpeg',
  ig_hoodie_black:     '/IG_Hoodie_Front.jpg',
  ig_hoodie_grey:      '/IG_Hoodie_Gray_Front.jpg',
  ig_hoodie_hgrey:     '/IG_Hoodie_Heather_Grey_Front.jpg',
  ig_hoodie_back:      '/IG_Hoodie_Back.jpg',
  ig_sweatshirt:       '/IG_Sweatshirt_Front_Black.jpg',
};

const TS = {
  hoodie_white:  'https://threadstylez.com/wp-content/uploads/2023/11/Front-White-TSPH.png',
  crew_grey:     'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Grey-2.jpg',
  crew_white:    'https://threadstylez.com/wp-content/uploads/2024/09/TSS-White-.jpg',
  crew_bh:       'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Heather-Black.jpg',
  crew_back_b:   'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Black-.jpg',
  pants_black:   'https://threadstylez.com/wp-content/uploads/2023/12/Main-Front.png',
  pants_grey:    'https://threadstylez.com/wp-content/uploads/2023/12/Heather-Grey.png',
  tee_black:     'https://threadstylez.com/wp-content/uploads/2024/08/TST-Black.jpg',
  tee_white:     'https://threadstylez.com/wp-content/uploads/2024/08/TST-White.jpg',
  tee_black_b:   'https://threadstylez.com/wp-content/uploads/2024/08/TST-Black-Back.jpg',
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
  purple:    { id:'purple',    name:'Purple',       hex:'#7C3AED' },
  gold:      { id:'gold',      name:'Gold',         hex:'#C8A951' },
  orange:    { id:'orange',    name:'Orange',       hex:'#EA580C' },
  grey:      { id:'grey',      name:'Heather Grey', hex:'#9CA3AF' },
  charcoal:  { id:'charcoal',  name:'Charcoal',     hex:'#374151' },
  lightblue: { id:'lightblue', name:'Light Blue',   hex:'#38BDF8' },
  pink:      { id:'pink',      name:'Pink',         hex:'#EC4899' },
  teal:      { id:'teal',      name:'Teal',         hex:'#0D9488' },
};

type ColorKey = keyof typeof COLORS;

function sportColors(img: string, ...keys: ColorKey[]) {
  return keys.map(k => ({ ...COLORS[k], image: img }));
}

const STD_COLORS: ColorKey[] = ['black','white','navy','royal','red','forest','kelly','purple','gold','grey','charcoal','lightblue','pink','teal'];
const STD_SIZES = ['XS','S','M','L','XL','2XL','3XL'];

const ALL_SPORTS_LIST = [
  'Basketball','Volleyball','Soccer','Flag Football','Cricket',
  'Softball/Pickleball','Track & Field','Tennis','Table Tennis',
  'Archery','Fitness Course','5K Run','Bike Ride','Badminton',
  'Ultimate Frisbee','All Sports',
];

export const products: Product[] = [

  // ══════════════════════════════════════════════════════════
  // SECTION 1 — SPORTSWEAR
  // ══════════════════════════════════════════════════════════
  {
    id: 'dry-fit-ls-unisex',
    name: 'Dry Fit Long Sleeve Performance Top (Unisex)',
    price: 30, originalPrice: 42, sizes: STD_SIZES,
    colors: sportColors(IMG.dry_fit_ls_unisex, ...STD_COLORS),
    description: 'Unisex long sleeve moisture-wicking performance top. Custom team name, number, and logo. Available for all sports.',
    features: ['100% Moisture-Wicking Polyester','Long Sleeve Coverage','Custom Name, Number & Logo','UPF 30+ Sun Protection','All Team Colors Available'],
    thumbnail: IMG.dry_fit_ls_unisex,
    category: 'sportswear', categoryLabel: 'Dry Fit Long Sleeve (Unisex)',
    sports: ALL_SPORTS_LIST, teamOrderMin: 2, badge: 'Unisex', customPrint: true,
  },
  {
    id: 'dry-fit-ls-women',
    name: "Dry Fit Long Sleeve Athletic Top (Women's)",
    price: 30, originalPrice: 42, sizes: STD_SIZES,
    colors: sportColors(IMG.dry_fit_ls_women, ...STD_COLORS),
    description: "Women's cut long sleeve dry-fit performance top. Modest full coverage. Custom print available.",
    features: ["Women's Athletic Cut",'Full Sleeve Coverage','Moisture-Wicking','Modest Design','Custom Name, Number & Logo'],
    thumbnail: IMG.dry_fit_ls_women,
    category: 'sportswear', categoryLabel: "Dry Fit Long Sleeve (Women's)",
    sports: ALL_SPORTS_LIST, teamOrderMin: 2, badge: "Women's", modest: true, customPrint: true,
  },
  {
    id: 'dry-fit-ss',
    name: 'Dry Fit Short Sleeve Performance Top',
    price: 25, originalPrice: 35, sizes: STD_SIZES,
    colors: sportColors(IMG.dry_fit_ss, ...STD_COLORS),
    description: 'Lightweight short sleeve dry-fit shirt. Perfect for all court and field sports. Custom team print.',
    features: ['100% Moisture-Wicking Polyester','Breathable Mesh Panels','Custom Team Colors','Name & Number Optional','Unisex Cut'],
    thumbnail: IMG.dry_fit_ss,
    category: 'sportswear', categoryLabel: 'Dry Fit Short Sleeve',
    sports: ALL_SPORTS_LIST, teamOrderMin: 2, badge: 'Dry Fit', customPrint: true,
  },
  {
    id: 'athletic-shorts',
    name: 'Athletic Performance Shorts',
    price: 22, originalPrice: 32, sizes: STD_SIZES,
    colors: sportColors(IMG.shorts, ...STD_COLORS),
    description: 'Lightweight athletic shorts for all sports. Elastic waist with drawcord. Full sublimation custom print.',
    features: ['Moisture-Wicking Polyester','Elastic Waist + Drawcord','Side Pockets','Custom Color & Logo','5" Inseam'],
    thumbnail: IMG.shorts,
    category: 'sportswear', categoryLabel: 'Athletic Shorts',
    sports: ALL_SPORTS_LIST, teamOrderMin: 2, badge: 'Shorts', customPrint: true,
  },
  {
    id: 'athletic-joggers',
    name: 'Athletic Joggers',
    price: 35, originalPrice: 48, sizes: STD_SIZES,
    colors: sportColors(IMG.joggers, ...STD_COLORS),
    description: 'Performance joggers with tapered ankle cuffs. Great for warm-ups, training, and travel.',
    features: ['Moisture-Wicking Fabric','Tapered Ankle Cuffs','Zippered Pockets','Custom Color & Logo','Elastic Waist + Drawcord'],
    thumbnail: IMG.joggers,
    category: 'sportswear', categoryLabel: 'Athletic Joggers',
    sports: ALL_SPORTS_LIST, teamOrderMin: 2, badge: 'Joggers', customPrint: true,
  },
  {
    id: 'athletic-leggings',
    name: 'Athletic Compression Leggings',
    price: 32, originalPrice: 45, sizes: STD_SIZES,
    colors: sportColors(IMG.leggings, ...STD_COLORS),
    description: 'High-waist compression leggings for training and competition. Non-transparent fabric. Custom team print.',
    features: ['High Waist Design','Non-Transparent','4-Way Stretch Fabric','Moisture-Wicking','Custom Color & Logo'],
    thumbnail: IMG.leggings,
    category: 'sportswear', categoryLabel: 'Athletic Leggings',
    sports: ALL_SPORTS_LIST, teamOrderMin: 2, badge: 'Leggings', modest: true, customPrint: true,
  },
  {
    id: 'arm-sleeves',
    name: 'Athletic Arm Sleeves',
    price: 12, originalPrice: 18, sizes: ['One Size','S/M','L/XL'],
    colors: sportColors(IMG.arm_sleeves, 'black','white','navy','royal','red','forest','kelly','purple','gold','grey','charcoal','lightblue','pink','teal'),
    description: 'Compression arm sleeves for sun protection and coverage during play. Pair with short-sleeve jerseys for modest full-arm coverage.',
    features: ['UPF 50+ Sun Protection','Compression Fit','Moisture-Wicking','Pairs with Short Sleeve Jerseys','14+ Team Colors Available'],
    thumbnail: IMG.arm_sleeves,
    category: 'sportswear', categoryLabel: 'Arm Sleeves',
    sports: ALL_SPORTS_LIST, teamOrderMin: 2, badge: 'Modest Wear', modest: true, customPrint: true,
  },
  {
    id: 'sports-hijab',
    name: 'Performance Sports Hijab',
    price: 18, originalPrice: 25, sizes: ['One Size'],
    colors: sportColors(IMG.hijab, 'black','white','navy','royal','red','forest','kelly','teal','purple','gold','grey','charcoal','lightblue','pink'),
    description: 'Lightweight, breathable sports hijab with secure non-slip fit. Worn by athletes across all sports. Team color matching available.',
    features: ['95% Polyester / 5% Spandex','Moisture-Wicking','Secure Non-Slip Design','Team Color Matching','14+ Colors Available'],
    thumbnail: IMG.hijab,
    category: 'sportswear', categoryLabel: 'Sports Hijab',
    sports: ALL_SPORTS_LIST, teamOrderMin: 2, badge: 'Modest Wear', modest: true, customPrint: true,
  },
  {
    id: 'sports-hijab-hat',
    name: 'Sports Hijab with Cap',
    price: 22, originalPrice: 30, sizes: ['One Size'],
    colors: sportColors(IMG.hijab_hat, 'black','white','navy','royal','red','forest','kelly','teal','purple','gold','grey','charcoal','lightblue','pink'),
    description: 'Sports hijab with integrated cap brim for sun shielding and a secure athletic fit. Perfect for outdoor sports like soccer, 5K runs, and cycling.',
    features: ['Integrated Cap Brim','Secure Non-Slip Fit','Moisture-Wicking Fabric','Ideal for Outdoor Sports','14+ Team Colors Available'],
    thumbnail: IMG.hijab_hat,
    category: 'sportswear', categoryLabel: 'Sports Hijab with Cap',
    sports: ALL_SPORTS_LIST, teamOrderMin: 2, badge: 'Modest Wear', modest: true, customPrint: true,
  },
  {
    id: 'ls-undershirt',
    name: 'Long Sleeve Cooling Undershirt',
    price: 22, originalPrice: 30, sizes: STD_SIZES,
    colors: sportColors(IMG.ls_undershirt, ...STD_COLORS),
    description: 'Cooling compression undershirt worn under jerseys for full arm coverage. Essential for modest athletes.',
    features: ['Cooling Compression Fabric','Worn Under Jersey','Full Arm Coverage','Non-Transparent','Moisture-Wicking'],
    thumbnail: IMG.ls_undershirt,
    category: 'sportswear', categoryLabel: 'Long Sleeve Undershirt',
    sports: ALL_SPORTS_LIST, teamOrderMin: 2, badge: 'Undershirt', modest: true, customPrint: true,
  },
  {
    id: 'cotton-ss-shirt',
    name: 'Cotton Short Sleeve T-Shirt',
    price: 20, originalPrice: 28, sizes: STD_SIZES,
    colors: sportColors(IMG.cotton_ss, ...STD_COLORS),
    description: 'Classic cotton-blend short sleeve shirt. Custom team print. Great for fans, volunteers, and casual wear.',
    features: ['55% Cotton / 45% Polyester','Custom Team Logo & Colors','Unisex Cut','Screen Print or DTG','Sizes XS–3XL'],
    thumbnail: IMG.cotton_ss,
    category: 'sportswear', categoryLabel: 'Cotton Short Sleeve Shirt',
    sports: ALL_SPORTS_LIST, teamOrderMin: 2, badge: 'Cotton Tee', customPrint: true,
  },

  // ══════════════════════════════════════════════════════════
  // SECTION 2 — TEAM APPAREL
  // ══════════════════════════════════════════════════════════

  {
    id: 'basketball-jersey-sleeveless',
    name: 'Basketball Game Jersey (Sleeveless)',
    price: 35, originalPrice: 48, sizes: STD_SIZES,
    colors: sportColors(IMG.bball_jersey,'black','white','navy','royal','red','kelly','purple','gold'),
    description: 'Official sleeveless basketball jersey with full sublimation. Team name, number, and logo included.',
    features: ['Full Sublimation Print','Moisture-Wicking Mesh','Name, Number & Logo','Official IG Style Available','Min 2 per order'],
    thumbnail: IMG.bball_jersey,
    category: 'team-apparel', categoryLabel: 'Basketball Jersey (Sleeveless)',
    sports: ['Basketball'], teamOrderMin: 2, badge: 'Basketball', customPrint: true,
  },
  {
    id: 'basketball-shorts-team',
    name: 'Basketball Game Shorts',
    price: 28, originalPrice: 38, sizes: STD_SIZES,
    colors: sportColors(IMG.bball_shorts,'black','white','navy','royal','red','kelly','purple','gold'),
    description: 'Wide-cut basketball shorts matching the game jersey. Full sublimation available.',
    features: ['Moisture-Wicking Mesh','Elastic Waist + Drawcord','Full Sublimation','Pairs with Jersey'],
    thumbnail: IMG.bball_shorts,
    category: 'team-apparel', categoryLabel: 'Basketball Shorts',
    sports: ['Basketball'], teamOrderMin: 2, badge: 'Basketball', customPrint: true,
  },
  {
    id: 'soccer-jersey-unisex',
    name: 'Soccer Jersey (Unisex)',
    price: 32, originalPrice: 45, sizes: STD_SIZES,
    colors: sportColors(IMG.soccer_jersey_u,'black','white','navy','royal','red','forest','kelly','orange','purple','gold'),
    description: 'Custom unisex soccer jersey. Full sublimation with name, number, and team logo.',
    features: ['Full Sublimation','Home & Away Options','Name, Number & Logo','Official IG Style Available'],
    thumbnail: IMG.soccer_jersey_u,
    category: 'team-apparel', categoryLabel: 'Soccer Jersey (Unisex)',
    sports: ['Soccer'], teamOrderMin: 2, badge: 'Soccer', customPrint: true,
  },
  {
    id: 'soccer-jersey-women',
    name: "Soccer Jersey (Women's)",
    price: 32, originalPrice: 45, sizes: STD_SIZES,
    colors: sportColors(IMG.soccer_jersey_w,'black','white','navy','royal','red','forest','kelly','orange','purple','gold'),
    description: "Women's soccer jersey with full sublimation. Long-sleeve modest version available.",
    features: ["Women's Cut",'Full Sublimation','Modest Long-Sleeve Version Available','Name, Number & Logo'],
    thumbnail: IMG.soccer_jersey_w,
    category: 'team-apparel', categoryLabel: "Soccer Jersey (Women's)",
    sports: ['Soccer'], teamOrderMin: 2, badge: 'Soccer', modest: true, customPrint: true,
  },
  {
    id: 'football-jersey',
    name: 'Football Jersey',
    price: 38, originalPrice: 52, sizes: STD_SIZES,
    colors: sportColors(IMG.football_jersey,'black','white','navy','royal','red','kelly','orange','gold'),
    description: 'Custom football jersey with full sublimation. Name, number, and team logo.',
    features: ['Full Sublimation','Heavy-Duty Mesh','Name, Number & Logo','Flag Belt Compatible'],
    thumbnail: IMG.football_jersey,
    category: 'team-apparel', categoryLabel: 'Football Jersey',
    sports: ['Flag Football'], teamOrderMin: 2, badge: 'Flag Football', customPrint: true,
  },
  {
    id: 'softball-jersey-men',
    name: "Softball Jersey (Men's)",
    price: 35, originalPrice: 48, sizes: STD_SIZES,
    colors: sportColors(IMG.softball_jersey_m,'black','white','navy','royal','red','kelly','orange','grey'),
    description: "Men's custom softball jersey. Full sublimation with team name, number, and logo.",
    features: ['Full Sublimation Print','Moisture-Wicking','Name, Number & Logo','Classic Softball Cut'],
    thumbnail: IMG.softball_jersey_m,
    category: 'team-apparel', categoryLabel: "Softball Jersey (Men's)",
    sports: ['Softball/Pickleball'], teamOrderMin: 2, badge: 'Softball', customPrint: true,
  },
  {
    id: 'softball-jersey-women',
    name: "Softball Jersey (Women's)",
    price: 35, originalPrice: 48, sizes: STD_SIZES,
    colors: sportColors(IMG.softball_jersey_w,'black','white','navy','royal','red','kelly','orange','grey'),
    description: "Women's custom softball jersey. Full sublimation with team name, number, and logo.",
    features: ["Women's Cut",'Full Sublimation Print','Moisture-Wicking','Name, Number & Logo'],
    thumbnail: IMG.softball_jersey_w,
    category: 'team-apparel', categoryLabel: "Softball Jersey (Women's)",
    sports: ['Softball/Pickleball'], teamOrderMin: 2, badge: 'Softball', customPrint: true,
  },

  // ══════════════════════════════════════════════════════════
  // SECTION 3 — ISLAMIC GAMES MERCH
  // ══════════════════════════════════════════════════════════
  {
    id: 'ig-hoodie',
    name: 'Islamic Games Official Hoodie',
    price: 40, originalPrice: 55, sizes: STD_SIZES,
    colors: [
      { ...COLORS.black,    image: IMG.ig_hoodie_black, backImage: IMG.ig_hoodie_back },
      { ...COLORS.charcoal, image: IMG.ig_hoodie_hgrey, backImage: IMG.ig_hoodie_back },
      { ...COLORS.grey,     image: IMG.ig_hoodie_grey,  backImage: IMG.ig_hoodie_back },
      { ...COLORS.white,    image: TS.hoodie_white,     backImage: IMG.ig_hoodie_back },
      { ...COLORS.navy,     image: IMG.ig_hoodie_black, backImage: IMG.ig_hoodie_back },
      { ...COLORS.royal,    image: IMG.ig_hoodie_black, backImage: IMG.ig_hoodie_back },
      { ...COLORS.kelly,    image: IMG.ig_hoodie_black, backImage: IMG.ig_hoodie_back },
    ],
    description: "Official Islamic Games 2026 merchandise hoodie. IG logo on chest. \"I'm Strong Inside! I'm Strong Outside!\" on back.",
    features: ['Official IG 2026 Logo on Chest',"Back Print: \"I'm Strong Inside! I'm Strong Outside!\"",'65% Cotton / 35% Polyester','Pouch Pocket','Sizes XS–3XL'],
    thumbnail: IMG.ig_hoodie_black,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 2, badge: 'IG Official', customPrint: true,
  },
  {
    id: 'ig-sweatshirt',
    name: 'Islamic Games Official Crewneck Sweatshirt',
    price: 35, originalPrice: 48, sizes: STD_SIZES,
    colors: [
      { ...COLORS.black,    image: IMG.ig_sweatshirt, backImage: TS.crew_back_b },
      { ...COLORS.grey,     image: TS.crew_grey,       backImage: TS.crew_back_b },
      { ...COLORS.charcoal, image: TS.crew_bh,         backImage: TS.crew_back_b },
      { ...COLORS.white,    image: TS.crew_white,      backImage: TS.crew_back_b },
    ],
    description: 'Official Islamic Games 2026 crewneck sweatshirt with IG logo on chest.',
    features: ['Official IG 2026 Logo on Chest','65% Cotton / 35% Polyester','Cuffed Hem','Sizes XS–3XL'],
    thumbnail: IMG.ig_sweatshirt,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 2, badge: 'IG Official', customPrint: true,
  },
  {
    id: 'ig-tshirt',
    name: 'Islamic Games Official T-Shirt',
    price: 20, originalPrice: 28, sizes: STD_SIZES,
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
    sports: ['All Sports'], teamOrderMin: 2, badge: 'IG Official', customPrint: true,
  },
  {
    id: 'ig-sweatpants',
    name: 'Islamic Games Official Sweatpants',
    price: 32, originalPrice: 45, sizes: ['S','M','L','XL','2XL','3XL'],
    colors: [
      { ...COLORS.black, image: TS.pants_black },
      { ...COLORS.grey,  image: TS.pants_grey  },
    ],
    description: 'Official Islamic Games 2026 sweatpants with IG logo on the leg.',
    features: ['Official IG 2026 Logo on Leg','65% Cotton / 35% Polyester','Elastic Waist + Drawcord','Side Pockets'],
    thumbnail: TS.pants_black,
    category: 'ig-merch', categoryLabel: 'IG Merch',
    sports: ['All Sports'], teamOrderMin: 2, badge: 'IG Official', customPrint: true,
  },
];

export const productInfo = products[0];

export const SPORTS_LIST = [
  'Basketball','Volleyball','Soccer','Flag Football','Cricket',
  'Softball/Pickleball','Track & Field','Tennis','Table Tennis',
  'Archery','Fitness Course','5K Run','Bike Ride','Badminton',
  'Ultimate Frisbee','All Sports',
];

export const ALL_SPORTS = SPORTS_LIST;

export const CATEGORIES_LIST = [
  { id: 'sportswear',   label: 'Sportswear',         emoji: '🏃' },
  { id: 'team-apparel', label: 'Team Apparel',        emoji: '🏆' },
  { id: 'ig-merch',     label: 'Islamic Games Merch', emoji: '🏅' },
];

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
export function getSportswearProducts(sport?: string): Product[] {
  if (!sport || sport === 'All Sports') return products.filter(p => p.category === 'sportswear');
  return products.filter(p => p.category === 'sportswear' && (p.sports.includes(sport) || p.sports.includes('All Sports')));
}
export function getTeamApparelProducts(sport?: string): Product[] {
  if (!sport || sport === 'All Sports') return products.filter(p => p.category === 'team-apparel');
  return products.filter(p => p.category === 'team-apparel' && p.sports.includes(sport));
}
export function getJerseyPageProducts(sport?: string): Product[] {
  return getTeamApparelProducts(sport);
}
