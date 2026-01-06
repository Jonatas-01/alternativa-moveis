'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5'

interface ProductImageGalleryProps {
    photos: string[]
    productName: string
}

export default function ProductImageGallery({ photos, productName }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Handle keyboard navigation
    useEffect(() => {
        if (!isFullscreen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsFullscreen(false)
            if (e.key === 'ArrowLeft') setSelectedImage((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
            if (e.key === 'ArrowRight') setSelectedImage((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isFullscreen, photos.length])

    return (
        <div>
            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div 
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                    onClick={() => setIsFullscreen(false)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                        aria-label="Fechar"
                    >
                        <IoClose size={36} />
                    </button>

                    {/* Navigation Arrows */}
                    {photos.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedImage((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
                                }}
                                className="absolute left-4 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
                                aria-label="Imagem anterior"
                            >
                                <IoChevronBack size={32} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedImage((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
                                }}
                                className="absolute right-4 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
                                aria-label="Próxima imagem"
                            >
                                <IoChevronForward size={32} />
                            </button>
                        </>
                    )}

                    {/* Fullscreen Image */}
                    <div 
                        className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={photos[selectedImage]}
                            alt={productName}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Image Counter */}
                    {photos.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                            {selectedImage + 1} / {photos.length}
                        </div>
                    )}
                </div>
            )}

            {/* Main Image */}
            <div 
                className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-sm cursor-zoom-in"
                onClick={() => setIsFullscreen(true)}
            >
                <Image
                    src={photos[selectedImage]}
                    alt={productName}
                    fill
                    loading='eager'
                    className="object-cover"
                    priority
                />
            </div>

            {/* Thumbnail Gallery */}
            {photos.length > 1 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative aspect-square rounded-lg overflow-hidden bg-white shadow-sm cursor-pointer transition-all ${
                                selectedImage === index 
                                    ? 'ring-2 ring-[var(--primary)]' 
                                    : 'hover:ring-2 hover:ring-gray-300'
                            }`}
                        >
                            <Image
                                src={photo}
                                alt={`${productName} - Foto ${index + 1}`}
                                fill
                                loading='lazy'
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
