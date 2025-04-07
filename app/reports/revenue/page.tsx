import { Download, Filter, Calendar } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RevenueReportsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="reports" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Revenue Reports</h1>
              <p className="text-gray-500">Revenue by room type and period</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
              <TabsTrigger value="roomtype">By Room Type</TabsTrigger>
              <TabsTrigger value="channel">By Channel</TabsTrigger>
              <TabsTrigger value="forecast">Revenue Forecast</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard 
                  title="Total Revenue" 
                  value="$487,250" 
                  change="+8.2%" 
                  positive={true} 
                />
                <MetricCard 
                  title="Room Revenue" 
                  value="$345,780" 
                  change="+9.2%" 
                  positive={true} 
                />
                <MetricCard 
                  title="RevPAR" 
                  value="$141" 
                  change="+7.1%" 
                  positive={true} 
                />
                <MetricCard 
                  title="ADR" 
                  value="$185" 
                  change="+2.8%" 
                  positive={true} 
                />
              </div>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Revenue Trend</h3>
                <div className="h-80 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Revenue Trend Chart</p>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Revenue by Source</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Revenue Source Chart</p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Revenue by Month</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Monthly Revenue Chart</p>
                  </div>
                </Card>
              </div>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Revenue Summary</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Period</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Room Revenue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">F&B Revenue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Other Revenue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total Revenue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">January</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$65,780</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$14,890</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$11,780</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$92,450</td>
                        <td className="px-4 py-4 text-sm text-green-600">+8.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">February</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$63,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$14,560</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$11,770</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$89,780</td>
                        <td className="px-4 py-4 text-sm text-green-600">+7.5%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">March</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$72,340</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$16,780</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$13,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$102,570</td>
                        <td className="px-4 py-4 text-sm text-green-600">+10.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">April</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$68,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$15,670</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$12,560</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$96,680</td>
                        <td className="px-4 py-4 text-sm text-green-600">+6.8%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">May</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$75,760</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$16,550</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$13,460</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$105,770</td>
                        <td className="px-4 py-4 text-sm text-green-600">+9.5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="roomtype" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Revenue by Room Type</h3>
                <div className="h-80 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Room Type Revenue Chart</p>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Room Type Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Room Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Revenue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">% of Total</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Occupancy</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ADR</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">RevPAR</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Deluxe King</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$98,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">28%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">82%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$210</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$172</td>
                        <td className="px-4 py-4 text-sm text-green-600">+9.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Standard Queen</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$87,680</td>
                        <td className="px-4 py-4 text-sm text-gray-500">25%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">78%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$175</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$137</td>
                        <td className="px-4 py-4 text-sm text-green-600">+7.5%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Junior Suite</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$65,780</td>
                        <td className="px-4 py-4 text-sm text-gray-500">19%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">68%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$250</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$170</td>
                        <td className="px-4 py-4 text-sm text-green-600">+8.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Executive Suite</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$54,770</td>
                        <td className="px-4 py-4 text-sm text-gray-500">16%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">62%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$320</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$198</td>
                        <td className="px-4 py-4 text-sm text-green-600">+6.5%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Family Room</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$39,100</td>
                        <td className="px-4 py-4 text-sm text-gray-500">11%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">85%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$230</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$196</td>
                        <td className="px-4 py-4 text-sm text-green-600">+10.8%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Room Type Occupancy</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Room Type Occupancy Chart</p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Room Type ADR</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Room Type ADR Chart</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="channel" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard 
                  title="Direct Bookings" 
                  value="$195,780" 
                  change="+12.5%" 
                  positive={true} 
                />
                <MetricCard 
                  title="OTA Revenue" 
                  value="$242,350" 
                  change="+5.8%" 
                  positive={true} 
                />
                <MetricCard 
                  title="Other Channels" 
                  value="$49,120" 
                  change="+3.2%" 
                  positive={true} 
                />
              </div>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Revenue by Channel</h3>
                <div className="h-80 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Channel Revenue Chart</p>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Channel Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Channel</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Bookings</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Revenue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">% of Total</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ADR</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Commission</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Direct Website</td>
                        <td className="px-4 py-4 text-sm text-gray-500">425</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$98,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">20%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$232</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$0</td>
                        <td className="px-4 py-4 text-sm text-green-600">+15.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Direct Phone/Email</td>
                        <td className="px-4 py-4 text-sm text-gray-500">387</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$97,330</td>
                        <td className="px-4 py-4 text-sm text-gray-500">20%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$252</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$0</td>
                        <td className="px-4 py-4 text-sm text-green-600">+9.8%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Booking.com</td>
                        <td className="px-4 py-4 text-sm text-gray-500">325</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$78,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">16%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$241</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$11,768</td>
                        <td className="px-4 py-4 text-sm text-green-600">+7.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Expedia</td>
                        <td className="px-4 py-4 text-sm text-gray-500">287</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$65,360</td>
                        <td className="px-4 py-4 text-sm text-gray-500">13%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$228</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$9,804</td>
                        <td className="px-4 py-4 text-sm text-green-600">+5.5%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Airbnb</td>
                        <td className="px-4 py-4 text-sm text-gray-500">156</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$42,120</td>
                        <td className="px-4 py-4 text-sm text-gray-500">9%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$270</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$6,318</td>
                        <td className="px-4 py-4 text-sm text-green-600">+12.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Travel Agents</td>
                        <td className="px-4 py-4 text-sm text-gray-500">245</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$56,420</td>
                        <td className="px-4 py-4 text-sm text-gray-500">12%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$230</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$8,463</td>
                        <td className="px-4 py-4 text-sm text-green-600">+4.8%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Other Channels</td>
                        <td className="px-4 py-4 text-sm text-gray-500">215</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$49,120</td>
                        <td className="px-4 py-4 text-sm text-gray-500">10%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$228</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$4,912</td>
                        <td className="px-4 py-4 text-sm text-green-600">+3.2%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Channel Revenue Trend</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Channel Revenue Trend Chart</p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Channel Commission Analysis</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Commission Analysis Chart</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="forecast" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard 
                  title="Forecasted Revenue (Next Month)" 
                  value="$108,450" 
                  change="+5.2%" 
                  positive={true} 
                />
                <MetricCard 
                  title="Forecasted Occupancy" 
                  value="82%" 
                  change="+3.5%" 
                  positive={true} 
                />
                <MetricCard 
                  title="Forecasted ADR" 
                  value="$192" 
                  change="+3.8%" 
                  positive={true} 
                />
              </div>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Revenue Forecast (Next 6 Months)</h3>
                <div className="h-80 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Revenue Forecast Chart</p>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Revenue Forecast by Month</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Month</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Forecasted Revenue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Forecasted Occupancy</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Forecasted ADR</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Change</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Confidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">June</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$108,450\

\

