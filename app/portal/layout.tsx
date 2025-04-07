"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Building2,
  Home,
  BarChart2,
  DollarSign,
  Calendar,
  MessageSquare,
  FileText,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PortalLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if user is on login page
    if (pathname === "/portal/login") {
      return
    }

    // For demo purposes, we'll just set authenticated to true
    // In a real app, you would check for a token or session
    setIsAuthenticated(true)
  }, [pathname])

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // If on login page, don't show the layout
  if (pathname === "/portal/login") {
    return <>{children}</>
  }

  const handleLogout = () => {
    // In a real app, you would clear tokens/session
    router.push("/portal/login")
  }

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/portal/dashboard" className="flex items-center gap-2 text-blue-600">
                <Building2 className="h-6 w-6" />
                <span className="font-semibold text-lg hidden sm:inline-block">Owner Portal</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Ahmed Al Mansouri</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200 fixed inset-0 z-40 pt-16 pb-20 overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink
              href="/portal/dashboard"
              icon={<Home className="h-5 w-5" />}
              text="Dashboard"
              active={isActive("/portal/dashboard")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="/portal/properties"
              icon={<Building2 className="h-5 w-5" />}
              text="My Properties"
              active={isActive("/portal/properties")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="/portal/availability"
              icon={<Calendar className="h-5 w-5" />}
              text="Availability"
              active={isActive("/portal/availability")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="/portal/financials"
              icon={<DollarSign className="h-5 w-5" />}
              text="Financials"
              active={isActive("/portal/financials")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="/portal/bookings"
              icon={<Calendar className="h-5 w-5" />}
              text="Bookings"
              active={isActive("/portal/bookings")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="/portal/reports"
              icon={<BarChart2 className="h-5 w-5" />}
              text="Reports"
              active={isActive("/portal/reports")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="/portal/documents"
              icon={<FileText className="h-5 w-5" />}
              text="Documents"
              active={isActive("/portal/documents")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavLink
              href="/portal/messages"
              icon={<MessageSquare className="h-5 w-5" />}
              text="Messages"
              active={isActive("/portal/messages")}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="pt-4 border-t border-gray-200">
              <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col sm:flex-row">
        {/* Sidebar - desktop only */}
        <aside className="hidden sm:block w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-1">
            <NavLink
              href="/portal/dashboard"
              icon={<Home className="h-5 w-5" />}
              text="Dashboard"
              active={isActive("/portal/dashboard")}
            />
            <NavLink
              href="/portal/properties"
              icon={<Building2 className="h-5 w-5" />}
              text="My Properties"
              active={isActive("/portal/properties")}
            />
            <NavLink
              href="/portal/availability"
              icon={<Calendar className="h-5 w-5" />}
              text="Availability"
              active={isActive("/portal/availability")}
            />
            <NavLink
              href="/portal/financials"
              icon={<DollarSign className="h-5 w-5" />}
              text="Financials"
              active={isActive("/portal/financials")}
            />
            <NavLink
              href="/portal/bookings"
              icon={<Calendar className="h-5 w-5" />}
              text="Bookings"
              active={isActive("/portal/bookings")}
            />
            <NavLink
              href="/portal/reports"
              icon={<BarChart2 className="h-5 w-5" />}
              text="Reports"
              active={isActive("/portal/reports")}
            />
            <NavLink
              href="/portal/documents"
              icon={<FileText className="h-5 w-5" />}
              text="Documents"
              active={isActive("/portal/documents")}
            />
            <NavLink
              href="/portal/messages"
              icon={<MessageSquare className="h-5 w-5" />}
              text="Messages"
              active={isActive("/portal/messages")}
            />
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}

function NavLink({ href, icon, text, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
        active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

function MobileNavLink({ href, icon, text, active, onClick }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
        active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

