"use client"

import { useState } from "react"
import { Search, Filter, MapPin, DollarSign, Users, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for properties
const properties = [
  {
    id: 1,
    name: "Marina Towers 301",
    type: "Apartment",
    location: "Dubai Marina",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    revenue: 18500,
    occupancy: 82,
    bookings: 5,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Downtown Heights 205",
    type: "Apartment",
    location: "Downtown Dubai",
    bedrooms: 1,
    bathrooms: 1,
    area: 850,
    revenue: 15200,
    occupancy: 75,
    bookings: 4,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Palm Residences 401",
    type: "Villa",
    location: "Palm Jumeirah",
    bedrooms: 4,
    bathrooms: 4.5,
    area: 3200,
    revenue: 11300,
    occupancy: 68,
    bookings: 3,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewType, setViewType] = useState("grid")

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search properties..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant={viewType === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewType("grid")}
            className="rounded-none"
          >
            Grid
          </Button>
          <Button
            variant={viewType === "list" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewType("list")}
            className="rounded-none"
          >
            List
          </Button>
        </div>

        <Button variant="outline" size="icon" className="rounded-full">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {viewType === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <PropertyListItem key={property.id} property={property} />
          ))}
        </div>
      )}

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No properties found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}

function PropertyCard({ property }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-gray-200 relative">
        <img src={property.image || "/placeholder.svg"} alt={property.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              property.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            {property.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-1">{property.name}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          {property.location}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
          <div className="text-center p-1 bg-gray-50 rounded">
            <div className="font-medium">{property.bedrooms}</div>
            <div className="text-gray-500 text-xs">Beds</div>
          </div>
          <div className="text-center p-1 bg-gray-50 rounded">
            <div className="font-medium">{property.bathrooms}</div>
            <div className="text-gray-500 text-xs">Baths</div>
          </div>
          <div className="text-center p-1 bg-gray-50 rounded">
            <div className="font-medium">{property.area}</div>
            <div className="text-gray-500 text-xs">Sq.ft</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Revenue (30d)</span>
            <div className="flex items-center mt-1">
              <DollarSign className="h-3.5 w-3.5 text-gray-400 mr-1" />
              <span className="font-medium text-sm">AED {property.revenue.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Occupancy</span>
            <div className="flex items-center mt-1">
              <Calendar className="h-3.5 w-3.5 text-gray-400 mr-1" />
              <span className="font-medium text-sm">{property.occupancy}%</span>
            </div>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}

function PropertyListItem({ property }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-48 h-32 bg-gray-200">
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">{property.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {property.location}
                </div>
                <div className="flex items-center gap-4 text-sm mb-2">
                  <span>{property.bedrooms} Beds</span>
                  <span>{property.bathrooms} Baths</span>
                  <span>{property.area} Sq.ft</span>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  property.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {property.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Revenue (30d)</span>
                <div className="flex items-center mt-1">
                  <DollarSign className="h-3.5 w-3.5 text-gray-400 mr-1" />
                  <span className="font-medium">AED {property.revenue.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Occupancy</span>
                <div className="flex items-center mt-1">
                  <Calendar className="h-3.5 w-3.5 text-gray-400 mr-1" />
                  <span className="font-medium">{property.occupancy}%</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Bookings</span>
                <div className="flex items-center mt-1">
                  <Users className="h-3.5 w-3.5 text-gray-400 mr-1" />
                  <span className="font-medium">{property.bookings}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 flex items-center">
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

