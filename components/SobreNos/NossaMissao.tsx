import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { FaUserGroup, FaMoneyBills } from "react-icons/fa6";

export default function NossaMissao() {
    return (
        <div className="mt-12">
            <h2 className="text-xl md:text-2xl text-[var(--secondary)]">Nossa Missão</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mt-4 mr-0 lg:mr-24">
                    <h4 className="font-semibold text-2xl md:text-4xl">Dedicação em ajudar você a achar o melhor produto para seu ambiente</h4>
                    <div className="mt-4 md:mt-8 flex justify-between gap-3 sm:gap-6">
                        <div>
                            <h4 className="text-3xl lg:text-4xl font-semibold">10+</h4>
                            <p className="text-">Anos de Experiência</p>
                        </div>
                        <div>
                            <h4 className="text-3xl lg:text-4xl font-semibold">24+</h4>
                            <p className="text-">Produtos</p>
                        </div>
                        <div>
                            <h4 className="text-3xl lg:text-4xl font-semibold">1500+</h4>
                            <p className="text-">Clientes Satisfeitos</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex flex-col gap-1">
                        <div>
                            <h4 className="flex items-center gap-2 text-xl font-semibold">
                                <MdOutlineEnergySavingsLeaf color="var(--secondary)" size={28}/>
                                Custo-Benefício
                            </h4>
                        </div>
                        <p>Nossas soluções inteligentes oferecem a melhor relação entre investimento e resultado, otimizando seu orçamento.</p>
                    </div>

                    <div className="flex flex-col gap-1 mt-3">
                        <div>
                            <h4 className="flex items-center gap-2 text-xl font-semibold">
                                <FaUserGroup color="var(--secondary)" size={28}/>
                                Equipe Qualificada
                            </h4>
                        </div>
                        <p>Contamos com técnicos experientes e dedicados para garantir um serviço de alta qualidade, precisão e confiança.</p>
                    </div>

                    <div className="flex flex-col gap-1 mt-3">
                        <div>
                            <h4 className="flex items-center gap-2 text-xl font-semibold">
                                <FaMoneyBills color="var(--secondary)" size={28}/>
                                Custo-Benefício
                            </h4>
                        </div>
                        <p>Nossas soluções inteligentes oferecem a melhor relação entre investimento e resultado, otimizando seu orçamento.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}