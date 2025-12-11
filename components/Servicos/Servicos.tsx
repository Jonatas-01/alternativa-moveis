import { PiOfficeChairFill } from "react-icons/pi";
import { BiSolidSchool } from "react-icons/bi";
import { BsTools } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";

export default function Servicos() {
    return (
        <div className="mt-14">
            <div className="mb-4">
                <h1 className="secondary-title">Nossos Serviços</h1>
            </div>
            <div className="flex justify-center flex-wrap gap-10 [&>*]:max-w-[340px] [&>*]:hover:scale-105 [&>*]:transition-transform [&>*]:duration-400">
                <div className="text-center flex flex-col items-center servico-card">
                    <PiOfficeChairFill className="justify-center mb-2" size={70} color="var(--secondary)" />
                    <div>
                        <h4 className="text-xl mb-2 font-semibold">Venda de Móveis Novos</h4>
                        <p className="text-sm pb-3">Qualidade, design e variedade para equipar sua empresa</p>
                    </div>
                </div>
                <div className="text-center flex flex-col items-center servico-card">
                    <BsTools className="justify-center mb-2" size={70} color="var(--secondary)" />
                    <div>
                        <h4 className="text-xl mb-2 font-semibold">Conserto Especializado</h4>
                        <p className="text-sm pb-3">Aumente a durabilidade dos seus ativos com nossa expersite técnica</p>
                    </div>
                </div>
                <div className="text-center flex flex-col items-center servico-card">
                    <TbTruckDelivery className="justify-center mb-2" size={70} color="var(--secondary)" />
                    <div>
                        <h4 className="text-xl mb-2 font-semibold">Entrega á Domicilio</h4>
                        <p className="text-sm pb-3">Entrega garatida dos produtos em sua porta</p>
                    </div>
                </div>
                <div className="text-center flex flex-col items-center servico-card">
                    <BiSolidSchool className="justify-center mb-2" size={70} color="var(--secondary)" />
                    <div>
                        <h4 className="text-xl mb-2 font-semibold">Trabalhos  Escolares</h4>
                        <p className="text-sm pb-3">Oferecemos móveis e restaurações em ambientes escolares</p>
                    </div>
                </div>
            </div>
        </div>
    )
}