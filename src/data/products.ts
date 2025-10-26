export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  sizes: string[];
  colors: Array<{ 
    id: string; 
    name: string; 
    hex: string;
    image: string;
    backImage?: string;
  }>;
  description: string;
  features: string[];
  thumbnail: string;
}

export const products: Product[] = [
  {
    id: 'hoodie',
    name: 'Premium Unisex Hooded Sweatshirt',
    price: 55,
    originalPrice: 69.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: [
      { 
        id: 'black', 
        name: 'Black', 
        hex: '#000000',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/Front-Black-TSPH.png',
        backImage: 'https://threadstylez.com/wp-content/uploads/2023/11/Back-Black-TSPH.png'
      },
      { 
        id: 'white', 
        name: 'White', 
        hex: '#FFFFFF',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/Front-White-TSPH.png',
        backImage: 'https://threadstylez.com/wp-content/uploads/2023/11/Back-White-TSPH.png'
      },
      { 
        id: 'black-heather', 
        name: 'Black Heather', 
        hex: '#3d3d3d',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/Front-Black-Heather-TSPH.png',
        backImage: 'https://threadstylez.com/wp-content/uploads/2023/11/Back-Black-Heather-TSPH.png'
      },
      { 
        id: 'grey', 
        name: 'Heather Grey', 
        hex: '#9CA3AF',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/Front-Grey-TSPH.png',
        backImage: 'https://threadstylez.com/wp-content/uploads/2023/11/Back-Grey-TSPH.png'
      },
      { 
        id: 'red', 
        name: 'Red', 
        hex: '#DC2626',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/Front-Red-TSPH.png',
        backImage: 'https://threadstylez.com/wp-content/uploads/2023/11/Back-Red-TSPH.png'
      },
    ],
    description: 'Premium cotton-poly blend hoodie with advanced reactive dye for lasting color.',
    features: [
      '8.5 oz./yd² (US) 14.1 oz./L yd (CA) 65% Premium Cotton & 35% Polyester',
      'Designed in USA with TS First Next-Generation Fleece',
      'Advanced Reactive-Dyed for Longer Lasting Color',
      '3-Panel Hood with Drawcord',
      'Cuffed Sleeves and Hem',
      'Pouch Pocket',
      'Easy Tear-Away Label',
      '1 Piece Single Packed in Polybag'
    ],
    thumbnail: 'https://threadstylez.com/wp-content/uploads/2023/11/Front-Black-TSPH.png',
  },
  {
    id: 'sweatshirt',
    name: 'Premium Unisex Crewneck Sweatshirt',
    price: 35,
    originalPrice: 49.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
    colors: [
      { 
        id: 'black', 
        name: 'Black', 
        hex: '#000000',
        image: 'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Black-.jpg'
      },
      { 
        id: 'white', 
        name: 'White', 
        hex: '#FFFFFF',
        image: 'https://threadstylez.com/wp-content/uploads/2024/09/TSS-White-.jpg'
      },
      { 
        id: 'black-heather', 
        name: 'Black Heather', 
        hex: '#3d3d3d',
        image: 'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Heather-Black.jpg'
      },
      { 
        id: 'heather-gray', 
        name: 'Heather Gray', 
        hex: '#9CA3AF',
        image: 'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Grey-2.jpg'
      },
    ],
    description: 'Classic crewneck sweatshirt with premium fleece and cuffed hem.',
    features: [
      '8.5 oz./yd² (US) 14.1 oz./L yd (CA) 65% Premium Ring-spun Cotton & 35% Polyester',
      'Designed in USA with TS Next-Generation Fleece',
      'Advanced Reactive-Dyed for Longer Lasting Color',
      'New Free Cuffed hem',
      'Easy Tear-Away Label',
      'Wholesale Sweatshirts',
      'Single Piece Pack in a Polybag'
    ],
    thumbnail: 'https://threadstylez.com/wp-content/uploads/2024/09/TSS-Black-.jpg',
  },
  {
    id: 'sweatpants',
    name: 'Premium Unisex Sweatpants',
    price: 40,
    originalPrice: 55,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: [
      { 
        id: 'black', 
        name: 'Black', 
        hex: '#000000',
        image: 'https://threadstylez.com/wp-content/uploads/2023/12/Main-Front.png'
      },
      { 
        id: 'white', 
        name: 'White', 
        hex: '#FFFFFF',
        image: 'https://threadstylez.com/wp-content/uploads/2023/12/WHITE.png'
      },
      { 
        id: 'black-heather', 
        name: 'Black Heather', 
        hex: '#3d3d3d',
        image: 'https://threadstylez.com/wp-content/uploads/2023/12/BH-Heather.png'
      },
      { 
        id: 'heather-gray', 
        name: 'Heather Gray', 
        hex: '#9CA3AF',
        image: 'https://threadstylez.com/wp-content/uploads/2023/12/Heather-Grey.png'
      },
      { 
        id: 'red', 
        name: 'Red', 
        hex: '#DC2626',
        image: 'https://threadstylez.com/wp-content/uploads/2023/12/Red.png'
      },
    ],
    description: 'Premium fleece sweatpants with elastic waistband and side pockets.',
    features: [
      '8.5 oz./yd² (US) 14.1 oz./L yd (CA) 65% Premium Ring-spun Cotton & 35% Polyester',
      'Designed in USA with TS Next-Generation Fleece',
      'Advanced Reactive-Dyed for Longer Lasting Color',
      'Elastic waistband with drawcord',
      'Side and Back Right Pockets',
      'New Free Cuffed hem',
      'Easy Tear-Away Label'
    ],
    thumbnail: 'https://threadstylez.com/wp-content/uploads/2023/12/Main-Front.png',
  },
  {
    id: 'tshirt-essential',
    name: 'Premium Essential T-Shirt',
    price: 8,
    originalPrice: 12.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: [
      { 
        id: 'black', 
        name: 'Black', 
        hex: '#000000',
        image: 'https://threadstylez.com/wp-content/uploads/2024/08/TST-Black.jpg',
        backImage: 'https://threadstylez.com/wp-content/uploads/2024/08/TST-Black-Back.jpg'
      },
      { 
        id: 'white', 
        name: 'White', 
        hex: '#FFFFFF',
        image: 'https://threadstylez.com/wp-content/uploads/2024/08/TST-White.jpg',
        backImage: 'https://threadstylez.com/wp-content/uploads/2024/08/TST-White-Back.jpg'
      },
    ],
    description: 'Lightweight essential tee with cotton-poly blend for everyday comfort.',
    features: [
      '5 oz./yd², pre-shrunk 55% cotton 45% polyester',
      'Double-needle stitched lay flat collar, sleeves, and bottom hem',
      'Heat Label',
      'Single Pack in Polybag'
    ],
    thumbnail: 'https://threadstylez.com/wp-content/uploads/2024/08/TST-Black.jpg',
  },
  {
    id: 'tshirt-heavy',
    name: 'Premium Adult Heavy T-Shirt',
    price: 15.99,
    originalPrice: 22.99,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: [
      { 
        id: 'black', 
        name: 'Black', 
        hex: '#000000',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/TSCT-Side.jpg'
      },
      { 
        id: 'white', 
        name: 'White', 
        hex: '#FFFFFF',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/TSCT-White-Main.jpg'
      },
      { 
        id: 'ash-grey', 
        name: 'Ash Grey', 
        hex: '#D1D5DB',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/Ash-2-1.jpg'
      },
      { 
        id: 'charcoal', 
        name: 'Charcoal', 
        hex: '#3d3d3d',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/cHARCOAL-2-1.jpg'
      },
      { 
        id: 'dark-chocolate', 
        name: 'Dark Chocolate', 
        hex: '#4B2E20',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/Dark-Choco-2.jpg'
      },
      { 
        id: 'navy', 
        name: 'Navy', 
        hex: '#1e3a8a',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/NAvy-2-1.jpg'
      },
      { 
        id: 'orange', 
        name: 'Orange', 
        hex: '#ea580c',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/Orange-2-1.jpg'
      },
      { 
        id: 'oxford', 
        name: 'Oxford', 
        hex: '#6B7280',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/Oxford-2.jpg'
      },
      { 
        id: 'red', 
        name: 'Red', 
        hex: '#DC2626',
        image: 'https://threadstylez.com/wp-content/uploads/2023/11/Red-3-1.jpg'
      },
    ],
    description: 'Heavy-weight premium t-shirt with superior durability and comfort.',
    features: [
      '6 oz./yd², pre-shrunk 65% premium cotton 35% polyester',
      'Double-needle stitched lay flat collar, sleeves, and bottom hem',
      'Easy Tear-Away T-Shirt',
      'Single Piece Pack in a Polybag'
    ],
    thumbnail: 'https://threadstylez.com/wp-content/uploads/2023/11/TSCT-Side.jpg',
  },
];

// For backwards compatibility
export const productInfo = products[0];