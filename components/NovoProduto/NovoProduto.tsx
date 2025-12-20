import { supabase } from "@/lib/supabase-client";
import React, { useEffect, useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineAddAPhoto, MdImage } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";

interface Category {
    id: string;
    name: string;
    created_at: string;
    color: string;
}

export default function NovoProduto({ setShowNovoProdutoModal }: { setShowNovoProdutoModal: (value: boolean) => void }) {
    const [category, setCategories] = useState<Category[]>([])
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [previewImage, setPreviewImage] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [erros, setErros] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])

        const totalImages = selectedImages.length + files.length
        if (totalImages > 3) {
            setErros("Você pode enviar no máximo 3 imagens.")
            return
        }

        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
        const invalidFile = files.find(file => !validTypes.includes(file.type));
        if (invalidFile) {
            setErros("Tipo de arquivo inválido. Apenas JPEG, PNG, WEBP e JPG são permitidos.")
            return
        }

        // Check file size (max 5MB each)
        const maxSize = 5 * 1024 * 1024
        const oversizedFile = files.find(file => file.size > maxSize)
        if (oversizedFile) {
            setErros("Cada imagem deve ter no máximo 5MB.")
            return
        }

        // Add new files to existing ones
        const newSelectedImages = [...selectedImages, ...files]
        setSelectedImages(newSelectedImages)

        const newPreviews = files.map(file => URL.createObjectURL(file))
        setPreviewImage([...previewImage, ...newPreviews])
    }

    const handleRemoveImage = (index: number) => {
        const newSelectedImages = selectedImages.filter((_, i) => i !== index)
        const newPreviews = previewImage.filter((_, i) => i !== index)

        URL.revokeObjectURL(previewImage[index])

        setSelectedImages(newSelectedImages)
        setPreviewImage(newPreviews)
    }

    const handleUploadClick = () => {
        if (selectedImages.length < 3) {
            fileInputRef.current?.click()
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErros(null)

        const form = e.currentTarget;
        const formData = new FormData(form)

        if (selectedImages.length === 0) {
            setErros("Por favor, envie pelo menos uma imagem do produto.")
            return
        }

        const priceValue = parseFloat(formData.get('price') as string)
        if (isNaN(priceValue) || priceValue < 0) {
            setErros("Por favor, insira um valor válido para o preço.")
            return
        }

        setUploading(true)

        try {
            // Upload images to Cloudinary
            const uploadFormData = new FormData()
            selectedImages.forEach((image) => {
                uploadFormData.append('files', image)
            })

            const uploadResponse = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData
            })

            const uploadData = await uploadResponse.json()

            if (!uploadResponse.ok) {
                setErros("Erro ao enviar imagens. Tente novamente.")
                return
            }

            // Prepare product data
            const photoUrls = uploadData.images.map((img: { url: string }) => img.url)

            const productData = {
                name: formData.get('name'),
                category_id: formData.get('category_id'),
                price: priceValue,
                brief_description: formData.get('brief_description'),
                detailed_description: formData.get('detailed_description'),
                photos: photoUrls
            }

            // Insert product into database
            const { error } = await supabase.from('products').insert(productData)

            if (error) {
                console.error("Erro Supabase:", error)
                setErros("Erro ao adicionar produto ao banco de dados. Tente novamente.")
                return
            }

            // Success
            form.reset()
            setSelectedImages([])
            setPreviewImage([])
            setShowNovoProdutoModal(false)

        } catch (error) {
            console.error("Erro ao adicionar produto:", error)
            setErros("Erro ao adicionar produto. Tente novamente.")
            return
        } finally {
            setUploading(false)
        }
    }

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Erro ao buscar categorias:', error.message)
            return []
        }

        return data
    }

    useEffect(() => {
        const loadCategories = async () => {
            const categories = await fetchCategories()
            setCategories(categories)
        }
        loadCategories()
    }, [])

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-7xl shadow-xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-200 flex-shrink-0">
                    <h2 className="text-xl font-bold">Adicionar Novo Produto</h2>
                    <button className="hover:scale-110 transition-transform duration-200 cursor-pointer" onClick={() => setShowNovoProdutoModal(false)}><RxCross1 /></button>
                </div>

                {erros && <div className="text-red-500 px-6 py-2 bg-red-50 border-b border-red-200">{erros}</div>}

                {/* Formulário de novo produto */}
                <form className="overflow-y-auto flex-1 p-6 pt-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Nome do Produto</label>
                                <input type="text" name="name" className="w-full border border-gray-300 rounded-md p-2" placeholder="Ex: Cadeira de Escritório Ergonomica" required />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block mb-1 font-medium">Categoria</label>
                                    <select className="w-full border border-gray-300 rounded-md p-2" name="category_id" required>
                                        <option value="">Selecione...</option>
                                        {category.map((categories) => (
                                            <option key={categories.id} value={categories.id}>{categories.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Valor (R$)</label>
                                    <input type="number" step="0.01" name="price" className="w-full border border-gray-300 rounded-md p-2" placeholder="R$ 0,00" required />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Breve Descrição <span className="text-gray-500 font-normal">(Exibida nos cards)</span></label>
                                <textarea className="w-full border border-gray-300 rounded-md p-2" name="brief_description" placeholder="Resumo curto do produto." required />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Descrição Completa</label>
                                <textarea className="w-full border border-gray-300 rounded-md p-2" name="detailed_description" placeholder="Detalhes técnicos, materiais, dimensões e características do produto." rows={5} required />
                            </div>
                        </div>

                        <div className="col-span-1 space-y-4">
                            <div>
                                <label className="block mb-2 font-medium">
                                    Imagens do Produto
                                </label>

                                {/* Hidden file input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                {/* Upload Area */}
                                <div
                                    onClick={handleUploadClick}
                                    className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[var(--primary)] transition-colors ${selectedImages.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <MdOutlineAddAPhoto className="mx-auto text-4xl text-gray-400 mb-2" />
                                    <p className="font-medium text-gray-700">Upload Imagens</p>
                                    <p className="text-sm text-gray-500">PNG, JPG até 5MB</p>
                                    <p className="text-sm text-gray-500">Máx 3 imagens</p>
                                </div>

                                {/* Image Slots */}
                                <div className="mt-4 space-y-2">
                                    {[0, 1, 2].map((index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                                        >
                                            {previewImage[index] ? (
                                                <>
                                                    <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={previewImage[index]}
                                                            alt={`Preview ${index + 1}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate">{selectedImages[index]?.name}</p>
                                                        <p className="text-xs text-green-600">Carregado</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                                    >
                                                        <RiDeleteBin6Line size={18} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                        <MdImage className="text-gray-400 text-xl" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm text-gray-400">Slot vazio</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 mt-4 pt-4 flex justify-end">
                        <button type="submit" disabled={uploading} className="bg-[var(--primary)] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                            {uploading ? 'Adicionando...' : 'Adicionar Produto'}
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}