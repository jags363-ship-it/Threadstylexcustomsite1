import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  size: string;
  color: string;
  quantity: number;
  designType: 'gallery' | 'custom' | 'blank';
  designId?: string;
  designName?: string;
  customDesignFile?: File;
  placements: Array<{
    key: string;
    label: string;
    price: number;
  }>;
  basePrice: number;
  placementPrice: number;
  itemTotal: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartShipping: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('threadstylezCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('threadstylezCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart([...cart, { ...item, id: `cart_${Date.now()}_${Math.random()}` }]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateCartItem = (id: string, updates: Partial<CartItem>) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('threadstylezCart');
  };

  const cartCount = cart.length;
  
  const cartSubtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  
  const SHIPPING_THRESHOLD = 35;
  const SHIPPING_FEE = 7.99;
  const cartShipping = cartSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  
  const cartTotal = cartSubtotal + cartShipping;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        cartCount,
        cartSubtotal,
        cartShipping,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};