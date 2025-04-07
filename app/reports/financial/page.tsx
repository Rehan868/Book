import { Download, Filter, Calendar } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FinancialReportsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="reports" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Financial Reports</h1>
              <p className="text-gray-500">Revenue, expenses, and profit analysis</p>
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
              <TabsTrigger value="overview">Financial Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
              <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
              <TabsTrigger value="profit">Profit & Loss</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard title="Total Revenue" value="$487,250" change="+8.2%" positive={true} />
                <MetricCard title="Total Expenses" value="$215,680" change="+3.5%" positive={false} />
                <MetricCard title="Net Profit" value="$271,570" change="+12.4%" positive={true} />
                <MetricCard title="Profit Margin" value="55.7%" change="+2.3%" positive={true} />
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Financial Summary</h3>
                <div className="h-80 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Financial Summary Chart</p>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Revenue Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Revenue Source</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">% of Total</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Change</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">Room Revenue</td>
                          <td className="px-4 py-4 text-sm text-gray-500">$345,780</td>
                          <td className="px-4 py-4 text-sm text-gray-500">71%</td>
                          <td className="px-4 py-4 text-sm text-green-600">+9.2%</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">F&B Revenue</td>
                          <td className="px-4 py-4 text-sm text-gray-500">$78,450</td>
                          <td className="px-4 py-4 text-sm text-gray-500">16%</td>
                          <td className="px-4 py-4 text-sm text-green-600">+5.8%</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">Other Services</td>
                          <td className="px-4 py-4 text-sm text-gray-500">$42,680</td>
                          <td className="px-4 py-4 text-sm text-gray-500">9%</td>
                          <td className="px-4 py-4 text-sm text-green-600">+7.3%</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">Miscellaneous</td>
                          <td className="px-4 py-4 text-sm text-gray-500">$20,340</td>
                          <td className="px-4 py-4 text-sm text-gray-500">4%</td>
                          <td className="px-4 py-4 text-sm text-green-600">+3.1%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Expense Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Expense Category</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">% of Total</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Change</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">Staff Salaries</td>
                          <td className="px-4 py-4 text-sm text-gray-500">$98,450</td>
                          <td className="px-4 py-4 text-sm text-gray-500">46%</td>
                          <td className="px-4 py-4 text-sm text-red-600">+4.2%</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">Utilities</td>
                          <td className="px-4 py-4 text-sm text-gray-500">$42,680</td>
                          <td className="px-4 py-4 text-sm text-gray-500">20%</td>
                          <td className="px-4 py-4 text-sm text-red-600">+3.5%</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">Maintenance</td>
                          <td className="px-4 py-4 text-sm text-gray-500">$35,780</td>
                          <td className="px-4 py-4 text-sm text-gray-500">17%</td>
                          <td className="px-4 py-4 text-sm text-red-600">+2.8%</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">Marketing</td>
                          <td className="px-4 py-4 text-sm text-gray-500">$38,770</td>
                          <td className="px-4 py-4 text-sm text-gray-500">18%</td>
                          <td className="px-4 py-4 text-sm text-red-600">+2.1%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Room Revenue" value="$345,780" change="+9.2%" positive={true} />
                <MetricCard title="RevPAR" value="$141" change="+7.1%" positive={true} />
                <MetricCard title="ADR" value="$185" change="+2.8%" positive={true} />
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Revenue by Room Type</h3>
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
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Standard Queen</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$87,680</td>
                        <td className="px-4 py-4 text-sm text-gray-500">25%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">78%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$175</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$137</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Junior Suite</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$65,780</td>
                        <td className="px-4 py-4 text-sm text-gray-500">19%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">68%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$250</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$170</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Executive Suite</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$54,770</td>
                        <td className="px-4 py-4 text-sm text-gray-500">16%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">62%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$320</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$198</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Family Room</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$39,100</td>
                        <td className="px-4 py-4 text-sm text-gray-500">11%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">85%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$230</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$196</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Revenue by Month</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Monthly Revenue Chart</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Revenue by Channel</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Channel Revenue Chart</p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Total Expenses" value="$215,680" change="+3.5%" positive={false} />
                <MetricCard title="Expense Ratio" value="44.3%" change="-2.3%" positive={true} />
                <MetricCard title="Cost per Room" value="$82" change="+1.2%" positive={false} />
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Expense Categories</h3>
                <div className="h-80 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Expense Categories Chart</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Expense Trends</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Current Month</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Previous Month</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YTD</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Change</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">% of Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Staff Salaries</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$18,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$18,250</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$98,450</td>
                        <td className="px-4 py-4 text-sm text-red-600">+4.2%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">46%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Utilities</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$8,120</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$7,980</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$42,680</td>
                        <td className="px-4 py-4 text-sm text-red-600">+3.5%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">20%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Maintenance</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$6,780</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$6,650</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$35,780</td>
                        <td className="px-4 py-4 text-sm text-red-600">+2.8%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">17%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Marketing</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$7,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$7,320</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$38,770</td>
                        <td className="px-4 py-4 text-sm text-red-600">+2.1%</td>
                        <td className="px-4 py-4 text-sm text-gray-500">18%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Monthly Expense Trend</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Monthly Expense Chart</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Expense vs Budget</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Expense vs Budget Chart</p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profit" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Net Profit" value="$271,570" change="+12.4%" positive={true} />
                <MetricCard title="Profit Margin" value="55.7%" change="+2.3%" positive={true} />
                <MetricCard title="EBITDA" value="$295,840" change="+10.8%" positive={true} />
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Profit & Loss Statement</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Item</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Current Month</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Previous Month</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YTD</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YoY Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 font-medium">
                        <td className="px-4 py-4 text-sm text-gray-900">Revenue</td>
                        <td className="px-4 py-4 text-sm text-gray-900">$92,450</td>
                        <td className="px-4 py-4 text-sm text-gray-900">$89,780</td>
                        <td className="px-4 py-4 text-sm text-gray-900">$487,250</td>
                        <td className="px-4 py-4 text-sm text-green-600">+8.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-500 pl-8">Room Revenue</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$65,780</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$63,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$345,780</td>
                        <td className="px-4 py-4 text-sm text-green-600">+9.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-500 pl-8">F&B Revenue</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$14,890</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$14,560</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$78,450</td>
                        <td className="px-4 py-4 text-sm text-green-600">+5.8%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-500 pl-8">Other Revenue</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$11,780</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$11,770</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$63,020</td>
                        <td className="px-4 py-4 text-sm text-green-600">+6.1%</td>
                      </tr>
                      <tr className="hover:bg-gray-50 font-medium">
                        <td className="px-4 py-4 text-sm text-gray-900">Expenses</td>
                        <td className="px-4 py-4 text-sm text-gray-900">$40,800</td>
                        <td className="px-4 py-4 text-sm text-gray-900">$40,200</td>
                        <td className="px-4 py-4 text-sm text-gray-900">$215,680</td>
                        <td className="px-4 py-4 text-sm text-red-600">+3.5%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-500 pl-8">Staff Salaries</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$18,450</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$18,250</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$98,450</td>
                        <td className="px-4 py-4 text-sm text-red-600">+4.2%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-500 pl-8">Utilities</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$8,120</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$7,980</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$42,680</td>
                        <td className="px-4 py-4 text-sm text-red-600">+3.5%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-500 pl-8">Other Expenses</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$14,230</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$13,970</td>
                        <td className="px-4 py-4 text-sm text-gray-500">$74,550</td>
                        <td className="px-4 py-4 text-sm text-red-600">+2.5%</td>
                      </tr>
                      <tr className="hover:bg-gray-50 font-medium bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">Net Profit</td>
                        <td className="px-4 py-4 text-sm text-gray-900">$51,650</td>
                        <td className="px-4 py-4 text-sm text-gray-900">$49,580</td>
                        <td className="px-4 py-4 text-sm text-gray-900">$271,570</td>
                        <td className="px-4 py-4 text-sm text-green-600">+12.4%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Profit Trend</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Profit Trend Chart</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Profit vs Budget</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Profit vs Budget Chart</p>
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

