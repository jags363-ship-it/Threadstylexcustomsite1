// ─────────────────────────────────────────────────────────────
// PLACEMENTS — print locations mapped to real product IDs
// ─────────────────────────────────────────────────────────────

export interface Placement {
  key: string;
  label: string;
  addOn: number;
  maxW: number;
  maxH: number;
  description: string;
  allowedProducts: string[];
}

// All real product IDs from products.ts
const TOPS = [
  'dry-fit-ls-unisex', 'dry-fit-ls-women', 'dry-fit-ss',
  'ls-undershirt', 'cotton-ss-shirt',
  'ig-hoodie', 'ig-sweatshirt', 'ig-tshirt',
];

const JERSEYS = [
  'basketball-jersey-sleeveless',
  'soccer-jersey-unisex', 'soccer-jersey-women',
  'football-jersey',
  'softball-jersey-men', 'softball-jersey-women',
];

const BOTTOMS = [
  'athletic-shorts', 'athletic-joggers', 'athletic-leggings',
  'basketball-shorts-team', 'ig-sweatpants',
];

const ACCESSORIES = [
  'arm-sleeves', 'sports-hijab', 'sports-hijab-hat',
];

const ALL_PRINTABLE = [...TOPS, ...JERSEYS, ...BOTTOMS];

export const placements: Placement[] = [
  {
    key: 'FULL_FRONT',
    label: 'Full Front (12×16")',
    addOn: 9.00, maxW: 12, maxH: 16,
    description: 'Large print covering full front chest area',
    allowedProducts: [...TOPS, ...JERSEYS],
  },
  {
    key: 'CENTER_CHEST',
    label: 'Center Chest (8-10" wide)',
    addOn: 5.00, maxW: 10, maxH: 12,
    description: 'Medium centered chest print',
    allowedProducts: [...TOPS, ...JERSEYS],
  },
  {
    key: 'LEFT_CHEST',
    label: 'Left Chest Logo (4")',
    addOn: 3.00, maxW: 4.5, maxH: 4.5,
    description: 'Small left chest / heart area logo',
    allowedProducts: [...TOPS, ...JERSEYS],
  },
  {
    key: 'RIGHT_CHEST',
    label: 'Right Chest Logo (4")',
    addOn: 3.00, maxW: 4.5, maxH: 4.5,
    description: 'Small right chest area logo',
    allowedProducts: [...TOPS, ...JERSEYS],
  },
  {
    key: 'FULL_BACK',
    label: 'Full Back (12×16")',
    addOn: 9.00, maxW: 12, maxH: 16,
    description: 'Large print covering full back',
    allowedProducts: [...TOPS, ...JERSEYS],
  },
  {
    key: 'UPPER_BACK',
    label: 'Upper Back Name Bar (12×4")',
    addOn: 4.00, maxW: 12, maxH: 4,
    description: 'Player name bar across upper back',
    allowedProducts: [...TOPS, ...JERSEYS],
  },
  {
    key: 'PLAYER_NUMBER',
    label: 'Player Number — Back (8")',
    addOn: 4.00, maxW: 8, maxH: 10,
    description: 'Large player number on back',
    allowedProducts: [...JERSEYS],
  },
  {
    key: 'TEAM_NAME_FRONT',
    label: 'Team Name — Front (10")',
    addOn: 4.00, maxW: 10, maxH: 4,
    description: 'Team name across front chest',
    allowedProducts: [...JERSEYS, ...TOPS],
  },
  {
    key: 'SLEEVE_LEFT',
    label: 'Left Sleeve (≤3")',
    addOn: 2.50, maxW: 3, maxH: 3,
    description: 'Small print on left sleeve',
    allowedProducts: [...TOPS, ...JERSEYS],
  },
  {
    key: 'SLEEVE_RIGHT',
    label: 'Right Sleeve (≤3")',
    addOn: 2.50, maxW: 3, maxH: 3,
    description: 'Small print on right sleeve',
    allowedProducts: [...TOPS, ...JERSEYS],
  },
  {
    key: 'SLEEVE_LONG',
    label: 'Long Sleeve Vertical (≤14" tall)',
    addOn: 4.50, maxW: 3.5, maxH: 14,
    description: 'Vertical print running down full sleeve',
    allowedProducts: ['dry-fit-ls-unisex', 'dry-fit-ls-women', 'ls-undershirt', 'ig-hoodie', 'ig-sweatshirt'],
  },
  {
    key: 'NAPE',
    label: 'Back Collar / Nape (1-3")',
    addOn: 2.00, maxW: 3, maxH: 3,
    description: 'Small logo at back of neck',
    allowedProducts: ALL_PRINTABLE,
  },
  {
    key: 'RIGHT_LEG',
    label: 'Right Leg (12-14" tall)',
    addOn: 6.00, maxW: 4, maxH: 14,
    description: 'Vertical print down right leg',
    allowedProducts: BOTTOMS,
  },
  {
    key: 'LEFT_LEG',
    label: 'Left Leg (12-14" tall)',
    addOn: 6.00, maxW: 4, maxH: 14,
    description: 'Vertical print down left leg',
    allowedProducts: BOTTOMS,
  },
  {
    key: 'WAISTBAND',
    label: 'Waistband Logo (3")',
    addOn: 2.00, maxW: 3, maxH: 2,
    description: 'Small logo on waistband',
    allowedProducts: BOTTOMS,
  },
  {
    key: 'ARM_SLEEVE_LOGO',
    label: 'Arm Sleeve Logo (2")',
    addOn: 2.00, maxW: 2, maxH: 2,
    description: 'Team logo on arm sleeve',
    allowedProducts: ['arm-sleeves'],
  },
];

export function getPlacementsForProduct(productId: string): Placement[] {
  return placements.filter(p => p.allowedProducts.includes(productId));
}
