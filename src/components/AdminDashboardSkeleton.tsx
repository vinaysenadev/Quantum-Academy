const AdminDashboardSkeleton = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 animate-pulse">
      <aside className="w-64 bg-white border-r p-6 space-y-6">
        <div className="h-8 w-40 bg-gray-200 rounded" />

        <div className="space-y-4 mt-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-5 w-5 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-7 w-64 bg-gray-200 rounded" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-[3] space-y-6">
            <div className="grid grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-28 bg-gray-200 rounded-2xl" />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="h-80 bg-gray-200 rounded-2xl" />
              <div className="h-80 bg-gray-200 rounded-2xl" />
            </div>

            <div className="h-96 bg-gray-200 rounded-2xl" />
          </div>

          <div className="flex-1 space-y-6">
            <div className="h-6 w-40 bg-gray-200 rounded" />

            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardSkeleton;
