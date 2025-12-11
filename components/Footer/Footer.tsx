
export default function Footer() {
    return (
        <footer className="">
            <div className="pt-6 flex flex-wrap lg:grid grid-flow-col grid-cols-5 gap-6">
                <div className="col-span-3">
                    <h1 className="text-xl md:text-2xl">Alternativa <span className="gold-gradient-text">Móveis</span></h1>
                    <p>Sua parceria ideal para criar, manter e renovar espaços escolares empresas e instituições.</p>
                </div>
                <div className="space-y-1">
                    <h3>Link Rápidos</h3>
                    <p><a href="">Início</a></p>
                    <p><a href="">Catálogo</a></p>
                    <p><a href="">Serviços</a></p>
                    <p><a href="">Sobre Nós</a></p>
                </div>
                <div className="space-y-1">
                    <h3>Contato</h3>
                    <p>Rua Exemplo, 123, Goiania - GO</p>
                    <p>Telefone: (XX) XXXX-XXXX</p>
                    <p>Email: contato@alternativamoveis.com</p>
                </div>
                <div className="space-y-1">
                    <h3>Siga-nos</h3>
                    <p><a href="">Facebook</a></p>
                    <p><a href="">Instagram</a></p>
                </div>
            </div>

            <div className="mt-3 py-3 border-t border-[var(--paragraph)]">
                <p>© 2026 Alternativa Móveis. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}