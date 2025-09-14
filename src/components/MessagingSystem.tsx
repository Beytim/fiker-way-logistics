import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send, 
  Phone, 
  MoreVertical,
  Pin,
  Clock,
  CheckCheck,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: "user" | "contact";
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  type: "text" | "system";
}

interface Contact {
  id: string;
  name: string;
  role: "shipper" | "driver" | "admin";
  avatar?: string;
  status: "online" | "offline" | "busy";
  lastSeen?: Date;
  unreadCount: number;
  lastMessage?: string;
}

interface MessagingSystemProps {
  userType: "shipper" | "driver" | "admin";
  currentShipmentId?: string;
}

const MessagingSystem = ({ userType, currentShipmentId }: MessagingSystemProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Alemayehu Tadesse",
      role: "driver",
      status: "online",
      unreadCount: 3,
      lastMessage: "I'll be there in 15 minutes",
      lastSeen: new Date()
    },
    {
      id: "2", 
      name: "HealthCorp Ethiopia",
      role: "shipper",
      status: "offline",
      unreadCount: 0,
      lastMessage: "Package delivered successfully",
      lastSeen: new Date(Date.now() - 3600000)
    },
    {
      id: "3",
      name: "FikerWay Support",
      role: "admin", 
      status: "online",
      unreadCount: 1,
      lastMessage: "Your verification is complete",
      lastSeen: new Date()
    }
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "contact", 
      content: "Hello! I've arrived at the pickup location. The warehouse is a bit busy, might take 10-15 extra minutes.",
      timestamp: new Date(Date.now() - 1800000),
      status: "read",
      type: "text"
    },
    {
      id: "2",
      sender: "user",
      content: "No problem! Please take your time and ensure everything is loaded safely.",
      timestamp: new Date(Date.now() - 1500000), 
      status: "read",
      type: "text"
    },
    {
      id: "3",
      sender: "contact",
      content: "Loading complete! I'll send you live tracking updates. ETA is around 3 hours.",
      timestamp: new Date(Date.now() - 900000),
      status: "read", 
      type: "text"
    },
    {
      id: "4",
      sender: "user",
      content: "Perfect! Drive safe and let me know if you need anything.",
      timestamp: new Date(Date.now() - 600000),
      status: "delivered",
      type: "text"
    },
    {
      id: "5",
      sender: "contact",
      content: "I'll be there in 15 minutes",
      timestamp: new Date(Date.now() - 300000),
      status: "sent",
      type: "text"
    }
  ];

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!message.trim() || !selectedContact) return;
    
    toast.success("Message sent!");
    setMessage("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-success";
      case "busy": return "bg-warning"; 
      default: return "bg-muted-foreground";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "driver": return "bg-accent text-accent-foreground";
      case "shipper": return "bg-primary text-primary-foreground";
      case "admin": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return "now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-[600px] bg-background">
      {/* Contacts Sidebar */}
      <div className="w-1/3 border-r bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Messages
            </h3>
            <Badge variant="outline">
              {filteredContacts.reduce((sum, contact) => sum + contact.unreadCount, 0)} unread
            </Badge>
          </div>
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm"
          />
        </div>
        
        <ScrollArea className="h-[500px]">
          <div className="p-2 space-y-1">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedContact?.id === contact.id 
                    ? "bg-primary/10 border border-primary/20" 
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-xs">
                        {contact.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(contact.status)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{contact.name}</p>
                      <div className="flex items-center space-x-1">
                        {contact.unreadCount > 0 && (
                          <Badge className="bg-primary text-primary-foreground text-xs h-5 min-w-[20px] px-1">
                            {contact.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground truncate">
                        {contact.lastMessage}
                      </p>
                      <Badge className={`text-xs ${getRoleColor(contact.role)}`}>
                        {contact.role}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {contact.status === "online" ? "Online" : `Last seen ${formatTime(contact.lastSeen!)}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-card flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>
                      {selectedContact.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(selectedContact.status)}`} />
                </div>
                <div>
                  <p className="font-medium">{selectedContact.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedContact.status === "online" ? "Online now" : `Last seen ${formatTime(selectedContact.lastSeen!)}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Pin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] ${msg.sender === "user" ? "order-1" : "order-2"}`}>
                      <div className={`px-4 py-2 rounded-lg ${
                        msg.sender === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <div className={`flex items-center space-x-1 mt-1 text-xs text-muted-foreground ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}>
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(msg.timestamp)}</span>
                        {msg.sender === "user" && (
                          <div className="ml-1">
                            {msg.status === "sent" && <span className="text-muted-foreground">✓</span>}
                            {msg.status === "delivered" && <CheckCheck className="h-3 w-3 text-muted-foreground" />}
                            {msg.status === "read" && <CheckCheck className="h-3 w-3 text-accent" />}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-card">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/30">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingSystem;