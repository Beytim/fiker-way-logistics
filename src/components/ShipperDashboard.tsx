import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ShipmentForm from "./ShipmentForm";
import DriverQuotes from "./DriverQuotes";
import ShipmentStatus from "./ShipmentStatus";
import { 
  Package, 
  MapPin, 
  Truck, 
  Clock, 
  Star,
  Plus,
  Filter,
  Search,
  Eye
} from "lucide-react";

interface ShipmentFormData {
  pickupLocation: string;
  deliveryLocation: string;
  cargoType: string;
  weight: string;
  dimensions: string;
  pickupDate: string;
  deliveryDate: string;
  specialInstructions: string;
  budget: string;
  urgency: "low" | "medium" | "high";
}

interface DriverQuote {
  id: string;
  driverName: string;
  rating: number;
  totalTrips: number;
  vehicleType: string;
  vehicleNumber: string;
  quotedPrice: number;
  estimatedTime: string;
  distance: string;
  isVerified: boolean;
  specializations: string[];
  responseTime: string;
  avatar?: string;
}

const ShipperDashboard = () => {
  const [activeTab, setActiveTab] = useState("post-load");
  const [currentShipmentId, setCurrentShipmentId] = useState<string | null>(null);
  const [showQuotes, setShowQuotes] = useState(false);
  const [viewingShipment, setViewingShipment] = useState<string | null>(null);

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
      estimatedDelivery: "2 hours",
      hasQuotes: false
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
      estimatedDelivery: "Delivered",
      hasQuotes: false
    },
    {
      id: "FW-003",
      from: "Mekelle",
      to: "Dessie",
      status: "pending",
      driver: null,
      rating: 0,
      cargo: "Medical Supplies",
      weight: "1.2 tons",
      estimatedDelivery: "Awaiting driver",
      hasQuotes: true
    }
  ];

  const handleShipmentSubmit = (data: ShipmentFormData) => {
    // Generate a new shipment ID
    const newShipmentId = `FW-${String(Date.now()).slice(-3)}`;
    setCurrentShipmentId(newShipmentId);
    setShowQuotes(true);
    setActiveTab("quotes");
  };

  const handleDriverSelect = (quote: DriverQuote) => {
    // Handle driver selection logic
    console.log("Selected driver:", quote);
    setShowQuotes(false);
    setActiveTab("shipments");
  };

  const handleViewShipment = (shipmentId: string) => {
    setViewingShipment(shipmentId);
    setActiveTab("view-shipment");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-transit": return "bg-accent text-accent-foreground";
      case "delivered": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <header className="border-b bg-card sticky top-16 z-40">
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
      <div className="border-b bg-background sticky top-32 z-30">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("post-load")}
              className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "post-load" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Post New Load
            </button>
            <button
              onClick={() => setActiveTab("shipments")}
              className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "shipments"
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              My Shipments
            </button>
            {showQuotes && (
              <button
                onClick={() => setActiveTab("quotes")}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "quotes"
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Driver Quotes
              </button>
            )}
            {viewingShipment && (
              <button
                onClick={() => setActiveTab("view-shipment")}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "view-shipment"
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Shipment Details
              </button>
            )}
            <button
              onClick={() => setActiveTab("drivers")}
              className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
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
          <ShipmentForm onSubmit={handleShipmentSubmit} />
        )}

        {activeTab === "quotes" && currentShipmentId && (
          <DriverQuotes 
            shipmentId={currentShipmentId} 
            onSelectDriver={handleDriverSelect}
          />
        )}

        {activeTab === "view-shipment" && viewingShipment && (
          <ShipmentStatus 
            shipmentId={viewingShipment}
            onTrackLive={() => {
              // Navigate to live tracking
              window.location.href = `/track?id=${viewingShipment}`;
            }}
          />
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
                          {shipment.hasQuotes && (
                            <Badge className="bg-accent text-accent-foreground">
                              New Quotes Available
                            </Badge>
                          )}
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
                            {shipment.driver ? (
                              <div className="flex items-center space-x-1">
                                <span className="font-medium">{shipment.driver}</span>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 fill-warning text-warning" />
                                  <span className="text-xs ml-1">{shipment.rating}</span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Awaiting assignment</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewShipment(shipment.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
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
                        {shipment.hasQuotes && (
                          <Button 
                            size="sm" 
                            className="bg-accent hover:bg-accent/90"
                            onClick={() => {
                              setCurrentShipmentId(shipment.id);
                              setShowQuotes(true);
                              setActiveTab("quotes");
                            }}
                          >
                            View Quotes
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