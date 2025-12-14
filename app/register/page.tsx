'use client'

import { useState } from 'react'
import { FaLock, FaUserPlus } from 'react-icons/fa'
import { MdEmail, MdVerifiedUser } from 'react-icons/md'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!')
            return
        }
        
        // TODO: Add register logic with Supabase
        console.log({ email, password })
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
            style={{ backgroundImage: "linear-gradient(rgba(3, 29, 64, 0.85), rgba(3, 29, 64, 0.85)), url('/image/hero-image.jpg')" }}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-100 rounded-full p-4">
                        <FaUserPlus className="text-3xl" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-center mb-2">
                    Registro de Usuário
                </h1>
                <p className="text-center text-sm mb-8">
                    Preencha os campos abaixo para criar sua conta.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nome@exemplo.com"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-gray-50"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Criar Senha
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-gray-50"
                                required
                            />
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Confirmar Senha
                        </label>
                        <div className="relative">
                            <MdVerifiedUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-gray-50"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
                    >
                        Registrar
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-sm text-[var(--paragraph)]">
                        Já possui uma conta?{' '}
                        <a href="/login" className="text-[var(--secondary)] hover:underline font-medium">
                            Faça Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
