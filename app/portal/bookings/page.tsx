"use client"

import { useState } from "react"
import { Search, Filter, Calendar, Download, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for bookings
const bookings = [
  {
    id: "B1001",
    property: "Marina Towers 301",
    guest: "John Smith",
    checkIn: "2024-02-15",
    checkOut: "2024-02-20",
    nights: 5,
    guests: 2,
    amount: 2500,
    status: "confirmed",
    channel: "Booking.com",
  },
  {
    id: "B1002",
    property: "Downtown Heights 205",
    guest: "Sarah Johnson",
    checkIn: "2024-02-18",
    checkOut: "2024-02-25",
    nights: 7,
    guests: 1,
    amount: 3200,
    status: "confirmed",
    channel: "Airbnb",
  },
  {
    id: "B1003",
    property: "Palm Residences 401",
    guest: "Michael Brown",
    checkIn: "2024-02-22",
    checkOut: "2024-02-28",
    nights: 6,
    guests: 4,
    amount: 4100,
    status: "pending",
    channel: "Direct",
  },
  {
    id: "B1004",
    property: "Marina Towers 301",
    guest: "Emma Wilson",
    checkIn: "2024-03-05",
    checkOut: "2024-03-10",
    nights: 5,
    guests: 2,
    amount: 2700,
    status: "confirmed",
    channel: "Expedia",
  },
  {
    id: "B1005",
    property: "Downtown Heights 205",
    guest: "David Lee",
    checkIn: "2024-03-12",
    checkOut: "2024-03-15",
    nights: 3,
    guests: 1,
    amount: 1500,
    status: "confirmed",
    channel: "Booking.com",
  },
  {
    id: "B1006",
    property: "Palm Residences 401",
    guest: "Jennifer Garcia",
    checkIn: "2024-03-18",
    checkOut: "2024-03-25",
    nights: 7,
    guests: 5,
    amount: 5200,
    status: "pending",
    channel: "Airbnb",
  },
]

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [propertyFilter, setPropertyFilter] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    // Search filter
    const matchesSearch =
      booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.property.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    // Property filter
    const matchesProperty = propertyFilter === "all" || booking.property === propertyFilter

    return matchesSearch && matchesStatus && matchesProperty
  })

  // Get unique properties for filter
  const properties = [...new Set(bookings.map((booking) => booking.property))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search bookings..."
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
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={propertyFilter} onValueChange={setPropertyFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                {properties.map((property) => (
                  <SelectItem key={property} value={property}>
                    {property}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="rounded-full">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Booking ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Property</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Guest</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Check-in</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Check-out</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Nights</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Amount</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Status</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Channel</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{booking.id}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{booking.property}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{booking.guest}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{booking.checkIn}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{booking.checkOut}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 text-center">{booking.nights}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 text-right">
                          AED {booking.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <Badge
                            variant={
                              booking.status === "confirmed"
                                ? "success"
                                : booking.status === "pending"
                                  ? "warning"
                                  : "destructive"
                            }
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 text-center">{booking.channel}</td>
                        <td className="px-4 py-4 text-right">
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="current" className="space-y-6">
          <div className="flex items-center justify-center p-12 border border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No Current Bookings</h3>
              <p className="mt-1 text-sm text-gray-500">There are no guests currently staying at your properties.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          <div className="flex items-center justify-center p-12 border border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <Clock className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Past Bookings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Past bookings will be displayed here. You can view booking history and guest reviews.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <div className="flex items-center justify-center p-12 border border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">All Bookings</h3>
              <p className="mt-1 text-sm text-gray-500">
                View all bookings across your properties, including past, current, and upcoming stays.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

