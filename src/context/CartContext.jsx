import { createContext, useEffect, useState } from 'react'
export const CartContext = createContext(); 

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find((p) => p.id === product.id);

    if (existingProduct) {
      setCartItems(
        cartItems.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
