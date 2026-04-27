import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch , FaShoppingCart } from 'react-icons/fa'
import logoHeader from "@/assets/logo.png" 


const Header = () => {
  return (
    <header className='header'>
        <nav className='nav-bar'>
            <div className='logo'>
                <img className='logo-img' src={logoHeader} alt="logo del comercio"/>
                <h3>Libreria<br/>Cosmica</h3>
            </div>
            <br/>
            <div className='linkSection'>
            <Link to="/">Home</Link>
            <Link to="/alta">Alta</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/nosotros">Nosotros</Link>
            </div>
            <div className='search'>
              <input className='inpHead'  type='text' placeholder='busxar prodcuto...'/>
              <button className='searchBtn'><FaSearch/></button>
            </div>
              <button className='cartWrapper'><FaShoppingCart/></button>
              <button className='inciar-btn'>Iniciar</button>
              <button className='registrarse-btn'>Registrarse</button>

              
        </nav>
    </header>
  )
}

export default Header