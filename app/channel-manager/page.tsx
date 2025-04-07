"use client"

import { useState } from "react"
import { Search, Plus, RefreshCw, Settings, ExternalLink, Check, X } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for channel connections
const channels = [
  {
    id: 1,
    name: "Airbnb",
    status: "connected",
    lastSync: "2024-02-10 14:30",
    properties: 12,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png",
  },
  {
    id: 2,
    name: "Booking.com",
    status: "connected",
    lastSync: "2024-02-10 15:45",
    properties: 15,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/2560px-Booking.com_logo.svg.png",
  },
  {
    id: 3,
    name: "Expedia",
    status: "error",
    lastSync: "2024-02-09 10:15",
    properties: 8,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Expedia_2012_logo.svg/1280px-Expedia_2012_logo.svg.png",
  },
  {
    id: 4,
    name: "VRBO",
    status: "connected",
    lastSync: "2024-02-10 12:20",
    properties: 10,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/VRBO_Logo_2019.svg/2560px-VRBO_Logo_2019.svg.png",
  },
  {
    id: 5,
    name: "TripAdvisor",
    status: "disconnected",
    lastSync: "2024-02-05 09:30",
    properties: 0,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tripadvisor_Logo_circle-green_vertical-lockup_registered_RGB.svg/1280px-Tripadvisor_Logo_circle-green_vertical-lockup_registered_RGB.svg.png",
  },
]

// Mock data for recent sync activities
const syncActivities = [
  {
    id: 1,
    channel: "Airbnb",
    property: "Marina Towers 301",
    action: "Price Update",
    status: "success",
    timestamp: "2024-02-10 14:30",
    details: "Updated rates for March 2024",
  },
  {
    id: 2,
    channel: "Booking.com",
    property: "Downtown Heights 205",
    action: "Availability Update",
    status: "success",
    timestamp: "2024-02-10 14:25",
    details: "Updated availability for April 2024",
  },
  {
    id: 3,
    channel: "Expedia",
    property: "Palm Residences 401",
    action: "Booking Received",
    status: "success",
    timestamp: "2024-02-10 13:45",
    details: "New booking #EXP12345 received",
  },
  {
    id: 4,
    channel: "Expedia",
    property: "JBR Apartments 501",
    action: "Content Update",
    status: "failed",
    timestamp: "2024-02-10 12:30",
    details: "Failed to update property description",
  },
  {
    id: 5,
    channel: "VRBO",
    property: "Marina Towers 302",
    action: "Booking Cancellation",
    status: "success",
    timestamp: "2024-02-10 11:15",
    details: "Booking #VRB67890 cancelled",
  },
]

export default function ChannelManagerPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredChannels = channels.filter((channel) => channel.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getStatusBadge = (status) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Connected</Badge>
      case "disconnected":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Disconnected</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />
      case "failed":
        return <X className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="channel-manager" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Channel Manager</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Sync All Channels
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Connect Channel
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search channels..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="channels">
            <TabsList className="mb-6">
              <TabsTrigger value="channels">Connected Channels</TabsTrigger>
              <TabsTrigger value="sync">Sync Activity</TabsTrigger>
              <TabsTrigger value="mappings">Property Mappings</TabsTrigger>
            </TabsList>

            <TabsContent value="channels" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChannels.map((channel) => (
                  <Card key={channel.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 mr-4 flex-shrink-0">
                            <img
                              src={channel.logo || "/placeholder.svg"}
                              alt={`${channel.name} logo`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{channel.name}</h3>
                            {getStatusBadge(channel.status)}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Switch checked={channel.status === "connected"} disabled={channel.status === "error"} />
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Properties</span>
                          <span className="text-sm font-medium">{channel.properties}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Last Sync</span>
                          <span className="text-sm font-medium">{channel.lastSync}</span>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t border-gray-100">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <RefreshCw className="h-3 w-3" />
                          Sync Now
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          Configure
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          Visit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredChannels.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No channels found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="sync" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sync Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Channel</TableHead>
                        <TableHead>Property</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {syncActivities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell>{activity.channel}</TableCell>
                          <TableCell>{activity.property}</TableCell>
                          <TableCell>{activity.action}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getStatusIcon(activity.status)}
                              <span className="ml-2">{activity.status === "success" ? "Success" : "Failed"}</span>
                            </div>
                          </TableCell>
                          <TableCell>{activity.timestamp}</TableCell>
                          <TableCell>{activity.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mappings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Channel Mappings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Marina Towers 301</h3>
                      <div className="flex gap-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Airbnb</Badge>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Booking.com</Badge>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">VRBO</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Downtown Heights 205</h3>
                      <div className="flex gap-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Airbnb</Badge>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Booking.com</Badge>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Expedia</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Palm Residences 401</h3>
                      <div className="flex gap-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Airbnb</Badge>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Expedia</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">JBR Apartments 501</h3>
                      <div className="flex gap-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Booking.com</Badge>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">VRBO</Badge>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Expedia</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Marina Towers 302</h3>
                      <div className="flex gap-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Airbnb</Badge>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">VRBO</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

