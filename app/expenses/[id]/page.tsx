"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Download, Printer, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Import the expenses data
import { expenses } from "../data"

export default function ExpenseDetailPage({ params }) {
  const router = useRouter()
  const [expense, setExpense] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const id = Number.parseInt(params.id)
    if (isNaN(id) || id < 0 || id >= expenses.length) {
      // Invalid ID, redirect to expenses list
      router.push("/expenses")
      return
    }

    setExpense(expenses[id])
    setLoading(false)
  }, [params.id, router])

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar activePage="expenses" />
        <div className="flex-1 flex flex-col overflow-hidden p-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800">Loading expense details...</h1>
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

  if (!expense) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar activePage="expenses" />
        <div className="flex-1 flex flex-col overflow-hidden p-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800">Expense Not Found</h1>
          </div>
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-500">The expense you are looking for does not exist or has been deleted.</p>
              <Button className="mt-4" onClick={() => router.push("/expenses")}>
                Return to Expenses List
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="expenses" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-semibold text-gray-800">Expense Details</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button asChild className="flex items-center gap-2">
                <Link href={`/expenses/${params.id}/edit`}>
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Information</CardTitle>
                  <CardDescription>Details about this expense</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                      <p className="text-gray-900">{expense.description}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Amount</h3>
                      <p className="text-gray-900 font-semibold text-lg">${expense.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                      <p className="text-gray-900">{expense.date}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                      <StatusBadge status={expense.status} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                      <p className="text-gray-900">{expense.category}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Department</h3>
                      <p className="text-gray-900">{expense.department}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Payment Method</h3>
                      <p className="text-gray-900">{expense.payment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Notes</h3>
                      <p className="text-gray-900">{expense.notes || "No additional notes for this expense."}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Attachments</h3>
                      <p className="text-gray-500 italic">No attachments found.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Approval Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                      <StatusBadge status={expense.status} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Submitted By</h3>
                      <p className="text-gray-900">John Doe</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Submitted On</h3>
                      <p className="text-gray-900">{expense.date}</p>
                    </div>
                    {expense.status !== "Pending" && (
                      <>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            {expense.status === "Approved" ? "Approved By" : "Rejected By"}
                          </h3>
                          <p className="text-gray-900">Jane Smith</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            {expense.status === "Approved" ? "Approved On" : "Rejected On"}
                          </h3>
                          <p className="text-gray-900">{expense.date}</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accounting Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Account Code</h3>
                      <p className="text-gray-900">EXP-{params.id.padStart(4, "0")}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Tax Amount</h3>
                      <p className="text-gray-900">${(expense.amount * 0.1).toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Total Amount</h3>
                      <p className="text-gray-900 font-semibold">${(expense.amount * 1.1).toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-100"
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-100"
      case "rejected":
        return "bg-red-50 text-red-700 border-red-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-100"
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {status}
    </span>
  )
}

