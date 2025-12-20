'use client'

import { supabase } from '@/lib/supabase-client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdAdminPanelSettings } from 'react-icons/md'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (session) {
                router.push('/')
                return
            }
        }

        checkAuth()
    }, [router])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError('Email ou senha incorretos.')
            console.error('Erro ao fazer login:', error.message)
            return
        }

        // Login bem-sucedido - redirecionar para home com mensagem de sucesso
        sessionStorage.setItem('loginSuccess', 'true')
        router.push('/')
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
            style={{ backgroundImage: "linear-gradient(rgba(3, 29, 64, 0.85), rgba(3, 29, 64, 0.85)), url('/image/hero-image.jpg')" }}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                <div className="flex justify-center mb-6">
                    <div className="bg-[var(--primary)] rounded-full p-4">
                        <MdAdminPanelSettings className="text-white text-3xl" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center mb-2">
                    Login Administrativo
                </h1>
                <p className="text-center text-sm mb-8">
                    Entre com suas credenciais para acessar o sistema.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

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
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-gray-50"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
                    >
                        Entrar
                    </button>

                    <p className="text-center text-sm">
                        Não tem uma conta?{' '}
                        <a href="/auth/register" className="text-[var(--secondary)] hover:underline font-medium">
                            Criar conta
                        </a>
                    </p>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-xs">
                        Acesso restrito. Todas as atividades são monitoradas.
                    </p>
                </div>
            </div>
        </div>
    )
}