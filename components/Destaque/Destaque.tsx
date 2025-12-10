
import { BsArrowRight } from "react-icons/bs";
import EmblaCarousel from "../ui/EmblaCarousel"
import { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
const SLIDE_COUNT = 4
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Destaque() {
    return (
        <div className="mt-10">
            <div className="container mx-auto px-6">
                <h1 className="secondary-title">Produtos em Destaque</h1>
            </div>
            <div className="mt-7">
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
            <div className="flex justify-center mt-3">
                <a href="#" className="flex items-center botoes gap-3">Ver Catálogo <BsArrowRight /></a>
            </div>
        </div>
    )
}