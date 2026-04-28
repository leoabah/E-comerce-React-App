import { Routes, Route } from 'react-router-dom'
import Home from "../pages/Home"
import Alta from "../pages/Alta"
import Contacto from '../pages/Contacto'
import Nosotros from '../pages/Nosotros'
import SingUp from '../pages/SingUp'
import LoggIn from '../pages/LoggIn'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/alta" element={<Alta />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/iniciar" element={<LoggIn />} />
      <Route path="/registrase" element={<SingUp />} />
    </Routes>
  )
}

export default AppRouter