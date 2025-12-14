import { FiSearch } from 'react-icons/fi';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from 'next/image';

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
    },
    {
        foto: "/image/cadeira_escolar.png",
        categoria: "Cadeiras",
        nome: "Cadeira Escolar",
        descricao: "cadeira escolar resistente com assento e encosto ergonômicos",
        preco: 199.99
    },
    {
        foto: "/image/tableoffice.jpg",
        categoria: "Mesas",
        nome: "Mesa de Escritório",
        descricao: "mesa de escritório espaçosa com acabamento em madeira de alta qualidade",
        preco: 399.99
    }
]

export default function AdminProdutos() {
    return (
        <div className="bg-gray-100 rounded-[20px] my-12">
            <div className="flex flex-col md:flex-row md:justify-between items-center px-4 py-3">
                <div className="p-4">
                    <div className="flex items-center bg-white rounded-lg shadow-sm px-4 py-2">
                        <FiSearch className="text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            className="ml-2 flex-1 outline-none text-gray-700"
                        />
                    </div>
                </div>

                <div className="">
                    <p>Total: {produtos.length} produtos</p>
                </div>
            </div>
            <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                    <div className="grid grid-cols-5 flex justify-between items-center px-4 py-3 border-b border-gray-200">
                        <h4 className='col-span-2 font-semibold'>PRODUTO</h4>
                        <h4 className='font-semibold text-center'>CATEGORIA</h4>
                        <h4 className='font-semibold text-center'>PREÇO</h4>
                        <h4 className='font-semibold text-center'>AÇÕES</h4>
                    </div>
                    {produtos.map((produto, index) => (
                        <div key={index} className="grid grid-cols-5 items-center px-4 py-3 border-b border-gray-200 bg-white">
                            <div className='col-span-2 flex items-center gap-4'>
                                <div className="relative w-16 h-16 flex-shrink-0">
                                    <Image
                                        src={produto.foto}
                                        alt={produto.nome}
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                </div>
                                <div className='pr-20'>
                                    <h4 className="font-semibold text-lg line-clamp-1">{produto.nome}</h4>
                                    <p className="line-clamp-1">{produto.descricao}</p>
                                </div>
                            </div>
                            <div>
                                <p className={`text-center text-sm font-semibold ${produto.categoria}-tag rounded-full py-1 w-fit mx-auto px-3`}>{produto.categoria}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-center">R$ {produto.preco.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-4 justify-center">
                                <button className="text-blue-500 hover:cursor-pointer"><MdOutlineEdit  color='blue' size={24}/></button>
                                <button className="text-red-500 hover:cursor-pointer"><RiDeleteBin6Line color='red' size={24}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}