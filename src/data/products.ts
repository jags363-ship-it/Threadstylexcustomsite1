// ─────────────────────────────────────────────────────────────
// ISLAMIC GAMES 2026 — FULL APPAREL CATALOGUE
// All Christmas images removed. Full sport coverage.
// Market-standard pricing. All color options included.
// Modest/Islamic-compliant options flagged.
// ─────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  sizes: string[];
  colors: Array<{ id: string; name: string; hex: string; image: string; backImage?: string; }>;
  description: string;
  features: string[];
  thumbnail: string;
  category: string;
  categoryLabel: string;
  sports: string[];
  teamOrderMin: number;
  badge?: string;
  modest?: boolean;
  customPrint: true;
}

// ── Real ThreadStylez product images ──────────────────────────
const TS = {
  hoodie: {
    black:   { image: 'https://threadstylez.com/wp-content/uploads/2023/11/Front-Black-TSPH.png',         backImage: 'https://threadstylez.com/wp-content/uploads/2023/11/Back-Black-TSPH.png' },
    white:   { image: 'https://threadstylez.com/wp-content/uploads/2023/11/Front-White-TSPH.png',         backImage: 'https://threadstylez.com/wp-content/uploads/2023/11/Back-White-TSPH.png' },
    heather: { image: 'https://threadstylez.com/wp-content/uploads/2023/11/Front-Black-Heather-TSPH.png', backImage: 'https://threadstylez.com/wp-content/uploads/2023/11/Back-Black-Heather-TSPH.png' },
    grey:    { image: 'https://threadstylez.com/wp-content/uploads/2023/11/Front-Grey-TSPH.png',          backImage: 'https://threadstylez.com/wp-content/uploads/2023/11/Back-Grey-TSPH.png' },
    red:     { image: 'https://threadstylez.com/wp-content/uploads/2023/11/Front-Red-TSPH.png',           backImage: 'https://threadstylez.com/wp-content/uploads/2023/11/Back-Red-TSPH.png' },
  },
  crew: {
    black:   { image: 'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Black-.jpg' },
    white:   { image: 'https://threadstylez.com/wp-content/uploads/2024/09/TSS-White-.jpg' },
    heather: { image: 'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Heather-Black.jpg' },
    grey:    { image: 'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Grey-2.jpg' },
  },
  pants: {
    black:   { image: 'https://threadstylez.com/wp-content/uploads/2023/12/Main-Front.png' },
    white:   { image: 'https://threadstylez.com/wp-content/uploads/2023/12/WHITE.png' },
    heather: { image: 'https://threadstylez.com/wp-content/uploads/2023/12/BH-Heather.png' },
    grey:    { image: 'https://threadstylez.com/wp-content/uploads/2023/12/Heather-Grey.png' },
    red:     { image: 'https://threadstylez.com/wp-content/uploads/2023/12/Red.png' },
  },
  tee: {
    black:   { image: 'https://threadstylez.com/wp-content/uploads/2024/08/TST-Black.jpg', backImage: 'https://threadstylez.com/wp-content/uploads/2024/08/TST-Black-Back.jpg' },
    white:   { image: 'https://threadstylez.com/wp-content/uploads/2024/08/TST-White.jpg', backImage: 'https://threadstylez.com/wp-content/uploads/2024/08/TST-White-Back.jpg' },
  },
  heavyTee: {
    black:     { image: 'https://threadstylez.com/wp-content/uploads/2023/11/TSCT-Side.jpg' },
    white:     { image: 'https://threadstylez.com/wp-content/uploads/2023/11/TSCT-White-Main.jpg' },
    navy:      { image: 'https://threadstylez.com/wp-content/uploads/2023/11/NAvy-2-1.jpg' },
    red:       { image: 'https://threadstylez.com/wp-content/uploads/2023/11/Red-3-1.jpg' },
    charcoal:  { image: 'https://threadstylez.com/wp-content/uploads/2023/11/cHARCOAL-2-1.jpg' },
    ash:       { image: 'https://threadstylez.com/wp-content/uploads/2023/11/Ash-2-1.jpg' },
    orange:    { image: 'https://threadstylez.com/wp-content/uploads/2023/11/Orange-2-1.jpg' },
    oxford:    { image: 'https://threadstylez.com/wp-content/uploads/2023/11/Oxford-2.jpg' },
  },
};

// ── Unsplash sport action images (free, no watermark) ─────────
const SP = {
  jersey:      'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=400&q=80',
  basketball:  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80',
  soccer:      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&q=80',
  swimming:    'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80',
  track:       'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80',
  volleyball:  'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&q=80',
  cricket:     'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80',
  martial:     'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80',
  tennis:      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80',
  badminton:   'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80',
  cycling:     'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=400&q=80',
  training:    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80',
  modest:      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  ceremony:    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
  cap:         'https://threadstylez.com/wp-content/uploads/2024/10/TSBH-main-3.png',
  flagfb:      'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&q=80',
  weightlift:  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
};

// ── Full color palette (18 colors every product can offer) ────
const ALL_COLORS = [
  { id: 'black',       name: 'Black',          hex: '#000000' },
  { id: 'white',       name: 'White',          hex: '#FFFFFF' },
  { id: 'navy',        name: 'Navy Blue',       hex: '#1B2A4A' },
  { id: 'royal-blue',  name: 'Royal Blue',      hex: '#2563EB' },
  { id: 'red',         name: 'Red',             hex: '#DC2626' },
  { id: 'maroon',      name: 'Maroon',          hex: '#7F1D1D' },
  { id: 'forest',      name: 'Forest Green',    hex: '#166534' },
  { id: 'kelly',       name: 'Kelly Green',     hex: '#16A34A' },
  { id: 'purple',      name: 'Purple',          hex: '#7C3AED' },
  { id: 'gold',        name: 'Gold',            hex: '#C8A951' },
  { id: 'orange',      name: 'Orange',          hex: '#EA580C' },
  { id: 'grey',        name: 'Heather Grey',    hex: '#9CA3AF' },
  { id: 'charcoal',    name: 'Charcoal',        hex: '#374151' },
  { id: 'brown',       name: 'Dark Chocolate',  hex: '#4B2E20' },
  { id: 'light-blue',  name: 'Light Blue',      hex: '#38BDF8' },
  { id: 'pink',        name: 'Pink',            hex: '#EC4899' },
  { id: 'teal',        name: 'Teal',            hex: '#0D9488' },
  { id: 'cardinal',    name: 'Cardinal Red',    hex: '#9F1239' },
];

// Helper: build color entries with TS image or sport fallback
function colors(tsMap: Record<string, { image: string; backImage?: string }>, fallback: string) {
  return ALL_COLORS.map(c => ({
    ...c,
    image: tsMap[c.id]?.image || fallback,
    backImage: tsMap[c.id]?.backImage,
  }));
}

function colorsFlat(img: string) {
  return ALL_COLORS.map(c => ({ ...c, image: img }));
}

export const products: Product[] = [

  // ═══════════════════════════════════════════════════════════
  // CORE — ALL SPORTS
  // ═══════════════════════════════════════════════════════════

  {
    id: 'hoodie',
    name: 'Custom Team Pullover Hoodie',
    price: 55, originalPrice: 70,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colors(TS.hoodie, SP.training),
    description: 'Premium 8.5oz fleece hoodie. Ideal for warm-ups, sideline wear, and team travel. Full custom print — name, number, logo.',
    features: ['65% Premium Cotton / 35% Polyester', '3-Panel Hood with Drawcord', 'Pouch Pocket', 'Custom Name, Number & Logo', 'Team bulk pricing available'],
    thumbnail: TS.hoodie.black.image,
    category: 'hoodie', categoryLabel: 'Hoodie',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },

  {
    id: 'crewneck',
    name: 'Custom Team Crewneck Sweatshirt',
    price: 42, originalPrice: 55,
    sizes: ['XS','S','M','L','XL','2XL','3XL','4XL','5XL'],
    colors: colors(TS.crew, SP.training),
    description: 'Classic crewneck sweatshirt, perfect for training camp and travel wear. Comfortable enough for all-day wear.',
    features: ['65% Ring-Spun Cotton / 35% Polyester', 'Reactive-Dyed for Long-lasting Color', 'Cuffed Hem', 'Custom Print Ready'],
    thumbnail: TS.crew.black.image,
    category: 'sweatshirt', categoryLabel: 'Crewneck',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },

  {
    id: 'tshirt-performance',
    name: 'Custom Essential Performance Tee',
    price: 18, originalPrice: 25,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colors(TS.tee, SP.training),
    description: 'Lightweight moisture-wicking tee. The everyday team base layer — great for training, practice, and fan wear.',
    features: ['55% Cotton / 45% Polyester', 'Moisture-Wicking Fabric', 'Double-Needle Stitching', 'Custom Name, Number & Logo'],
    thumbnail: TS.tee.black.image,
    category: 'tshirt', categoryLabel: 'T-Shirt',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },

  {
    id: 'tshirt-heavy',
    name: 'Custom Heavy Cotton Team Tee',
    price: 22, originalPrice: 30,
    sizes: ['S','M','L','XL','2XL','3XL'],
    colors: colors(TS.heavyTee, SP.training),
    description: 'Heavyweight 6oz cotton tee built for durability. Popular for fan shirts, staff wear, and casual team gear.',
    features: ['6oz 65% Cotton / 35% Polyester', 'Tear-Away Label', 'Double-Needle Construction', 'Custom Print Ready'],
    thumbnail: TS.heavyTee.black.image,
    category: 'tshirt', categoryLabel: 'T-Shirt',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },

  {
    id: 'sweatpants',
    name: 'Custom Team Warm-Up Sweatpants',
    price: 45, originalPrice: 58,
    sizes: ['S','M','L','XL','2XL','3XL'],
    colors: colors(TS.pants, SP.training),
    description: 'Premium fleece sweatpants with elastic waistband, side pockets, and cuffed hem. Pairs perfectly with the hoodie or crewneck.',
    features: ['65% Ring-Spun Cotton / 35% Polyester', 'Elastic Waistband with Drawcord', 'Side & Back Pockets', 'Cuffed Hem', 'Custom Logo & Name'],
    thumbnail: TS.pants.black.image,
    category: 'sweatpants', categoryLabel: 'Sweatpants',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },

  // ── JERSEYS ──────────────────────────────────────────────────

  {
    id: 'jersey-sleeveless',
    name: 'Custom Sleeveless Game Jersey',
    price: 38, originalPrice: 52,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.jersey),
    description: 'Classic sleeveless jersey for basketball, volleyball, and athletics. Full sublimation — front number, back name & number, team logo.',
    features: ['100% Polyester Mesh', 'Full Sublimation Print', 'Name, Number, Logo', 'Moisture-Wicking', 'Min 1 for individual, 5 for team kit'],
    thumbnail: SP.jersey,
    category: 'jersey', categoryLabel: 'Jersey',
    sports: ['Basketball','Volleyball','Athletics','Track & Field'], teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  {
    id: 'jersey-long-sleeve',
    name: 'Custom Long Sleeve Performance Jersey',
    price: 42, originalPrice: 58,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.training),
    description: 'Long-sleeve performance jersey. Ideal for cooler weather, modest coverage, and layered team kits.',
    features: ['100% Polyester Performance Fabric', 'Full Sublimation', 'UPF 30+ Sun Protection', 'Modest Coverage Option', 'Custom Print Ready'],
    thumbnail: SP.training,
    category: 'jersey', categoryLabel: 'Jersey',
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'Modest Option', modest: true, customPrint: true,
  },

  {
    id: 'polo-official',
    name: 'Custom Official Travel Polo',
    price: 35, originalPrice: 48,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.ceremony),
    description: 'Smart polo shirt for delegation travel, ceremonies, and official appearances. Embroidered or printed logo placement.',
    features: ['65% Polyester / 35% Cotton Pique', 'Embroidery or Print Available', 'Official Delegation Wear', '3-Button Placket', 'Custom Logo'],
    thumbnail: SP.ceremony,
    category: 'jersey', categoryLabel: 'Polo Shirt',
    sports: ['All Sports','Ceremony','Travel'], teamOrderMin: 5,
    badge: 'Official Wear', customPrint: true,
  },

  // ── SHORTS ───────────────────────────────────────────────────

  {
    id: 'shorts-training',
    name: 'Custom Training Shorts',
    price: 28, originalPrice: 38,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.track),
    description: 'Lightweight training shorts with elastic waistband. Suitable for all field & court sports. 7" inseam standard; longer cut available.',
    features: ['100% Polyester', 'Elastic Waistband + Drawcord', '7" Standard / 10" Modest Cut Available', 'Side Pockets', 'Custom Name & Number'],
    thumbnail: SP.track,
    category: 'shorts', categoryLabel: 'Shorts',
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'Modest Cut Avail.', modest: true, customPrint: true,
  },

  {
    id: 'basketball-shorts',
    name: 'Basketball Game Shorts',
    price: 32, originalPrice: 44,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.basketball),
    description: 'Wide-cut basketball shorts with full sublimation option. Matches sleeveless jersey for complete team kit.',
    features: ['100% Moisture-Wicking Mesh', 'Full Sublimation Available', 'Elastic Waist + Drawcord', 'Name & Number Optional', 'Pairs with Game Jersey'],
    thumbnail: SP.basketball,
    category: 'shorts', categoryLabel: 'Basketball Shorts',
    sports: ['Basketball'], teamOrderMin: 5,
    badge: 'Full Kit', customPrint: true,
  },

  {
    id: 'compression-leggings',
    name: 'Compression Performance Leggings',
    price: 38, originalPrice: 52,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.track),
    description: 'Full-length compression leggings for track, cycling, and multipurpose athletic use. Modest coverage option for women athletes.',
    features: ['85% Polyester / 15% Spandex', 'Four-Way Stretch', 'Wide Waistband', 'UPF 50+', 'Modest Women\'s Option'],
    thumbnail: SP.track,
    category: 'shorts', categoryLabel: 'Leggings',
    sports: ['Athletics','Cycling','Track & Field','Gym'], teamOrderMin: 1,
    badge: 'Modest Option', modest: true, customPrint: true,
  },

  // ── SOCCER KIT ───────────────────────────────────────────────

  {
    id: 'soccer-kit',
    name: 'Soccer Match Kit – Jersey + Shorts',
    price: 75, originalPrice: 99,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.soccer),
    description: 'Complete match-day soccer kit — jersey and shorts as a set. Home/away colorway options available. Goalkeeper kit also available on request.',
    features: ['Full Sublimation Jersey + Shorts', 'Home & Away Colorway Options', 'Name, Number, Flag, Logo', 'Goalkeeper Version Available', 'Training Bibs Add-On Available'],
    thumbnail: SP.soccer,
    category: 'jersey', categoryLabel: 'Soccer Kit',
    sports: ['Soccer'], teamOrderMin: 10,
    badge: 'Full Kit', customPrint: true,
  },

  {
    id: 'soccer-goalkeeper',
    name: 'Soccer Goalkeeper Jersey',
    price: 58, originalPrice: 78,
    sizes: ['XS','S','M','L','XL','2XL'],
    colors: colorsFlat(SP.soccer),
    description: 'Padded goalkeeper jersey with contrast colorway to distinguish from outfield players. Custom print included.',
    features: ['Padded Elbows & Shoulders', 'Contrast Color Differentiation', 'Long Sleeve', 'Full Sublimation Print', 'Custom Number & Name'],
    thumbnail: SP.soccer,
    category: 'jersey', categoryLabel: 'Goalkeeper Jersey',
    sports: ['Soccer'], teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  // ── BASKETBALL ───────────────────────────────────────────────

  {
    id: 'basketball-kit',
    name: 'Basketball Team Kit – Jersey + Shorts',
    price: 72, originalPrice: 95,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.basketball),
    description: 'Complete basketball team kit — sleeveless sublimated jersey and matching wide-cut shorts. Full name, number, and logo included.',
    features: ['Full Sublimation Jersey + Shorts', 'Name, Number, Team Logo', 'Moisture-Wicking Mesh', 'Arm Sleeve Option', 'Min 5 per kit'],
    thumbnail: SP.basketball,
    category: 'jersey', categoryLabel: 'Basketball Kit',
    sports: ['Basketball'], teamOrderMin: 5,
    badge: 'Full Kit', customPrint: true,
  },

  {
    id: 'arm-sleeve',
    name: 'Basketball Arm Sleeve',
    price: 12, originalPrice: 18,
    sizes: ['S/M','L/XL','2XL/3XL'],
    colors: colorsFlat(SP.basketball),
    description: 'Compression arm sleeve for basketball players. Custom team color and logo available. Pairs with game jersey.',
    features: ['85% Nylon / 15% Spandex', 'Compression Fit', 'Custom Color & Logo', 'Sold as Pair'],
    thumbnail: SP.basketball,
    category: 'shorts', categoryLabel: 'Arm Sleeve',
    sports: ['Basketball'], teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  // ── VOLLEYBALL ───────────────────────────────────────────────

  {
    id: 'volleyball-kit',
    name: 'Volleyball Jersey + Shorts Set',
    price: 68, originalPrice: 90,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.volleyball),
    description: 'Tight-fit sublimated volleyball jersey and spandex shorts. Women\'s modest version (longer shorts + sleeved jersey) available.',
    features: ['Full Sublimation', 'Spandex Shorts Option', 'Modest Long-Short Version Available', 'Name, Number, Logo', 'Min 5 per team'],
    thumbnail: SP.volleyball,
    category: 'jersey', categoryLabel: 'Volleyball Kit',
    sports: ['Volleyball'], teamOrderMin: 5,
    badge: 'Full Kit', modest: true, customPrint: true,
  },

  {
    id: 'knee-pads',
    name: 'Volleyball Knee Pad Sleeves',
    price: 22, originalPrice: 30,
    sizes: ['S/M','L/XL'],
    colors: colorsFlat(SP.volleyball),
    description: 'Padded knee sleeve for volleyball. Custom team color. Essential bundled accessory for volleyball kits.',
    features: ['EVA Foam Padding', 'Breathable Fabric', 'Custom Color Available', 'Sold as Pair'],
    thumbnail: SP.volleyball,
    category: 'shorts', categoryLabel: 'Knee Pads',
    sports: ['Volleyball'], teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  // ── SWIMMING ─────────────────────────────────────────────────

  {
    id: 'swim-warmup-robe',
    name: 'Swim Team Warm-Up Robe / Parka',
    price: 78, originalPrice: 105,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.swimming),
    description: 'Ultra-absorbent microfiber parka for poolside warm-up. Essential team gear for swimming events. Custom team print available.',
    features: ['100% Microfiber', 'Ultra-Absorbent', 'Deep Pockets', 'Custom Team Logo & Name', 'Hooded Design'],
    thumbnail: SP.swimming,
    category: 'jacket', categoryLabel: 'Swim Parka',
    sports: ['Swimming'], teamOrderMin: 5,
    badge: 'Full Kit', customPrint: true,
  },

  {
    id: 'swim-cap',
    name: 'Team Branded Swim Cap',
    price: 15, originalPrice: 22,
    sizes: ['One Size'],
    colors: colorsFlat(SP.swimming),
    description: 'Silicone team swim cap with printed or embossed team logo. Water-resistant print that holds up in the pool.',
    features: ['100% Silicone', 'Water-Resistant Logo Print', 'Embossed Team Name Option', 'Fits Most Adults', 'Custom Color'],
    thumbnail: SP.swimming,
    category: 'hat', categoryLabel: 'Swim Cap',
    sports: ['Swimming'], teamOrderMin: 5,
    badge: 'Full Kit', customPrint: true,
  },

  // ── TRACK & FIELD ────────────────────────────────────────────

  {
    id: 'singlet-athletics',
    name: 'Athletics Sprint Singlet',
    price: 30, originalPrice: 42,
    sizes: ['XS','S','M','L','XL','2XL'],
    colors: colorsFlat(SP.track),
    description: 'Lightweight competition singlet for track & field, long-distance running, and athletics. Full sublimation with country flag and name.',
    features: ['100% Moisture-Wicking Polyester', 'Lightweight 3.5oz', 'Full Sublimation', 'Country Flag Option', 'Body-Mapped Ventilation'],
    thumbnail: SP.track,
    category: 'jersey', categoryLabel: 'Athletics Singlet',
    sports: ['Athletics','Track & Field','5K Run'], teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  {
    id: 'compression-suit',
    name: 'Full Compression Training Suit',
    price: 65, originalPrice: 88,
    sizes: ['XS','S','M','L','XL','2XL'],
    colors: colorsFlat(SP.track),
    description: 'Full-body compression suit for sprint events, cycling, and triathlon. UPF 50+, four-way stretch.',
    features: ['85% Polyester / 15% Spandex', 'Four-Way Stretch', 'UPF 50+', 'Aerodynamic Fit', 'Custom Print Ready'],
    thumbnail: SP.track,
    category: 'jersey', categoryLabel: 'Compression Suit',
    sports: ['Athletics','Cycling','Swimming'], teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  // ── FLAG FOOTBALL ────────────────────────────────────────────

  {
    id: 'flagfootball-jersey',
    name: 'Flag Football Jersey',
    price: 40, originalPrice: 55,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.flagfb),
    description: 'Durable flag football jersey with mesh ventilation panels. Full sublimation with team name, number, and logo.',
    features: ['100% Performance Polyester', 'Side Mesh Ventilation', 'Full Sublimation', 'Name, Number, Logo', 'Flag Belt Compatible Design'],
    thumbnail: SP.flagfb,
    category: 'jersey', categoryLabel: 'Flag Football Jersey',
    sports: ['Flag Football'], teamOrderMin: 7,
    badge: 'Flag Football', customPrint: true,
  },

  {
    id: 'flagfootball-shorts',
    name: 'Flag Football Shorts + Belt',
    price: 42, originalPrice: 56,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.flagfb),
    description: 'Wide-cut flag football shorts including flag belt loops. Matches jersey for complete team kit.',
    features: ['100% Polyester', 'Flag Belt Loops Built-In', 'Elastic Waist + Drawcord', 'Custom Color', 'Pairs with Jersey'],
    thumbnail: SP.flagfb,
    category: 'shorts', categoryLabel: 'FF Shorts & Belt',
    sports: ['Flag Football'], teamOrderMin: 7,
    badge: 'Pair with Jersey', customPrint: true,
  },

  // ── CRICKET ──────────────────────────────────────────────────

  {
    id: 'cricket-whites',
    name: 'Cricket Match Whites – Full Kit',
    price: 85, originalPrice: 115,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: [{ id: 'white', name: 'White', hex: '#FFFFFF', image: SP.cricket }],
    description: 'Traditional cricket whites — long-sleeve shirt and trouser set. Team logo and name embroidered or printed.',
    features: ['100% Poly-Cotton Blend', 'Traditional White', 'Long Sleeve Option', 'Team Name & Logo', 'Full Match Kit'],
    thumbnail: SP.cricket,
    category: 'jersey', categoryLabel: 'Cricket Whites',
    sports: ['Cricket'], teamOrderMin: 11,
    badge: 'Full Kit', customPrint: true,
  },

  {
    id: 'cricket-tee',
    name: 'Cricket Training Tee',
    price: 28, originalPrice: 38,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.cricket),
    description: 'Custom sublimated cricket training tee for practice and warm-ups. Available in team colors.',
    features: ['100% Moisture-Wicking Polyester', 'Full Sublimation', 'Custom Team Colors', 'Name & Number Optional'],
    thumbnail: SP.cricket,
    category: 'tshirt', categoryLabel: 'Cricket Tee',
    sports: ['Cricket'], teamOrderMin: 5,
    badge: 'Cricket', customPrint: true,
  },

  {
    id: 'cricket-cap',
    name: 'Cricket Team Cap',
    price: 24, originalPrice: 32,
    sizes: ['One Size'],
    colors: [
      { id: 'white', name: 'White', hex: '#FFFFFF', image: SP.cricket },
      { id: 'navy', name: 'Navy', hex: '#1B2A4A', image: SP.cricket },
    ],
    description: 'Classic cricket fielding cap with team logo embroidery. Adjustable strap. Available in white or navy.',
    features: ['100% Cotton', 'Team Logo Embroidery', 'Adjustable Strap', 'Moisture-Wicking Sweatband'],
    thumbnail: SP.cricket,
    category: 'hat', categoryLabel: 'Cricket Cap',
    sports: ['Cricket'], teamOrderMin: 1,
    badge: 'Cricket', customPrint: true,
  },

  // ── MARTIAL ARTS / COMBAT ────────────────────────────────────

  {
    id: 'rashguard',
    name: 'Martial Arts Compression Rashguard',
    price: 38, originalPrice: 52,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.martial),
    description: 'Long-sleeve compression rashguard for judo, wrestling, BJJ, and MMA. Full sublimation with team logo.',
    features: ['85% Polyester / 15% Spandex', 'Long Sleeve', 'Four-Way Stretch', 'Anti-Microbial Fabric', 'Full Custom Print'],
    thumbnail: SP.martial,
    category: 'jersey', categoryLabel: 'Rashguard',
    sports: ['Martial Arts','Wrestling','MMA'], teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  {
    id: 'fight-shorts',
    name: 'MMA / Grappling Fight Shorts',
    price: 42, originalPrice: 56,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.martial),
    description: 'Flexible fight shorts with split hem for maximum kick range. Custom team print available.',
    features: ['100% Polyester with Stretch Panels', 'Split Hem for Mobility', 'Hook-and-Loop + Drawcord', 'Full Sublimation', 'Custom Logo'],
    thumbnail: SP.martial,
    category: 'shorts', categoryLabel: 'Fight Shorts',
    sports: ['Martial Arts','MMA'], teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  // ── RACKET SPORTS ────────────────────────────────────────────

  {
    id: 'tennis-polo',
    name: 'Tennis Performance Polo',
    price: 38, originalPrice: 50,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.tennis),
    description: 'Breathable performance polo for tennis, badminton, and table tennis. Custom embroidered team logo.',
    features: ['100% Moisture-Wicking Polyester Pique', 'Stretch Fabric', 'UV Protection', 'Team Logo Option', 'Women\'s Cut Available'],
    thumbnail: SP.tennis,
    category: 'jersey', categoryLabel: 'Tennis Polo',
    sports: ['Tennis','Table Tennis','Badminton','Pickleball'], teamOrderMin: 1,
    badge: 'Individual OK', modest: true, customPrint: true,
  },

  {
    id: 'court-shorts',
    name: 'Court Shorts / Skort',
    price: 28, originalPrice: 38,
    sizes: ['XS','S','M','L','XL','2XL'],
    colors: colorsFlat(SP.tennis),
    description: 'Lightweight shorts for racket sports. Available as shorts (men\'s/women\'s) or as a skort for women\'s modest option.',
    features: ['100% Polyester', 'Built-In Liner (Skort Option)', 'Elastic Waist + Drawcord', 'Side Pockets', 'Custom Color'],
    thumbnail: SP.tennis,
    category: 'shorts', categoryLabel: 'Court Shorts',
    sports: ['Tennis','Badminton','Table Tennis'], teamOrderMin: 1,
    badge: 'Individual OK', modest: true, customPrint: true,
  },

  // ── WEIGHTLIFTING / FITNESS ───────────────────────────────────

  {
    id: 'weightlifting-singlet',
    name: 'Weightlifting Competition Singlet',
    price: 48, originalPrice: 65,
    sizes: ['XS','S','M','L','XL','2XL'],
    colors: colorsFlat(SP.weightlift),
    description: 'Regulation-style weightlifting singlet for competition. Meets standard federation requirements. Custom team print.',
    features: ['80% Nylon / 20% Spandex', 'IWF-Compliant Design', 'Four-Way Stretch', 'Team Name & Number', 'Custom Print'],
    thumbnail: SP.weightlift,
    category: 'jersey', categoryLabel: 'Lifting Singlet',
    sports: ['Weightlifting'], teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  // ── MODEST / ISLAMIC SPORTSWEAR ──────────────────────────────

  {
    id: 'sports-hijab',
    name: 'Performance Sports Hijab',
    price: 22, originalPrice: 30,
    sizes: ['One Size'],
    colors: colorsFlat(SP.modest),
    description: 'Lightweight, breathable sports hijab for Muslim women athletes. Secure fit, moisture-wicking, and available in all team colors. Custom team color matching available.',
    features: ['95% Polyester / 5% Spandex', 'Moisture-Wicking', 'Secure Non-Slip Design', 'Team Color Matching', 'AAOIFI Islamic Compliance Standard'],
    thumbnail: SP.modest,
    category: 'hat', categoryLabel: 'Sports Hijab',
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },

  {
    id: 'full-sleeve-jersey',
    name: "Women's Full-Sleeve Modest Jersey",
    price: 45, originalPrice: 62,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.modest),
    description: 'Full-sleeve jersey designed specifically for Muslim women athletes. Non-transparent, breathable, and fully customizable for your team.',
    features: ['100% Performance Polyester', 'Full Sleeve Coverage', 'Non-Transparent Fabric', 'Moisture-Wicking', 'Custom Name, Number, Logo'],
    thumbnail: SP.modest,
    category: 'jersey', categoryLabel: "Women's Modest Jersey",
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },

  {
    id: 'long-track-pants',
    name: "Women's Modest Track Pants",
    price: 40, originalPrice: 55,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.modest),
    description: 'Non-transparent, breathable full-length track pants for Muslim women athletes. Loose fit with elastic waist and side pockets.',
    features: ['100% Breathable Polyester', 'Non-Transparent', 'Loose Modest Fit', 'Elastic Waist + Drawcord', 'Side Pockets', 'Custom Color & Logo'],
    thumbnail: SP.modest,
    category: 'sweatpants', categoryLabel: "Women's Track Pants",
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },

  {
    id: 'burkini-swimsuit',
    name: "Women's Modest Swimsuit (Burkini Style)",
    price: 72, originalPrice: 95,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.swimming),
    description: 'Competition-grade modest swimsuit covering arms, legs, and hair. Lightweight, chlorine-resistant, and hydrodynamic. Custom team print available.',
    features: ['Chlorine-Resistant Lycra', 'Full Coverage (Arms, Legs, Head)', 'Hydrodynamic Fit', 'Fast-Drying', 'Custom Team Color & Logo'],
    thumbnail: SP.swimming,
    category: 'jersey', categoryLabel: 'Modest Swimsuit',
    sports: ['Swimming'], teamOrderMin: 1,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },

  {
    id: 'long-shorts-men',
    name: "Men's Longer-Length Modest Shorts",
    price: 30, originalPrice: 42,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.training),
    description: 'Longer-cut athletic shorts (knee-length) for Muslim men athletes. Non-tight, breathable, and suitable for all field sports.',
    features: ['100% Polyester', 'Knee-Length (10" Inseam)', 'Non-Tight Relaxed Fit', 'Elastic Waist + Drawcord', 'Side Pockets', 'Custom Color & Name'],
    thumbnail: SP.training,
    category: 'shorts', categoryLabel: "Men's Modest Shorts",
    sports: ['All Sports'], teamOrderMin: 1,
    badge: 'Modest Wear', modest: true, customPrint: true,
  },

  // ── OUTERWEAR ────────────────────────────────────────────────

  {
    id: 'tracksuit-elite',
    name: 'Elite Team Tracksuit (Jacket + Pants)',
    price: 110, originalPrice: 148,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.ceremony),
    description: 'Premium tracksuit set for opening/closing ceremonies, warm-ups, and team travel. The gold standard for delegation appearance.',
    features: ['Full Jacket + Pants Set', 'Custom Sublimation or Embroidery', 'Country Name, Flag, Logo', 'Opening Ceremony Grade', 'Team Bulk Pricing Available'],
    thumbnail: SP.ceremony,
    category: 'jacket', categoryLabel: 'Elite Tracksuit',
    sports: ['All Sports','Ceremony','Travel'], teamOrderMin: 5,
    badge: 'Ceremony Wear', customPrint: true,
  },

  {
    id: 'windbreaker',
    name: 'Team Windbreaker Jacket',
    price: 58, originalPrice: 78,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.training),
    description: 'Lightweight packable windbreaker for sideline, travel, and outdoor events. Custom team print on chest and back.',
    features: ['100% Nylon Shell', 'Packable Design', 'Full-Zip', 'Adjustable Hood', 'Custom Logo & Name'],
    thumbnail: SP.training,
    category: 'jacket', categoryLabel: 'Windbreaker',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },

  {
    id: 'training-jacket',
    name: 'Custom Training Jacket',
    price: 68, originalPrice: 90,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.training),
    description: 'Mid-weight training jacket with zip pockets and elastic cuffs. Great for warm-up and sideline wear.',
    features: ['Poly-Fleece Lining', 'Zip Pockets', 'Custom Print or Embroidery', 'Elastic Cuffs & Hem', 'Team Logo & Name'],
    thumbnail: SP.training,
    category: 'jacket', categoryLabel: 'Training Jacket',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },

  // ── ACCESSORIES ──────────────────────────────────────────────

  {
    id: 'snapback-cap',
    name: 'Custom Team Snapback Cap',
    price: 28, originalPrice: 38,
    sizes: ['One Size'],
    colors: colorsFlat(SP.cap),
    description: 'Structured 6-panel snapback cap with flat brim. Embroidered team logo on front panel. Available in all team colors.',
    features: ['6-Panel Structured Cap', 'Embroidered Front Logo', 'Flat Brim', 'Snapback Closure', 'All Colors Available'],
    thumbnail: SP.cap,
    category: 'hat', categoryLabel: 'Snapback Cap',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },

  {
    id: 'dad-hat',
    name: 'Custom Team Dad Hat',
    price: 22, originalPrice: 30,
    sizes: ['One Size'],
    colors: colorsFlat(SP.cap),
    description: 'Relaxed-fit dad hat with curved brim. Embroidered or printed team logo. Popular for staff, fans, and travel days.',
    features: ['Unstructured Low Profile', 'Curved Brim', 'Adjustable Velcro Strap', 'Embroidered Logo', 'All Colors'],
    thumbnail: SP.cap,
    category: 'hat', categoryLabel: 'Dad Hat',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },

  {
    id: 'team-socks',
    name: 'Custom Team Sport Socks',
    price: 12, originalPrice: 18,
    sizes: ['S/M','L/XL'],
    colors: colorsFlat(SP.training),
    description: 'Custom-colored sport crew socks with team logo on the ankle. Available in all team colors. Sold as pairs.',
    features: ['75% Cotton / 23% Nylon / 2% Spandex', 'Cushioned Sole', 'Team Color & Logo', 'Crew Length', 'Sold as Pairs'],
    thumbnail: SP.training,
    category: 'hat', categoryLabel: 'Sport Socks',
    sports: ['All Sports'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },

  {
    id: 'branded-towel',
    name: 'Custom Branded Team Towel',
    price: 18, originalPrice: 26,
    sizes: ['One Size'],
    colors: colorsFlat(SP.training),
    description: 'Soft microfiber towel with custom team logo and name printed across the body. Essential for swim, gym, and travel.',
    features: ['100% Microfiber', 'Custom Logo & Team Name', 'Fast-Drying', '30" x 60" Standard Size', 'Packable & Lightweight'],
    thumbnail: SP.training,
    category: 'hat', categoryLabel: 'Team Towel',
    sports: ['All Sports','Swimming'], teamOrderMin: 5,
    badge: 'All Sports', customPrint: true,
  },

  // ── CYCLING / 5K ─────────────────────────────────────────────

  {
    id: 'cycling-jersey',
    name: 'Custom Cycling Jersey',
    price: 55, originalPrice: 74,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.cycling),
    description: 'Aerodynamic short-sleeve cycling jersey with rear pockets. Full sublimation with team colors, flag, and name.',
    features: ['100% Performance Polyester', 'Rear 3-Pocket Design', 'Full Sublimation', 'YKK Zipper', 'Custom Team Name & Flag'],
    thumbnail: SP.cycling,
    category: 'jersey', categoryLabel: 'Cycling Jersey',
    sports: ['Cycling','5K Run for Sudan'], teamOrderMin: 1,
    badge: 'Individual OK', customPrint: true,
  },

  {
    id: 'warm-up-jacket-swim',
    name: 'Swim Team Zip Warm-Up Jacket',
    price: 62, originalPrice: 82,
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: colorsFlat(SP.swimming),
    description: 'Lightweight zip jacket for poolside warm-up. Pairs with swim parka for complete swim team kit.',
    features: ['100% Polyester', 'Full Zip', 'Thumb Holes', 'Custom Sublimation', 'Swim Team Name & Logo'],
    thumbnail: SP.swimming,
    category: 'jacket', categoryLabel: 'Swim Jacket',
    sports: ['Swimming'], teamOrderMin: 5,
    badge: 'Swimming', customPrint: true,
  },
];

// Backward-compat alias
export const productInfo = products[0];

// ── Helper exports used by ProductConfiguration ───────────────
export const ALL_SPORTS = [
  'All Sports','Basketball','Soccer','Volleyball','Swimming',
  'Athletics','Track & Field','Cricket','Flag Football','Tennis',
  'Table Tennis','Badminton','Pickleball','Martial Arts','Wrestling',
  'MMA','Weightlifting','Cycling','5K Run for Sudan','Ceremony','Travel','Gym',
];

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === 'all') return products;
  return products.filter(p => p.category === category);
}

export function getProductsBySport(sport: string): Product[] {
  if (!sport || sport === 'All Sports') return products;
  return products.filter(p => p.sports.includes(sport) || p.sports.includes('All Sports'));
}
