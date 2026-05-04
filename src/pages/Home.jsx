import { useContext} from 'react'
import { CartContext } from '../context/CartContext'

const Home = () => {
  const { addToCart } = useContext(CartContext);

  const productfake = {
    id: 1,
    name: 'Producto de prueba',
    price: 9.99,
    image: 'https://via.placeholder.com/150'
  };

  return (
    <div>
      <h2>Bienvenido a Librería Cósmica</h2>
      <button onClick={() => addToCart(productfake)}>Agregar al carrito</button>
    </div>
  );
};

export default Home