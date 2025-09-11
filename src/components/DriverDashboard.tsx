import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Star, 
  MapPin, 
  Clock, 
  Package,
  DollarSign,
  Award,
  Navigation,
  CheckCircle
} from "lucide-react";

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState("available-loads");

  const availableLoads = [
    {
      id: "FW-003",
      from: "Addis Ababa",
      to: "Hawassa",
      cargo: "Medical Supplies",
      weight: "1.2 tons",
      distance: "275 km",
      payment: "12,500 ETB",
      urgency: "high",
      shipper: "HealthCorp Ethiopia",
      rating: 4.9
    },
    {
      id: "FW-004", 
      from: "Mekelle",
      to: "Dessie",
      cargo: "Construction Materials",
      weight: "4.5 tons",
      distance: "180 km", 
      payment: "8,200 ETB",
      urgency: "normal",
      shipper: "BuildTech Ltd",
      rating: 4.6
    }
  ];

  const myJobs = [
    {
      id: "FW-001",
      from: "Addis Ababa", 
      to: "Dire Dawa",
      status: "in-progress",
      progress: 65,
      cargo: "Electronics",
      payment: "15,400 ETB",
      eta: "2 hours 15 mins"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      default: return "bg-accent text-accent-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Driver Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Alemayehu</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-bold">4.8</span>
                  <span className="text-sm text-muted-foreground">(127 trips)</span>
                </div>
                <Badge className="bg-success text-success-foreground text-xs">
                  ✓ Verified Driver
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">45,300 ETB</p>
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
                  <p className="text-2xl font-bold">127</p>
                </div>
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
                <Star className="h-8 w-8 text-warning fill-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Master Level</p>
                  <p className="text-2xl font-bold">Gold</p>
                </div>
                <Award className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("available-loads")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "available-loads" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Available Loads
            </button>
            <button
              onClick={() => setActiveTab("my-jobs")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "my-jobs"
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              My Jobs
            </button>
            <button
              onClick={() => setActiveTab("earnings")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "earnings"
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Earnings
            </button>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === "available-loads" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Available Loads</h2>
              <Badge className="bg-accent text-accent-foreground">
                {availableLoads.length} loads nearby
              </Badge>
            </div>
            
            <div className="grid gap-4">
              {availableLoads.map((load) => (
                <Card key={load.id} className="hover:shadow-medium transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge variant="outline" className="font-mono">
                            {load.id}
                          </Badge>
                          <Badge className={getUrgencyColor(load.urgency)}>
                            {load.urgency.toUpperCase()} PRIORITY
                          </Badge>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{load.distance}</span>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Route</p>
                            <p className="font-medium">{load.from} → {load.to}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Cargo</p>
                            <p className="font-medium">{load.cargo} ({load.weight})</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Shipper</p>
                            <div className="flex items-center space-x-1">
                              <span className="font-medium text-sm">{load.shipper}</span>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 fill-warning text-warning" />
                                <span className="text-xs ml-1">{load.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-3 mt-4 lg:mt-0">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-success">{load.payment}</p>
                          <p className="text-xs text-muted-foreground">Payment on delivery</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Navigation className="h-4 w-4 mr-1" />
                            Route
                          </Button>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Accept Load
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "my-jobs" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Jobs</h2>
              <Badge className="bg-success text-success-foreground">
                1 active job
              </Badge>
            </div>
            
            <div className="grid gap-4">
              {myJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge variant="outline" className="font-mono">
                            {job.id}
                          </Badge>
                          <Badge className="bg-accent text-accent-foreground">
                            IN PROGRESS
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Route</p>
                            <p className="font-medium">{job.from} → {job.to}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Cargo</p>
                            <p className="font-medium">{job.cargo}</p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{job.progress}% complete</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-success h-2 rounded-full transition-all"
                              style={{ width: `${job.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-3 mt-4 lg:mt-0">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-success">{job.payment}</p>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>ETA: {job.eta}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Contact Shipper
                          </Button>
                          <Button size="sm" className="bg-accent hover:bg-accent/90">
                            Navigate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "earnings" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Earnings Overview</h2>
            <div className="text-center py-12">
              <DollarSign className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Complete more jobs to see detailed earnings analytics
              </p>
              <Button 
                className="mt-4"
                onClick={() => setActiveTab("available-loads")}
              >
                Find More Loads
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;