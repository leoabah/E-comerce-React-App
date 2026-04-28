import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { auth } from '../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { FaUserCircle } from 'react-icons/fa'

const AuthStatusDisplay = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handleLogout = async () => {
        try {
            await signOut(auth)
            console.log("Sesion cerrada con exito")
        } catch (error) {
            console.error("Error al cerrer sesion", error.message)
        }
    }

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                }}
            >
                <FaUserCircle size={24} />
                <span>Cargando...</span>
            </div>
        )
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
            }}
        >
            <FaUserCircle size={24} />
            {user ? (
                <>
                    <span>
                        hola, {user.displayName || user.email.split("@")[0]}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="logout-btn"
                        style={{ marginLeft: "10px" }}
                    >
                        Cerrar Sesion
                    </button>
                </>
            ) : (
                <Link to="iniciar" className="login-link">
                    Iniciar Sesion
                </Link>
            )}
        </div>
    )
}

export default AuthStatusDisplay