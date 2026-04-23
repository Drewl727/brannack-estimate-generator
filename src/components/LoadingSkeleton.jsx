export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-10" aria-label="Loading estimate...">
      {/* Header block */}
      <div className="flex justify-between items-start pb-6 border-b border-gray-200">
        <div className="space-y-2">
          <div className="h-6 w-52 bg-gray-200 rounded" />
          <div className="h-3 w-36 bg-gray-200 rounded" />
          <div className="h-3 w-44 bg-gray-200 rounded" />
        </div>
        <div className="space-y-2 text-right">
          <div className="h-5 w-32 bg-gray-200 rounded ml-auto" />
          <div className="h-3 w-24 bg-gray-200 rounded ml-auto" />
          <div className="h-3 w-20 bg-gray-200 rounded ml-auto" />
        </div>
      </div>

      {/* Client info */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-36 bg-gray-200 rounded" />
          <div className="h-3 w-44 bg-gray-200 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Scope summary */}
      <div className="space-y-2 py-4 border-y border-gray-100">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-5/6 bg-gray-100 rounded" />
        <div className="h-3 w-4/6 bg-gray-100 rounded" />
      </div>

      {/* Table header */}
      <div>
        <div className="grid grid-cols-5 gap-2 mb-2 pb-2 border-b-2 border-gray-200">
          {['Description', 'Qty', 'Unit', 'Unit Price', 'Total'].map((h) => (
            <div key={h} className="h-3 bg-gray-200 rounded" />
          ))}
        </div>
        {/* Table rows */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="grid grid-cols-5 gap-2 py-2.5 border-b border-gray-100">
            <div className="h-3 bg-gray-100 rounded col-span-1" style={{ width: `${60 + i * 10}%` }} />
            <div className="h-3 bg-gray-100 rounded w-8" />
            <div className="h-3 bg-gray-100 rounded w-10" />
            <div className="h-3 bg-gray-100 rounded w-16" />
            <div className="h-3 bg-gray-100 rounded w-16" />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2 p-4 bg-gray-50 rounded-lg">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          ))}
          <div className="pt-2 border-t border-gray-200 flex justify-between">
            <div className="h-5 w-24 bg-gray-300 rounded" />
            <div className="h-5 w-20 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
