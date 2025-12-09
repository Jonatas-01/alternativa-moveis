import ProdutoCard from "./ProdutoCard"
import EmblaCarousel from "../ui/EmblaCarousel"
import { EmblaOptionsType } from 'embla-carousel'

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
    }
]

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
const SLIDE_COUNT = 4
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Destaque() {
    return (
        <div className="mt-10">
            <div className="container mx-auto px-6">
                <h1 className="secondary-title">Produtos em Destaque</h1>
            </div>
            {/* <div className="mt-8 flex flex-wrap justify-between">
                {produtos.map((produto, index) => (
                    <ProdutoCard
                        key={index}
                        foto={produto.foto}
                        categoria={produto.categoria}
                        nome={produto.nome}
                        descricao={produto.descricao}
                        preco={produto.preco}
                    />
                ))}
            </div> */}
            <div className="mt-7">
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
        </div>
    )
}