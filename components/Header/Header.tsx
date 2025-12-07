import Logo from "./Logo"
import Navbar from "./Navbar"
export default function Header() {
    return (
        <header className="sticky top-0 z-50 mx-auto w-full px-6 py-3 shadow-md bg-[var(--background)] backdrop-blur-md">
            <div className="container mx-auto max-w-7xl flex justify-between items-center flex-wrap">
                <Logo />
                <Navbar />
            </div>
        </header>
    )
}