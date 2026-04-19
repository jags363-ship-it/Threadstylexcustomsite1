import axios from 'axios';

const PRINTFUL_API_KEY = import.meta.env.VITE_PRINTFUL_API_KEY || '';
const PRINTFUL_API_URL = 'https://api.printful.com';

const printfulClient = axios.create({
  baseURL: PRINTFUL_API_URL,
  headers: {
    'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Product mapping (Printful product IDs)
const PRODUCT_MAPPING: Record<string, number> = {
  'hoodie': 146, // Unisex Premium Hoodie
  'sweatshirt': 168, // Unisex Premium Crewneck Sweatshirt
  'sweatpants': 382, // Unisex Premium Sweatpants
  'tshirt-essential': 71, // Unisex Jersey Short Sleeve Tee
  'tshirt-heavy': 19, // Unisex Heavy Cotton Tee
};

// Size mapping
const SIZE_MAPPING: Record<string, string> = {
  'XS': 'XS',
  'S': 'S',
  'M': 'M',
  'L': 'L',
  'XL': 'XL',
  '2XL': '2XL',
  '3XL': '3XL',
  '4XL': '4XL',
  '5XL': '5XL',
};

// Color mapping (Printful color codes)
const COLOR_MAPPING: Record<string, string> = {
  'black': 'Black',
  'white': 'White',
  'heather-gray': 'Heather Grey',
  'black-heather': 'Black Heather',
  'grey': 'Sport Grey',
  'red': 'Red',
  'navy': 'Navy',
  'ash-grey': 'Ash',
  'charcoal': 'Charcoal',
  'dark-chocolate': 'Dark Chocolate',
  'orange': 'Orange',
  'oxford': 'Oxford',
};

export interface PrintfulOrderData {
  productId: string;
  size: string;
  color: string;
  quantity: number;
  designUrl: string; // URL to uploaded design file
  placements: Array<{
    position: string; // 'front', 'back', 'left_sleeve', 'right_sleeve'
    imageUrl: string;
  }>;
  shippingAddress: {
    name: string;
    address1: string;
    address2?: string;
    city: string;
    state_code: string;
    country_code: string;
    zip: string;
    phone?: string;
    email: string;
  };
  recipientEmail: string;
}

// Upload design file to Printful
export const uploadDesignFile = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'default');

    const response = await printfulClient.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.result.url;
  } catch (error: any) {
    console.error('Printful file upload error:', error.response?.data || error);
    throw new Error('Failed to upload design to Printful');
  }
};

// Create Printful order
export const createPrintfulOrder = async (orderData: PrintfulOrderData) => {
  try {
    const printfulProductId = PRODUCT_MAPPING[orderData.productId];
    void 0; // was printfulSize
  // const _printfulSize = SIZE_MAPPING[orderData.size];
    void 0; // was printfulColor
  // const _printfulColor = COLOR_MAPPING[orderData.color];

    if (!printfulProductId) {
      throw new Error(`Product not mapped: ${orderData.productId}`);
    }

    // Build files array for print placements
    const files = orderData.placements.map((placement) => ({
      url: placement.imageUrl,
      type: placement.position === 'front' ? 'default' : placement.position,
    }));

    const printfulOrder = {
      recipient: {
        name: orderData.shippingAddress.name,
        address1: orderData.shippingAddress.address1,
        address2: orderData.shippingAddress.address2,
        city: orderData.shippingAddress.city,
        state_code: orderData.shippingAddress.state_code,
        country_code: orderData.shippingAddress.country_code,
        zip: orderData.shippingAddress.zip,
        phone: orderData.shippingAddress.phone,
        email: orderData.recipientEmail,
      },
      items: [
        {
          sync_variant_id: null,
          external_variant_id: null,
          variant_id: printfulProductId,
          quantity: orderData.quantity,
          name: `Custom ${orderData.productId}`,
          retail_price: '0.00', // Set your retail price
          files: files,
          options: [
            {
              id: 'embroidery_type',
              value: 'flat',
            },
          ],
        },
      ],
      retail_costs: {
        currency: 'USD',
        subtotal: '0.00',
        discount: '0.00',
        shipping: '0.00',
        tax: '0.00',
        total: '0.00',
      },
    };

    const response = await printfulClient.post('/orders', printfulOrder);

    return {
      success: true,
      printfulOrderId: response.data.result.id,
      status: response.data.result.status,
    };
  } catch (error: any) {
    console.error('Printful order creation error:', error.response?.data || error);
    throw new Error('Failed to create Printful order');
  }
};

// Get order status from Printful
export const getPrintfulOrderStatus = async (printfulOrderId: number) => {
  try {
    const response = await printfulClient.get(`/orders/${printfulOrderId}`);
    
    return {
      status: response.data.result.status,
      shipments: response.data.result.shipments || [],
      tracking: response.data.result.shipments?.[0]?.tracking_number || null,
      trackingUrl: response.data.result.shipments?.[0]?.tracking_url || null,
    };
  } catch (error: any) {
    console.error('Printful order status error:', error.response?.data || error);
    throw new Error('Failed to get order status');
  }
};

// Estimate shipping costs
export const estimateShipping = async (
  productId: string,
  quantity: number,
  countryCode: string
) => {
  try {
    const printfulProductId = PRODUCT_MAPPING[productId];

    const response = await printfulClient.post('/shipping/rates', {
      recipient: {
        country_code: countryCode,
      },
      items: [
        {
          variant_id: printfulProductId,
          quantity: quantity,
        },
      ],
    });

    return response.data.result;
  } catch (error: any) {
    console.error('Printful shipping estimate error:', error.response?.data || error);
    return null;
  }
};

// Get product variants (sizes, colors available)
export const getProductVariants = async (productId: string) => {
  try {
    const printfulProductId = PRODUCT_MAPPING[productId];
    const response = await printfulClient.get(`/products/${printfulProductId}`);
    
    return response.data.result.variants;
  } catch (error: any) {
    console.error('Printful product variants error:', error.response?.data || error);
    return [];
  }
};