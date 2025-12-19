interface Product {
    id: string;
    name: string;
    photos: string[];
    category_id: string;
    brief_description: string;
    detailed_description: string;
    price: number;
}

export default function EditProdutoModal({ setShowEditProdutoModal, product }: { setShowEditProdutoModal: (value: boolean) => void, product: Product }) {
    return (
        <div>

        </div>
    )
}