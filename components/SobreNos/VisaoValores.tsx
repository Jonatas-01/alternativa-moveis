import { FaEye, FaCheckCircle } from "react-icons/fa";
import { MdHandshake } from "react-icons/md";

export default function VisaoValores() {
    return (
        <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center">
                    <FaEye color="var(--primary)" size={36} />
                    <h2 className="text-2xl">Visão</h2>
                    <p className="text-center  text-lg">Ser reconhecida regionalmente como a principal parceira na criação e manutenção de ambientes corporativos e educacionais, destacando-se pela excelência no atendimento e na qualidade dos serviços.</p>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col items-center">
                        <MdHandshake color="var(--primary)" size={36} />
                        <h2 className="text-2xl">Valores</h2>
                    </div>
                    <div className="mx-auto">
                        <p className="flex flex-row items-center text-lg gap-2"><FaCheckCircle color="var(--secondary)" />Comprometimendo com o cliente</p>
                        <p className="flex flex-row items-center text-lg gap-2"><FaCheckCircle color="var(--secondary)" />Qualidade e durabilidade</p>
                        <p className="flex flex-row items-center text-lg gap-2"><FaCheckCircle color="var(--secondary)" />Ética e transparencia</p>
                        <p className="flex flex-row items-center text-lg gap-2"><FaCheckCircle color="var(--secondary)" />Sustentabilidade e reuso</p>
                    </div>
                </div>
            </div>
        </div>
    )
}