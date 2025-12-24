'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductImageGalleryProps {
    photos: string[]
    productName: string
}

export default function ProductImageGallery({ photos, productName }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <div>
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-sm">
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
