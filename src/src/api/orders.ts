export interface Order {
  orderId: string;
  orderNumber: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  totalPrice: number;
  paymentStatus: string;
  orderStatus: string;
  email: string;
  createdAt: string;
}

export const getOrder = async (orderId: string): Promise<Order | null> => {
  try {
    // Get order from localStorage (demo)
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      const order = JSON.parse(lastOrder);
      if (order.orderId === orderId) {
        return order;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
};

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    // In production, this would fetch from your database
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      return [JSON.parse(lastOrder)];
    }
    return [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};