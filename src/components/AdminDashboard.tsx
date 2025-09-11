import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Users, 
  Truck, 
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  UserCheck,
  MapPin
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    totalShippers: 1247,
    totalDrivers: 892,
    activeShipments: 156,
    monthlyRevenue: 284750,
    pendingVerifications: 23,
    completedJobs: 3421
  };

  const recentShipments = [
    {
      id: "FW-001",
      shipper: "TechCorp Ethiopia",
      driver: "Alemayehu Tadesse",
      route: "Addis Ababa → Dire Dawa",
      status: "in-transit",
      value: "15,400 ETB",
      progress: 65
    },
    {
      id: "FW-002", 
      shipper: "HealthCorp Ltd",
      driver: "Meseret Bekele",
      route: "Bahir Dar → Gondar",
      status: "delivered", 
      value: "8,200 ETB",
      progress: 100
    },
    {
      id: "FW-003",
      shipper: "BuildTech Materials",
      driver: "Dawit Haile",
      route: "Mekelle → Dessie", 
      status: "pending",
      value: "12,500 ETB",
      progress: 0
    }
  ];

  const pendingVerifications = [
    {
      id: "VER-001",
      name: "Solomon Tesfaye",
      type: "Driver",
      submitted: "2 hours ago",
      documents: ["ID", "License", "Vehicle Registration"]
    },
    {
      id: "VER-002",
      name: "Expo Logistics Ltd",
      type: "Shipper",
      submitted: "1 day ago",
      documents: ["Business License", "Tax Certificate"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-transit": return "bg-accent text-accent-foreground";
      case "delivered": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">FikerWay Platform Management</p>
              </div>
            </div>
            <Badge className="bg-destructive text-destructive-foreground">
              {stats.pendingVerifications} Pending Verifications
            </Badge>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "overview" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("shipments")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "shipments"
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Shipments
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "users"
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab("verifications")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "verifications"
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Verifications
            </button>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === "overview" && (
          <div>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Shippers</p>
                      <p className="text-2xl font-bold">{stats.totalShippers.toLocaleString()}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Drivers</p>
                      <p className="text-2xl font-bold">{stats.totalDrivers.toLocaleString()}</p>
                    </div>
                    <Truck className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Shipments</p>
                      <p className="text-2xl font-bold">{stats.activeShipments}</p>
                    </div>
                    <Package className="h-8 w-8 text-warning" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                      <p className="text-2xl font-bold">{(stats.monthlyRevenue / 1000).toFixed(0)}K ETB</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed Jobs</p>
                      <p className="text-2xl font-bold">{stats.completedJobs.toLocaleString()}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Growth Rate</p>
                      <p className="text-2xl font-bold">+23%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Shipments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentShipments.slice(0, 3).map((shipment) => (
                    <div key={shipment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {shipment.id}
                          </Badge>
                          <Badge className={getStatusColor(shipment.status)}>
                            {shipment.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{shipment.route}</p>
                        <p className="text-xs text-muted-foreground">{shipment.driver}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-success">{shipment.value}</p>
                        {shipment.status === "in-transit" && (
                          <p className="text-xs text-muted-foreground">{shipment.progress}% complete</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span>Pending Verifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingVerifications.map((verification) => (
                    <div key={verification.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {verification.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{verification.submitted}</span>
                        </div>
                        <p className="text-sm font-medium">{verification.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {verification.documents.join(", ")}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <UserCheck className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "shipments" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">All Shipments</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search shipments..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {recentShipments.map((shipment) => (
                <Card key={shipment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge variant="outline" className="font-mono">
                            {shipment.id}
                          </Badge>
                          <Badge className={getStatusColor(shipment.status)}>
                            {shipment.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Route</p>
                            <p className="font-medium">{shipment.route}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Shipper</p>
                            <p className="font-medium">{shipment.shipper}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Driver</p>
                            <p className="font-medium">{shipment.driver}</p>
                          </div>
                        </div>

                        {shipment.status === "in-transit" && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{shipment.progress}% complete</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-accent h-2 rounded-full transition-all"
                                style={{ width: `${shipment.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                        <div className="text-right mr-4">
                          <p className="text-lg font-bold text-success">{shipment.value}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
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
        )}

        {activeTab === "users" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">User Management</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter by Role
                </Button>
              </div>
            </div>

            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                User management interface coming soon
              </p>
            </div>
          </div>
        )}

        {activeTab === "verifications" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Verification Requests</h2>
              <Badge className="bg-destructive text-destructive-foreground">
                {pendingVerifications.length} Pending
              </Badge>
            </div>
            
            <div className="grid gap-4">
              {pendingVerifications.map((verification) => (
                <Card key={verification.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge variant="outline" className="font-mono">
                            {verification.id}
                          </Badge>
                          <Badge className="bg-warning text-warning-foreground">
                            {verification.type.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{verification.submitted}</span>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">{verification.name}</h3>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Submitted Documents:</p>
                          <div className="flex flex-wrap gap-2">
                            {verification.documents.map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Review Documents
                        </Button>
                        <Button size="sm" className="bg-success hover:bg-success/90">
                          <UserCheck className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm">
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;