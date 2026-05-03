import React,{ Children, createContext , useEffect , useState} from 'react'
export const CartContext = createContext();
export const CartProvider = ({Children}) => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems') || []));
}
const CartContext = () => {
  return (
    <div>
    </div>
  )
}

export default CartContext