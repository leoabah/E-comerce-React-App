import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'  

const SingUp = () => {
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider()

   const [formData,setFormData]= useState({
    fullName: "" ,
    email:"",
    password:""
   });

   const [error, setError]= useState(null)
   const [success, setSuccess]=useState(false)

   const validations = {
    fullName: {
      regex: /^[a-zA-Z\s]+$/,
      message: "El nombre solo puede contener letras y espacios"
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Ingresa un email válido"
    },
    password: {
      regex: /^.{6,}$/,
      message: "La contraseña debe tener al menos 6 caracteres"
    }
   }

   const validateForm = () => {
    const fields = Object.keys(validations)
    let isValid = true
    
    fields.forEach(field => {
      const value = formData[field]
      const validation = validations[field]
      
      if (!validation.regex.test(value)) {
        setError(validation.message)
        isValid = false
        return
      }
    })
    
    return isValid
   }

   const handleChange = (e) =>{
    setFormData({
      ...formData,[e.target.name]:e.target.value
    });
   };

   const handleSubmit =  async(e) =>{
     e.preventDefault();
     setError(null);
     setSuccess(false);

     if (!validateForm()) {
       return
     }

     try{
      const userCredentiale = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user= userCredentiale.user;

       await updateProfile(user, {
        displayName: formData.fullName
      })

      console.log("Usuario registrado con exito:", user)
      setSuccess(true)
      setFormData({ fullName:"", email:"", password:"" })
      navigate('/')
      
      } catch(firebaseError){
        console.error("Error al registrar usuario", firebaseError.code, firebaseError.message)
        setError(firebaseError.message)
      }
     
   };

   const handleGoogleSignUp = async () => {
    setError(null)
    setSuccess(false)

    try {
      const result = await signInWithPopup(auth, provider)
      console.log("Usuario registrado con Google:", result.user)
      setSuccess(true)
      setFormData({ fullName: "", email: "", password: "" })
      navigate('/')
    } catch (firebaseError) {
      console.error("Error al registrar usuario con Google", firebaseError.code, firebaseError.message)
      setError(firebaseError.message)
    }
   }
   
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
        <button type='submit'>Crear cuenta</button>
      </form>
      <button type='button' onClick={handleGoogleSignUp}>Registrarse con Google</button>
      {success &&  <p style={{ color:"green"}}>Registro exitoso! Ya podes iniciar sesion</p>}
      {error && <p style={{color:"red"}}>Error: {error}</p>}
       <p>
        ¿Ya tienes cuenta? <Link to="/iniciar">Iniciar Sesion</Link>
       </p>
    </div>
  )
}

export default SingUp