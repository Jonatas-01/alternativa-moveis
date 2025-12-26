export default function SobreNosLoading() {
    return (
        <div className="container mx-auto px-6 py-12">
            {/* Header skeleton */}
            <div className="text-center mb-12">
                <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
                <div className="h-5 w-96 max-w-full bg-gray-200 rounded mx-auto animate-pulse"></div>
            </div>

            {/* Mission section skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="aspect-video bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="flex flex-col justify-center space-y-4">
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>

            {/* Values section skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                        <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-3 animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded mx-auto mt-2 animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
