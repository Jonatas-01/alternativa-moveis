import Chamada from "@/components/LandingPage/Chamada/Chamada"
import HeaderSobreNos from "@/components/SobreNos/HeaderSobreNos"
import NossaMissao from "@/components/SobreNos/NossaMissao"
import VisaoValores from "@/components/SobreNos/VisaoValores"
import Contato from "@/components/SobreNos/Contato"

export default function SobreNos() {
    return (
        <div>
            <div className="container mx-auto px-3 md:px-0">
                <HeaderSobreNos />
                <NossaMissao />
                <VisaoValores />
            </div>
            <div className="bg-[#ebebeb] px-3 md:px-0">
                <Chamada />
            </div>
            <div className="container mx-auto px-3 md:px-0" id="contato">
                <Contato />
            </div>
        </div>
    )
}