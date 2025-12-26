import Image from "next/image"
import Link from "next/link"

export default function Hero() {
    return (
        <div className="flex flex-col mt-10 md:mt-15">
            <div className="mx-auto w-full px-4 text-center md:max-w-[600px]">
                <h1 className="primary-title">Soluções Completas para  Escritório e Escolares</h1>
                <p className="mt-3">Sempre  alinhados às necessidades de escolas, empresas e instituições que buscam ambientes mais confortáveis, eficientes e modernos.</p>
            </div>
            <div className="mt-3 px-4 md:px-0 relative">
                <Link href="/catalogo" className="botoes absolute top-0 left-1/2 -translate-x-1/2 text-center text-sm sm:text-base">Veja Nossos Produtos</Link>
                <div className="w-full max-h-[430px] overflow-hidden pt-7 sm:pt-5">
                    <Image src="/image/hero-image.jpg" alt="Hero Image" width={1920} height={430} className="w-full max-h-[130px] md:max-h-[430px] object-cover"/>
                </div>
            </div>
        </div>
    )
}