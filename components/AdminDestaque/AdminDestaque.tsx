import { IoMdStar, IoIosAddCircle, IoIosSave } from "react-icons/io";
import Image from "next/image";

const produtos = [
    {
        foto: "/image/cadeira.jpg",
        categoria: "Cadeiras",
        nome: "Cadeira de Escritório",
        descricao: "tubos metálicos de aço com acabamento em pintura preta brilhante",
        preco: 299.99
    },
    {
        foto: "/image/armario_grande.png",
        categoria: "Armários",
        nome: "Armário Grande",
        descricao: "armário espaçoso com acabamento em madeira de alta qualidade",
        preco: 499.99
    },
    {
        foto: "/image/gaveteira.png",
        categoria: "Armários",
        nome: "Gaveteira",
        descricao: "gaveteira prática com várias gavetas para organização",
        preco: 299.99
    }
]

export default function AdminDestaque() {
    return (
        <div className="servico-card mt-12">
            <h4 className="font-semibold text-xl md:text-2xl flex items-center gap-2"><IoMdStar size={20} color="var(--gold-placeholder)" />Produtos em Destaque</h4>
            <p className="text-sm md:text-base mt-1">Gerencia a vitrine da página principal. Selecione 4 produtos para exibir em destaque.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {produtos.map((produto, index) => (
                    <div className="servico-card flex flex-col sm:flex-row" key={index}>
                        <div className="relative w-full sm:w-20 h-48 sm:h-20 flex-shrink-0">
                            <Image
                                src={produto.foto}
                                alt={produto.nome}
                                className="rounded-lg object-cover"
                                fill
                                sizes="(max-width: 640px) 100vw, 80px"
                            />
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-4">
                            <h4 className="font-semibold text-lg line-clamp-1">{produto.nome}</h4>
                            <p className="line-clamp-1">{produto.descricao}</p>
                            <h4 className="font-semibold text-lg">R$ {produto.preco.toFixed(2)}</h4>
                        </div>
                    </div>
                ))}
                {Array.from({ length: Math.max(0, 4 - produtos.length) }).map((_, index) => (
                    <div key={`slot-${index}`} className="py-6 flex justify-center items-center flex-col gap-2 text-gray-400 border-dashed border-2 border-gray-300 rounded-xl ">
                        <p><IoIosAddCircle size={30} /></p>
                        <p>Slot Disponível</p>
                    </div>
                ))}

            </div>

            <div className="flex justify-end mt-6 border-t border-gray-300 pt-4">
                <button className="botoes flex items-center gap-2 rounded-md"><IoIosSave size={20} /> Salvar Alterações</button>
            </div>
        </div>
    )
}