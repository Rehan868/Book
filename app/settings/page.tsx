"use client"

import { Search, ChevronRight, Home, Bed, Bell, Lock, Clock, Share2, Grid3X3 } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState } from "react"

const sections = [
  {
    id: "general",
    icon: <Home className="h-5 w-5 text-blue-600" />,
    title: "General Settings",
    description: "Configure your hotel's basic information and preferences",
    items: [
      {
        title: "Hotel Information",
        description: "Name, address, and contact details",
      },
      {
        title: "Property Details",
        description: "Facilities, amenities, and services",
      },
      {
        title: "Legal Information",
        description: "Business registration and tax details",
      },
    ],
  },
  {
    id: "booking",
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: "Booking Settings",
    description: "Manage check-in/out times and booking policies",
    items: [
      {
        title: "Check-in/out Times",
        description: "Set default times and policies",
      },
      {
        title: "Cancellation Rules",
        description: "Define cancellation policies and fees",
      },
      {
        title: "Payment Methods",
        description: "Configure accepted payment options",
      },
    ],
  },
  {
    id: "rooms",
    icon: <Bed className="h-5 w-5 text-blue-600" />,
    title: "Room Management",
    description: "Configure room types and maintenance settings",
    items: [
      {
        title: "Room Types",
        description: "Manage room categories and amenities",
      },
      {
        title: "Housekeeping",
        description: "Schedule and track cleaning tasks",
      },
      {
        title: "Maintenance",
        description: "Set up maintenance schedules",
      },
    ],
  },
  {
    id: "hotel-config",
    icon: <Grid3X3 className="h-5 w-5 text-blue-600" />,
    title: "Hotel Configuration",
    description: "Manage hotel structure and room attributes",
    items: [
      {
        title: "Hotel Configuration",
        description: "Amenities, areas, bed types, and floors",
      },
    ],
  },
  {
    id: "security",
    icon: <Lock className="h-5 w-5 text-blue-600" />,
    title: "User Access & Security",
    description: "Manage user permissions and security settings",
    items: [
      {
        title: "User Roles",
        description: "Configure staff access levels",
      },
      {
        title: "Security Settings",
        description: "Password policies and 2FA",
      },
      {
        title: "Access Logs",
        description: "View system access history",
      },
    ],
  },
  {
    id: "notifications",
    icon: <Bell className="h-5 w-5 text-blue-600" />,
    title: "Notifications",
    description: "Configure email and SMS notification settings",
    items: [
      {
        title: "Email Templates",
        description: "Customize notification emails",
      },
      {
        title: "SMS Settings",
        description: "Configure SMS notifications",
      },
      {
        title: "Alert Preferences",
        description: "Set up automated alerts",
      },
    ],
  },
  {
    id: "integrations",
    icon: <Share2 className="h-5 w-5 text-blue-600" />,
    title: "Integrations",
    description: "Connect with third-party services and APIs",
    items: [
      {
        title: "Payment Gateways",
        description: "Configure payment processors",
      },
      {
        title: "Channel Manager",
        description: "Manage booking channels",
      },
      {
        title: "External APIs",
        description: "Set up API connections",
      },
    ],
  },
]

export default function SettingsPage() {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleOpenDialog = (sectionId, itemTitle) => {
    setSelectedSection(sectionId)
    setSelectedItem(itemTitle)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedSection(null)
    setSelectedItem(null)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search settings..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sections.map((section) => (
              <Card key={section.id} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {section.items.map((item, index) => {
                    let cardContent

                    if (
                      (section.id === "security" && item.title === "User Roles") ||
                      (section.id === "notifications" && item.title === "SMS Settings") ||
                      (section.id === "integrations" && item.title === "Channel Manager") ||
                      (section.id === "integrations" && item.title === "External APIs") ||
                      (section.id === "hotel-config" && item.title === "Hotel Configuration")
                    ) {
                      let route = ""
                      if (section.id === "security" && item.title === "User Roles") {
                        route = "/settings/user-roles"
                      } else if (section.id === "notifications" && item.title === "SMS Settings") {
                        route = "/settings/sms-templates"
                      } else if (section.id === "integrations" && item.title === "Channel Manager") {
                        route = "/settings/channel-manager"
                      } else if (section.id === "integrations" && item.title === "External APIs") {
                        route = "/settings/api-access"
                      } else if (section.id === "hotel-config" && item.title === "Hotel Configuration") {
                        route = "/settings/hotel-configuration"
                      }

                      cardContent = (
                        <button
                          key={index}
                          className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                          onClick={() => router.push(route)}
                        >
                          <div className="text-left">
                            <div className="font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </button>
                      )
                    } else {
                      cardContent = (
                        <button
                          key={index}
                          className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                          onClick={() => {
                            // Map each setting item to its specific route
                            const routes = {
                              // General section
                              "Hotel Information": "/settings/general",
                              "Property Details": "/settings/property-details",
                              "Legal Information": "/settings/legal-information",

                              // Booking section
                              "Check-in/out Times": "/settings/booking",
                              "Cancellation Rules": "/settings/cancellation-rules",
                              "Payment Methods": "/settings/payment-gateways",

                              // Rooms section
                              "Room Types": "/settings/rooms",
                              Housekeeping: "/settings/rooms", // This could be a more specific route if available
                              Maintenance: "/settings/rooms", // This could be a more specific route if available

                              // Security section
                              "User Roles": "/settings/user-roles",
                              "Security Settings": "/settings/security",
                              "Access Logs": "/settings/security", // This could be a more specific route if available

                              // Notifications section
                              "Email Templates": "/settings/email-templates",
                              "SMS Settings": "/settings/sms-templates",
                              "Alert Preferences": "/settings/email-templates", // This could be a more specific route if available

                              // Integrations section
                              "Payment Gateways": "/settings/payment-gateways",
                              "Channel Manager": "/settings/channel-manager",
                              "External APIs": "/settings/api-access",
                            }

                            // Navigate to the appropriate route
                            router.push(routes[item.title] || "/settings")
                          }}
                        >
                          <div className="text-left">
                            <div className="font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </button>
                      )
                    }

                    return <div key={index}>{cardContent}</div>
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

