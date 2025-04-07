"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Plus, Trash2, Edit, Check, X } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export default function HotelConfigurationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("amenities")

  // Amenities State
  const [amenities, setAmenities] = useState([
    { id: 1, name: "Wi-Fi", icon: "wifi", isDefault: true, description: "High-speed wireless internet" },
    { id: 2, name: "TV", icon: "tv", isDefault: true, description: "Flat-screen TV with cable" },
    { id: 3, name: "Air Conditioning", icon: "thermometer", isDefault: true, description: "Climate control" },
    { id: 4, name: "Mini Bar", icon: "wine", isDefault: false, description: "Stocked mini refrigerator" },
    { id: 5, name: "Safe", icon: "lock", isDefault: false, description: "In-room safe for valuables" },
  ])
  const [newAmenity, setNewAmenity] = useState({
    name: "",
    icon: "star",
    isDefault: false,
    description: "",
  })
  const [editingAmenity, setEditingAmenity] = useState(null)

  // Areas State
  const [areas, setAreas] = useState([
    { id: 1, name: "Marina Tower", description: "Luxury tower with ocean views", floors: 12 },
    { id: 2, name: "Downtown Heights", description: "Urban building in city center", floors: 8 },
    { id: 3, name: "Garden Wing", description: "Peaceful area with garden access", floors: 4 },
  ])
  const [newArea, setNewArea] = useState({
    name: "",
    description: "",
    floors: "",
  })
  const [editingArea, setEditingArea] = useState(null)

  // Bed Types State
  const [bedTypes, setBedTypes] = useState([
    { id: 1, name: "King", description: "King-size bed (180x200cm)", capacity: 2 },
    { id: 2, name: "Queen", description: "Queen-size bed (160x200cm)", capacity: 2 },
    { id: 3, name: "Twin", description: "Two single beds (90x200cm each)", capacity: 2 },
    { id: 4, name: "Single", description: "Single bed (90x200cm)", capacity: 1 },
    { id: 5, name: "Sofa Bed", description: "Convertible sofa (140x190cm)", capacity: 1 },
  ])
  const [newBedType, setNewBedType] = useState({
    name: "",
    description: "",
    capacity: "",
  })
  const [editingBedType, setEditingBedType] = useState(null)

  // Room Types State
  const [roomTypes, setRoomTypes] = useState([
    { id: 1, name: "Standard", description: "Basic room with essential amenities", basePrice: 100 },
    { id: 2, name: "Deluxe", description: "Spacious room with premium amenities", basePrice: 150 },
    { id: 3, name: "Suite", description: "Luxury suite with separate living area", basePrice: 250 },
    { id: 4, name: "Family", description: "Large room suitable for families", basePrice: 200 },
    { id: 5, name: "Executive", description: "Premium room with business facilities", basePrice: 180 },
  ])
  const [newRoomType, setNewRoomType] = useState({
    name: "",
    description: "",
    basePrice: "",
  })
  const [editingRoomType, setEditingRoomType] = useState(null)

  // Floors State
  const [floors, setFloors] = useState([
    { id: 1, number: 1, area: "Marina Tower", description: "Lobby level with reception", roomPrefix: "1" },
    { id: 2, number: 2, area: "Marina Tower", description: "Standard rooms", roomPrefix: "2" },
    { id: 3, number: 3, area: "Marina Tower", description: "Deluxe rooms", roomPrefix: "3" },
    { id: 4, number: 1, area: "Downtown Heights", description: "Lobby and restaurant", roomPrefix: "D1" },
    { id: 5, number: 2, area: "Downtown Heights", description: "Standard and family rooms", roomPrefix: "D2" },
  ])
  const [newFloor, setNewFloor] = useState({
    number: "",
    area: "",
    description: "",
    roomPrefix: "",
  })
  const [editingFloor, setEditingFloor] = useState(null)

  // Amenities Handlers
  const handleNewAmenityChange = (e) => {
    setNewAmenity({
      ...newAmenity,
      [e.target.name]: e.target.value,
    })
  }

  const handleNewAmenitySwitchChange = (checked) => {
    setNewAmenity({
      ...newAmenity,
      isDefault: checked,
    })
  }

  const handleNewAmenityIconChange = (value) => {
    setNewAmenity({
      ...newAmenity,
      icon: value,
    })
  }

  const addAmenity = () => {
    if (!newAmenity.name) return

    setAmenities([
      ...amenities,
      {
        id: Date.now(),
        name: newAmenity.name,
        icon: newAmenity.icon,
        isDefault: newAmenity.isDefault,
        description: newAmenity.description,
      },
    ])

    setNewAmenity({
      name: "",
      icon: "star",
      isDefault: false,
      description: "",
    })

    toast({
      title: "Amenity added",
      description: `${newAmenity.name} has been added to amenities.`,
    })
  }

  const startEditAmenity = (amenity) => {
    setEditingAmenity({
      ...amenity,
    })
  }

  const cancelEditAmenity = () => {
    setEditingAmenity(null)
  }

  const saveEditAmenity = () => {
    if (!editingAmenity.name) return

    setAmenities(amenities.map((amenity) => (amenity.id === editingAmenity.id ? { ...editingAmenity } : amenity)))
    setEditingAmenity(null)

    toast({
      title: "Amenity updated",
      description: `${editingAmenity.name} has been updated.`,
    })
  }

  const removeAmenity = (id) => {
    setAmenities(amenities.filter((amenity) => amenity.id !== id))

    toast({
      title: "Amenity removed",
      description: "The amenity has been removed.",
    })
  }

  // Areas Handlers
  const handleNewAreaChange = (e) => {
    setNewArea({
      ...newArea,
      [e.target.name]: e.target.value,
    })
  }

  const addArea = () => {
    if (!newArea.name) return

    setAreas([
      ...areas,
      {
        id: Date.now(),
        name: newArea.name,
        description: newArea.description,
        floors: Number.parseInt(newArea.floors) || 1,
      },
    ])

    setNewArea({
      name: "",
      description: "",
      floors: "",
    })

    toast({
      title: "Area added",
      description: `${newArea.name} has been added to areas.`,
    })
  }

  const startEditArea = (area) => {
    setEditingArea({
      ...area,
    })
  }

  const cancelEditArea = () => {
    setEditingArea(null)
  }

  const saveEditArea = () => {
    if (!editingArea.name) return

    setAreas(areas.map((area) => (area.id === editingArea.id ? { ...editingArea } : area)))
    setEditingArea(null)

    toast({
      title: "Area updated",
      description: `${editingArea.name} has been updated.`,
    })
  }

  const removeArea = (id) => {
    setAreas(areas.filter((area) => area.id !== id))

    toast({
      title: "Area removed",
      description: "The area has been removed.",
    })
  }

  // Bed Types Handlers
  const handleNewBedTypeChange = (e) => {
    setNewBedType({
      ...newBedType,
      [e.target.name]: e.target.value,
    })
  }

  const addBedType = () => {
    if (!newBedType.name) return

    setBedTypes([
      ...bedTypes,
      {
        id: Date.now(),
        name: newBedType.name,
        description: newBedType.description,
        capacity: Number.parseInt(newBedType.capacity) || 1,
      },
    ])

    setNewBedType({
      name: "",
      description: "",
      capacity: "",
    })

    toast({
      title: "Bed type added",
      description: `${newBedType.name} has been added to bed types.`,
    })
  }

  const startEditBedType = (bedType) => {
    setEditingBedType({
      ...bedType,
    })
  }

  const cancelEditBedType = () => {
    setEditingBedType(null)
  }

  const saveEditBedType = () => {
    if (!editingBedType.name) return

    setBedTypes(bedTypes.map((bedType) => (bedType.id === editingBedType.id ? { ...editingBedType } : bedType)))
    setEditingBedType(null)

    toast({
      title: "Bed type updated",
      description: `${editingBedType.name} has been updated.`,
    })
  }

  const removeBedType = (id) => {
    setBedTypes(bedTypes.filter((bedType) => bedType.id !== id))

    toast({
      title: "Bed type removed",
      description: "The bed type has been removed.",
    })
  }

  // Room Types Handlers
  const handleNewRoomTypeChange = (e) => {
    setNewRoomType({
      ...newRoomType,
      [e.target.name]: e.target.value,
    })
  }

  const addRoomType = () => {
    if (!newRoomType.name) return

    setRoomTypes([
      ...roomTypes,
      {
        id: Date.now(),
        name: newRoomType.name,
        description: newRoomType.description,
        basePrice: Number.parseFloat(newRoomType.basePrice) || 0,
      },
    ])

    setNewRoomType({
      name: "",
      description: "",
      basePrice: "",
    })

    toast({
      title: "Room type added",
      description: `${newRoomType.name} has been added to room types.`,
    })
  }

  const startEditRoomType = (roomType) => {
    setEditingRoomType({
      ...roomType,
    })
  }

  const cancelEditRoomType = () => {
    setEditingRoomType(null)
  }

  const saveEditRoomType = () => {
    if (!editingRoomType.name) return

    setRoomTypes(roomTypes.map((roomType) => (roomType.id === editingRoomType.id ? { ...editingRoomType } : roomType)))
    setEditingRoomType(null)

    toast({
      title: "Room type updated",
      description: `${editingRoomType.name} has been updated.`,
    })
  }

  const removeRoomType = (id) => {
    setRoomTypes(roomTypes.filter((roomType) => roomType.id !== id))

    toast({
      title: "Room type removed",
      description: "The room type has been removed.",
    })
  }

  // Floors Handlers
  const handleNewFloorChange = (e) => {
    setNewFloor({
      ...newFloor,
      [e.target.name]: e.target.value,
    })
  }

  const handleNewFloorAreaChange = (value) => {
    setNewFloor({
      ...newFloor,
      area: value,
    })
  }

  const addFloor = () => {
    if (!newFloor.number || !newFloor.area) return

    setFloors([
      ...floors,
      {
        id: Date.now(),
        number: Number.parseInt(newFloor.number),
        area: newFloor.area,
        description: newFloor.description,
        roomPrefix: newFloor.roomPrefix,
      },
    ])

    setNewFloor({
      number: "",
      area: "",
      description: "",
      roomPrefix: "",
    })

    toast({
      title: "Floor added",
      description: `Floor ${newFloor.number} in ${newFloor.area} has been added.`,
    })
  }

  const startEditFloor = (floor) => {
    setEditingFloor({
      ...floor,
    })
  }

  const cancelEditFloor = () => {
    setEditingFloor(null)
  }

  const saveEditFloor = () => {
    if (!editingFloor.number || !editingFloor.area) return

    setFloors(floors.map((floor) => (floor.id === editingFloor.id ? { ...editingFloor } : floor)))
    setEditingFloor(null)

    toast({
      title: "Floor updated",
      description: `Floor ${editingFloor.number} has been updated.`,
    })
  }

  const removeFloor = (id) => {
    setFloors(floors.filter((floor) => floor.id !== id))

    toast({
      title: "Floor removed",
      description: "The floor has been removed.",
    })
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Success
    toast({
      title: "Settings updated",
      description: "Your hotel configuration settings have been saved successfully.",
    })

    setIsLoading(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => router.push("/settings")} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold text-gray-800">Hotel Configuration</h1>
            </div>
            <Button onClick={handleSaveSettings} disabled={isLoading} className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="amenities" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="areas">Areas</TabsTrigger>
                <TabsTrigger value="bedTypes">Bed Types</TabsTrigger>
                <TabsTrigger value="roomTypes">Room Types</TabsTrigger>
                <TabsTrigger value="floors">Floors</TabsTrigger>
              </TabsList>

              {/* Amenities Tab */}
              <TabsContent value="amenities">
                <Card>
                  <CardHeader>
                    <CardTitle>Amenities</CardTitle>
                    <CardDescription>Manage available amenities for rooms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {amenities.map((amenity) => (
                          <div
                            key={amenity.id}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                          >
                            {editingAmenity && editingAmenity.id === amenity.id ? (
                              <div className="flex-1 grid grid-cols-1 gap-2">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label htmlFor={`edit-name-${amenity.id}`}>Name</Label>
                                    <Input
                                      id={`edit-name-${amenity.id}`}
                                      value={editingAmenity.name}
                                      onChange={(e) => setEditingAmenity({ ...editingAmenity, name: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`edit-icon-${amenity.id}`}>Icon</Label>
                                    <Select
                                      value={editingAmenity.icon}
                                      onValueChange={(value) => setEditingAmenity({ ...editingAmenity, icon: value })}
                                    >
                                      <SelectTrigger id={`edit-icon-${amenity.id}`}>
                                        <SelectValue placeholder="Select an icon" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="wifi">WiFi</SelectItem>
                                        <SelectItem value="tv">TV</SelectItem>
                                        <SelectItem value="thermometer">Air Conditioning</SelectItem>
                                        <SelectItem value="coffee">Coffee</SelectItem>
                                        <SelectItem value="utensils">Kitchen</SelectItem>
                                        <SelectItem value="bath">Bath</SelectItem>
                                        <SelectItem value="parking">Parking</SelectItem>
                                        <SelectItem value="star">Star</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor={`edit-description-${amenity.id}`}>Description</Label>
                                  <Input
                                    id={`edit-description-${amenity.id}`}
                                    value={editingAmenity.description}
                                    onChange={(e) =>
                                      setEditingAmenity({ ...editingAmenity, description: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id={`edit-default-${amenity.id}`}
                                    checked={editingAmenity.isDefault}
                                    onCheckedChange={(checked) =>
                                      setEditingAmenity({ ...editingAmenity, isDefault: checked })
                                    }
                                  />
                                  <Label htmlFor={`edit-default-${amenity.id}`}>Default in all rooms</Label>
                                </div>
                                <div className="flex justify-end space-x-2 mt-2">
                                  <Button variant="outline" size="sm" onClick={cancelEditAmenity}>
                                    <X className="h-4 w-4 mr-1" /> Cancel
                                  </Button>
                                  <Button size="sm" onClick={saveEditAmenity}>
                                    <Check className="h-4 w-4 mr-1" /> Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center">
                                  <div className="mr-3">
                                    <div className="h-8 w-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                                      {amenity.icon}
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{amenity.name}</h3>
                                    <p className="text-xs text-gray-500">{amenity.description}</p>
                                    {amenity.isDefault && (
                                      <Badge variant="outline" className="mt-1">
                                        Default
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => startEditAmenity(amenity)}
                                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeAmenity(amenity.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-medium mb-2">Add New Amenity</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="amenityName">Amenity Name</Label>
                            <Input
                              id="amenityName"
                              name="name"
                              value={newAmenity.name}
                              onChange={handleNewAmenityChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="icon">Icon</Label>
                            <Select value={newAmenity.icon} onValueChange={handleNewAmenityIconChange}>
                              <SelectTrigger id="icon" className="mt-1">
                                <SelectValue placeholder="Select an icon" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="wifi">WiFi</SelectItem>
                                <SelectItem value="tv">TV</SelectItem>
                                <SelectItem value="thermometer">Air Conditioning</SelectItem>
                                <SelectItem value="coffee">Coffee</SelectItem>
                                <SelectItem value="utensils">Kitchen</SelectItem>
                                <SelectItem value="bath">Bath</SelectItem>
                                <SelectItem value="parking">Parking</SelectItem>
                                <SelectItem value="star">Star</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                              id="description"
                              name="description"
                              value={newAmenity.description}
                              onChange={handleNewAmenityChange}
                              className="mt-1"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="isDefault"
                              checked={newAmenity.isDefault}
                              onCheckedChange={handleNewAmenitySwitchChange}
                            />
                            <Label htmlFor="isDefault">Default in all rooms</Label>
                          </div>
                          <div className="flex items-end">
                            <Button onClick={addAmenity} className="flex items-center">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Amenity
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Areas Tab */}
              <TabsContent value="areas">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas</CardTitle>
                    <CardDescription>Manage building areas and locations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        {areas.map((area) => (
                          <div
                            key={area.id}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                          >
                            {editingArea && editingArea.id === area.id ? (
                              <div className="flex-1 grid grid-cols-1 gap-2">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label htmlFor={`edit-name-${area.id}`}>Name</Label>
                                    <Input
                                      id={`edit-name-${area.id}`}
                                      value={editingArea.name}
                                      onChange={(e) => setEditingArea({ ...editingArea, name: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`edit-floors-${area.id}`}>Number of Floors</Label>
                                    <Input
                                      id={`edit-floors-${area.id}`}
                                      type="number"
                                      value={editingArea.floors}
                                      onChange={(e) =>
                                        setEditingArea({ ...editingArea, floors: Number.parseInt(e.target.value) || 0 })
                                      }
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor={`edit-description-${area.id}`}>Description</Label>
                                  <Input
                                    id={`edit-description-${area.id}`}
                                    value={editingArea.description}
                                    onChange={(e) => setEditingArea({ ...editingArea, description: e.target.value })}
                                  />
                                </div>
                                <div className="flex justify-end space-x-2 mt-2">
                                  <Button variant="outline" size="sm" onClick={cancelEditArea}>
                                    <X className="h-4 w-4 mr-1" /> Cancel
                                  </Button>
                                  <Button size="sm" onClick={saveEditArea}>
                                    <Check className="h-4 w-4 mr-1" /> Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <h3 className="font-medium">{area.name}</h3>
                                  <p className="text-sm text-gray-500">{area.description}</p>
                                  <p className="text-sm mt-1">Floors: {area.floors}</p>
                                </div>
                                <div className="flex space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => startEditArea(area)}
                                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeArea(area.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-medium mb-2">Add New Area</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="areaName">Area Name</Label>
                            <Input
                              id="areaName"
                              name="name"
                              value={newArea.name}
                              onChange={handleNewAreaChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="floors">Number of Floors</Label>
                            <Input
                              id="floors"
                              name="floors"
                              type="number"
                              value={newArea.floors}
                              onChange={handleNewAreaChange}
                              className="mt-1"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="areaDescription">Description</Label>
                            <Input
                              id="areaDescription"
                              name="description"
                              value={newArea.description}
                              onChange={handleNewAreaChange}
                              className="mt-1"
                            />
                          </div>
                          <div className="flex items-end col-span-2">
                            <Button onClick={addArea} className="flex items-center">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Area
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bed Types Tab */}
              <TabsContent value="bedTypes">
                <Card>
                  <CardHeader>
                    <CardTitle>Bed Types</CardTitle>
                    <CardDescription>Manage bed types and configurations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        {bedTypes.map((bedType) => (
                          <div
                            key={bedType.id}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                          >
                            {editingBedType && editingBedType.id === bedType.id ? (
                              <div className="flex-1 grid grid-cols-1 gap-2">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label htmlFor={`edit-name-${bedType.id}`}>Name</Label>
                                    <Input
                                      id={`edit-name-${bedType.id}`}
                                      value={editingBedType.name}
                                      onChange={(e) => setEditingBedType({ ...editingBedType, name: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`edit-capacity-${bedType.id}`}>Capacity</Label>
                                    <Input
                                      id={`edit-capacity-${bedType.id}`}
                                      type="number"
                                      value={editingBedType.capacity}
                                      onChange={(e) =>
                                        setEditingBedType({
                                          ...editingBedType,
                                          capacity: Number.parseInt(e.target.value) || 1,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor={`edit-description-${bedType.id}`}>Description</Label>
                                  <Input
                                    id={`edit-description-${bedType.id}`}
                                    value={editingBedType.description}
                                    onChange={(e) =>
                                      setEditingBedType({ ...editingBedType, description: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="flex justify-end space-x-2 mt-2">
                                  <Button variant="outline" size="sm" onClick={cancelEditBedType}>
                                    <X className="h-4 w-4 mr-1" /> Cancel
                                  </Button>
                                  <Button size="sm" onClick={saveEditBedType}>
                                    <Check className="h-4 w-4 mr-1" /> Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <h3 className="font-medium">{bedType.name}</h3>
                                  <p className="text-sm text-gray-500">{bedType.description}</p>
                                  <p className="text-sm mt-1">
                                    Capacity: {bedType.capacity} {bedType.capacity === 1 ? "person" : "people"}
                                  </p>
                                </div>
                                <div className="flex space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => startEditBedType(bedType)}
                                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeBedType(bedType.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-medium mb-2">Add New Bed Type</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="bedTypeName">Bed Type Name</Label>
                            <Input
                              id="bedTypeName"
                              name="name"
                              value={newBedType.name}
                              onChange={handleNewBedTypeChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="capacity">Capacity</Label>
                            <Input
                              id="capacity"
                              name="capacity"
                              type="number"
                              value={newBedType.capacity}
                              onChange={handleNewBedTypeChange}
                              className="mt-1"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="bedTypeDescription">Description</Label>
                            <Input
                              id="bedTypeDescription"
                              name="description"
                              value={newBedType.description}
                              onChange={handleNewBedTypeChange}
                              className="mt-1"
                            />
                          </div>
                          <div className="flex items-end col-span-2">
                            <Button onClick={addBedType} className="flex items-center">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Bed Type
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Room Types Tab */}
              <TabsContent value="roomTypes">
                <Card>
                  <CardHeader>
                    <CardTitle>Room Types</CardTitle>
                    <CardDescription>Manage room categories and base pricing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        {roomTypes.map((type) => (
                          <div
                            key={type.id}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                          >
                            {editingRoomType && editingRoomType.id === type.id ? (
                              <div className="flex-1 grid grid-cols-1 gap-2">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label htmlFor={`edit-name-${type.id}`}>Name</Label>
                                    <Input
                                      id={`edit-name-${type.id}`}
                                      value={editingRoomType.name}
                                      onChange={(e) => setEditingRoomType({ ...editingRoomType, name: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`edit-price-${type.id}`}>Base Price ($)</Label>
                                    <Input
                                      id={`edit-price-${type.id}`}
                                      type="number"
                                      value={editingRoomType.basePrice}
                                      onChange={(e) =>
                                        setEditingRoomType({
                                          ...editingRoomType,
                                          basePrice: Number.parseFloat(e.target.value) || 0,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor={`edit-description-${type.id}`}>Description</Label>
                                  <Input
                                    id={`edit-description-${type.id}`}
                                    value={editingRoomType.description}
                                    onChange={(e) =>
                                      setEditingRoomType({ ...editingRoomType, description: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="flex justify-end space-x-2 mt-2">
                                  <Button variant="outline" size="sm" onClick={cancelEditRoomType}>
                                    <X className="h-4 w-4 mr-1" /> Cancel
                                  </Button>
                                  <Button size="sm" onClick={saveEditRoomType}>
                                    <Check className="h-4 w-4 mr-1" /> Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <h3 className="font-medium">{type.name}</h3>
                                  <p className="text-sm text-gray-500">{type.description}</p>
                                  <p className="text-sm mt-1">Base Price: ${type.basePrice}/night</p>
                                </div>
                                <div className="flex space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => startEditRoomType(type)}
                                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeRoomType(type.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-medium mb-2">Add New Room Type</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="roomTypeName">Room Type Name</Label>
                            <Input
                              id="roomTypeName"
                              name="name"
                              value={newRoomType.name}
                              onChange={handleNewRoomTypeChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="basePrice">Base Price ($)</Label>
                            <Input
                              id="basePrice"
                              name="basePrice"
                              type="number"
                              value={newRoomType.basePrice}
                              onChange={handleNewRoomTypeChange}
                              className="mt-1"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="roomTypeDescription">Description</Label>
                            <Input
                              id="roomTypeDescription"
                              name="description"
                              value={newRoomType.description}
                              onChange={handleNewRoomTypeChange}
                              className="mt-1"
                            />
                          </div>
                          <div className="flex items-end col-span-2">
                            <Button onClick={addRoomType} className="flex items-center">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Room Type
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Floors Tab */}
              <TabsContent value="floors">
                <Card>
                  <CardHeader>
                    <CardTitle>Floors</CardTitle>
                    <CardDescription>Manage floors and room numbering</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        {floors.map((floor) => (
                          <div
                            key={floor.id}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                          >
                            {editingFloor && editingFloor.id === floor.id ? (
                              <div className="flex-1 grid grid-cols-1 gap-2">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label htmlFor={`edit-number-${floor.id}`}>Floor Number</Label>
                                    <Input
                                      id={`edit-number-${floor.id}`}
                                      type="number"
                                      value={editingFloor.number}
                                      onChange={(e) =>
                                        setEditingFloor({
                                          ...editingFloor,
                                          number: Number.parseInt(e.target.value) || 0,
                                        })
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`edit-area-${floor.id}`}>Area</Label>
                                    <Select
                                      value={editingFloor.area}
                                      onValueChange={(value) => setEditingFloor({ ...editingFloor, area: value })}
                                    >
                                      <SelectTrigger id={`edit-area-${floor.id}`}>
                                        <SelectValue placeholder="Select an area" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {areas.map((area) => (
                                          <SelectItem key={area.id} value={area.name}>
                                            {area.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label htmlFor={`edit-description-${floor.id}`}>Description</Label>
                                    <Input
                                      id={`edit-description-${floor.id}`}
                                      value={editingFloor.description}
                                      onChange={(e) =>
                                        setEditingFloor({ ...editingFloor, description: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`edit-prefix-${floor.id}`}>Room Prefix</Label>
                                    <Input
                                      id={`edit-prefix-${floor.id}`}
                                      value={editingFloor.roomPrefix}
                                      onChange={(e) => setEditingFloor({ ...editingFloor, roomPrefix: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-2">
                                  <Button variant="outline" size="sm" onClick={cancelEditFloor}>
                                    <X className="h-4 w-4 mr-1" /> Cancel
                                  </Button>
                                  <Button size="sm" onClick={saveEditFloor}>
                                    <Check className="h-4 w-4 mr-1" /> Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <h3 className="font-medium">
                                    Floor {floor.number} - {floor.area}
                                  </h3>
                                  <p className="text-sm text-gray-500">{floor.description}</p>
                                  <p className="text-sm mt-1">Room Prefix: {floor.roomPrefix}</p>
                                </div>
                                <div className="flex space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => startEditFloor(floor)}
                                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFloor(floor.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-medium mb-2">Add New Floor</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="floorNumber">Floor Number</Label>
                            <Input
                              id="floorNumber"
                              name="number"
                              type="number"
                              value={newFloor.number}
                              onChange={handleNewFloorChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="area">Area</Label>
                            <Select value={newFloor.area} onValueChange={handleNewFloorAreaChange}>
                              <SelectTrigger id="area" className="mt-1">
                                <SelectValue placeholder="Select an area" />
                              </SelectTrigger>
                              <SelectContent>
                                {areas.map((area) => (
                                  <SelectItem key={area.id} value={area.name}>
                                    {area.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="floorDescription">Description</Label>
                            <Input
                              id="floorDescription"
                              name="description"
                              value={newFloor.description}
                              onChange={handleNewFloorChange}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="roomPrefix">Room Prefix</Label>
                            <Input
                              id="roomPrefix"
                              name="roomPrefix"
                              value={newFloor.roomPrefix}
                              onChange={handleNewFloorChange}
                              className="mt-1"
                            />
                          </div>
                          <div className="flex items-end col-span-2">
                            <Button onClick={addFloor} className="flex items-center">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Floor
                            </Button>
                          </div>
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
    </div>
  )
}

