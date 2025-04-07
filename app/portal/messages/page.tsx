"use client"

import { useState } from "react"
import { Search, Send, Paperclip, User, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for messages
const messages = [
  {
    id: "MSG1001",
    subject: "Maintenance Request - AC Not Working",
    preview: "The air conditioning unit in the master bedroom is not cooling properly...",
    date: "2024-02-10T14:30:00",
    read: false,
    property: "Marina Towers 301",
    priority: "high",
  },
  {
    id: "MSG1002",
    subject: "January Statement Available",
    preview: "Your January 2024 statement is now available for review in the Documents section...",
    date: "2024-02-01T09:15:00",
    read: true,
    property: "All Properties",
    priority: "normal",
  },
  {
    id: "MSG1003",
    subject: "New Booking Confirmation",
    preview: "A new booking has been confirmed for your property Downtown Heights 205...",
    date: "2024-01-28T16:45:00",
    read: true,
    property: "Downtown Heights 205",
    priority: "normal",
  },
  {
    id: "MSG1004",
    subject: "Quarterly Inspection Scheduled",
    preview: "We have scheduled the quarterly inspection for your property Palm Residences 401...",
    date: "2024-01-25T11:20:00",
    read: true,
    property: "Palm Residences 401",
    priority: "normal",
  },
  {
    id: "MSG1005",
    subject: "Rate Adjustment Recommendation",
    preview: "Based on our market analysis, we recommend adjusting your nightly rates for the upcoming high season...",
    date: "2024-01-20T13:10:00",
    read: true,
    property: "All Properties",
    priority: "normal",
  },
]

// Mock conversation data
const conversation = [
  {
    id: 1,
    sender: "system",
    name: "Property Manager",
    message:
      "The air conditioning unit in the master bedroom is not cooling properly. We've received a complaint from the current guest. Our maintenance team will need to inspect it as soon as possible. Would you authorize an emergency repair if needed?",
    timestamp: "2024-02-10T14:30:00",
  },
  {
    id: 2,
    sender: "owner",
    name: "Ahmed Al Mansouri",
    message: "Yes, please go ahead with the repair. What is the estimated cost?",
    timestamp: "2024-02-10T15:45:00",
  },
  {
    id: 3,
    sender: "system",
    name: "Property Manager",
    message:
      "Thank you for the quick response. Our technician estimates the repair will cost between AED 500-800 depending on the issue. We'll try to get it fixed today to minimize guest disruption.",
    timestamp: "2024-02-10T16:10:00",
  },
  {
    id: 4,
    sender: "owner",
    name: "Ahmed Al Mansouri",
    message: "That sounds reasonable. Please proceed and keep me updated.",
    timestamp: "2024-02-10T16:30:00",
  },
  {
    id: 5,
    sender: "system",
    name: "Property Manager",
    message:
      "Update: The technician has completed the repair. It was a minor issue with the refrigerant level. The total cost was AED 650. The unit is now functioning properly, and the guest has confirmed they are satisfied with the temperature.",
    timestamp: "2024-02-10T19:15:00",
  },
]

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState(messages[0])
  const [newMessage, setNewMessage] = useState("")

  const filteredMessages = messages.filter((message) =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return
    // In a real app, this would send the message to the backend
    alert("Message sent: " + newMessage)
    setNewMessage("")
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <Button className="flex items-center gap-2">
          <Send className="h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search messages..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 max-h-[calc(100vh-300px)] overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedMessage?.id === message.id ? "bg-gray-50" : ""
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-medium flex items-center gap-2">
                        {!message.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                        <span className={!message.read ? "font-semibold" : ""}>{message.subject}</span>
                      </div>
                      <div className="text-xs text-gray-500">{formatDate(message.date)}</div>
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-2">{message.preview}</div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">
                        {message.property}
                      </Badge>
                      {message.priority === "high" && (
                        <Badge variant="destructive" className="text-xs">
                          High Priority
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedMessage.subject}</CardTitle>
                  <Badge variant={selectedMessage.priority === "high" ? "destructive" : "outline"}>
                    {selectedMessage.priority === "high" ? "High Priority" : "Normal Priority"}
                  </Badge>
                </div>
                <CardDescription>
                  <div className="flex items-center justify-between">
                    <div>Property: {selectedMessage.property}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      {formatDate(selectedMessage.date)}
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto max-h-[calc(100vh-400px)]">
                <div className="space-y-4">
                  {conversation.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "owner" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          msg.sender === "owner" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {msg.sender === "system" && (
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>PM</AvatarFallback>
                            </Avatar>
                          )}
                          <div className="font-medium text-sm">{msg.name}</div>
                        </div>
                        <div className="text-sm">{msg.message}</div>
                        <div
                          className={`text-xs mt-1 text-right ${
                            msg.sender === "owner" ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {formatDate(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex items-center gap-4 w-full">
                  <Textarea
                    placeholder="Type your message here..."
                    className="flex-grow"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center p-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No message selected</h3>
                <p className="text-sm text-gray-500 mt-1">Select a message from the list to view the conversation.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

