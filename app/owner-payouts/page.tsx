"use client"

import { useState } from "react"
import { Search, Download, Filter, Calendar, ChevronDown, ArrowUpRight, DollarSign, Check, X } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for owner payouts
const payouts = [
  {
    id: "P1001",
    owner: "Ahmed Al Mansouri",
    ownerId: 1,
    amount: 15000,
    status: "completed",
    date: "2024-01-15",
    method: "Bank Transfer",
    reference: "REF123456",
    properties: ["Marina Towers 301", "Downtown Heights 205"],
    period: "Dec 2023",
  },
  {
    id: "P1002",
    owner: "Fatima Rahman",
    ownerId: 2,
    amount: 12000,
    status: "pending",
    date: "2024-02-15",
    method: "Bank Transfer",
    reference: "REF789012",
    properties: ["Palm Residences 401"],
    period: "Jan 2024",
  },
  {
    id: "P1003",
    owner: "Mohammed Al Qasimi",
    ownerId: 3,
    amount: 28000,
    status: "scheduled",
    date: "2024-02-20",
    method: "Bank Transfer",
    reference: "REF345678",
    properties: ["JBR Apartments 501", "Marina Towers 302", "Downtown Heights 206"],
    period: "Jan 2024",
  },
  {
    id: "P1004",
    owner: "Sarah Johnson",
    ownerId: 4,
    amount: 8000,
    status: "failed",
    date: "2024-01-20",
    method: "Bank Transfer",
    reference: "REF901234",
    properties: ["Palm Residences 402"],
    period: "Dec 2023",
  },
  {
    id: "P1005",
    owner: "Omar Al Farsi",
    ownerId: 5,
    amount: 22000,
    status: "completed",
    date: "2024-01-18",
    method: "Bank Transfer",
    reference: "REF567890",
    properties: ["JBR Apartments 502", "Marina Towers 303"],
    period: "Dec 2023",
  },
]

export default function OwnerPayoutsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayouts = payouts.filter(
    (payout) =>
      (payout.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payout.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || payout.status === statusFilter),
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="owner-payouts" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Owner Payouts</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Process Payouts
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total Payouts (This Month)</p>
                  <p className="text-2xl font-bold">AED 85,000</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-gray-300" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Pending Payouts</p>
                  <p className="text-2xl font-bold">AED 40,000</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-gray-300" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Completed Payouts</p>
                  <p className="text-2xl font-bold">AED 37,000</p>
                </div>
                <Check className="h-8 w-8 text-green-300" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Failed Payouts</p>
                  <p className="text-2xl font-bold">AED 8,000</p>
                </div>
                <X className="h-8 w-8 text-red-300" />
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by owner or payout ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
              <ChevronDown className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" className="rounded-full">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payout ID</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Properties</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-medium">{payout.id}</TableCell>
                    <TableCell>{payout.owner}</TableCell>
                    <TableCell>AED {payout.amount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(payout.status)}</TableCell>
                    <TableCell>{payout.date}</TableCell>
                    <TableCell>{payout.method}</TableCell>
                    <TableCell>{payout.period}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate">{payout.properties.join(", ")}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredPayouts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No payouts found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

