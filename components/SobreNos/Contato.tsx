
import { FiMapPin, FiMail, FiPhone, FiClock } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Contato() {
    const address = "Av Alberto Miguel, 859 - Goiânia - GO, St Campinas"
    const email = "leonardo.alternativamoveis@gmail.com"
    const phone = "(62) 3215-0996"
    
    // Google Maps embed URL with the address
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.8!2d-49.2547!3d-16.6799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef1!2sAv.%20Alberto%20Miguel%2C%20859%20-%20St.%20Campinas%2C%20Goi%C3%A2nia%20-%20GO!5e0!3m2!1spt-BR!2sbr!4v1703620800000!5m2!1spt-BR!2sbr"

    return (
        <div className="py-16">
            <div className="mb-4">
                <h1 className="text-4xl font-bold">Entre em Contato</h1>
                <p className="text-gray-600 mt-2">
                    Estamos prontos para ajudar a renovar seu ambiente. Entre em contato através de um dos canais abaixo.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">Nossa Localização</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="rounded-2xl overflow-hidden shadow-md h-[400px]">
                        <iframe
                            src={mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização Alternativa Móveis"
                        />
                    </div>

                    <div className="flex flex-col justify-center gap-5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-300 flex items-center justify-center flex-shrink-0">
                                <FiMapPin className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Endereço</h3>
                                <p className="text-gray-600">{address}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-300 flex items-center justify-center flex-shrink-0">
                                <FiMail className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Email</h3>
                                <a 
                                    href={`mailto:${email}`}
                                    className="text-blue-600 hover:underline wrap-anywhere"
                                >
                                    {email}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-300 flex items-center justify-center flex-shrink-0">
                                <FiPhone className="text-[var(--primary)] text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-[var(--foreground)]">Telefone</h3>
                                <a 
                                    href={`tel:${phone}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    {phone}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-300 flex items-center justify-center flex-shrink-0">
                                <FiClock className="text-[var(--primary)] text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Horário de Funcionamento</h3>
                                <p className="text-gray-600">Segunda a Sexta, das 8h às 17:30h</p>
                                <p className="text-gray-600">Sábado, das 8h às 13h</p>
                            </div>
                        </div>

                        <a
                            href="https://api.whatsapp.com/send?phone=556232150996&text=Ol%C3%A1%2C%20Estava%20olhando%20seu%20cat%C3%A1logo%20e%20me%20interessei%20por%20um%20produto%20.%20"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold py-4 px-6 rounded-xl hover:bg-[#20bd5a] transition-colors"
                        >
                            <FaWhatsapp size={24} />
                            Contate-nos pelo Whatsapp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}