export interface Placement {
  key: string;
  label: string;
  addOn: number;
  maxW: number;
  maxH: number;
  description: string;
  allowedProducts: string[]; // product IDs that support this placement
}

export const placements: Placement[] = [
  {
    key: 'FULL_FRONT',
    label: 'Full Front (12×16")',
    addOn: 9.00,
    maxW: 12,
    maxH: 16,
    description: 'Large print covering front chest area',
    allowedProducts: ['hoodie', 'sweatshirt', 'tshirt-essential', 'tshirt-heavy'],
  },
  {
    key: 'CENTER_CHEST',
    label: 'Center Chest (8-10" wide)',
    addOn: 5.00,
    maxW: 10,
    maxH: 12,
    description: 'Medium centered chest print',
    allowedProducts: ['hoodie', 'sweatshirt', 'tshirt-essential', 'tshirt-heavy'],
  },
  {
    key: 'LEFT_CHEST',
    label: 'Left Chest (4-4.5")',
    addOn: 3.00,
    maxW: 4.5,
    maxH: 4.5,
    description: 'Small left chest/heart area print',
    allowedProducts: ['hoodie', 'sweatshirt', 'tshirt-essential', 'tshirt-heavy'],
  },
  {
    key: 'RIGHT_CHEST',
    label: 'Right Chest (4-4.5")',
    addOn: 3.00,
    maxW: 4.5,
    maxH: 4.5,
    description: 'Small right chest area print',
    allowedProducts: ['hoodie', 'sweatshirt', 'tshirt-essential', 'tshirt-heavy'],
  },
  {
    key: 'POCKET',
    label: 'Pocket Print (3×3")',
    addOn: 2.00,
    maxW: 3,
    maxH: 3,
    description: 'Small pocket area print',
    allowedProducts: ['tshirt-essential', 'tshirt-heavy'], // No pocket on hoodies/sweatshirts
  },
  {
    key: 'FULL_BACK',
    label: 'Full Back (12×16")',
    addOn: 9.00,
    maxW: 12,
    maxH: 16,
    description: 'Large print covering back',
    allowedProducts: ['hoodie', 'sweatshirt', 'tshirt-essential', 'tshirt-heavy'],
  },
  {
    key: 'UPPER_BACK',
    label: 'Upper Back Name Bar (12×4")',
    addOn: 4.00,
    maxW: 12,
    maxH: 4,
    description: 'Name bar across upper back',
    allowedProducts: ['hoodie', 'sweatshirt', 'tshirt-essential', 'tshirt-heavy'],
  },
  {
    key: 'NAPE',
    label: 'Nape/Back Collar (1-3")',
    addOn: 2.00,
    maxW: 3,
    maxH: 3,
    description: 'Small print at back of neck',
    allowedProducts: ['hoodie', 'sweatshirt', 'tshirt-essential', 'tshirt-heavy'],
  },
  {
    key: 'SLEEVE_SHORT',
    label: 'Short Sleeve (≤3")',
    addOn: 2.50,
    maxW: 3,
    maxH: 3,
    description: 'Small print on sleeve',
    allowedProducts: ['tshirt-essential', 'tshirt-heavy'],
  },
  {
    key: 'SLEEVE_LONG',
    label: 'Long Sleeve Vertical (≤14" tall)',
    addOn: 4.50,
    maxW: 3.5,
    maxH: 14,
    description: 'Vertical print down sleeve',
    allowedProducts: ['hoodie', 'sweatshirt'],
  },
  {
    key: 'HOODIE_FRONT',
    label: 'Hoodie Front (10-13" sq)',
    addOn: 6.00,
    maxW: 13,
    maxH: 13,
    description: 'Square print on hoodie front',
    allowedProducts: ['hoodie'],
  },
  {
    key: 'RIGHT_LEG',
    label: 'Right Leg Front (12-14" tall)',
    addOn: 6.00,
    maxW: 4,
    maxH: 14,
    description: 'Vertical print down right leg',
    allowedProducts: ['sweatpants'],
  },
  {
    key: 'LEFT_LEG',
    label: 'Left Leg Front (12-14" tall)',
    addOn: 6.00,
    maxW: 4,
    maxH: 14,
    description: 'Vertical print down left leg',
    allowedProducts: ['sweatpants'],
  },
  {
    key: 'RIGHT_KNEE',
    label: 'Right Knee (3-4")',
    addOn: 2.50,
    maxW: 4,
    maxH: 4,
    description: 'Small print on right knee',
    allowedProducts: ['sweatpants'],
  },
  {
    key: 'LEFT_KNEE',
    label: 'Left Knee (3-4")',
    addOn: 2.50,
    maxW: 4,
    maxH: 4,
    description: 'Small print on left knee',
    allowedProducts: ['sweatpants'],
  },
  {
    key: 'BOTH_KNEES',
    label: 'Both Knees (3-4" each)',
    addOn: 4.00,
    maxW: 4,
    maxH: 4,
    description: 'Small print on both knees',
    allowedProducts: ['sweatpants'],
  },
];

export function getPlacementsForProduct(productId: string): Placement[] {
  return placements.filter(p => p.allowedProducts.includes(productId));
}