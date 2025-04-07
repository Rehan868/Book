// Add a default export function at the beginning of the file
export default function CleaningTaskDetailPage() {
  // Add proper error handling
  try {
    // Your code here
  } catch (error) {
    // Convert error to string before rendering
    const errorMessage = error instanceof Error ? error.message : String(error || "Unknown error")
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Error</h2>
        <p>{errorMessage}</p>
      </div>
    )
  }
}

