"use client"

import { useState } from "react"
import { Search, Plus, Save, Calendar, ArrowUpRight, Percent, DollarSign } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock data for properties
const properties = [
  { id: 1, name: "Marina Towers 301", basePrice: 750, minPrice: 500, maxPrice: 1200 },
  { id: 2, name: "Downtown Heights 205", basePrice: 850, minPrice: 600, maxPrice: 1400 },
  { id: 3, name: "Palm Residences 401", basePrice: 1200, minPrice: 800, maxPrice: 2000 },
  { id: 4, name: "JBR Apartments 501", basePrice: 950, minPrice: 650, maxPrice: 1600 },
  { id: 5, name: "Marina Towers 302", basePrice: 780, minPrice: 550, maxPrice: 1300 },
]

// Mock data for seasonal pricing
const seasonalPricing = [
  { id: 1, name: "High Season", startDate: "2024-12-15", endDate: "2025-01-15", adjustment: 50 },
  { id: 2, name: "New Year's Eve", startDate: "2024-12-31", endDate: "2025-01-01", adjustment: 100 },
  { id: 3, name: "Summer Low Season", startDate: "2024-06-01", endDate: "2024-08-31", adjustment: -20 },
  { id: 4, name: "Eid Holiday", startDate: "2024-04-10", endDate: "2024-04-15", adjustment: 30 },
  { id: 5, name: "Dubai Shopping Festival", startDate: "2024-01-15", endDate: "2024-02-15", adjustment: 25 },
]

export default function DynamicPricingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [pricingRules, setPricingRules] = useState({
    weekendAdjustment: 25,
    lastMinuteDiscount: 10,
    lastMinuteDays: 3,
    earlyBookingBonus: 5,
    earlyBookingDays: 90,
    minStayDiscount: 15,
    minStayNights: 7,
    occupancyBasedPricing: true,
    competitorBasedPricing: true,
    demandBasedPricing: true,
  })

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRuleChange = (rule, value) => {
    setPricingRules((prev) => ({
      ...prev,
      [rule]: value,
    }))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="pricing" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Dynamic Pricing</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                View Calendar
              </Button>
              <Button className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Rules
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Average Daily Rate</p>
                  <p className="text-2xl font-bold">AED 906</p>
                </div>
                <DollarSign className="h-8 w-8 text-gray-300" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Revenue Increase</p>
                  <p className="text-2xl font-bold">+18.5%</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-green-300" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Occupancy Rate</p>
                  <p className="text-2xl font-bold">82%</p>
                </div>
                <Percent className="h-8 w-8 text-gray-300" />
              </CardContent>
            </Card>
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

            <Select
              value={selectedProperty ? selectedProperty.toString() : "all"}
              onValueChange={(value) => setSelectedProperty(value)}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.id.toString()}>
                    {property.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Seasonal Rule
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="rules">
            <TabsList className="mb-6">
              <TabsTrigger value="rules">Pricing Rules</TabsTrigger>
              <TabsTrigger value="seasonal">Seasonal Pricing</TabsTrigger>
              <TabsTrigger value="properties">Property Base Rates</TabsTrigger>
            </TabsList>

            <TabsContent value="rules" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Standard Pricing Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Weekend Adjustment (%)</Label>
                          <span className="text-sm font-medium">{pricingRules.weekendAdjustment}%</span>
                        </div>
                        <Slider
                          value={[pricingRules.weekendAdjustment]}
                          min={0}
                          max={100}
                          step={5}
                          onValueChange={(value) => handleRuleChange("weekendAdjustment", value[0])}
                        />
                        <p className="text-sm text-gray-500">Increase pricing for Friday and Saturday nights</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Last Minute Discount (%)</Label>
                          <span className="text-sm font-medium">{pricingRules.lastMinuteDiscount}%</span>
                        </div>
                        <Slider
                          value={[pricingRules.lastMinuteDiscount]}
                          min={0}
                          max={50}
                          step={5}
                          onValueChange={(value) => handleRuleChange("lastMinuteDiscount", value[0])}
                        />
                        <div className="flex justify-between">
                          <Label>Days Before Check-in</Label>
                          <span className="text-sm font-medium">{pricingRules.lastMinuteDays} days</span>
                        </div>
                        <Slider
                          value={[pricingRules.lastMinuteDays]}
                          min={1}
                          max={7}
                          step={1}
                          onValueChange={(value) => handleRuleChange("lastMinuteDays", value[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Early Booking Bonus (%)</Label>
                          <span className="text-sm font-medium">{pricingRules.earlyBookingBonus}%</span>
                        </div>
                        <Slider
                          value={[pricingRules.earlyBookingBonus]}
                          min={0}
                          max={20}
                          step={1}
                          onValueChange={(value) => handleRuleChange("earlyBookingBonus", value[0])}
                        />
                        <div className="flex justify-between">
                          <Label>Days Before Check-in</Label>
                          <span className="text-sm font-medium">{pricingRules.earlyBookingDays} days</span>
                        </div>
                        <Slider
                          value={[pricingRules.earlyBookingDays]}
                          min={30}
                          max={180}
                          step={15}
                          onValueChange={(value) => handleRuleChange("earlyBookingDays", value[0])}
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Minimum Stay Discount (%)</Label>
                          <span className="text-sm font-medium">{pricingRules.minStayDiscount}%</span>
                        </div>
                        <Slider
                          value={[pricingRules.minStayDiscount]}
                          min={0}
                          max={30}
                          step={5}
                          onValueChange={(value) => handleRuleChange("minStayDiscount", value[0])}
                        />
                        <div className="flex justify-between">
                          <Label>Minimum Nights</Label>
                          <span className="text-sm font-medium">{pricingRules.minStayNights} nights</span>
                        </div>
                        <Slider
                          value={[pricingRules.minStayNights]}
                          min={3}
                          max={14}
                          step={1}
                          onValueChange={(value) => handleRuleChange("minStayNights", value[0])}
                        />
                      </div>

                      <div className="space-y-4 pt-4">
                        <h3 className="text-lg font-medium">Advanced Pricing Factors</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="occupancy-pricing">Occupancy-based Pricing</Label>
                            <p className="text-sm text-gray-500">Adjust prices based on current occupancy rates</p>
                          </div>
                          <Switch
                            id="occupancy-pricing"
                            checked={pricingRules.occupancyBasedPricing}
                            onCheckedChange={(checked) => handleRuleChange("occupancyBasedPricing", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="competitor-pricing">Competitor-based Pricing</Label>
                            <p className="text-sm text-gray-500">Adjust prices based on competitor rates</p>
                          </div>
                          <Switch
                            id="competitor-pricing"
                            checked={pricingRules.competitorBasedPricing}
                            onCheckedChange={(checked) => handleRuleChange("competitorBasedPricing", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="demand-pricing">Demand-based Pricing</Label>
                            <p className="text-sm text-gray-500">Adjust prices based on search and booking demand</p>
                          </div>
                          <Switch
                            id="demand-pricing"
                            checked={pricingRules.demandBasedPricing}
                            onCheckedChange={(checked) => handleRuleChange("demandBasedPricing", checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seasonal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Pricing Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {seasonalPricing.map((season) => (
                      <div
                        key={season.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium">{season.name}</h3>
                          <p className="text-sm text-gray-500">
                            {season.startDate} to {season.endDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span
                              className={`text-lg font-bold ${season.adjustment > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {season.adjustment > 0 ? "+" : ""}
                              {season.adjustment}%
                            </span>
                            <p className="text-sm text-gray-500">Price Adjustment</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="properties" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Base Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredProperties.map((property) => (
                      <div
                        key={property.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium">{property.name}</h3>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <span className="text-lg font-bold">AED {property.basePrice}</span>
                            <p className="text-sm text-gray-500">Base Rate</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-medium">AED {property.minPrice}</span>
                            <p className="text-sm text-gray-500">Minimum</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-medium">AED {property.maxPrice}</span>
                            <p className="text-sm text-gray-500">Maximum</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
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

