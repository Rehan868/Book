"use client"

import { useState } from "react"
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  addWeeks,
  subWeeks,
  isWithinInterval,
} from "date-fns"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Mock data for properties and bookings
const properties = [
  { id: "prop1", name: "Marina Towers 301", type: "Apartment", bedrooms: 2 },
  { id: "prop2", name: "Downtown Heights 205", type: "Apartment", bedrooms: 1 },
  { id: "prop3", name: "Palm Residences 401", type: "Villa", bedrooms: 3 },
]

const bookings = [
  {
    id: "B1001",
    propertyId: "prop1",
    guest: "John Smith",
    startDate: new Date(2024, 2, 15),
    endDate: new Date(2024, 2, 20),
    status: "confirmed",
  },
  {
    id: "B1002",
    propertyId: "prop2",
    guest: "Sarah Johnson",
    startDate: new Date(2024, 2, 18),
    endDate: new Date(2024, 2, 25),
    status: "confirmed",
  },
  {
    id: "B1003",
    propertyId: "prop3",
    guest: "Michael Brown",
    startDate: new Date(2024, 2, 22),
    endDate: new Date(2024, 2, 28),
    status: "pending",
  },
  {
    id: "B1004",
    propertyId: "prop1",
    guest: "Emma Wilson",
    startDate: new Date(2024, 3, 5),
    endDate: new Date(2024, 3, 10),
    status: "confirmed",
  },
]

// Maintenance events
const maintenanceEvents = [
  {
    id: "M1001",
    propertyId: "prop1",
    title: "AC Maintenance",
    startDate: new Date(2024, 2, 12),
    endDate: new Date(2024, 2, 12),
  },
  {
    id: "M1002",
    propertyId: "prop3",
    title: "Pool Cleaning",
    startDate: new Date(2024, 2, 20),
    endDate: new Date(2024, 2, 20),
  },
]

export default function AvailabilityCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedProperty, setSelectedProperty] = useState("all")
  const [viewMode, setViewMode] = useState("month")

  // Calculate the days to display based on view mode
  const daysToShow =
    viewMode === "week"
      ? eachDayOfInterval({
          start: startOfWeek(currentDate, { weekStartsOn: 1 }),
          end: endOfWeek(currentDate, { weekStartsOn: 1 }),
        })
      : eachDayOfInterval({
          start: startOfWeek(currentDate, { weekStartsOn: 1 }),
          end: addDays(endOfWeek(currentDate, { weekStartsOn: 1 }), 21), // Show 4 weeks for month view
        })

  // Handle navigation
  const goToToday = () => setCurrentDate(new Date())

  const goToPrevious = () => {
    if (viewMode === "week") {
      setCurrentDate((prev) => subWeeks(prev, 1))
    } else {
      setCurrentDate((prev) => subWeeks(prev, 4))
    }
  }

  const goToNext = () => {
    if (viewMode === "week") {
      setCurrentDate((prev) => addWeeks(prev, 1))
    } else {
      setCurrentDate((prev) => addWeeks(prev, 4))
    }
  }

  // Filter properties based on selection
  const filteredProperties =
    selectedProperty === "all" ? properties : properties.filter((prop) => prop.id === selectedProperty)

  // Check if a date has a booking for a specific property
  const getBookingForDate = (date, propertyId) => {
    return bookings.find(
      (booking) =>
        booking.propertyId === propertyId && isWithinInterval(date, { start: booking.startDate, end: booking.endDate }),
    )
  }

  // Check if a date has maintenance for a specific property
  const getMaintenanceForDate = (date, propertyId) => {
    return maintenanceEvents.find(
      (event) =>
        event.propertyId === propertyId && isWithinInterval(date, { start: event.startDate, end: event.endDate }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Availability Calendar</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {properties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={goToNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {`${format(daysToShow[0], "MMMM d")} - ${format(daysToShow[daysToShow.length - 1], "MMMM d, yyyy")}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Calendar header */}
              <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(40px,1fr))]">
                <div className="border-b border-r border-gray-200 p-2 font-medium text-gray-500">Property</div>
                {daysToShow.map((day, i) => (
                  <div
                    key={i}
                    className={cn(
                      "border-b border-r border-gray-200 p-2 text-center text-xs font-medium",
                      isSameDay(day, new Date()) ? "bg-blue-50" : "",
                    )}
                  >
                    <div className="text-gray-900">{format(day, "d")}</div>
                    <div className="text-gray-500">{format(day, "EEE")}</div>
                  </div>
                ))}
              </div>

              {/* Calendar body */}
              {filteredProperties.map((property) => (
                <div key={property.id} className="grid grid-cols-[200px_repeat(auto-fill,minmax(40px,1fr))]">
                  <div className="border-b border-r border-gray-200 p-2">
                    <div className="font-medium text-gray-900">{property.name}</div>
                    <div className="text-xs text-gray-500">
                      {property.type}, {property.bedrooms} BR
                    </div>
                  </div>

                  {daysToShow.map((day, i) => {
                    const booking = getBookingForDate(day, property.id)
                    const maintenance = getMaintenanceForDate(day, property.id)

                    let cellClass = "border-b border-r border-gray-200 p-1 text-center"
                    let content = null

                    if (booking) {
                      const isFirstDay = isSameDay(day, booking.startDate)
                      const isLastDay = isSameDay(day, booking.endDate)

                      cellClass += booking.status === "confirmed" ? " bg-green-100" : " bg-yellow-100"

                      if (isFirstDay) {
                        content = <div className="text-xs truncate">{isFirstDay && <span>Check-in</span>}</div>
                      } else if (isLastDay) {
                        content = <div className="text-xs truncate">{isLastDay && <span>Check-out</span>}</div>
                      } else {
                        content = (
                          <div className="text-xs truncate">
                            <span>Booked</span>
                          </div>
                        )
                      }
                    } else if (maintenance) {
                      cellClass += " bg-purple-100"
                      content = (
                        <div className="text-xs truncate">
                          <span>Maint.</span>
                        </div>
                      )
                    } else {
                      cellClass += " bg-gray-50"
                      content = (
                        <div className="text-xs text-gray-400">
                          <span>Available</span>
                        </div>
                      )
                    }

                    return (
                      <div key={i} className={cellClass}>
                        {content}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
          <span>Confirmed Booking</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
          <span>Pending Booking</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
          <span>Maintenance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></div>
          <span>Available</span>
        </div>
      </div>
    </div>
  )
}

