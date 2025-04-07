"use client"

import { useState, useEffect } from "react"
import { Search, RefreshCcw, LayoutGrid, List, Pencil, Check, MoreVertical } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar } from "@/components/ui/avatar"

const rooms = [
  {
    room: "101",
    type: "Deluxe King",
    floor: "1st Floor",
    status: "Clean",
    lastCleaned: "2024-01-20 09:30 AM",
    assignedTo: {
      name: "Sarah Johnson",
      initials: "S",
    },
    priority: "Normal",
  },
  {
    room: "205",
    type: "Suite",
    floor: "2nd Floor",
    status: "Dirty",
    lastCleaned: "2024-01-19 02:15 PM",
    assignedTo: {
      name: "Michael Brown",
      initials: "M",
    },
    priority: "High",
  },
  {
    room: "308",
    type: "Twin Room",
    floor: "3rd Floor",
    status: "In Progress",
    lastCleaned: "2024-01-20 10:45 AM",
    assignedTo: {
      name: "Emma Davis",
      initials: "E",
    },
    priority: "Normal",
  },
  {
    room: "401",
    type: "Executive Suite",
    floor: "4th Floor",
    status: "Clean",
    lastCleaned: "2024-01-20 08:00 AM",
    assignedTo: {
      name: "John Smith",
      initials: "J",
    },
    priority: "Low",
  },
  {
    room: "502",
    type: "Deluxe Twin",
    floor: "5th Floor",
    status: "Dirty",
    lastCleaned: "2024-01-19 04:30 PM",
    assignedTo: {
      name: "Lisa Wilson",
      initials: "L",
    },
    priority: "High",
  },
]

export default function CleaningPage() {
  const [isGridView, setIsGridView] = useState(false)
  const [error, setError] = useState(null)
  const [floorFilter, setFloorFilter] = useState("all")
  const [roomTypeFilter, setRoomTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("room")
  // Add these new state variables
  const [roomsData, setRoomsData] = useState(rooms)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(null)
  const [currentRoom, setCurrentRoom] = useState(null)

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOptionsMenuOpen(null)
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const filteredRooms = roomsData
    .filter((room) => {
      if (floorFilter !== "all" && !room.floor.toLowerCase().includes(floorFilter.toLowerCase())) return false
      if (roomTypeFilter !== "all" && !room.type.toLowerCase().includes(roomTypeFilter.toLowerCase())) return false
      if (statusFilter !== "all" && room.status.toLowerCase() !== statusFilter.toLowerCase()) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "room":
          return a.room.localeCompare(b.room)
        case "priority":
          const priorityOrder = { High: 1, Normal: 2, Low: 3 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case "status":
          return a.status.localeCompare(b.status)
        case "lastCleaned":
          return new Date(b.lastCleaned).getTime() - new Date(a.lastCleaned).getTime()
        default:
          return 0
      }
    })

  // Add these handler functions
  const handleEdit = (room) => {
    setCurrentRoom(room)
    setIsEditModalOpen(true)
  }

  const handleMarkAsClean = (room) => {
    const updatedRooms = roomsData.map((r) =>
      r.room === room.room ? { ...r, status: "Clean", lastCleaned: new Date().toLocaleString() } : r,
    )
    setRoomsData(updatedRooms)
  }

  const handleToggleOptionsMenu = (roomNumber) => {
    if (isOptionsMenuOpen === roomNumber) {
      setIsOptionsMenuOpen(null)
    } else {
      setIsOptionsMenuOpen(roomNumber)
    }
  }

  const handleSaveEdit = (updatedRoom) => {
    const updatedRooms = roomsData.map((r) => (r.room === updatedRoom.room ? updatedRoom : r))
    setRoomsData(updatedRooms)
    setIsEditModalOpen(false)
    setCurrentRoom(null)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="cleaning" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Cleaning Status</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Button variant="outline" size="icon">
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              {typeof error === "string" ? error : "An error occurred"}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Total Rooms" value="120" change="+2%" bgColor="bg-blue-50" textColor="text-blue-600" />
            <StatCard title="Clean" value="85" change="+5%" bgColor="bg-green-50" textColor="text-green-600" />
            <StatCard title="Dirty" value="25" change="-3%" bgColor="bg-red-50" textColor="text-red-600" />
            <StatCard title="In Progress" value="10" change="0%" bgColor="bg-yellow-50" textColor="text-yellow-600" />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <Select value={floorFilter} onValueChange={setFloorFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Floors</SelectItem>
                    <SelectItem value="1st">1st Floor</SelectItem>
                    <SelectItem value="2nd">2nd Floor</SelectItem>
                    <SelectItem value="3rd">3rd Floor</SelectItem>
                    <SelectItem value="4th">4th Floor</SelectItem>
                    <SelectItem value="5th">5th Floor</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Room Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                    <SelectItem value="twin">Twin</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="clean">Clean</SelectItem>
                    <SelectItem value="dirty">Dirty</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room">Room Number</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="lastCleaned">Last Cleaned</SelectItem>
                  </SelectContent>
                </Select>

                <div className="border rounded-md flex">
                  <Button
                    variant={isGridView ? "ghost" : "secondary"}
                    size="icon"
                    onClick={() => setIsGridView(false)}
                    className="rounded-r-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={isGridView ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setIsGridView(true)}
                    className="rounded-l-none"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {!isGridView && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Room</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Floor</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Last Cleaned</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Assigned To</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Priority</th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRooms.map((room, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{room?.room || ""}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{room?.type || ""}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{room?.floor || ""}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={room?.status} />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{room?.lastCleaned || ""}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 bg-gray-200">
                              <span className="text-sm font-medium text-gray-600">
                                {room?.assignedTo?.initials || ""}
                              </span>
                            </Avatar>
                            <span className="text-sm text-gray-900">{room?.assignedTo?.name || ""}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <PriorityBadge priority={room?.priority} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => handleEdit(room)}
                              title="Edit Room"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              className="text-gray-400 hover:text-green-600"
                              onClick={() => handleMarkAsClean(room)}
                              title="Mark as Clean"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <div className="relative">
                              <button
                                className="text-gray-400 hover:text-gray-600"
                                onClick={() => handleToggleOptionsMenu(room.room)}
                                title="More Options"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                              {isOptionsMenuOpen === room.room && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                  <div className="py-1">
                                    <button
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      onClick={() => {
                                        handleToggleOptionsMenu(null)
                                        // Additional action here
                                      }}
                                    >
                                      Assign to Staff
                                    </button>
                                    <button
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      onClick={() => {
                                        handleToggleOptionsMenu(null)
                                        // Additional action here
                                      }}
                                    >
                                      Change Priority
                                    </button>
                                    <button
                                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                      onClick={() => {
                                        handleToggleOptionsMenu(null)
                                        // Additional action here
                                      }}
                                    >
                                      Mark as Dirty
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {isGridView && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
                {filteredRooms.map((room, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Room {room.room}</h3>
                        <StatusBadge status={room.status} />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {room.type} - {room.floor}
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-8 w-8 bg-gray-200">
                          <span className="text-sm font-medium text-gray-600">{room?.assignedTo?.initials || ""}</span>
                        </Avatar>
                        <span className="text-sm text-gray-900">{room?.assignedTo?.name || ""}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div>
                          <span className="text-gray-500">Priority: </span>
                          <PriorityBadge priority={room.priority} />
                        </div>
                        <div className="text-gray-500 text-xs">{new Date(room.lastCleaned).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 flex justify-end gap-2 border-t">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => handleEdit(room)}
                        title="Edit Room"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-green-600"
                        onClick={() => handleMarkAsClean(room)}
                        title="Mark as Clean"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <div className="relative">
                        <button
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() => handleToggleOptionsMenu(room.room)}
                          title="More Options"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {isOptionsMenuOpen === room.room && (
                          <div className="absolute right-0 bottom-8 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                  handleToggleOptionsMenu(null)
                                  // Additional action here
                                }}
                              >
                                Assign to Staff
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                  handleToggleOptionsMenu(null)
                                  // Additional action here
                                }}
                              >
                                Change Priority
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                onClick={() => {
                                  handleToggleOptionsMenu(null)
                                  // Additional action here
                                }}
                              >
                                Mark as Dirty
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {filteredRooms.length > 0 ? 1 : 0} to {Math.min(filteredRooms.length, 5)} of{" "}
                {filteredRooms.length} results
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
        {isEditModalOpen && currentRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit Room {currentRoom.room}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Select
                    defaultValue={currentRoom.status}
                    onValueChange={(value) => setCurrentRoom({ ...currentRoom, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clean">Clean</SelectItem>
                      <SelectItem value="Dirty">Dirty</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <Select
                    defaultValue={currentRoom.priority}
                    onValueChange={(value) => setCurrentRoom({ ...currentRoom, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <Select
                    defaultValue={currentRoom.assignedTo.name}
                    onValueChange={(value) => {
                      const [name, initials] = value.split("|")
                      setCurrentRoom({
                        ...currentRoom,
                        assignedTo: { name, initials },
                      })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sarah Johnson|S">Sarah Johnson</SelectItem>
                      <SelectItem value="Michael Brown|M">Michael Brown</SelectItem>
                      <SelectItem value="Emma Davis|E">Emma Davis</SelectItem>
                      <SelectItem value="John Smith|J">John Smith</SelectItem>
                      <SelectItem value="Lisa Wilson|L">Lisa Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditModalOpen(false)
                    setCurrentRoom(null)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={() => handleSaveEdit(currentRoom)}>Save Changes</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ title, value, change, bgColor, textColor }) {
  const isPositive = change.startsWith("+")
  const changeColor = change === "0%" ? "text-gray-600" : isPositive ? "text-green-600" : "text-red-600"

  return (
    <div className={`rounded-lg p-6 ${bgColor}`}>
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className={`text-3xl font-bold mb-2 ${textColor}`}>{value}</div>
      <div className={`text-sm ${changeColor}`}>{change}</div>
    </div>
  )
}

function StatusBadge({ status }) {
  // Convert status to string to prevent object rendering issues
  const statusText = typeof status === "string" ? status : String(status || "")

  const getStatusStyles = () => {
    switch (statusText.toLowerCase()) {
      case "clean":
        return "bg-green-50 text-green-700 border-green-100"
      case "dirty":
        return "bg-red-50 text-red-700 border-red-100"
      case "in progress":
        return "bg-yellow-50 text-yellow-700 border-yellow-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-100"
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {statusText}
    </span>
  )
}

function PriorityBadge({ priority }) {
  // Convert priority to string to prevent object rendering issues
  const priorityText = typeof priority === "string" ? priority : String(priority || "")

  const getPriorityStyles = () => {
    switch (priorityText.toLowerCase()) {
      case "high":
        return "text-red-600"
      case "normal":
        return "text-blue-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return <span className={`text-sm font-medium ${getPriorityStyles()}`}>{priorityText}</span>
}

