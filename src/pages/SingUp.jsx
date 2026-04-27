import React, {useState} from 'react'

const SingUp = () => {

  const [email, setEmail]= useState("") 
  const [password, setPassword]= useState("")
  const [completeName, setCompletName]= useState("")

  return (
    <div>
      <h1>Bienvenido </h1>
      <br/>
      <form onSubmit={handleSingUp}>
        <input 
        type="text"
        placeholder='Nombre Completo'
        value={completeName}
        onChange={(e)=> setCompletName(e.target.value)}
        />
        <input 
        type="email" placeholder='Email'/>
        <input 
        type="password" placeholder='Contraseña'/>
        <button  >Registrarse</button>
      </form>
    </div>
  )
}

export default SingUp