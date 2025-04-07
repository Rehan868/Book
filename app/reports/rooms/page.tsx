import { Download, Filter, Calendar } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RoomsReportsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="reports" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Rooms Reports</h1>
              <p className="text-gray-500">Analyze room performance, availability and maintenance status</p>
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
          <Tabs defaultValue="performance">
            <TabsList className="mb-6">
              <TabsTrigger value="performance">Room Performance</TabsTrigger>
              <TabsTrigger value="availability">Availability Analysis</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance Status</TabsTrigger>
              <TabsTrigger value="revenue">Revenue by Room</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Average Occupancy Rate" value="76%" change="+4.2%" positive={true} />
                <MetricCard title="Average Daily Rate" value="$185" change="+2.8%" positive={true} />
                <MetricCard title="RevPAR" value="$141" change="+7.1%" positive={true} />
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Room Performance by Type</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Room Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Occupancy Rate</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ADR</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">RevPAR</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Deluxe King</td>
                        <td className="px-4 py-4 text-sm text-gray-500">82%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$210</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$172</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$42,840</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Standard Queen</td>
                        <td className="px-4 py-4 text-sm text-gray-500">78%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$175</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$137</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$35,620</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Junior Suite</td>
                        <td className="px-4 py-4 text-sm text-gray-500">68%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$250</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$170</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$28,900</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Executive Suite</td>
                        <td className="px-4 py-4 text-sm text-gray-500">62%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$320</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$198</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$23,760</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Family Room</td>
                        <td className="px-4 py-4 text-sm text-gray-500">85%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$230</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$196</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$39,100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Occupancy Trend (Last 30 Days)</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Occupancy Trend Chart</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Revenue Trend (Last 30 Days)</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Revenue Trend Chart</p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="availability" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Room Availability Overview</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Room Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total Rooms</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Available</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Occupied</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Out of Order</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Availability %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Deluxe King</td>
                        <td className="px-4 py-4 text-sm text-gray-500">20</td>
                        <td className="px-4 py-4 text-sm text-gray-500">4</td>
                        <td className="px-4 py-4 text-sm text-gray-500">15</td>
                        <td className="px-4 py-4 text-sm text-gray-500">1</td>
                        <td className="px-4 py-4 text-sm text-gray-500">20%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Standard Queen</td>
                        <td className="px-4 py-4 text-sm text-gray-500">30</td>
                        <td className="px-4 py-4 text-sm text-gray-500">7</td>
                        <td className="px-4 py-4 text-sm text-gray-500">23</td>
                        <td className="px-4 py-4 text-sm text-gray-500">0</td>
                        <td className="px-4 py-4 text-sm text-gray-500">23%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Junior Suite</td>
                        <td className="px-4 py-4 text-sm text-gray-500">15</td>
                        <td className="px-4 py-4 text-sm text-gray-500">5</td>
                        <td className="px-4 py-4 text-sm text-gray-500">9</td>
                        <td className="px-4 py-4 text-sm text-gray-500">1</td>
                        <td className="px-4 py-4 text-sm text-gray-500">33%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Executive Suite</td>
                        <td className="px-4 py-4 text-sm text-gray-500">10</td>
                        <td className="px-4 py-4 text-sm text-gray-500">4</td>
                        <td className="px-4 py-4 text-sm text-gray-500">6</td>
                        <td className="px-4 py-4 text-sm text-gray-500">0</td>
                        <td className="px-4 py-4 text-sm text-gray-500">40%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Family Room</td>
                        <td className="px-4 py-4 text-sm text-gray-500">15</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2</td>
                        <td className="px-4 py-4 text-sm text-gray-500">13</td>
                        <td className="px-4 py-4 text-sm text-gray-500">0</td>
                        <td className="px-4 py-4 text-sm text-gray-500">13%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Availability Forecast (Next 30 Days)</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Availability Forecast Chart</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Seasonal Availability Patterns</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Seasonal Patterns Chart</p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatusCard title="Total Rooms" value="90" color="bg-gray-100" />
                <StatusCard title="Operational" value="85" color="bg-green-100" />
                <StatusCard title="Under Maintenance" value="3" color="bg-amber-100" />
                <StatusCard title="Out of Order" value="2" color="bg-red-100" />
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Maintenance Status by Room</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Room Number</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Room Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Issue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Reported Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Est. Completion</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">201</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Deluxe King</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">Maintenance</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">Plumbing issue</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-15</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-18</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">315</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Junior Suite</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">Maintenance</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">HVAC repair</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-14</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-17</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">412</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Standard Queen</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">Maintenance</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">Electrical issue</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-16</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-17</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">507</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Deluxe King</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs">Out of Order</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">Water damage</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-10</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-25</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">602</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Executive Suite</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs">Out of Order</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">Renovation</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-01</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-02-01</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Maintenance Cost Analysis</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Maintenance Cost by Room Type Chart</p>
                  </div>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Maintenance Cost Trend Chart</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Total Room Revenue" value="$168,420" change="+8.3%" positive={true} />
                <MetricCard title="Revenue per Available Room" value="$141" change="+7.1%" positive={true} />
                <MetricCard title="Average Length of Stay" value="2.8 nights" change="+0.3" positive={true} />
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Revenue by Room</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Room Number</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Room Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Occupancy Rate</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total Revenue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Revenue per Day</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">205</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Deluxe King</td>
                        <td className="px-4 py-4 text-sm text-gray-500">92%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$5,880</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$196</td>
                        <td className="px-4 py-4 text-sm text-green-600">+12.4%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">301</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Junior Suite</td>
                        <td className="px-4 py-4 text-sm text-gray-500">85%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$6,375</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$213</td>
                        <td className="px-4 py-4 text-sm text-green-600">+8.7%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">402</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Standard Queen</td>
                        <td className="px-4 py-4 text-sm text-gray-500">88%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$4,620</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$154</td>
                        <td className="px-4 py-4 text-sm text-green-600">+5.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">501</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Executive Suite</td>
                        <td className="px-4 py-4 text-sm text-gray-500">72%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$6,912</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$230</td>
                        <td className="px-4 py-4 text-sm text-red-600">-2.1%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">603</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Family Room</td>
                        <td className="px-4 py-4 text-sm text-gray-500">95%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$6,555</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$219</td>
                        <td className="px-4 py-4 text-sm text-green-600">+14.8%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Revenue Distribution by Room Type</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Revenue Distribution Chart</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Revenue Trend by Month</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Monthly Revenue Trend Chart</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, change, positive }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`text-sm ${positive ? "text-green-600" : "text-red-600"}`}>{change}</div>
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </Card>
  )
}

function StatusCard({ title, value, color }) {
  return (
    <Card className={`p-6 ${color}`}>
      <div className="text-sm font-medium text-gray-500 mb-2">{title}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </Card>
  )
}

