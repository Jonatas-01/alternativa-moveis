import { BsArrowRight } from "react-icons/bs";

export default function Chamada() {
    return (
        <div className="mt-14 py-20 sm:py-30 flex gap-4 justify-center flex-col md:flex-row">
            <h2 className="text-2xl md:text-4xl">Pronto para transformar seu ambiente?</h2>
            <a href="/contato" className="botoes flex items-center gap-3 text-lg max-w-[230px]">Fale Conosco <BsArrowRight /></a>
        </div>
    )
}