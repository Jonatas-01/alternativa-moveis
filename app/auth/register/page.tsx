'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaLock, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdEmail, MdVerifiedUser } from 'react-icons/md'
import { supabase } from "@/lib/supabase-client"

export default function RegisterPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordNotMatchError, setPasswordNotMatchError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const validatePassword = (pwd: string) => {
        const minLength = pwd.length >= 8
        const hasUppercase = /[A-Z]/.test(pwd)
        const hasLowercase = /[a-z]/.test(pwd)
        const hasNumber = /[0-9]/.test(pwd)
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>-]/.test(pwd)

        return {
            isValid: minLength && hasUppercase && hasLowercase && hasNumber && hasSpecial,
            minLength,
            hasUppercase,
            hasLowercase,
            hasNumber,
            hasSpecial
        }
    }

    const passwordValidation = validatePassword(password)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!passwordValidation.isValid) {
            setPasswordError('A senha não atende aos requisitos de segurança.')
            return
        }

        if (password !== confirmPassword) {
            setPasswordNotMatchError('As senhas não coincidem.')
            return
        }

        const { error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            console.error('Erro ao registrar:', error.message)
            return
        }

        sessionStorage.setItem('registrationSuccess', 'true')
        router.push('/')
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
            style={{ backgroundImage: "linear-gradient(rgba(3, 29, 64, 0.85), rgba(3, 29, 64, 0.85)), url('/image/hero-image.jpg')" }}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-100 rounded-full p-4">
                        <FaUserPlus className="text-3xl" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center mb-2">
                    Registro de Usuário
                </h1>
                <p className="text-center text-sm mb-8">
                    Preencha os campos abaixo para criar sua conta.
                </p>

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
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setPasswordError('')
                                }}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-gray-50"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                            </button>
                        </div>
                        
                        {/* Password Requirements */}
                        {password && (
                            <div className="mt-2 text-xs space-y-1">
                                <p style={{ color: passwordValidation.minLength ? '#16a34a' : '#ef4444' }}>
                                    {passwordValidation.minLength ? '✓' : '✗'} Mínimo 8 caracteres
                                </p>
                                <p style={{ color: passwordValidation.hasUppercase ? '#16a34a' : '#ef4444' }}>
                                    {passwordValidation.hasUppercase ? '✓' : '✗'} Uma letra maiúscula
                                </p>
                                <p style={{ color: passwordValidation.hasLowercase ? '#16a34a' : '#ef4444' }}>
                                    {passwordValidation.hasLowercase ? '✓' : '✗'} Uma letra minúscula
                                </p>
                                <p style={{ color: passwordValidation.hasNumber ? '#16a34a' : '#ef4444' }}>
                                    {passwordValidation.hasNumber ? '✓' : '✗'} Um número
                                </p>
                                <p style={{ color: passwordValidation.hasSpecial ? '#16a34a' : '#ef4444' }}>
                                    {passwordValidation.hasSpecial ? '✓' : '✗'} Um caractere especial (!@#$%^&*-)
                                </p>
                            </div>
                        )}
                        {passwordError && (
                            <p className="mt-2 text-xs" style={{ color: '#ef4444' }}>{passwordError}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Confirmar Senha
                        </label>
                        <div className="relative">
                            <MdVerifiedUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-gray-50"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                            </button>
                        </div>
                        {passwordNotMatchError && (
                            <p className="mt-2 text-xs" style={{ color: '#ef4444' }}>{passwordNotMatchError}</p>
                        )}
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
                        <a href="/auth/login" className="text-[var(--secondary)] hover:underline font-medium">
                            Faça Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
