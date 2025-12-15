'use client'

import { useState, useEffect } from 'react'
import { MdClose, MdCheckCircle } from 'react-icons/md'

type AlertType = 'registration' | 'login' | null

export default function SuccessAlert() {
    const [alertType, setAlertType] = useState<AlertType>(null)

    useEffect(() => {
        const registrationSuccess = sessionStorage.getItem('registrationSuccess')
        const loginSuccess = sessionStorage.getItem('loginSuccess')
        
        if (registrationSuccess === 'true') {
            sessionStorage.removeItem('registrationSuccess')
            setAlertType('registration')
        } else if (loginSuccess === 'true') {
            sessionStorage.removeItem('loginSuccess')
            setAlertType('login')
        }
    }, [])

    useEffect(() => {
        if (alertType) {
            const timer = setTimeout(() => {
                setAlertType(null)
            }, 5000)
            
            return () => clearTimeout(timer)
        }
    }, [alertType])

    if (!alertType) return null

    const alertContent = {
        registration: {
            title: 'Registro realizado com sucesso!',
            message: 'Verifique seu email para confirmar sua conta.'
        },
        login: {
            title: 'Login realizado com sucesso!',
            message: 'Bem-vindo de volta à Alternativa Móveis.'
        }
    }

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg flex items-center gap-3">
                <MdCheckCircle className="text-green-600 text-2xl flex-shrink-0" />
                <div className="flex-1">
                    <h4 className="font-semibold text-green-800">{alertContent[alertType].title}</h4>
                    <p className="text-sm text-green-700">{alertContent[alertType].message}</p>
                </div>
                <button 
                    onClick={() => setAlertType(null)}
                    className="text-green-600 hover:text-green-800"
                >
                    <MdClose className="text-xl" />
                </button>
            </div>
        </div>
    )
}
