"use client"

import { useState } from "react"
import { BellIcon, SearchIcon } from "lucide-react"
import ResponsiveLayout from "@/components/responsive-layout"
import StatCard from "@/components/stat-card"
import ActionButton from "@/components/action-button"
import RecentBookings from "@/components/recent-bookings"
import RecentExpenses from "@/components/recent-expenses"
import UserActivity from "@/components/user-activity"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Dashboard() {
  const [newBookingOpen, setNewBookingOpen] = useState(false)
  const [checkInOpen, setCheckInOpen] = useState(false)
  const [checkOutOpen, setCheckOutOpen] = useState(false)
  const [roomStatusOpen, setRoomStatusOpen] = useState(false)

  const handleNewBooking = () => {
    setNewBookingOpen(true)
  }

  const handleCheckIn = () => {
    setCheckInOpen(true)
  }

  const handleCheckOut = () => {
    setCheckOutOpen(true)
  }

  const handleRoomStatus = () => {
    setRoomStatusOpen(true)
  }

  return (
    <ResponsiveLayout activePage="dashboard">
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Dashboard</h1>
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <BellIcon className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-500 transition-colors" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              JD
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:block">John Doe</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <StatCard
            icon="calendar-check"
            title="Today's Check-ins"
            value="12"
            change="+20%"
            positive={true}
            color="blue"
          />
          <StatCard
            icon="calendar-x"
            title="Today's Check-outs"
            value="8"
            change="-10%"
            positive={false}
            color="blue"
          />
          <StatCard icon="bed" title="Rooms Occupied" value="85%" change="+5%" positive={true} color="blue" />
          <StatCard
            icon="dollar-sign"
            title="Total Revenue"
            value="$12,845"
            change="+12%"
            positive={true}
            color="blue"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <ActionButton icon="plus" title="New Booking" color="blue" onClick={handleNewBooking} />
          <ActionButton icon="check-circle" title="Quick Check-in" color="green" onClick={handleCheckIn} />
          <ActionButton icon="x-circle" title="Quick Check-out" color="red" onClick={handleCheckOut} />
          <ActionButton icon="flask" title="Room Status" color="purple" onClick={handleRoomStatus} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentBookings />
          </div>
          <div className="lg:col-span-1">
            <RecentExpenses />
            <div className="mt-6">
              <UserActivity />
            </div>
          </div>
        </div>
      </main>

      {/* Dialogs remain unchanged */}
      {/* New Booking Dialog */}
      <Dialog open={newBookingOpen} onOpenChange={setNewBookingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Booking</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="guest-name" className="text-right">
                Guest Name
              </Label>
              <Input id="guest-name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room-type" className="text-right">
                Room Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="deluxe">Deluxe</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="check-in" className="text-right">
                Check-in
              </Label>
              <Input id="check-in" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="check-out" className="text-right">
                Check-out
              </Label>
              <Input id="check-out" type="date" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewBookingOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                alert("Booking created successfully!")
                setNewBookingOpen(false)
              }}
            >
              Create Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Other dialogs remain unchanged */}
    </ResponsiveLayout>
  )
}

