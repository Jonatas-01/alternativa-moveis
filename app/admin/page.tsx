import { IoMdAdd } from "react-icons/io";

export default function Dashboard() {
    return (
        <div className="container mx-auto px-6 md:px-0">
            <div className="mt-12 md:flex justify-between items-center">
                <div>
                    <h1 className="primary-title">Gerenciamento de Produtos</h1>
                    <p>Adicione, edite e remova produtos do seu catálogo.</p>
                </div>
                <div className="">
                    <button className="botoes text-xl flex items-center gap-2 rounded-md"><IoMdAdd size={24}/> Novo Produto</button>
                </div>
            </div>
        </div>
    )
}