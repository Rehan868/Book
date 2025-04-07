"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, RefreshCw, Plus, Search, User, Calendar, Clock, MapPin, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Sidebar from "@/components/sidebar"
import { format, addDays, subDays, isSameDay, isWithinInterval } from "date-fns"

// Enhanced booking data with more details
interface Booking {
  id: string
  guest: string
  startDate: Date
  endDate: Date
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled"
  roomNumber: string
  roomType: string
  location: string
  notes?: string
  phone?: string
  email?: string
}

// Sample data for rooms and bookings
const generateBookings = (): Booking[] => {
  return [
    {
      id: "b1",
      guest: "Emma Johnson",
      startDate: new Date(2025, 3, 5), // April 5, 2025
      endDate: new Date(2025, 3, 8), // April 8, 2025
      status: "confirmed",
      roomNumber: "101",
      roomType: "Standard",
      location: "Marina Tower",
      notes: "Early check-in requested",
      phone: "+1 (555) 123-4567",
      email: "emma.johnson@example.com",
    },
    {
      id: "b2",
      guest: "Michael Chen",
      startDate: new Date(2025, 3, 5),
      endDate: new Date(2025, 3, 10),
      status: "checked-in",
      roomNumber: "102",
      roomType: "Deluxe",
      location: "Marina Tower",
      notes: "Business traveler, needs quiet room",
      phone: "+1 (555) 987-6543",
      email: "michael.chen@example.com",
    },
    {
      id: "b3",
      guest: "Sarah Davis",
      startDate: new Date(2025, 3, 5),
      endDate: new Date(2025, 3, 7),
      status: "checked-in",
      roomNumber: "202",
      roomType: "Standard",
      location: "Downtown Heights",
      phone: "+1 (555) 234-5678",
      email: "sarah.davis@example.com",
    },
    {
      id: "b4",
      guest: "Robert Wilson",
      startDate: new Date(2025, 3, 5),
      endDate: new Date(2025, 3, 11),
      status: "checked-in",
      roomNumber: "301",
      roomType: "Suite",
      location: "Marina Tower",
      notes: "Anniversary celebration",
      phone: "+1 (555) 345-6789",
      email: "robert.wilson@example.com",
    },
    {
      id: "b5",
      guest: "Lisa Brown",
      startDate: new Date(2025, 3, 5),
      endDate: new Date(2025, 3, 8),
      status: "confirmed",
      roomNumber: "302",
      roomType: "Deluxe",
      location: "Marina Tower",
      phone: "+1 (555) 456-7890",
      email: "lisa.brown@example.com",
    },
    {
      id: "b6",
      guest: "James Miller",
      startDate: new Date(2025, 3, 10),
      endDate: new Date(2025, 3, 15),
      status: "confirmed",
      roomNumber: "101",
      roomType: "Standard",
      location: "Marina Tower",
      notes: "Late check-in expected",
      phone: "+1 (555) 567-8901",
      email: "james.miller@example.com",
    },
    {
      id: "b7",
      guest: "Jennifer Taylor",
      startDate: new Date(2025, 3, 12),
      endDate: new Date(2025, 3, 16),
      status: "confirmed",
      roomNumber: "202",
      roomType: "Standard",
      location: "Downtown Heights",
      phone: "+1 (555) 678-9012",
      email: "jennifer.taylor@example.com",
    },
    {
      id: "b8",
      guest: "David Wilson",
      startDate: new Date(2025, 3, 8),
      endDate: new Date(2025, 3, 12),
      status: "checked-in",
      roomNumber: "401",
      roomType: "Suite",
      location: "Downtown Heights",
      notes: "VIP guest",
      phone: "+1 (555) 789-0123",
      email: "david.wilson@example.com",
    },
    {
      id: "b9",
      guest: "Patricia Moore",
      startDate: new Date(2025, 3, 15),
      endDate: new Date(2025, 3, 20),
      status: "checked-in",
      roomNumber: "102",
      roomType: "Deluxe",
      location: "Marina Tower",
      phone: "+1 (555) 890-1234",
      email: "patricia.moore@example.com",
    },
    {
      id: "b10",
      guest: "Thomas Anderson",
      startDate: new Date(2025, 3, 18),
      endDate: new Date(2025, 3, 22),
      status: "checked-in",
      roomNumber: "301",
      roomType: "Suite",
      location: "Marina Tower",
      notes: "Requires accessible room",
      phone: "+1 (555) 901-2345",
      email: "thomas.anderson@example.com",
    },
    // Add more check-outs in different date ranges
    {
      id: "b11",
      guest: "Alex Johnson",
      startDate: new Date(2025, 3, 4),
      endDate: new Date(2025, 3, 9),
      status: "checked-in",
      roomNumber: "201",
      roomType: "Deluxe",
      location: "Downtown Heights",
      notes: "Business trip",
      phone: "+1 (555) 111-2222",
      email: "alex.johnson@example.com",
    },
    {
      id: "b12",
      guest: "Maria Garcia",
      startDate: new Date(2025, 3, 6),
      endDate: new Date(2025, 3, 13),
      status: "checked-in",
      roomNumber: "302",
      roomType: "Suite",
      location: "Marina Tower",
      phone: "+1 (555) 333-4444",
      email: "maria.garcia@example.com",
    },
    {
      id: "b13",
      guest: "John Smith",
      startDate: new Date(2025, 3, 12),
      endDate: new Date(2025, 3, 18),
      status: "checked-in",
      roomNumber: "101",
      roomType: "Standard",
      location: "Marina Tower",
      notes: "Repeat guest",
      phone: "+1 (555) 555-6666",
      email: "john.smith@example.com",
    },
    {
      id: "b14",
      guest: "Emily Wilson",
      startDate: new Date(2025, 3, 15),
      endDate: new Date(2025, 3, 25),
      status: "checked-in",
      roomNumber: "202",
      roomType: "Standard",
      location: "Downtown Heights",
      phone: "+1 (555) 777-8888",
      email: "emily.wilson@example.com",
    },
    {
      id: "b15",
      guest: "Daniel Lee",
      startDate: new Date(2025, 3, 20),
      endDate: new Date(2025, 3, 30),
      status: "checked-in",
      roomNumber: "401",
      roomType: "Suite",
      location: "Downtown Heights",
      notes: "Long-term stay",
      phone: "+1 (555) 999-0000",
      email: "daniel.lee@example.com",
    },
  ]
}

// Initialize bookings with the generated data
const bookings: Booking[] = generateBookings()

// Room data with status
interface Room {
  id: string
  number: string
  type: string
  location: string
  status: "available" | "occupied" | "maintenance"
}

const rooms: Room[] = [
  { id: "101", number: "101", type: "Standard", location: "Marina Tower", status: "available" },
  { id: "102", number: "102", type: "Deluxe", location: "Marina Tower", status: "occupied" },
  { id: "201", number: "201", type: "Standard", location: "Downtown Heights", status: "maintenance" },
  { id: "202", number: "202", type: "Standard", location: "Downtown Heights", status: "available" },
  { id: "301", number: "301", type: "Suite", location: "Marina Tower", status: "occupied" },
  { id: "302", number: "302", type: "Deluxe", location: "Marina Tower", status: "available" },
  { id: "401", number: "401", type: "Suite", location: "Downtown Heights", status: "available" },
]

// Generate dates for the calendar
const generateDates = (startDate: Date, daysCount: number) => {
  const days = []
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  for (let i = 0; i < daysCount; i++) {
    const date = addDays(startDate, i)
    const day = date.getDate()
    const weekday = dayNames[date.getDay()]
    days.push({
      day,
      weekday,
      date,
    })
  }

  return days
}

const getDaysCount = (daysString: string) => {
  return Number.parseInt(daysString.split(" ")[0])
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 5)) // April 5, 2025
  const [daysToShow, setDaysToShow] = useState("14 Days")
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyFilter, setPropertyFilter] = useState("all-properties")
  const [typeFilter, setTypeFilter] = useState("all-types")
  const [statusFilter, setStatusFilter] = useState("all-statuses")
  const [dates, setDates] = useState(generateDates(currentDate, getDaysCount(daysToShow)))

  // State for hover tooltip
  const [hoveredBooking, setHoveredBooking] = useState<Booking | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const calendarRef = useRef<HTMLDivElement>(null)

  // Filter rooms based on criteria
  const filteredRooms = rooms.filter((room) => {
    // Search filter - check if query matches room number
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesRoom = room.number.toLowerCase().includes(query)
      const matchesGuest = bookings.some(
        (booking) => booking.roomNumber === room.number && booking.guest.toLowerCase().includes(query),
      )

      if (!matchesRoom && !matchesGuest) return false
    }

    // Property filter
    if (propertyFilter !== "all-properties") {
      const locationSlug = room.location.toLowerCase().replace(" ", "-")
      if (locationSlug !== propertyFilter) return false
    }

    // Status filter
    if (statusFilter !== "all-statuses" && room.status !== statusFilter) {
      return false
    }

    // Room type filter
    if (typeFilter !== "all-types" && room.type.toLowerCase() !== typeFilter) {
      return false
    }

    return true
  })

  // Get bookings for a specific room and date
  const getBookingsForRoomAndDate = (roomNumber: string, date: Date) => {
    return bookings.filter(
      (booking) =>
        booking.roomNumber === roomNumber &&
        isWithinInterval(date, { start: booking.startDate, end: subDays(booking.endDate, 1) }),
    )
  }

  // Get upcoming check-ins and check-outs
  const getUpcomingCheckIns = () => {
    const endDate = addDays(currentDate, getDaysCount(daysToShow) - 1)
    return bookings
      .filter(
        (booking) =>
          isWithinInterval(booking.startDate, { start: currentDate, end: endDate }) &&
          (booking.status === "confirmed" || booking.status === "checked-in"),
      )
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
  }

  const getUpcomingCheckOuts = () => {
    const endDate = addDays(currentDate, getDaysCount(daysToShow) - 1)
    return bookings
      .filter(
        (booking) =>
          isWithinInterval(booking.endDate, { start: currentDate, end: endDate }) && booking.status === "checked-in",
      )
      .sort((a, b) => a.endDate.getTime() - b.endDate.getTime())
  }

  const upcomingCheckIns = getUpcomingCheckIns()
  const upcomingCheckOuts = getUpcomingCheckOuts()

  const handlePreviousPeriod = () => {
    const daysCount = getDaysCount(daysToShow)
    const newDate = subDays(currentDate, daysCount)
    setCurrentDate(newDate)
    setDates(generateDates(newDate, daysCount))
  }

  const handleNextPeriod = () => {
    const daysCount = getDaysCount(daysToShow)
    const newDate = addDays(currentDate, daysCount)
    setCurrentDate(newDate)
    setDates(generateDates(newDate, daysCount))
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setDates(generateDates(today, getDaysCount(daysToShow)))
  }

  const handleRefresh = () => {
    // Regenerate the dates with current settings
    setDates(generateDates(currentDate, getDaysCount(daysToShow)))
    // This would typically also refresh data from an API
    console.log("Refreshing calendar data...")
  }

  const handleDaysChange = (value: string) => {
    setDaysToShow(value)
    setDates(generateDates(currentDate, getDaysCount(value)))
  }

  const formattedDateRange = () => {
    const startDate = format(currentDate, "MMM d, yyyy")
    const endDate = format(addDays(currentDate, getDaysCount(daysToShow) - 1), "MMM d, yyyy")
    return `${startDate} - ${endDate}`
  }

  // Handle mouse movement for tooltip positioning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredBooking && calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect()
      setTooltipPosition({
        x: e.clientX - rect.left + 16,
        y: e.clientY - rect.top + 16,
      })
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="calendar" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Availability Calendar</h1>
              <p className="text-sm text-gray-500">View and manage room availability</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Booking
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6" ref={calendarRef} onMouseMove={handleMouseMove}>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Room Availability</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handlePreviousPeriod}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{formattedDateRange()}</span>
                  </div>
                  <Button variant="outline" size="icon" onClick={handleNextPeriod}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={handleToday}>
                    Today
                  </Button>
                  <Select value={daysToShow} onValueChange={handleDaysChange}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7 Days">7 Days</SelectItem>
                      <SelectItem value="14 Days">14 Days</SelectItem>
                      <SelectItem value="30 Days">30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={handleRefresh}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                View and manage room availability. Click on empty cells to create new bookings.
              </p>

              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search rooms or guests..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Properties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-properties">All Properties</SelectItem>
                    <SelectItem value="marina-tower">Marina Tower</SelectItem>
                    <SelectItem value="downtown-heights">Downtown Heights</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-types">All Types</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-statuses">All Statuses</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left font-medium text-gray-500 border-b border-r border-gray-200 w-[200px]">
                      Room
                    </th>
                    {dates.map((date, index) => (
                      <th
                        key={index}
                        className="p-2 text-center font-medium text-gray-500 border-b border-r border-gray-200 w-[80px]"
                      >
                        <div className={`${index < 7 ? "text-gray-700" : ""}`}>{date.weekday}</div>
                        <div className={`text-sm ${index < 7 ? "text-gray-700" : ""}`}>{date.day}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms.map((room) => (
                    <tr key={room.id} className="border-b border-gray-200">
                      <td className="p-3 border-r border-gray-200">
                        <div className="font-medium">Room {room.number}</div>
                        <div className="text-sm text-gray-500">{room.location}</div>
                        <div className="mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              room.status === "available"
                                ? "bg-green-100 text-green-800"
                                : room.status === "occupied"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {room.status}
                          </span>
                        </div>
                      </td>
                      {dates.map((date, dateIndex) => {
                        // Get bookings for this room and date
                        const roomBookings = getBookingsForRoomAndDate(room.number, date.date)
                        const booking = roomBookings.length > 0 ? roomBookings[0] : null

                        // Determine if this is the first day of a booking
                        const isFirstDay = booking && isSameDay(date.date, booking.startDate)

                        // Calculate how many days this cell should span
                        const daysRemaining = booking
                          ? Math.min(
                              Math.ceil((booking.endDate.getTime() - date.date.getTime()) / (1000 * 60 * 60 * 24)),
                              dates.length - dateIndex,
                            )
                          : 1

                        // Skip cells that are part of a multi-day booking but not the first day
                        if (booking && !isFirstDay) return null

                        return (
                          <td
                            key={dateIndex}
                            className="p-0 border-r border-gray-200 h-[80px] relative"
                            colSpan={booking ? daysRemaining : 1}
                          >
                            {booking ? (
                              <div
                                className={`absolute inset-1 rounded p-2 cursor-pointer ${
                                  booking.status === "confirmed"
                                    ? "bg-blue-100"
                                    : booking.status === "checked-in"
                                      ? "bg-green-100"
                                      : booking.status === "checked-out"
                                        ? "bg-gray-100"
                                        : "bg-red-100"
                                }`}
                                onMouseEnter={() => setHoveredBooking(booking)}
                                onMouseLeave={() => setHoveredBooking(null)}
                              >
                                <div className="text-sm font-medium">{booking.guest}</div>
                              </div>
                            ) : (
                              <div className="w-full h-full"></div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="text-sm font-medium mb-2">Legend:</div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Checked In</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-sm">Checked Out</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Cancelled</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-2">Upcoming Changes</h2>
            <p className="text-sm text-gray-500 mb-4">
              Check-ins and check-outs in the next {getDaysCount(daysToShow)} days
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  </div>
                  <h3 className="font-medium">Upcoming Check-ins</h3>
                </div>
                {upcomingCheckIns.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingCheckIns.map((booking) => (
                      <div key={booking.id} className="p-3 bg-gray-50 rounded-md border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">{booking.guest}</div>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                            {format(booking.startDate, "MMM d")}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Room {booking.roomNumber} - {booking.roomType}
                        </div>
                        {booking.notes && <div className="text-xs text-gray-500 mt-1 italic">{booking.notes}</div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-md text-center">
                    <p className="text-gray-500">No upcoming check-ins</p>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <h3 className="font-medium">Upcoming Check-outs</h3>
                </div>
                {upcomingCheckOuts.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingCheckOuts.map((booking) => (
                      <div key={booking.id} className="p-3 bg-gray-50 rounded-md border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">{booking.guest}</div>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                            {format(booking.endDate, "MMM d")}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Room {booking.roomNumber} - {booking.roomType}
                        </div>
                        {booking.notes && <div className="text-xs text-gray-500 mt-1 italic">{booking.notes}</div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-md text-center">
                    <p className="text-gray-500">No upcoming check-outs</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Booking tooltip */}
        {hoveredBooking && (
          <div
            className="absolute z-50 bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-64"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transition: "left 0.1s ease, top 0.1s ease",
              pointerEvents: "none",
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{hoveredBooking.guest}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  hoveredBooking.status === "confirmed"
                    ? "bg-blue-100 text-blue-800"
                    : hoveredBooking.status === "checked-in"
                      ? "bg-green-100 text-green-800"
                      : hoveredBooking.status === "checked-out"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                }`}
              >
                {hoveredBooking.status.charAt(0).toUpperCase() + hoveredBooking.status.slice(1)}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{hoveredBooking.guest}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  {format(hoveredBooking.startDate, "MMM d")} - {format(hoveredBooking.endDate, "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  {Math.ceil(
                    (hoveredBooking.endDate.getTime() - hoveredBooking.startDate.getTime()) / (1000 * 60 * 60 * 24),
                  )}{" "}
                  days
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  Room {hoveredBooking.roomNumber} ({hoveredBooking.roomType})
                </span>
              </div>
              {hoveredBooking.notes && (
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="text-gray-700">{hoveredBooking.notes}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

