import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'

const LoggIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const provider = new GoogleAuthProvider()

  const validations = {
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Ingresa un email válido"
    },
    password: {
      regex: /^.{1,}$/,
      message: "La contraseña es requerida"
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!validateForm()) {
      return
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      console.log('Usuario iniciado:', userCredential.user)
      setSuccess(true)
      navigate('/')
    } catch (firebaseError) {
      console.error('Error al iniciar sesion', firebaseError.code, firebaseError.message)
      setError(firebaseError.message)
    }
  }

  const handleGoogleLogin = async () => {
    setError(null)
    setSuccess(false)

    try {
      const result = await signInWithPopup(auth, provider)
      console.log('Usuario iniciado con Google:', result.user)
      setSuccess(true)
      navigate('/')
    } catch (firebaseError) {
      console.error('Error al iniciar con Google', firebaseError.code, firebaseError.message)
      setError(firebaseError.message)
    }
  }

  return (
    <div>
      <h1>Bienvenido</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar Sesion</button>
      </form>
      <button type="button" onClick={handleGoogleLogin}>
        Iniciar con Google
      </button>
      {success && <p style={{ color: 'green' }}>Inicio exitoso</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <h4>
        ¿No tienes una cuenta?
        <span>
          <Link to="/registrase">Registrate</Link>
        </span>
      </h4>
    </div>
  )
}

export default LoggIn