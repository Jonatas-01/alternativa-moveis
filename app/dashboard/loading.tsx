export default function DashboardLoading() {
    return (
        <div className="container mx-auto px-6 py-8">
            {/* Header skeleton */}
            <div className="flex justify-between items-center mb-8">
                <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex gap-3">
                    <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
            </div>

            {/* Stats cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-xl">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                ))}
            </div>

            {/* Products table skeleton */}
            <div className="bg-gray-100 rounded-[20px] p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                {/* Table header */}
                <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-gray-200">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                </div>

                {/* Table rows */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="grid grid-cols-5 gap-4 items-center px-4 py-4 bg-white border-b border-gray-200">
                        <div className="col-span-2 flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="flex-1">
                                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                        <div className="h-6 w-20 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
                        <div className="h-5 w-24 bg-gray-200 rounded mx-auto animate-pulse"></div>
                        <div className="flex justify-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
