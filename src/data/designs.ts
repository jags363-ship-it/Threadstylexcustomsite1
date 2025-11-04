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
    id: 'ghost-ramen',
    name: 'Ghost Ramen',
    thumbnailSrc: '/WI-1.png',
    fullSrc: '/WI-1.png',
  },
  {
    id: 'ghost-skateboard',
    name: 'Skateboarding Ghost',
    thumbnailSrc: '/WI-2.png',
    fullSrc: '/WI-2.png',
  },
  {
    id: 'ghost-cauldron',
    name: 'Cauldron Ghost',
    thumbnailSrc: '/WI-3.png',
    fullSrc: '/WI-3.png',
  },
  {
    id: 'grim-reaper',
    name: 'Grim Reaper',
    thumbnailSrc: '/WI-4.png',
    fullSrc: '/WI-4.png',
  },
  {
    id: 'scarecrow',
    name: 'Spooky Scarecrow',
    thumbnailSrc: '/WI-5.png',
    fullSrc: '/WI-5.png',
  },
  {
    id: 'ghost-beanie',
    name: 'Beanie Ghost',
    thumbnailSrc: '/WI-6.png',
    fullSrc: '/WI-6.png',
  },
  {
    id: 'halloween-trio',
    name: 'Halloween Trio',
    thumbnailSrc: '/WI-7.png',
    fullSrc: '/WI-7.png',
  },
  {
    id: 'witch-ghost',
    name: 'Witch Ghost',
    thumbnailSrc: '/WI-8.png',
    fullSrc: '/WI-8.png',
  },
  {
    id: 'ghost-cat-pumpkin',
    name: 'Ghost & Cat',
    thumbnailSrc: '/WI-9.JPG',
    fullSrc: '/WI-9.JPG',
  },
  {
    id: 'pumpkin-baby',
    name: 'Pumpkin Baby',
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