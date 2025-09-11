import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Package, 
  MapPin, 
  Truck, 
  Clock, 
  Star,
  Plus,
  Filter,
  Search
} from "lucide-react";

const ShipperDashboard = () => {
  const [activeTab, setActiveTab] = useState("post-load");

  const shipments = [
    {
      id: "FW-001",
      from: "Addis Ababa",
      to: "Dire Dawa", 
      status: "in-transit",
      driver: "Alemayehu Tadesse",
      rating: 4.8,
      cargo: "Electronics",
      weight: "2.5 tons",
      estimatedDelivery: "2 hours"
    },
    {
      id: "FW-002",
      from: "Bahir Dar",
      to: "Gondar",
      status: "delivered",
      driver: "Meseret Bekele",
      rating: 5.0,
      cargo: "Textiles",
      weight: "1.8 tons",
      estimatedDelivery: "Delivered"
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
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Shipper Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Shipper</p>
              </div>
            </div>
            <Badge className="bg-success text-success-foreground">
              ✓ Verified Business
            </Badge>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("post-load")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "post-load" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Post New Load
            </button>
            <button
              onClick={() => setActiveTab("shipments")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "shipments"
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              My Shipments
            </button>
            <button
              onClick={() => setActiveTab("drivers")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "drivers"
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Find Drivers
            </button>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === "post-load" && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-primary" />
                  <span>Post New Load</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="pickup" placeholder="Enter pickup address" className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dropoff">Drop-off Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="dropoff" placeholder="Enter drop-off address" className="pl-10" />
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cargo-type">Cargo Type</Label>
                    <Input id="cargo-type" placeholder="e.g., Electronics, Textiles" />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (tons)</Label>
                    <Input id="weight" type="number" placeholder="2.5" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Fragile items, special handling instructions..."
                    rows={3}
                  />
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Post Load & Get Quotes
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "shipments" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Shipments</h2>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {shipments.map((shipment) => (
                <Card key={shipment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
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
                            <p className="font-medium">{shipment.from} → {shipment.to}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Cargo</p>
                            <p className="font-medium">{shipment.cargo} ({shipment.weight})</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Driver</p>
                            <div className="flex items-center space-x-1">
                              <span className="font-medium">{shipment.driver}</span>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 fill-warning text-warning" />
                                <span className="text-xs ml-1">{shipment.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        {shipment.status === "in-transit" && (
                          <>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>ETA: {shipment.estimatedDelivery}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              Track Live
                            </Button>
                          </>
                        )}
                        {shipment.status === "delivered" && (
                          <Button variant="outline" size="sm">
                            View Receipt
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "drivers" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Drivers</h2>
            <div className="text-center py-12">
              <Truck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Post a load to see available drivers in your area
              </p>
              <Button 
                className="mt-4"
                onClick={() => setActiveTab("post-load")}
              >
                Post Your First Load
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipperDashboard;