import { supabase } from "@/lib/supabase-client";
import { useEffect, useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";

interface Category {
    id: string;
    name: string;
    color: string;
}

interface Product {
    id: string;
    name: string;
    photos: string[];
    category_id: string;
    categories: Category;
    brief_description: string;
    detailed_description: string;
    price: number;
}

export default function EditProdutoModal({
    setShowEditProdutoModal, product }: { setShowEditProdutoModal: (value: boolean) => void, product: Product }) {
    const [categories, setCategories] = useState<Category[]>([])
    const [existingPhotos, setExistingPhotos] = useState<string[]>(product.photos || [])
    const [newPhotos, setNewPhotos] = useState<File[]>([])
    const [newPhotoPreviews, setNewPhotoPreviews] = useState<string[]>([])
    const [photosToDelete, setPhotosToDelete] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [erros, setErros] = useState<string | null>(null)
    const [updating, setUpdating] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const totalPhotos = existingPhotos.length + newPhotos.length

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

        // Check authentication status
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setIsAuthenticated(!!session)
        }
        checkAuth()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleRemoveExistingPhoto = (index: number) => {
        const photoToRemove = existingPhotos[index]
        setPhotosToDelete([...photosToDelete, photoToRemove])
        setExistingPhotos(existingPhotos.filter((_, i) => i !== index))
    }

    const handleRemoveNewPhoto = (index: number) => {
        URL.revokeObjectURL(newPhotoPreviews[index])
        setNewPhotos(newPhotos.filter((_, i) => i !== index))
        setNewPhotoPreviews(newPhotoPreviews.filter((_, i) => i !== index))
    }

    const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])

        if (totalPhotos + files.length > 3) {
            setErros("Você pode ter no máximo 3 imagens por produto.")
            return
        }

        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
        const invalidFile = files.find(file => !validTypes.includes(file.type))
        if (invalidFile) {
            setErros("Tipo de arquivo inválido. Apenas JPEG, PNG, WEBP e JPG são permitidos.")
            return
        }

        const maxSize = 5 * 1024 * 1024
        const oversizedFile = files.find(file => file.size > maxSize)
        if (oversizedFile) {
            setErros("Cada imagem deve ter no máximo 5MB.")
            return
        }

        setNewPhotos([...newPhotos, ...files])
        const previews = files.map(file => URL.createObjectURL(file))
        setNewPhotoPreviews([...newPhotoPreviews, ...previews])
        setErros(null)
    }

    const handleUploadClick = () => {
        if (totalPhotos < 3) {
            fileInputRef.current?.click()
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setUpdating(true)
        setErros(null)

        // Capture form reference before any async operation
        const form = e.currentTarget
        const formData = new FormData(form)

        // Security: Verify authentication before proceeding
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            setErros('Sessão expirada. Faça login novamente.')
            setUpdating(false)
            return
        }
        
        // Sanitize inputs - trim whitespace
        const name = (formData.get('name') as string)?.trim()
        const category_id = (formData.get('category_id') as string)?.trim()
        const priceValue = (formData.get('price') as string)?.trim()
        const price = parseFloat(priceValue)
        const brief_description = (formData.get('brief_description') as string)?.trim()
        const detailed_description = (formData.get('detailed_description') as string)?.trim()

        // Validate required fields
        if (!name || !category_id || !priceValue || !brief_description || !detailed_description) {
            setErros('Preencha todos os campos obrigatórios.')
            setUpdating(false)
            return
        }

        // Validate price is a valid positive number
        if (isNaN(price) || price < 0) {
            setErros('O preço deve ser um número válido e positivo.')
            setUpdating(false)
            return
        }

        // Validate field lengths
        if (name.length > 200) {
            setErros('O nome do produto não pode ter mais de 200 caracteres.')
            setUpdating(false)
            return
        }

        if (brief_description.length > 500) {
            setErros('A breve descrição não pode ter mais de 500 caracteres.')
            setUpdating(false)
            return
        }

        if (detailed_description.length > 5000) {
            setErros('A descrição completa não pode ter mais de 5000 caracteres.')
            setUpdating(false)
            return
        }

        if (totalPhotos === 0) {
            setErros('Adicione pelo menos uma imagem.')
            setUpdating(false)
            return
        }

        try {
            let uploadedUrls: string[] = []

            // Upload new photos to Cloudinary
            if (newPhotos.length > 0) {
                const uploadFormData = new FormData()
                newPhotos.forEach(file => {
                    uploadFormData.append('files', file)
                })

                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData,
                })

                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json()
                    throw new Error(errorData.error || 'Erro ao fazer upload das imagens')
                }

                const uploadData = await uploadResponse.json()
                uploadedUrls = uploadData.images.map((img: { url: string }) => img.url)
            }

            // Delete removed photos from Cloudinary
            if (photosToDelete.length > 0) {
                const deleteResponse = await fetch('/api/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ imageUrls: photosToDelete }),
                })

                if (!deleteResponse.ok) {
                    console.error('Erro ao deletar imagens do Cloudinary')
                }
            }

            // Combine existing photos with newly uploaded ones
            const finalPhotos = [...existingPhotos, ...uploadedUrls]

            // Update product in Supabase
            const { error } = await supabase
                .from('products')
                .update({
                    name,
                    category_id,
                    price,
                    brief_description,
                    detailed_description,
                    photos: finalPhotos,
                })
                .eq('id', product.id)

            if (error) {
                throw new Error(error.message)
            }

            // Success - close modal
            setShowEditProdutoModal(false)
        } catch (error) {
            console.error('Erro ao atualizar produto:', error)
            setErros(error instanceof Error ? error.message : 'Erro ao atualizar produto')
        } finally {
            setUpdating(false)
        }
    }

    const getFilenameFromUrl = (url: string) => {
        const parts = url.split('/')
        return parts[parts.length - 1]
    }

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl shadow-xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-200 flex-shrink-0">
                    <div>
                        <h2 className="text-2xl font-semibold">Editar Produto</h2>
                        <p className="text-gray-500">Atualize os detalhes do produto abaixo.</p>
                    </div>
                    <button className="hover:scale-110 transition-transform duration-200 cursor-pointer" onClick={() => setShowEditProdutoModal(false)}>
                        <RxCross1 />
                    </button>
                </div>

                {erros && <div className="text-red-500 px-6 py-2 bg-red-50 border-b border-red-200">{erros}</div>}

                <div className="overflow-y-auto flex-grow px-6 py-4">
                    <form id="edit-product-form" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1 font-medium">Nome do Produto</label>
                                    <input defaultValue={product.name} type="text" name="name" className="w-full border border-gray-300 rounded-md p-2" placeholder="Ex: Cadeira de Escritório Ergonomica" required />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Categoria</label>
                                    <select defaultValue={product.category_id} className="w-full border border-gray-300 rounded-md p-2" name="category_id" required>
                                        <option value={product.categories.id}>{product.categories.name}</option>
                                        {categories.filter(cat => cat.id !== product.category_id).map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Valor (R$)</label>
                                    <input defaultValue={product.price.toFixed(2)} type="number" step="0.01" name="price" className="w-full border border-gray-300 rounded-md p-2" placeholder="R$ 0,00" required />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Breve Descrição <span className="text-gray-500 font-normal">(Exibida nos cards)</span></label>
                                    <textarea defaultValue={product.brief_description} className="w-full border border-gray-300 rounded-md p-2" name="brief_description" placeholder="Resumo curto do produto." required />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Descrição Completa</label>
                                    <textarea defaultValue={product.detailed_description} className="w-full border border-gray-300 rounded-md p-2" name="detailed_description" placeholder="Detalhes técnicos, materiais, dimensões e características do produto." rows={5} required />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Imagens do Produto</label>

                                {/* Existing Photos */}
                                <div className="space-y-2 mb-4">
                                    {existingPhotos.map((photo, index) => (
                                        <div key={`existing-${index}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                            <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={photo}
                                                    alt={`Foto ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{getFilenameFromUrl(photo)}</p>
                                                <p className="text-xs text-green-600">Salvo</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveExistingPhoto(index)}
                                                className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                            >
                                                <RiDeleteBin6Line size={18} />
                                            </button>
                                        </div>
                                    ))}

                                    {/* New Photos (to be uploaded) */}
                                    {newPhotos.map((photo, index) => (
                                        <div key={`new-${index}`} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={newPhotoPreviews[index]}
                                                    alt={`Nova foto ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{photo.name}</p>
                                                <p className="text-xs text-blue-600">Novo (será enviado ao salvar)</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveNewPhoto(index)}
                                                className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                            >
                                                <RiDeleteBin6Line size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Upload Area - only show if less than 3 photos */}
                                {totalPhotos < 3 && (
                                    <>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            multiple
                                            onChange={handleAddPhoto}
                                            className="hidden"
                                        />
                                        <div
                                            onClick={handleUploadClick}
                                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[var(--primary)] transition-colors"
                                        >
                                            <MdOutlineAddAPhoto className="mx-auto text-3xl text-gray-400 mb-2" />
                                            <p className="font-medium text-gray-700">Clique para adicionar imagens</p>
                                            <p className="text-sm text-gray-500">{3 - totalPhotos} slot(s) disponível(is)</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="flex justify-end gap-4 p-4 border-t border-gray-200">
                    <button type="button" onClick={() => setShowEditProdutoModal(false)} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer">Cancelar</button>
                    <button
                        type="submit"
                        form="edit-product-form"
                        disabled={updating || totalPhotos === 0 || !isAuthenticated}
                        className="px-4 py-2 rounded-md bg-[var(--primary)] text-white hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        title={!isAuthenticated ? 'Você precisa estar logado para editar' : undefined}
                    >
                        {updating ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </div>
        </div>
    )
}