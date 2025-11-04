export interface Design {
  id: string;
  name: string;
  thumbnailSrc: string;
  fullSrc: string;
  isBlank?: boolean;
}

export const designs: Design[] = [
  {
    id: 'blank',
    name: 'No Design (Blank)',
    thumbnailSrc: '/blank-placeholder.svg',
    fullSrc: '/blank-placeholder.svg',
    isBlank: true,
  },
  {
    id: 'Winter Cocoa Snowman',
    name: 'Winter Cocoa Snowman',
    thumbnailSrc: '/WI-1.png',
    fullSrc: '/WI-1.png',
  },
  {
    id: 'Nordic Reindeer Emblem',
    name: 'Nordic Reindeer Emblem',
    thumbnailSrc: '/WI-2.png',
    fullSrc: '/WI-2.png',
  },
  {
    id: 'Candy Skate Fun',
    name: 'Cauldron Ghost',
    thumbnailSrc: '/WI-3.png',
    fullSrc: '/WI-3.png',
  },
  {
    id: 'Rustic Holiday Retreat',
    name: 'Rustic Holiday Retreat',
    thumbnailSrc: '/WI-4.png',
    fullSrc: '/WI-4.png',
  },
  {
    id: 'Golden Hanukkah Lights',
    name: 'Golden Hanukkah Lights',
    thumbnailSrc: '/WI-5.png',
    fullSrc: '/WI-5.png',
  },
  {
    id: 'Festive Kitty Peek',
    name: 'Festive Kitty Peek',
    thumbnailSrc: '/WI-6.png',
    fullSrc: '/WI-6.png',
  },
  {
    id: 'Modern Kwanzaa Icon',
    name: 'Modern Kwanzaa Icon',
    thumbnailSrc: '/WI-7.png',
    fullSrc: '/WI-7.png',
  },
  {
    id: 'Mountain Lens View',
    name: 'Mountain Lens View',
    thumbnailSrc: '/WI-8.png',
    fullSrc: '/WI-8.png',
  },
  {
    id: 'Cozy Bear Mug',
    name: 'Cozy Bear Mug',
    thumbnailSrc: '/WI-9.JPG',
    fullSrc: '/WI-9.JPG',
  },
  {
    id: 'City Fireworks Toast',
    name: 'City Fireworks Toast',
    thumbnailSrc: '/WI-10.JPG',
    fullSrc: '/WI-10.JPG',
  },
  {
    id: 'ghost-pumpkin-latte',
    name: 'Pumpkin Spice Ghost',
    thumbnailSrc: '/STYLE__1.JPG',
    fullSrc: '/STYLE__1.JPG',
  },
];