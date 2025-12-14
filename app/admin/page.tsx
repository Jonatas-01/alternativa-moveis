import { IoMdAdd } from "react-icons/io";
import AdminDestaque from "@/components/AdminDestaque/AdminDestaque";

export default function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto px-3 md:px-0 flex-grow">
                <div className="mt-12 md:flex justify-between items-center">
                    <div>
                        <h1 className="secondary-title">Gerenciamento de Produtos</h1>
                        <p className="mt-2 md:mt-0">Adicione, edite e remova produtos do seu catálogo.</p>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <button className="botoes text-md sm:text-xl flex items-center gap-2 rounded-md"><IoMdAdd /> Novo Produto</button>
                    </div>
                </div>
                <AdminDestaque />
            </div>
        </div>
    )
}