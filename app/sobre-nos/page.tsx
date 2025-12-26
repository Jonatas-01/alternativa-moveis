import Image from "next/image";
import Link from "next/link";

export default function SobreNos() {
    return (
        <div className="flex flex-col mt-10 md:mt-15">
            <div className="mx-auto w-full px-4 text-center md:max-w-[600px]">
                <h1 className="primary-title">Sobre Nós</h1>
                <p className="">Combinamos qualidade, eficiência e responsabilidade para oferecer as melhores soluções para o seu negócio</p>
            </div>
            <div className="mt-3">
                <div className="w-full max-h-[390px] overflow-hidden">
                    <Image src="/image/sobre-nos-pagina.jpeg" alt="Hero Image" width={1920} height={390} className="w-full max-h-[130px] md:max-h-[390px] object-cover"/>
                </div>
            </div>
        </div>
    )
}