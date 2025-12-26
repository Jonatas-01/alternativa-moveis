import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";

export default function SobreNos() {
    return (
        <div className="mt-14">
            <div>
                <h1 className="secondary-title">Sobre Nós</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                <div className="mt-3 flex flex-col items-start gap-6">
                    <p>Com mais de uma década de experiência no mercado, a Alternativa Móveis para Escritório e Escolares se consolidou como uma marca sólida, confiável e comprometida com a qualidade. Atuamos com foco em oferecer móveis que unem funcionalidade, ergonomia e durabilidade, sempre alinhados às necessidades de escolas, empresas e instituições que buscam ambientes mais confortáveis, eficientes e modernos.</p>
                    <a href="/sobre-nos" className="flex items-center botoes gap-3">Saiba Mais <BsArrowRight /></a>
                    
                    <div className="flex gap-3 sm:gap-6 text-center">
                        <div>
                            <h4 className="text-3xl lg:text-4xl font-semibold">10+</h4>
                            <p className="text-sm">Anos de Experiência</p>
                        </div>
                        <div>
                            <h4 className="text-3xl lg:text-4xl font-semibold">24+</h4>
                            <p className="text-sm">Produtos</p>
                        </div>
                        <div>
                            <h4 className="text-3xl lg:text-4xl font-semibold">1500+</h4>
                            <p className="text-sm">Clientes Satisfeitos</p>
                        </div>
                    </div>
                </div>

                <div className="mt-3 w-full flex flex-col lg:flex-row gap-4 lg:gap-4">
                    <div className="w-full h-[140px] sm:h-[200px] lg:h-auto">
                        <Image
                            src="/image/sobre-nos-1.jpg"
                            alt="Sobre Nós Imagem de Manutenção"
                            width={600}
                            height={300}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full h-[140px] sm:h-[200px] lg:h-auto">
                        <Image
                            src="/image/sobre-nos-2.jpeg"
                            alt="Sobre Nós Imagem de Escola"
                            width={600}
                            height={300}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}