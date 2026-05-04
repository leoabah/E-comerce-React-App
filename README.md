# Proyecto E-commerce React

Documentación del proyecto desde la configuración inicial hasta la integración de componentes.

## 1. Inicialización del proyecto

El proyecto se creó usando React + Vite y se configuró con soporte para Sass, ESLint y React Router.

- Archivo principal: `package.json`
- Herramientas usadas: `vite`, `react`, `react-dom`, `react-router-dom`, `sass`, `firebase`, `react-icons`
- Scripts disponibles:
  - `npm run dev` para desarrollo
  - `npm run build` para producción
  - `npm run preview` para previsualizar la versión build
  - `npm run lint` para revisar el código con ESLint

Ejemplo de la configuración básica:

```json
{
  "name": "ecomerce-react",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

Imagen de ejemplo del proyecto en esta etapa:

![Logo y estilo inicial](./src/assets/logo.png)

## 2. Configuración de Firebase y autenticación

Se integró Firebase para manejar autenticación de usuarios.

- Archivo principal: `src/firebaseConfig.js`
- Servicios usados:
  - `initializeApp`
  - `getAuth`
  - `getAnalytics`

Firebase se inicializa una sola vez y se exporta `auth` para usarlo en el resto de la aplicación.

Ejemplo de código:

```js
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBMUGnZG7u7M0IukRux7occUsThPZpHjeU",
  authDomain: "ecrapp807fd.firebaseapp.com",
  projectId: "ecrapp807fd",
  storageBucket: "ecrapp807fd.firebasestorage.app",
  messagingSenderId: "1036836896807",
  appId: "1:1036836896807:web:010541a89aa5270d374e02",
  measurementId: "G-ZHWKGR8H5Q"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const auth = getAuth(app)
export const analytics = getAnalytics(app)
```

Imagen de ejemplo desde el proyecto:

![Sección de productos](./src/assets/Banner1.png)

## 3. Creación de rutas y páginas

Se definió la navegación principal con React Router y las páginas base que forman el flujo de la aplicación.

- Archivo de rutas: `src/routes/AppRouter.jsx`
- Páginas implementadas:
  - `Home`
  - `Alta`
  - `Contacto`
  - `Nosotros`
  - `LoggIn`
  - `SingUp`

Ejemplo de código de rutas:

```jsx
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
```

Imagen de ejemplo desde el proyecto:

![Estante de productos](./src/assets/Lc_estante.png)

## 4. Desarrollo de componentes principales

Se creó el componente de cabecera (`Header`) con navegación, búsqueda, carrito y botones de autenticación.

- Archivo: `src/components/Header/Header.jsx`
- Características:
  - Logo y nombre del comercio
  - Enlaces a rutas principales
  - Input de búsqueda
  - Botón de carrito
  - Autenticación condicional (Iniciar / Registrarse / Perfil / Cerrar sesión)

Ejemplo de código del Header:

```jsx
import { Link } from 'react-router-dom'
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { useAuth } from '../../hooks/useAuth'
import logoHeader from "@/assets/logo.png"

const Header = () => {
  const { user } = useAuth()
  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error al cerrar sesion", error.message)
    }
  }

  const firstName = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "Usuario"

  return (
    <header className='header'>
      ...
    </header>
  )
}

export default Header
```

Imagen de ejemplo desde el proyecto:

![Frente de tienda](./src/assets/Lc_frente_ de_tienda.png)

## 5. Integración de contexto de autenticación y renderizado

La aplicación usa un proveedor de contexto de autenticación para compartir el estado del usuario.

- Archivos:
  - `src/context/AuthContext.jsx`
  - `src/context/AuthContextValue.js`
  - `src/hooks/useAuth.js`
  - `src/main.jsx`

Descripción de integración:

- `AuthContext` define el contexto global de auth.
- `AuthProvider` utiliza `onAuthStateChanged` para detectar el estado de sesión.
- `useAuth` facilita el acceso al usuario en componentes.
- `main.jsx` envuelve la aplicación con `BrowserRouter` y `AuthProvider`.

Ejemplo de integración:

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
```

Imagen de ejemplo desde el proyecto:

![Caja de ventas](./src/assets/Lc_caja.png)

## 6. Páginas de autenticación

Se desarrollaron formularios de inicio de sesión y registro con validaciones básicas.

- `src/pages/LoggIn.jsx`: inicio con email/contraseña y Google
- `src/pages/SingUp.jsx`: registro con nombre completo, email, contraseña y Google

Ambos componentes usan validaciones de formato y muestran mensajes de éxito o error.

Ejemplo de validación:

```js
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
```

Imagen de ejemplo desde el proyecto:

![Hero del producto](./src/assets/hero.png)

## 7. Estado actual y próximos pasos

Estado actual:

- Autenticación de usuarios funcionando con Firebase
- Navegación entre rutas principales
- Header con controles de usuario y búsqueda
- Páginas base implementadas
- Contexto `AuthContext` integrado

Cambio realizado:

- Se actualizó `README.md` para documentar el proyecto real en lugar de la plantilla inicial.
- Se corrigió `src/context/CartContext.jsx` para que el proveedor de contexto use `children` correctamente y la etiqueta JSX sea válida.
- Se eliminó una importación incorrecta de `firebase/firestore/pipelines` y se corrigió la lógica de `addToCart`.

Qué se hizo hoy y cómo funciona:

- Se reparó `CartContext.jsx`, que es el archivo que comparte el estado del carrito entre componentes.
- En React, los componentes que envuelven otros componentes reciben su contenido con la propiedad `children`; el código anterior usaba `{Children}` con mayúscula, por lo que el contenido no se pintaba.
- También había una etiqueta mal escrita `< CartContext.Provider>`; React esperaba `<CartContext.Provider>` sin espacios antes del nombre.
- Después de estas correcciones, el proveedor de contexto puede entregar `cartItems` y `addToCart` a cualquier componente que use `useContext(CartContext)`.
- El botón en `Home.jsx` que invoca `addToCart(productfake)` ahora funciona correctamente porque el contexto existe y está disponible.

Cómo entenderlo para estudiar:

- Piensa en `CartProvider` como una caja que guarda los datos del carrito y los comparte con la app.
- `useState` mantiene `cartItems` en memoria y `useEffect` guarda esos datos en `localStorage` cada vez que cambian.
- `addToCart` recibe un producto y lo agrega al estado; si ya existe, aumenta su cantidad en lugar de duplicarlo.
- Si el proveedor no está bien definido, los componentes hijos no pueden leer el carrito y la app puede no mostrar nada.

Próximas mejoras sugeridas:

1. Completar `CartContext` y conectar el carrito con el Header o la lista de productos.
2. Añadir páginas de catálogo y detalles de producto.
3. Extender estilos Sass y mejorar la UI.
4. Agregar rutas protegidas y perfil de usuario.

---

> Nota: este README está actualizado para reflejar el estado actual y los pasos implementados hasta ahora.