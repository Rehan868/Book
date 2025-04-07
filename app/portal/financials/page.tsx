"use client"

import { useState } from "react"
import { Calendar, Download, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function FinancialsPage() {
  const [timeframe, setTimeframe] = useState("30")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
        <div className="flex items-center gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FinancialCard
          title="Total Revenue"
          value="AED 45,000"
          change="+12.5%"
          icon={<DollarSign className="h-5 w-5 text-blue-600" />}
          positive={true}
        />
        <FinancialCard
          title="Net Income"
          value="AED 36,000"
          change="+8.3%"
          icon={<TrendingUp className="h-5 w-5 text-green-600" />}
          positive={true}
        />
        <FinancialCard
          title="Expenses"
          value="AED 9,000"
          change="+5.2%"
          icon={<TrendingDown className="h-5 w-5 text-red-600" />}
          positive={false}
        />
        <FinancialCard
          title="Next Payout"
          value="AED 12,000"
          change="Feb 15, 2024"
          icon={<Calendar className="h-5 w-5 text-purple-600" />}
          isDate={true}
        />
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Revenue Chart Visualization</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <RevenuePropertyItem
                  name="Marina Towers 301"
                  amount={18500}
                  percentage={41}
                  change="+15.2%"
                  positive={true}
                />
                <RevenuePropertyItem
                  name="Downtown Heights 205"
                  amount={15200}
                  percentage={34}
                  change="+8.7%"
                  positive={true}
                />
                <RevenuePropertyItem
                  name="Palm Residences 401"
                  amount={11300}
                  percentage={25}
                  change="-3.5%"
                  positive={false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Expense Categories Chart</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Property</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-500">2024-01-15</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">Cleaning Service</td>
                      <td className="px-4 py-4 text-sm text-gray-500">Marina Towers 301</td>
                      <td className="px-4 py-4 text-sm text-gray-500">Maintenance</td>
                      <td className="px-4 py-4 text-sm text-gray-900 text-right">AED 350</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-500">2024-01-18</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">AC Repair</td>
                      <td className="px-4 py-4 text-sm text-gray-500">Downtown Heights 205</td>
                      <td className="px-4 py-4 text-sm text-gray-500">Repairs</td>
                      <td className="px-4 py-4 text-sm text-gray-900 text-right">AED 850</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-500">2024-01-20</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">Management Fee</td>
                      <td className="px-4 py-4 text-sm text-gray-500">All Properties</td>
                      <td className="px-4 py-4 text-sm text-gray-500">Fees</td>
                      <td className="px-4 py-4 text-sm text-gray-900 text-right">AED 4,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Reference</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Period</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Method</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Amount</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-500">2024-01-15</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">REF123456</td>
                      <td className="px-4 py-4 text-sm text-gray-500">Dec 2023</td>
                      <td className="px-4 py-4 text-sm text-gray-500">Bank Transfer</td>
                      <td className="px-4 py-4 text-sm text-gray-900 text-right">AED 15,000</td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-500">2023-12-15</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">REF789012</td>
                      <td className="px-4 py-4 text-sm text-gray-500">Nov 2023</td>
                      <td className="px-4 py-4 text-sm text-gray-500">Bank Transfer</td>
                      <td className="px-4 py-4 text-sm text-gray-900 text-right">AED 14,200</td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-500">2023-11-15</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">REF345678</td>
                      <td className="px-4 py-4 text-sm text-gray-500">Oct 2023</td>
                      <td className="px-4 py-4 text-sm text-gray-500">Bank Transfer</td>
                      <td className="px-4 py-4 text-sm text-gray-900 text-right">AED 13,800</td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">February 2024 Payout</div>
                      <div className="text-sm text-gray-500">Period: Jan 1 - Jan 31, 2024</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">AED 12,000</div>
                    <div className="text-sm text-gray-500">Expected on Feb 15, 2024</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">March 2024 Payout</div>
                      <div className="text-sm text-gray-500">Period: Feb 1 - Feb 29, 2024</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">AED 13,500 (Estimated)</div>
                    <div className="text-sm text-gray-500">Expected on Mar 15, 2024</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Statements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <StatementItem period="January 2024" date="2024-02-01" revenue={45000} expenses={9000} payout={36000} />
                <StatementItem
                  period="December 2023"
                  date="2024-01-01"
                  revenue={42500}
                  expenses={8500}
                  payout={34000}
                />
                <StatementItem
                  period="November 2023"
                  date="2023-12-01"
                  revenue={40000}
                  expenses={8000}
                  payout={32000}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function FinancialCard({ title, value, change, icon, positive, isDate = false }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-full bg-gray-100">{icon}</div>
          <div className={`text-sm ${isDate ? "text-gray-500" : positive ? "text-green-600" : "text-red-600"}`}>
            {change}
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-1">{title}</div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
      </CardContent>
    </Card>
  )
}

function RevenuePropertyItem({ name, amount, percentage, change, positive }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{percentage}% of total revenue</div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold">AED {amount.toLocaleString()}</div>
        <div className={`text-sm ${positive ? "text-green-600" : "text-red-600"}`}>{change}</div>
      </div>
    </div>
  )
}

function StatementItem({ period, date, revenue, expenses, payout }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="font-medium">{period} Statement</div>
        <div className="text-sm text-gray-500">Generated on {date}</div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="text-lg font-semibold">AED {revenue.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Expenses</div>
            <div className="text-lg font-semibold">AED {expenses.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Net Payout</div>
            <div className="text-lg font-semibold">AED {payout.toLocaleString()}</div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}

