"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Import the expenses data
import { expenses } from "../../data"

export default function ExpenseEditPage({ params }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
    department: "",
    payment: "",
    status: "",
    notes: "",
  })

  useEffect(() => {
    // Simulate API fetch
    const id = Number.parseInt(params.id)
    if (isNaN(id) || id < 0 || id >= expenses.length) {
      // Invalid ID, redirect to expenses list
      router.push("/expenses")
      return
    }

    const expense = expenses[id]
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      date: expense.date,
      category: expense.category,
      department: expense.department,
      payment: expense.payment,
      status: expense.status,
      notes: expense.notes || "",
    })
    setLoading(false)
  }, [params.id, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would update the expense in your database
    console.log("Updated expense:", formData)

    // Redirect back to the expense details page
    router.push(`/expenses/${params.id}`)
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar activePage="expenses" />
        <div className="flex-1 flex flex-col overflow-hidden p-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
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
              <h1 className="text-2xl font-semibold text-gray-800">Edit Expense</h1>
            </div>
            <Button className="flex items-center gap-2" onClick={handleSubmit}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Information</CardTitle>
                    <CardDescription>Edit the details of this expense</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          name="amount"
                          type="number"
                          step="0.01"
                          value={formData.amount}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Approved">Approved</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleSelectChange("category", value)}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Supplies">Supplies</SelectItem>
                            <SelectItem value="Equipment">Equipment</SelectItem>
                            <SelectItem value="Services">Services</SelectItem>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                            <SelectItem value="Training">Training</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Utilities">Utilities</SelectItem>
                            <SelectItem value="Renovation">Renovation</SelectItem>
                            <SelectItem value="Compensation">Compensation</SelectItem>
                            <SelectItem value="Transportation">Transportation</SelectItem>
                            <SelectItem value="Software">Software</SelectItem>
                            <SelectItem value="Food">Food</SelectItem>
                            <SelectItem value="Decor">Decor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => handleSelectChange("department", value)}
                        >
                          <SelectTrigger id="department">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                            <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                            <SelectItem value="Kitchen">Kitchen</SelectItem>
                            <SelectItem value="Administration">Administration</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Restaurant">Restaurant</SelectItem>
                            <SelectItem value="Rooms">Rooms</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                            <SelectItem value="Facilities">Facilities</SelectItem>
                            <SelectItem value="IT">IT</SelectItem>
                            <SelectItem value="Security">Security</SelectItem>
                            <SelectItem value="Events">Events</SelectItem>
                            <SelectItem value="Spa">Spa</SelectItem>
                            <SelectItem value="Fitness">Fitness</SelectItem>
                            <SelectItem value="Guest Services">Guest Services</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Legal">Legal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment">Payment Method</Label>
                        <Select
                          value={formData.payment}
                          onValueChange={(value) => handleSelectChange("payment", value)}
                        >
                          <SelectTrigger id="payment">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Credit Card">Credit Card</SelectItem>
                            <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                            <SelectItem value="Cash">Cash</SelectItem>
                          </SelectContent>
                        </Select>
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
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Add any additional notes about this expense"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="attachments">Attachments</Label>
                        <Input id="attachments" type="file" />
                        <p className="text-sm text-gray-500 mt-1">
                          Upload receipts or other supporting documents (PDF, JPG, PNG)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Save Changes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        Review your changes before saving. All fields marked with an asterisk (*) are required.
                      </p>
                      <Button className="w-full" type="submit">
                        Save Changes
                      </Button>
                      <Button
                        className="w-full"
                        variant="outline"
                        type="button"
                        onClick={() => router.push(`/expenses/${params.id}`)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Expense History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-2 border-gray-200 pl-4 py-1">
                        <p className="text-sm text-gray-500">Created on {formData.date}</p>
                        <p className="text-sm font-medium">John Doe created this expense</p>
                      </div>
                      {formData.status !== "Pending" && (
                        <div className="border-l-2 border-gray-200 pl-4 py-1">
                          <p className="text-sm text-gray-500">{formData.date}</p>
                          <p className="text-sm font-medium">
                            Jane Smith {formData.status === "Approved" ? "approved" : "rejected"} this expense
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

