
export default function LogoutModal({ setShowLogoutModal, logout }: { setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>, logout: () => Promise<void> }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4 shadow-xl">
                <h2 className="text-xl font-bold text-[var(--primary)] mb-2">Confirmar Saída</h2>
                <p className="text-[var(--paragraph)] mb-6">Tem certeza que deseja sair do sistema?</p>
                <div className="flex gap-3 justify-end">
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-100 transition-colors"
                        onClick={() => setShowLogoutModal(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:scale-105 transition-transform duration-200"
                        onClick={logout}
                    >
                        Sair
                    </button>
                </div>
            </div>
        </div>
    )
}