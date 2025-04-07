"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarIcon,
  ClipboardListIcon,
  BedIcon,
  DollarSignIcon,
  BarChartIcon,
  UsersIcon,
  SettingsIcon,
  Building2,
  BirdIcon,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useEffect, useState } from "react"

function Sidebar({ activePage }) {
  const pathname = usePathname()
  const [minimized, setMinimized] = useState(false)

  // Load minimized state from localStorage on component mount
  useEffect(() => {
    const savedMinimized = localStorage.getItem("sidebarMinimized")
    if (savedMinimized !== null) {
      setMinimized(savedMinimized === "true")
    }
  }, [])

  // Save minimized state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarMinimized", minimized.toString())
  }, [minimized])

  const toggleMinimized = () => {
    setMinimized(!minimized)
  }

  const isActive = (href) => {
    return pathname === href
  }

  return (
    <div
      className={`bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ${minimized ? "w-20" : "w-60"}`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!minimized && (
          <Link href="/" className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
            <Building2 className="h-6 w-6" />
            <span>Hotel PMS</span>
          </Link>
        )}
        {minimized && (
          <Link href="/" className="mx-auto text-blue-600">
            <Building2 className="h-6 w-6" />
          </Link>
        )}
        <button
          onClick={toggleMinimized}
          className="text-gray-500 hover:text-blue-600 focus:outline-none"
          aria-label={minimized ? "Expand sidebar" : "Minimize sidebar"}
        >
          {minimized ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <SidebarItem
          href="/dashboard"
          icon={<LayoutDashboard className="h-5 w-5" />}
          text="Dashboard"
          active={activePage === "dashboard"}
          minimized={minimized}
        />
        <SidebarItem
          href="/bookings"
          icon={<CalendarIcon className="h-5 w-5" />}
          text="Bookings"
          active={activePage === "bookings"}
          minimized={minimized}
        />
        <SidebarItem
          href="/calendar"
          icon={<ClipboardListIcon className="h-5 w-5" />}
          text="Availability Calendar"
          active={activePage === "calendar"}
          minimized={minimized}
        />
        <SidebarItem
          href="/rooms"
          icon={<BedIcon className="h-5 w-5" />}
          text="Rooms"
          active={activePage === "rooms"}
          minimized={minimized}
        />
        <SidebarItem
          href="/expenses"
          icon={<DollarSignIcon className="h-5 w-5" />}
          text="Expenses"
          active={activePage === "expenses"}
          minimized={minimized}
        />
        <SidebarItem
          href="/reports"
          icon={<BarChartIcon className="h-5 w-5" />}
          text="Reports"
          active={activePage === "reports"}
          minimized={minimized}
        />
        <SidebarItem
          href="/users"
          icon={<UsersIcon className="h-5 w-5" />}
          text="Users Management"
          active={activePage === "users"}
          minimized={minimized}
        />
        <SidebarItem
          href="/cleaning"
          icon={<BirdIcon className="h-5 w-5" />}
          text="Cleaning Status"
          active={activePage === "cleaning"}
          minimized={minimized}
        />
        <SidebarItem
          href="/settings"
          icon={<SettingsIcon className="h-5 w-5" />}
          text="Settings"
          active={activePage === "settings"}
          minimized={minimized}
        />
        <SidebarItem
          href="/portal/login"
          icon={<Building2 className="h-5 w-5" />}
          text="Owner Portal"
          active={isActive("/portal/login")}
          minimized={minimized}
        />
      </nav>
    </div>
  )
}

function SidebarItem({ href, icon, text, active, minimized }) {
  // Create a cloned icon with larger size when minimized
  const iconElement = minimized ? React.cloneElement(icon, { className: "h-6 w-6" }) : icon

  return (
    <Link
      href={href}
      className={`flex items-center ${minimized ? "justify-center p-2" : "gap-3 px-3 py-2"} rounded-md text-sm ${
        active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
      title={minimized ? text : ""}
    >
      {iconElement}
      {!minimized && <span>{text}</span>}
    </Link>
  )
}

// Export both as default and named export to support both import styles
export { Sidebar }
export default Sidebar

