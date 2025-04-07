import { Download, Filter, Calendar } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AgentReportsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="reports" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Agent Reports</h1>
              <p className="text-gray-500">Travel agent and partner booking performance</p>
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
              <TabsTrigger value="performance">Agent Performance</TabsTrigger>
              <TabsTrigger value="commissions">Commissions</TabsTrigger>
              <TabsTrigger value="bookings">Booking Analysis</TabsTrigger>
              <TabsTrigger value="partners">Partner Channels</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard title="Total Agent Bookings" value="1,245" change="+8.2%" positive={true} />
                <MetricCard title="Agent Revenue" value="$287,450" change="+9.2%" positive={true} />
                <MetricCard title="Commission Paid" value="$43,118" change="+9.2%" positive={true} />
                <MetricCard title="Average Booking Value" value="$231" change="+1.8%" positive={true} />
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Top Performing Agents</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Agent Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Bookings</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Revenue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Commission</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Avg. Booking Value</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Global Travel Inc.</td>
                        <td className="px-4 py-4 text-sm text-gray-500">245</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$58,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$8,768</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$238</td>
                        <td className="px-4 py-4 text-sm text-green-600">+12.4%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Luxury Escapes</td>
                        <td className="px-4 py-4 text-sm text-gray-500">187</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$52,360</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$7,854</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$280</td>
                        <td className="px-4 py-4 text-sm text-green-600">+8.7%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Business Travel Solutions</td>
                        <td className="px-4 py-4 text-sm text-gray-500">156</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$42,120</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$6,318</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$270</td>
                        <td className="px-4 py-4 text-sm text-green-600">+5.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Vacation Experts</td>
                        <td className="px-4 py-4 text-sm text-gray-500">132</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$35,640</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$5,346</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$270</td>
                        <td className="px-4 py-4 text-sm text-red-600">-2.1%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Premier Bookings</td>
                        <td className="px-4 py-4 text-sm text-gray-500">128</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$38,400</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$5,760</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$300</td>
                        <td className="px-4 py-4 text-sm text-green-600">+14.8%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Agent Booking Distribution</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Booking Distribution Chart</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Monthly Agent Performance</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Monthly Performance Chart</p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="commissions" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Total Commissions (YTD)" value="$187,450" change="+7.8%" positive={true} />
                <MetricCard title="Average Commission Rate" value="15%" change="+0.5%" positive={true} />
                <MetricCard title="Pending Commissions" value="$24,680" change="+3.2%" positive={true} />
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Commission Payments</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Agent</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Payment Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Booking Period</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Payment Method</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Global Travel Inc.</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-15</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$8,768</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Dec 2023</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Bank Transfer</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">Paid</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Luxury Escapes</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-15</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$7,854</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Dec 2023</td>
                        <td className="px-4 py-4 text-sm text-gray-500">PayPal</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">Paid</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Business Travel Solutions</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-20</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$6,318</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Dec 2023</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Bank Transfer</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">Processing</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Vacation Experts</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-15</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$5,346</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Dec 2023</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Check</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">Paid</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Premier Bookings</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-20</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$5,760</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Dec 2023</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Bank Transfer</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">Processing</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Commission Trends</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Commission Trends Chart</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Booking Analysis by Agent</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Agent</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total Bookings</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Cancellations</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Avg. Length of Stay</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Avg. Lead Time</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Conversion Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Global Travel Inc.</td>
                        <td className="px-4 py-4 text-sm text-gray-500">245</td>
                        <td className="px-4 py-4 text-sm text-gray-500">12 (4.9%)</td>
                        <td className="px-4 py-4 text-sm text-gray-500">3.2 nights</td>
                        <td className="px-4 py-4 text-sm text-gray-500">28 days</td>
                        <td className="px-4 py-4 text-sm text-gray-500">68%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Luxury Escapes</td>
                        <td className="px-4 py-4 text-sm text-gray-500">187</td>
                        <td className="px-4 py-4 text-sm text-gray-500">8 (4.3%)</td>
                        <td className="px-4 py-4 text-sm text-gray-500">4.5 nights</td>
                        <td className="px-4 py-4 text-sm text-gray-500">45 days</td>
                        <td className="px-4 py-4 text-sm text-gray-500">72%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Business Travel Solutions</td>
                        <td className="px-4 py-4 text-sm text-gray-500">156</td>
                        <td className="px-4 py-4 text-sm text-gray-500">5 (3.2%)</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2.8 nights</td>
                        <td className="px-4 py-4 text-sm text-gray-500">14 days</td>
                        <td className="px-4 py-4 text-sm text-gray-500">75%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Vacation Experts</td>
                        <td className="px-4 py-4 text-sm text-gray-500">132</td>
                        <td className="px-4 py-4 text-sm text-gray-500">10 (7.6%)</td>
                        <td className="px-4 py-4 text-sm text-gray-500">3.5 nights</td>
                        <td className="px-4 py-4 text-sm text-gray-500">32 days</td>
                        <td className="px-4 py-4 text-sm text-gray-500">65%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Premier Bookings</td>
                        <td className="px-4 py-4 text-sm text-gray-500">128</td>
                        <td className="px-4 py-4 text-sm text-gray-500">6 (4.7%)</td>
                        <td className="px-4 py-4 text-sm text-gray-500">4.2 nights</td>
                        <td className="px-4 py-4 text-sm text-gray-500">38 days</td>
                        <td className="px-4 py-4 text-sm text-gray-500">70%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Booking Patterns</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Booking Patterns Chart</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Cancellation Analysis</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Cancellation Analysis Chart</p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="partners" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Total Partner Channels" value="12" change="+2" positive={true} />
                <MetricCard title="Partner Revenue" value="$345,780" change="+12.5%" positive={true} />
                <MetricCard title="Partner Conversion Rate" value="68%" change="+3.2%" positive={true} />
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Partner Channel Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Partner</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Channel Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Bookings</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Revenue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Commission</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Growth</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Booking.com</td>
                        <td className="px-4 py-4 text-sm text-gray-500">OTA</td>
                        <td className="px-4 py-4 text-sm text-gray-500">325</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$78,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$11,768</td>
                        <td className="px-4 py-4 text-sm text-green-600">+15.4%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Expedia</td>
                        <td className="px-4 py-4 text-sm text-gray-500">OTA</td>
                        <td className="px-4 py-4 text-sm text-gray-500">287</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$65,360</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$9,804</td>
                        <td className="px-4 py-4 text-sm text-green-600">+10.7%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Airbnb</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Marketplace</td>
                        <td className="px-4 py-4 text-sm text-gray-500">156</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$42,120</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$6,318</td>
                        <td className="px-4 py-4 text-sm text-green-600">+22.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">TripAdvisor</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Metasearch</td>
                        <td className="px-4 py-4 text-sm text-gray-500">132</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$35,640</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$5,346</td>
                        <td className="px-4 py-4 text-sm text-red-600">-5.1%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Hotels.com</td>
                        <td className="px-4 py-4 text-sm text-gray-500">OTA</td>
                        <td className="px-4 py-4 text-sm text-gray-500">128</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$38,400</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$5,760</td>
                        <td className="px-4 py-4 text-sm text-green-600">+8.8%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Channel Revenue Distribution</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Revenue Distribution Chart</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Channel Growth Comparison</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Growth Comparison Chart</p>
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

