import Image from "next/image"
import Link from "next/link"

export default function Logo() {
    return (
        <Link href="/">
            <div className="flex items-center cursor-pointer w-[100px] md:w-[auto]">
                <Image
                    src="/image/logo.png"
                    alt="Alternativa Móveis Logo"
                    width={45}
                    height={45}
                />
                <h1 className="ml-2 text-md md:text-xl">Alternativa <span className="gold-gradient-text">Móveis</span></h1>
            </div>
        </Link>
    )
}