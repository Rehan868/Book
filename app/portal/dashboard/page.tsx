"use client"

import { useState } from "react"
import { Building2, DollarSign, Calendar, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function OwnerDashboard() {
  const [timeframe, setTimeframe] = useState("30")

  // Mock data for the dashboard
  const dashboardData = {
    totalRevenue: 45000,
    revenueChange: "+12.5%",
    occupancyRate: 78,
    occupancyChange: "+5.2%",
    averageRate: 189,
    rateChange: "-2.1%",
    upcomingBookings: 12,
    bookingsChange: "+3",
    properties: [
      {
        id: 1,
        name: "Marina Towers 301",
        type: "Apartment",
        location: "Dubai Marina",
        revenue: 18500,
        occupancy: 82,
        bookings: 5,
        status: "active",
      },
      {
        id: 2,
        name: "Downtown Heights 205",
        type: "Apartment",
        location: "Downtown Dubai",
        revenue: 15200,
        occupancy: 75,
        bookings: 4,
        status: "active",
      },
      {
        id: 3,
        name: "Palm Residences 401",
        type: "Villa",
        location: "Palm Jumeirah",
        revenue: 11300,
        occupancy: 68,
        bookings: 3,
        status: "active",
      },
    ],
    recentBookings: [
      {
        id: "B1001",
        property: "Marina Towers 301",
        guest: "John Smith",
        checkIn: "2024-02-15",
        checkOut: "2024-02-20",
        amount: 2500,
        status: "confirmed",
      },
      {
        id: "B1002",
        property: "Downtown Heights 205",
        guest: "Sarah Johnson",
        checkIn: "2024-02-18",
        checkOut: "2024-02-25",
        amount: 3200,
        status: "confirmed",
      },
      {
        id: "B1003",
        property: "Palm Residences 401",
        guest: "Michael Brown",
        checkIn: "2024-02-22",
        checkOut: "2024-02-28",
        amount: 4100,
        status: "pending",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`AED ${dashboardData.totalRevenue.toLocaleString()}`}
          change={dashboardData.revenueChange}
          icon={<DollarSign className="h-5 w-5 text-blue-600" />}
          positive={true}
        />
        <MetricCard
          title="Occupancy Rate"
          value={`${dashboardData.occupancyRate}%`}
          change={dashboardData.occupancyChange}
          icon={<Building2 className="h-5 w-5 text-green-600" />}
          positive={true}
        />
        <MetricCard
          title="Average Daily Rate"
          value={`AED ${dashboardData.averageRate}`}
          change={dashboardData.rateChange}
          icon={<TrendingUp className="h-5 w-5 text-red-600" />}
          positive={false}
        />
        <MetricCard
          title="Upcoming Bookings"
          value={dashboardData.upcomingBookings.toString()}
          change={dashboardData.bookingsChange}
          icon={<Calendar className="h-5 w-5 text-purple-600" />}
          positive={true}
        />
      </div>

      {/* Properties overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Properties</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Property</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Revenue</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Occupancy</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Bookings</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dashboardData.properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{property.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{property.type}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{property.location}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right">
                      AED {property.revenue.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right">{property.occupancy}%</td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right">{property.bookings}</td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          property.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {property.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Booking ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Property</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Guest</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Check-in</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Check-out</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dashboardData.recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{booking.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{booking.property}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{booking.guest}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{booking.checkIn}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{booking.checkOut}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right">
                      AED {booking.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status === "confirmed"
                          ? "Confirmed"
                          : booking.status === "pending"
                            ? "Pending"
                            : booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming payouts */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">February 2024 Payout</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Scheduled for Feb 15, 2024
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold">AED 12,000</div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">March 2024 Payout</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Scheduled for Mar 15, 2024
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold">AED 13,500 (Estimated)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({ title, value, change, icon, positive }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-full bg-gray-100">{icon}</div>
          <div className={`text-sm ${positive ? "text-green-600" : "text-red-600"}`}>{change}</div>
        </div>
        <div className="text-sm text-gray-500 mb-1">{title}</div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
      </CardContent>
    </Card>
  )
}

