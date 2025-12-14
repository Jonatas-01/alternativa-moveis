'use client'

import { useState } from 'react'
import { FaUser, FaLock } from 'react-icons/fa'
import { MdAdminPanelSettings } from 'react-icons/md'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Add login logic with Supabase
        console.log({ email, password, rememberMe })
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
            style={{ backgroundImage: "linear-gradient(rgba(3, 29, 64, 0.85), rgba(3, 29, 64, 0.85)), url('/image/hero-image.jpg')" }}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-[var(--primary)] rounded-full p-4">
                        <MdAdminPanelSettings className="text-white text-3xl" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-center mb-2">
                    Login Administrativo
                </h1>
                <p className="text-center text-sm mb-8">
                    Entre com suas credenciais para acessar o sistema.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@alternativamoveis.com.br"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-gray-50"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                            Senha
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

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                            />
                            <span className="text-sm text-[var(--paragraph)]">Lembrar-me</span>
                        </label>
                        <a href="#" className="text-sm text-[var(--secondary)] hover:underline font-medium">
                            Esqueceu a senha?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
                    >
                        Entrar
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-xs text-[var(--paragraph)]">
                        Acesso restrito. Todas as atividades são monitoradas.
                    </p>
                </div>
            </div>
        </div>
    )
}