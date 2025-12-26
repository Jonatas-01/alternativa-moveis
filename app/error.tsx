'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { FiRefreshCw, FiHome } from 'react-icons/fi'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service in production
        if (process.env.NODE_ENV === 'production') {
            // You can integrate with services like Sentry here
            // Example: Sentry.captureException(error)
        }
    }, [error])

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="text-center">
                {/* Error Icon */}
                <div className="text-7xl mb-6">⚠️</div>
                
                {/* Title */}
                <h1 className="text-3xl font-bold text-[var(--primary)] mb-4">
                    Algo deu errado
                </h1>
                
                {/* Description */}
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                    Desculpe, ocorreu um erro inesperado. Por favor, tente novamente ou volte para a página inicial.
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="flex items-center justify-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        <FiRefreshCw size={20} />
                        Tentar novamente
                    </button>
                    
                    <Link 
                        href="/"
                        className="flex items-center justify-center gap-2 border-2 border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors"
                    >
                        <FiHome size={20} />
                        Voltar ao Início
                    </Link>
                </div>
            </div>
        </div>
    )
}
