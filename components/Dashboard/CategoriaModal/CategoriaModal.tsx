
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { supabase } from "@/lib/supabase-client";

const CATEGORY_COLORS = [
    { name: 'Azul', value: '#3B82F6' },
    { name: 'Verde', value: '#10B981' },
    { name: 'Roxo', value: '#8B5CF6' },
    { name: 'Laranja', value: '#F59E0B' },
    { name: 'Rosa', value: '#EC4899' },
    { name: 'Vermelho', value: '#EF4444' },
];

interface Category {
    id: number;
    name: string;
    created_at: string;
    color: string;
}

export default function CategoriaModal({ setShowCategoriasModal }: { setShowCategoriasModal: (value: boolean) => void }) {
    const [newCategory, setNewCategory] = useState({ name: '', color: CATEGORY_COLORS[0].value })
    const [erros, setErros] = useState<string | null>(null)
    const [categories, setCategories] = useState<Category[]>([])

    const fetchCategories = async () => {
        const { error, data } = await supabase
            .from('categories')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Erro ao buscar categorias:', error.message)
            return
        }

        setCategories(data)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newCategory.name.trim() === '') {
            setErros('O nome da categoria não pode estar vazio.')
            return
        }

        const { error } = await supabase.from('categories').insert(newCategory).single()

        if (error) {
            console.error('Erro ao adicionar categoria:', error.message)
            return
        }

        setNewCategory({ name: '', color: CATEGORY_COLORS[0].value })
        fetchCategories()
    }

    useEffect(() => {
        fetchCategories()
        
        // Listen for real-time updates
        const channel = supabase
            .channel('categories-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'categories' },
                () => {
                    fetchCategories()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const onDeleteCategory = async (id: number) => {
        const { error } = await supabase.from('categories').delete().eq('id', id)

        if (error) {
            console.error('Erro ao deletar categoria:', error.message)
            return
        }

        fetchCategories()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl mx-4 shadow-xl">
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-200">
                    <h2 className="text-xl font-bold">Gerenciar Categorias</h2>
                    <button className="hover:scale-110 transition-transform duration-200 cursor-pointer" onClick={() => setShowCategoriasModal(false)}><RxCross1 /></button>
                </div>

                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                placeholder="Nova Categoria"
                                value={newCategory.name}
                                onChange={(e) => { setNewCategory({ ...newCategory, name: e.target.value }); setErros(null); }}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"

                            />


                            <div className="flex justify-space-between items-center gap-2">
                                <select
                                    value={newCategory.color}
                                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                                    required
                                >
                                    {CATEGORY_COLORS.map((color) => (
                                        <option key={color.value} value={color.value}>{color.name}</option>
                                    ))}
                                </select>

                                <button
                                    type="submit"
                                    className="bg-[var(--primary)] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer"
                                >
                                    <IoMdAdd className="text-lg" />
                                    Adicionar
                                </button>
                            </div>

                        </div>
                    </form>

                    {erros && <p className="text-sm mt-1" style={{ color: "red" }}>{erros}</p>}

                    <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Categorias Existentes</h4>
                        <div className="max-h-48 overflow-y-auto space-y-1">
                            {/* Render existing categories here */}
                            {categories.map((category) => (
                                <div key={category.id} className="flex justify-between items-center p-2 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></span>
                                        <span className="font-medium">{category.name}</span>
                                    </div>
                                    <button
                                        className="text-red-600 hover:text-red-800 cursor-pointer hover:scale-110 transition-transform duration-200"
                                        onClick={() => onDeleteCategory(category.id)}
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}