'use client'

import { useState, useEffect } from 'react'
import { MdClose, MdCheckCircle } from 'react-icons/md'

export default function SuccessAlert() {
    const [showAlert, setShowAlert] = useState(() => {
        const registrationSuccess = sessionStorage.getItem('registrationSuccess')
        if (registrationSuccess === 'true') {
            sessionStorage.removeItem('registrationSuccess')
            return true
        }
        return false
    })

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false)
            }, 5000)
            
            return () => clearTimeout(timer)
        }
    }, [showAlert])

    if (!showAlert) return null

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg flex items-center gap-3">
                <MdCheckCircle className="text-green-600 text-2xl flex-shrink-0" />
                <div className="flex-1">
                    <h4 className="font-semibold text-green-800">Registro realizado com sucesso!</h4>
                    <p className="text-sm text-green-700">Verifique seu email para confirmar sua conta.</p>
                </div>
                <button 
                    onClick={() => setShowAlert(false)}
                    className="text-green-600 hover:text-green-800"
                >
                    <MdClose className="text-xl" />
                </button>
            </div>
        </div>
    )
}
