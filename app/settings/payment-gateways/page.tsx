"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Settings } from "lucide-react"
import Sidebar from "@/components/sidebar"

export default function PaymentGatewaysPage() {
  const [activeTab, setActiveTab] = useState("credit-cards")
  const [showAddGateway, setShowAddGateway] = useState(false)
  const [showConfigureGateway, setShowConfigureGateway] = useState(false)
  const [selectedGateway, setSelectedGateway] = useState(null)

  const handleConfigureGateway = (gateway) => {
    setSelectedGateway(gateway)
    setShowConfigureGateway(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Payment Gateways</h1>
            <Button onClick={() => setShowAddGateway(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Gateway
            </Button>
          </div>
          <p className="text-gray-500 mt-1">Configure payment methods for your property</p>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="credit-cards" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="credit-cards">Credit Cards</TabsTrigger>
              <TabsTrigger value="bank-transfers">Bank Transfers</TabsTrigger>
              <TabsTrigger value="digital-wallets">Digital Wallets</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            <TabsContent value="credit-cards" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <GatewayCard
                  name="Stripe"
                  description="Accept credit card payments globally"
                  status="active"
                  onConfigure={() => handleConfigureGateway("stripe")}
                />
                <GatewayCard
                  name="PayPal"
                  description="Accept PayPal and credit card payments"
                  status="inactive"
                  onConfigure={() => handleConfigureGateway("paypal")}
                />
                <GatewayCard
                  name="Authorize.net"
                  description="US-based payment gateway"
                  status="inactive"
                  onConfigure={() => handleConfigureGateway("authorize")}
                />
              </div>
            </TabsContent>

            <TabsContent value="bank-transfers" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <GatewayCard
                  name="Bank Transfer"
                  description="Accept direct bank transfers"
                  status="active"
                  onConfigure={() => handleConfigureGateway("bank-transfer")}
                />
                <GatewayCard
                  name="SWIFT"
                  description="International wire transfers"
                  status="inactive"
                  onConfigure={() => handleConfigureGateway("swift")}
                />
              </div>
            </TabsContent>

            <TabsContent value="digital-wallets" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <GatewayCard
                  name="Apple Pay"
                  description="Accept payments via Apple Pay"
                  status="inactive"
                  onConfigure={() => handleConfigureGateway("apple-pay")}
                />
                <GatewayCard
                  name="Google Pay"
                  description="Accept payments via Google Pay"
                  status="inactive"
                  onConfigure={() => handleConfigureGateway("google-pay")}
                />
              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <GatewayCard
                  name="Cash"
                  description="Accept cash payments on arrival"
                  status="active"
                  onConfigure={() => handleConfigureGateway("cash")}
                />
                <GatewayCard
                  name="Crypto"
                  description="Accept cryptocurrency payments"
                  status="inactive"
                  onConfigure={() => handleConfigureGateway("crypto")}
                />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Add Gateway Dialog */}
      <Dialog open={showAddGateway} onOpenChange={setShowAddGateway}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Payment Gateway</DialogTitle>
            <DialogDescription>Select a payment gateway to add to your property management system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <Label>Available Gateways</Label>
              <div className="space-y-2">
                <GatewayOption name="Stripe" description="Global payment processing" />
                <GatewayOption name="PayPal" description="Online payment system" />
                <GatewayOption name="Authorize.net" description="US-based payment gateway" />
                <GatewayOption name="Square" description="Point of sale and online payments" />
                <GatewayOption name="Adyen" description="Enterprise payment processing" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddGateway(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddGateway(false)}>Add Selected</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Configure Gateway Dialog */}
      <Dialog open={showConfigureGateway} onOpenChange={setShowConfigureGateway}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Configure {selectedGateway ? selectedGateway.charAt(0).toUpperCase() + selectedGateway.slice(1) : ""}
            </DialogTitle>
            <DialogDescription>Enter your API credentials to connect this payment gateway.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="api-key" className="text-right">
                API Key
              </Label>
              <Input id="api-key" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="secret-key" className="text-right">
                Secret Key
              </Label>
              <Input id="secret-key" type="password" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="webhook-url" className="text-right">
                Webhook URL
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input id="webhook-url" value="https://yourdomain.com/api/webhooks/payments" readOnly />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText("https://yourdomain.com/api/webhooks/payments")}
                >
                  Copy
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="test-mode" className="text-right">
                Test Mode
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="test-mode" />
                <Label htmlFor="test-mode">Enable test mode</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfigureGateway(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowConfigureGateway(false)}>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function GatewayCard({ name, description, status, onConfigure }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant={status === "active" ? "success" : "secondary"}>{status}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Switch id={`${name.toLowerCase()}-status`} checked={status === "active"} />
            <Label htmlFor={`${name.toLowerCase()}-status`}>{status === "active" ? "Enabled" : "Disabled"}</Label>
          </div>
          <Button variant="outline" size="sm" onClick={onConfigure}>
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function GatewayOption({ name, description }) {
  return (
    <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
      <input type="radio" id={name.toLowerCase()} name="gateway" className="h-4 w-4 text-blue-600" />
      <label htmlFor={name.toLowerCase()} className="flex-1 cursor-pointer">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </label>
    </div>
  )
}

