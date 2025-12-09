import Image from "next/image"

type ProdutoCardProps = {
    foto: string;
    categoria: string;
    nome: string;
    descricao: string;
    preco: number;
}

export default function ProdutoCard({ foto, categoria, nome, descricao, preco }: ProdutoCardProps) {
    return (
        <div>
            <div className="overflow-hidden">
                <Image src={foto} alt={nome} width={440} height={440} className="object-cover max-h-[265px] max-w-[265px] sm:max-h-[440px] sm:max-w-[440px]" />
            </div>
            <div className="mt-2 max-h-[265px] max-w-[265px] sm:max-h-[440px] sm:max-w-[440px]">
                <p className="font-medium ">{categoria}</p>
                <h4 className="font-semibold text-lg">{nome}</h4>
                <p className="">{descricao}</p>
                <h4 className="font-semibold text-lg">R$ {preco}</h4>
            </div>
        </div>
    )
}