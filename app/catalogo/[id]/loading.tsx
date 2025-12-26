export default function ProductLoading() {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image gallery skeleton */}
                <div>
                    <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse mb-4"></div>
                    <div className="flex gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                </div>

                {/* Product info skeleton */}
                <div className="flex flex-col">
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
                    <div className="space-y-3 mb-8">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-14 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}
