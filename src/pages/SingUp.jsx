import React, {useState} from 'react'
import { Link } from "react-router-dom"
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'  

const SingUp = () => {

   const [formData,setformData]= useState({
    fullName: "" ,
    email:"",
    password:""
   });

   const [error, setError]= useState(null)
   const [success, setSuccess]=useState(false)

   const handleChange = (e) =>{
    setformData({
      ...formData,[e.target.name]:e.target.value
    });
   };

   const handleSubmit =  async(e) =>{
     e.preventDefault();
     setError(null);
     setSuccess(false);

     try{
      const userCredentiale = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user= userCredentiale.user;

       await updateProfile(user , {
        displayName:formData.fullName
       });

      
      console.log("Usuario registrado con exito:", user);
      setSuccess(true);
      setformData({ fullName:"", email:"", password:"" });
      
      } catch(firebaseError){
        console.error("Error al registrar usuario", firebaseError.code, firebaseError.message);
        setError(firebaseError.message);
      }
     
   };
   
  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="fullName">Nombre Completo:</label>
            <input 
             type="text"
             id='fullName'
             name='fullName'
             value={formData.fullName}
             onChange={handleChange}
             required
            />
        </div>   
        <div>
            <label htmlFor="email">Email:</label>
            <input 
             type="text"
             id='email'
             name='email'
             value={formData.email}
             onChange={handleChange}
             required
            />
        </div> 
        <div>  
            <label htmlFor="password">Contraseña:</label>
            <input
             type='password'
             id='password'
             name='password'
             value={formData.password}
             onChange={handleChange}
             required
             />
        </div>
        <button type='sumbmit'>Crear cuenta</button>      
      </form>
      {success &&  <p style={{ color:"greed"}}>!Registo exitoso! Ya podes  Iniciar </p>}
      {error && <p tsyle={{color:"red"}}>Error:{error}</p>}
       <p>
        ¿Ya tienes cuenta? <Link to="/loggIn">Iniciar Sesion</Link>
       </p>
    </div>
  )
}

export default SingUp