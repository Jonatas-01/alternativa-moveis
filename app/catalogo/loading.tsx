export default function CatalogoLoading() {
    return (
        <div className="min-h-screen pb-16">
            {/* Header skeleton */}
            <div className="text-center py-12">
                <div className="h-10 w-80 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
                <div className="h-5 w-60 bg-gray-200 rounded mx-auto animate-pulse"></div>
            </div>

            <div className="container mx-auto px-6">
                {/* Search bar skeleton */}
                <div className="flex justify-center mb-6">
                    <div className="h-12 w-full max-w-md bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                {/* Filter buttons skeleton */}
                <div className="flex justify-center flex-wrap gap-3 mb-10">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                    ))}
                </div>

                {/* Products grid skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                            <div className="aspect-square bg-gray-200 animate-pulse"></div>
                            <div className="p-5">
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
                                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
