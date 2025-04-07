import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ExpenseEditLoading() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="expenses" />
      <div className="flex-1 flex flex-col overflow-hidden p-8">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="icon" disabled>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">Loading expense...</h1>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

