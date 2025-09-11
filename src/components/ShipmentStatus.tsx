import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Phone,
  MessageCircle,
  Navigation,
  Star
} from "lucide-react";

interface ShipmentStatusProps {
  shipmentId: string;
  onTrackLive?: () => void;
}

interface StatusUpdate {
  id: string;
  status: "pending" | "accepted" | "picked-up" | "in-transit" | "delivered";
  timestamp: string;
  location: string;
  description: string;
  isCompleted: boolean;
}

interface ShipmentDetails {
  id: string;
  from: string;
  to: string;
  cargo: string;
  weight: string;
  currentStatus: string;
  progress: number;
  driver: {
    name: string;
    rating: number;
    phone: string;
    vehicleNumber: string;
  };
  estimatedDelivery: string;
  actualDelivery?: string;
  statusUpdates: StatusUpdate[];
}

const ShipmentStatus = ({ shipmentId, onTrackLive }: ShipmentStatusProps) => {
  const [shipment, setShipment] = useState<ShipmentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockShipment: ShipmentDetails = {
        id: shipmentId,
        from: "Addis Ababa",
        to: "Dire Dawa",
        cargo: "Electronics",
        weight: "2.5 tons",
        currentStatus: "in-transit",
        progress: 65,
        driver: {
          name: "Alemayehu Tadesse",
          rating: 4.8,
          phone: "+251 911 234 567",
          vehicleNumber: "ET-AA-1234"
        },
        estimatedDelivery: "2 hours 15 minutes",
        statusUpdates: [
          {
            id: "1",
            status: "pending",
            timestamp: "2024-01-15 08:00",
            location: "Addis Ababa",
            description: "Shipment request created",
            isCompleted: true
          },
          {
            id: "2",
            status: "accepted",
            timestamp: "2024-01-15 08:15",
            location: "Addis Ababa",
            description: "Driver accepted the shipment",
            isCompleted: true
          },
          {
            id: "3",
            status: "picked-up",
            timestamp: "2024-01-15 09:30",
            location: "Addis Ababa Industrial Zone",
            description: "Cargo picked up successfully",
            isCompleted: true
          },
          {
            id: "4",
            status: "in-transit",
            timestamp: "2024-01-15 10:00",
            location: "Awash Station",
            description: "Currently en route to destination",
            isCompleted: false
          },
          {
            id: "5",
            status: "delivered",
            timestamp: "Expected: 2024-01-15 14:00",
            location: "Dire Dawa Industrial Zone",
            description: "Delivery to destination",
            isCompleted: false
          }
        ]
      };
      
      setShipment(mockShipment);
      setLoading(false);
    };

    fetchShipmentDetails();
  }, [shipmentId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-warning text-warning-foreground";
      case "accepted": return "bg-accent text-accent-foreground";
      case "picked-up": return "bg-primary text-primary-foreground";
      case "in-transit": return "bg-accent text-accent-foreground";
      case "delivered": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="h-4 w-4 text-success" />;
    }
    
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-warning" />;
      case "accepted": return <CheckCircle className="h-4 w-4 text-accent" />;
      case "picked-up": return <Package className="h-4 w-4 text-primary" />;
      case "in-transit": return <Truck className="h-4 w-4 text-accent" />;
      case "delivered": return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/3" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded w-2/3" />
          <div className="h-20 bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!shipment) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h4 className="text-lg font-semibold mb-2">Shipment Not Found</h4>
          <p className="text-muted-foreground">
            Could not find shipment with ID: {shipmentId}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Shipment Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary" />
              <span>Shipment {shipment.id}</span>
            </CardTitle>
            <Badge className={getStatusColor(shipment.currentStatus)}>
              {shipment.currentStatus.replace("-", " ").toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Route and Progress */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Route Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">From:</span>
                  <span>{shipment.from}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="font-medium">To:</span>
                  <span>{shipment.to}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Cargo:</span>
                  <span>{shipment.cargo} ({shipment.weight})</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Delivery Progress</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-bold">{shipment.progress}%</span>
                </div>
                <Progress value={shipment.progress} className="h-3" />
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>ETA: {shipment.estimatedDelivery}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Information */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-3">Driver Information</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{shipment.driver.name}</div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span>{shipment.driver.rating}</span>
                    <span>•</span>
                    <span>{shipment.driver.vehicleNumber}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat
                </Button>
                {onTrackLive && (
                  <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={onTrackLive}>
                    <Navigation className="h-4 w-4 mr-1" />
                    Live Track
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Shipment Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shipment.statusUpdates.map((update, index) => (
              <div key={update.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(update.status, update.isCompleted)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      update.isCompleted ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {update.description}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {update.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {update.location}
                  </p>
                </div>
                {update.status === shipment.currentStatus && !update.isCompleted && (
                  <Badge className="bg-accent text-accent-foreground text-xs">
                    Current
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentStatus;