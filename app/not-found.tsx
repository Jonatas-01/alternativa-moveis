'use client'

import Link from 'next/link'
import { FiHome, FiArrowLeft } from 'react-icons/fi'

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-[var(--primary)] opacity-20">404</h1>
                
                <h2 className="text-3xl font-bold text-[var(--primary)] -mt-8 mb-4">
                    Página não encontrada
                </h2>
                
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                    Desculpe, a página que você está procurando não existe ou foi removida.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href="/"
                        className="flex items-center justify-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded font-semibold hover:opacity-90 transition-opacity"
                    >
                        <FiHome size={20} />
                        Voltar ao Início
                    </Link>
                    
                    <button 
                        onClick={() => history.back()}
                        className="flex items-center justify-center gap-2 border-2 border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors"
                    >
                        <FiArrowLeft size={20} />
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    )
}
