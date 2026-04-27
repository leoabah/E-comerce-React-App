import React from 'react'

const LoggIn = () => {
  return (
    <div>
        <h1>Bienvenido </h1>
        <br/>
        <form action="">
            <input type="email" placeholder='Email'/>
            <input type="password" placeholder='Contraseña'/>
            <button  >Iniciar Sesion</button>
            <h4>
                ¿No tienes una cuenta? 
                <span>
                    <a href=''>Registrate</a>
                </span>
            </h4>
        </form>
    </div>
  )
}

export default LoggIn