import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from "@/components/sidebar"

export default function PaymentGatewaysLoading() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-4 w-96 mt-2" />
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-96" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between items-center pt-2">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-9 w-28" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

