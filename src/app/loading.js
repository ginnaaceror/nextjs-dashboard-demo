export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-white/20 rounded animate-pulse" />
            <div className="h-10 w-24 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-start items-end gap-4">
            <div className="flex gap-2">
              <div className="h-10 w-20 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient p-6">
            <div className="h-6 w-48 bg-white/20 rounded animate-pulse" />
          </div>

          <div className="p-4 border-b border-gray-light">
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
          </div>

          <div className="p-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 border-b border-gray-light"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
