import React, {useState} from 'react'

const SingUp = () => {

  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [completeName, setCompletName]= useState("")

  const handleSingUp = (e) => {
    e.preventDefault();
    // Handle signup logic here, e.g., validate and submit data
    console.log('Signup data:', { email, password, completeName });
  };

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
        type="email"
        placeholder='Email'
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
        <input
        type="password"
        placeholder='Contraseña'
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        />
        <button  >Registrarse</button>
      </form>
    </div>
  )
}

export default SingUp