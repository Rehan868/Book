"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"

export default function ResponsiveLayout({ children, activePage }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  // Check if we're on mobile and load minimized state
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // If switching to mobile, ensure sidebar is closed
      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    // Load minimized state
    const savedMinimized = localStorage.getItem("sidebarMinimized")
    if (savedMinimized !== null) {
      setIsMinimized(savedMinimized === "true")
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [isSidebarOpen])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isSidebarOpen && !event.target.closest(".sidebar-container")) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, isSidebarOpen])

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}

      {/* Sidebar - hidden on mobile unless toggled */}
      <div
        className={`sidebar-container ${
          isMobile
            ? `fixed inset-y-0 left-0 z-40 transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-200 ease-in-out`
            : "relative"
        }`}
      >
        <Sidebar activePage={activePage} />
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Main content - adjust padding based on sidebar state */}
      <div className={`flex-1 flex flex-col overflow-hidden ${isMobile ? "pt-14" : ""}`}>{children}</div>
    </div>
  )
}

