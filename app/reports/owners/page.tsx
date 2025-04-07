import { Download, Filter, Calendar } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OwnersReportsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="reports" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Owners Reports</h1>
              <p className="text-gray-500">Property owner statements and performance metrics</p>
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
          <Tabs defaultValue="statements">
            <TabsList className="mb-6">
              <TabsTrigger value="statements">Owner Statements</TabsTrigger>
              <TabsTrigger value="performance">Property Performance</TabsTrigger>
              <TabsTrigger value="payouts">Payout History</TabsTrigger>
              <TabsTrigger value="occupancy">Occupancy Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="statements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Total Owner Revenue" value="$287,450" change="+9.2%" positive={true} />
                <MetricCard title="Management Fees" value="$43,118" change="+9.2%" positive={true} />
                <MetricCard title="Owner Payouts" value="$244,332" change="+9.2%" positive={true} />
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Owner Statement Summary</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Owner Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Properties</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Gross Revenue</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Management Fee</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Expenses</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Net Payout</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">John Smith</td>
                        <td className="px-4 py-4 text-sm text-gray-500">3</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$42,850</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$6,428</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$2,140</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$34,282</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">Paid</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Sarah Johnson</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$35,620</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$5,343</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$1,850</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$28,427</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">Paid</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Michael Brown</td>
                        <td className="px-4 py-4 text-sm text-gray-500">5</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$78,940</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$11,841</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$4,250</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$62,849</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">Pending</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Emily Davis</td>
                        <td className="px-4 py-4 text-sm text-gray-500">1</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$18,750</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$2,813</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$980</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$14,957</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">Paid</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Robert Wilson</td>
                        <td className="px-4 py-4 text-sm text-gray-500">4</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$62,480</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$9,372</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$3,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$49,658</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">Pending</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Revenue Distribution by Owner</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Revenue Distribution Chart</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Monthly Owner Payouts</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Monthly Payouts Chart</p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Property Performance by Owner</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Property</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Owner</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Occupancy Rate</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ADR</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">RevPAR</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Oceanview Villa #12</td>
                        <td className="px-4 py-4 text-sm text-gray-500">John Smith</td>
                        <td className="px-4 py-4 text-sm text-gray-500">82%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$245</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$201</td>
                        <td className="px-4 py-4 text-sm text-green-600">+12.4%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Mountain Cabin #8</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Sarah Johnson</td>
                        <td className="px-4 py-4 text-sm text-gray-500">75%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$195</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$146</td>
                        <td className="px-4 py-4 text-sm text-green-600">+8.7%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Downtown Loft #3</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Michael Brown</td>
                        <td className="px-4 py-4 text-sm text-gray-500">88%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$175</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$154</td>
                        <td className="px-4 py-4 text-sm text-green-600">+5.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Lakeside Cottage</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Emily Davis</td>
                        <td className="px-4 py-4 text-sm text-gray-500">72%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$220</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$158</td>
                        <td className="px-4 py-4 text-sm text-red-600">-2.1%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Beach House #5</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Robert Wilson</td>
                        <td className="px-4 py-4 text-sm text-gray-500">90%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$285</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$257</td>
                        <td className="px-4 py-4 text-sm text-green-600">+14.8%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Performance Comparison</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Performance Comparison Chart</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Seasonal Performance Trends</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Seasonal Trends Chart</p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="payouts" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Total Payouts (YTD)" value="$1,245,680" change="+8.7%" positive={true} />
                <MetricCard title="Average Payout" value="$24,913" change="+5.2%" positive={true} />
                <MetricCard title="Pending Payouts" value="$112,507" change="+2.1%" positive={true} />
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Recent Payout History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Owner</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Payout Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Period</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Method</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">John Smith</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-15</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$34,282</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Dec 2023</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Bank Transfer</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">Completed</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Sarah Johnson</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-15</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$28,427</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Dec 2023</td>
                        <td className="px-4 py-4 text-sm text-gray-500">PayPal</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">Completed</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Michael Brown</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-20</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$62,849</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Dec 2023</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Bank Transfer</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">Processing</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Emily Davis</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-15</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$14,957</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Dec 2023</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Check</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">Completed</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Robert Wilson</td>
                        <td className="px-4 py-4 text-sm text-gray-500">2024-01-20</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$49,658</td>
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
                <h3 className="text-lg font-medium mb-4">Payout Trends</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Payout Trends Chart</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="occupancy" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Occupancy by Property</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Property</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Owner</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Current Month</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Previous Month</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YTD Average</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Oceanview Villa #12</td>
                        <td className="px-4 py-4 text-sm text-gray-500">John Smith</td>
                        <td className="px-4 py-4 text-sm text-gray-500">82%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">78%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">80%</td>
                        <td className="px-4 py-4 text-sm text-green-600">+5.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Mountain Cabin #8</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Sarah Johnson</td>
                        <td className="px-4 py-4 text-sm text-gray-500">75%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">72%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">74%</td>
                        <td className="px-4 py-4 text-sm text-green-600">+3.8%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Downtown Loft #3</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Michael Brown</td>
                        <td className="px-4 py-4 text-sm text-gray-500">88%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">85%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">86%</td>
                        <td className="px-4 py-4 text-sm text-green-600">+2.5%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Lakeside Cottage</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Emily Davis</td>
                        <td className="px-4 py-4 text-sm text-gray-500">72%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">75%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">73%</td>
                        <td className="px-4 py-4 text-sm text-red-600">-1.8%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Beach House #5</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Robert Wilson</td>
                        <td className="px-4 py-4 text-sm text-gray-500">90%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">85%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">87%</td>
                        <td className="px-4 py-4 text-sm text-green-600">+6.2%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Occupancy Forecast</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Occupancy Forecast Chart</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Seasonal Occupancy Patterns</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Seasonal Patterns Chart</p>
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

