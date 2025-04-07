"use client"

import { useState } from "react"
import { Search, Plus, Download, Filter, Eye, Pencil, Trash2, Home, DollarSign, Calendar } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"

// Mock data for property owners
const owners = [
  {
    id: 1,
    name: "Ahmed Al Mansouri",
    email: "ahmed.m@example.com",
    phone: "+971 50 123 4567",
    properties: 3,
    totalRevenue: 45000,
    nextPayout: "2024-02-15",
    status: "active",
  },
  {
    id: 2,
    name: "Fatima Rahman",
    email: "fatima.r@example.com",
    phone: "+971 55 987 6543",
    properties: 2,
    totalRevenue: 32000,
    nextPayout: "2024-02-18",
    status: "active",
  },
  {
    id: 3,
    name: "Mohammed Al Qasimi",
    email: "mohammed.q@example.com",
    phone: "+971 52 456 7890",
    properties: 5,
    totalRevenue: 78000,
    nextPayout: "2024-02-20",
    status: "active",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+971 54 234 5678",
    properties: 1,
    totalRevenue: 18000,
    nextPayout: "2024-02-16",
    status: "inactive",
  },
  {
    id: 5,
    name: "Omar Al Farsi",
    email: "omar.f@example.com",
    phone: "+971 56 876 5432",
    properties: 4,
    totalRevenue: 62000,
    nextPayout: "2024-02-22",
    status: "active",
  },
]

export default function OwnersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ownerToDelete, setOwnerToDelete] = useState<number | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteClick = (ownerId: number) => {
    setOwnerToDelete(ownerId)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    console.log(`Deleting owner with ID: ${ownerToDelete}`)
    // Here you would call your API to delete the owner
    setShowDeleteDialog(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="owners" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Property Owners</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Link href="/owners/add">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Owner
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search owners..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="rounded-full">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOwners.map((owner) => (
              <Card key={owner.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{owner.name}</h3>
                        <p className="text-sm text-gray-500">{owner.email}</p>
                        <p className="text-sm text-gray-500">{owner.phone}</p>
                      </div>
                      <div
                        className={`px-2 py-1 text-xs rounded-full ${
                          owner.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {owner.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Properties</span>
                        <div className="flex items-center mt-1">
                          <Home className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="font-medium">{owner.properties}</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Total Revenue</span>
                        <div className="flex items-center mt-1">
                          <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="font-medium">AED {owner.totalRevenue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col mb-4">
                      <span className="text-sm text-gray-500">Next Payout</span>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="font-medium">{owner.nextPayout}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex border-t border-gray-100">
                    <Link
                      href={`/owners/${owner.id}`}
                      className="flex-1 flex items-center justify-center py-3 text-sm text-blue-600 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                    <div className="w-px bg-gray-100"></div>
                    <Link
                      href={`/owners/${owner.id}/edit`}
                      className="flex-1 flex items-center justify-center py-3 text-sm text-amber-600 hover:bg-amber-50"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                    <div className="w-px bg-gray-100"></div>
                    <button
                      onClick={() => handleDeleteClick(owner.id)}
                      className="flex-1 flex items-center justify-center py-3 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOwners.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No owners found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this owner? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

