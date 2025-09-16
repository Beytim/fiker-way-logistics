import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Send,
  Paperclip,
  Search,
  Filter,
  MoreVertical,
  Headphones,
  Video,
  FileText,
  HelpCircle,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: "technical" | "payment" | "delivery" | "account" | "general";
  createdAt: Date;
  updatedAt: Date;
  assignedAgent?: string;
  messages: SupportMessage[];
}

interface SupportMessage {
  id: string;
  sender: "user" | "agent";
  content: string;
  timestamp: Date;
  attachments?: string[];
}

interface CustomerSupportProps {
  userType: "shipper" | "driver" | "admin";
  userId?: string;
}

const CustomerSupport = ({ userType, userId }: CustomerSupportProps) => {
  const [activeTab, setActiveTab] = useState("chat");
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "SUP-001",
      title: "Payment not processed",
      description: "My payment for shipment FW-001 is showing as pending for 2 hours",
      status: "in-progress",
      priority: "high",
      category: "payment",
      createdAt: new Date(Date.now() - 7200000),
      updatedAt: new Date(Date.now() - 1800000),
      assignedAgent: "Sarah M.",
      messages: [
        {
          id: "1",
          sender: "user",
          content: "My payment for shipment FW-001 is showing as pending for 2 hours. Can you help?",
          timestamp: new Date(Date.now() - 7200000)
        },
        {
          id: "2",
          sender: "agent",
          content: "Hi! I'm looking into this for you. Can you please provide the transaction reference number?",
          timestamp: new Date(Date.now() - 6900000)
        }
      ]
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium"
  });

  const [chatMessage, setChatMessage] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const handleCreateTicket = () => {
    if (!newTicket.title || !newTicket.description || !newTicket.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const ticket: SupportTicket = {
      id: `SUP-${String(Date.now()).slice(-3)}`,
      title: newTicket.title,
      description: newTicket.description,
      status: "open",
      priority: newTicket.priority as any,
      category: newTicket.category as any,
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [{
        id: "1",
        sender: "user",
        content: newTicket.description,
        timestamp: new Date()
      }]
    };

    setTickets(prev => [ticket, ...prev]);
    setNewTicket({ title: "", description: "", category: "", priority: "medium" });
    toast.success("Support ticket created successfully!");
    setActiveTab("tickets");
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !selectedTicket) return;

    const message: SupportMessage = {
      id: String(Date.now()),
      sender: "user",
      content: chatMessage,
      timestamp: new Date()
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === selectedTicket.id 
        ? { ...ticket, messages: [...ticket.messages, message], updatedAt: new Date() }
        : ticket
    ));

    setChatMessage("");
    toast.success("Message sent!");

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: SupportMessage = {
        id: String(Date.now() + 1),
        sender: "agent",
        content: "Thank you for the additional information. I'm working on resolving this issue for you.",
        timestamp: new Date()
      };

      setTickets(prev => prev.map(ticket => 
        ticket.id === selectedTicket.id 
          ? { ...ticket, messages: [...ticket.messages, agentResponse] }
          : ticket
      ));
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-accent text-accent-foreground";
      case "in-progress": return "bg-warning text-warning-foreground";
      case "resolved": return "bg-success text-success-foreground";
      case "closed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-warning text-warning-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Support</h2>
          <p className="text-muted-foreground">Get help when you need it, 24/7</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-success text-success-foreground">
            <Activity className="h-3 w-3 mr-1" />
            Support Online
          </Badge>
          <Button variant="destructive" size="sm">
            <Phone className="h-4 w-4 mr-1" />
            Emergency
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="create">New Ticket</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        {/* Live Chat */}
        <TabsContent value="chat">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    <span>Live Support Chat</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-success text-success-foreground">
                      <div className="w-2 h-2 bg-success-foreground rounded-full mr-1 animate-pulse" />
                      Agent Online
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96 border rounded-lg flex flex-col">
                  {/* Chat Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                          SA
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm">
                            Hello! I'm Sarah from FikerWay support. How can I help you today?
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 justify-end">
                      <div className="flex-1 text-right">
                        <div className="bg-primary text-primary-foreground p-3 rounded-lg inline-block">
                          <p className="text-sm">
                            Hi Sarah! I need help with tracking my shipment FW-001.
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">1 minute ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                          SA
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm">
                            I can help you with that! Let me pull up the details for shipment FW-001...
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                          <span className="text-xs text-muted-foreground">Sarah is typing...</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Video Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentation
                </Button>

                {/* Support Hours */}
                <div className="mt-6 p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Support Hours</h4>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>🕐 24/7 Emergency Support</p>
                    <p>🕘 Mon-Fri: 8AM-8PM (General)</p>
                    <p>🕘 Sat-Sun: 9AM-6PM (General)</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Emergency Contact</h4>
                  <div className="space-y-1 text-xs">
                    <p className="flex items-center space-x-1">
                      <Phone className="h-3 w-3" />
                      <span>+251 911 234 567</span>
                    </p>
                    <p className="flex items-center space-x-1">
                      <Mail className="h-3 w-3" />
                      <span>emergency@fikerway.com</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Support Tickets */}
        <TabsContent value="tickets">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">My Support Tickets</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search tickets..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-medium transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline" className="font-mono text-xs">
                            {ticket.id}
                          </Badge>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status.replace("-", " ").toUpperCase()}
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(ticket.updatedAt)}
                          </span>
                        </div>
                        
                        <h4 className="font-semibold mb-1">{ticket.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {ticket.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Category: {ticket.category}</span>
                          {ticket.assignedAgent && (
                            <span>Agent: {ticket.assignedAgent}</span>
                          )}
                          <span>{ticket.messages.length} messages</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setActiveTab("chat");
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Create New Ticket */}
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create Support Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ticket-title">Issue Title *</Label>
                  <Input
                    id="ticket-title"
                    placeholder="Brief description of your issue"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="ticket-category">Category *</Label>
                  <Select value={newTicket.category} onValueChange={(value) => setNewTicket({...newTicket, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="payment">Payment Problem</SelectItem>
                      <SelectItem value="delivery">Delivery Issue</SelectItem>
                      <SelectItem value="account">Account Support</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="ticket-priority">Priority</Label>
                <Select value={newTicket.priority} onValueChange={(value) => setNewTicket({...newTicket, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ticket-description">Detailed Description *</Label>
                <Textarea
                  id="ticket-description"
                  placeholder="Please provide as much detail as possible about your issue..."
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  rows={6}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button onClick={handleCreateTicket}>
                  <Send className="h-4 w-4 mr-2" />
                  Create Ticket
                </Button>
                <Button variant="outline">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq">
          <div className="space-y-4">
            <div className="text-center mb-6">
              <HelpCircle className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
              <p className="text-muted-foreground">Find quick answers to common questions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">For Shippers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">How do I track my shipment?</h4>
                    <p className="text-xs text-muted-foreground">
                      Use your shipment ID (e.g., FW-001) in the tracking section for real-time updates.
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">What payment methods are accepted?</h4>
                    <p className="text-xs text-muted-foreground">
                      We accept Telebirr, bank transfers, cash on delivery, and major credit cards.
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">How are drivers verified?</h4>
                    <p className="text-xs text-muted-foreground">
                      All drivers undergo background checks, vehicle inspections, and document verification.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">For Drivers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">How do I get paid?</h4>
                    <p className="text-xs text-muted-foreground">
                      Payments are processed within 24 hours of delivery confirmation via your preferred method.
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">What if there's an emergency?</h4>
                    <p className="text-xs text-muted-foreground">
                      Use the emergency button in the app or call +251 911 234 567 for immediate assistance.
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">How do I improve my rating?</h4>
                    <p className="text-xs text-muted-foreground">
                      Maintain on-time deliveries, communicate well, and handle cargo with care.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="font-medium mb-2">Still need help?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex justify-center space-x-2">
                  <Button onClick={() => setActiveTab("chat")}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Live Chat
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("create")}>
                    Create Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerSupport;