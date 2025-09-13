import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Phone,
  MessageSquare,
  Star,
  AlertTriangle
} from "lucide-react";

interface ShipmentStatusProps {
  shipmentId: string;
  onTrackLive?: () => void;
}

const ShipmentStatus = ({ shipmentId, onTrackLive }: ShipmentStatusProps) => {
  const shipment = {
    id: shipmentId,
    status: "in_transit",
    progress: 65,
    pickup: "Addis Ababa, Merkato",
    dropoff: "Dire Dawa, Industrial Zone",
    driver: {
      name: "አለማየሁ ታደሰ",
      phone: "+251911234567",
      rating: 4.8,
      truck: "Mercedes Actros - ETH 3-12345"
    },
    timeline: [
      {
        status: "confirmed",
        title: "ጫነት ተቀባይነት ያገኘ",
        description: "Driver accepted your shipment",
        time: "10:30 AM",
        completed: true
      },
      {
        status: "picked_up",
        title: "ጫነት ተወስዷል",
        description: "Cargo picked up from source",
        time: "11:45 AM", 
        completed: true
      },
      {
        status: "in_transit",
        title: "በመንገድ ላይ",
        description: "On route to destination",
        time: "12:15 PM",
        completed: false,
        active: true
      },
      {
        status: "delivered",
        title: "ደርሷል",
        description: "Delivered successfully",
        time: "Estimated 4:30 PM",
        completed: false
      }
    ],
    estimatedArrival: "4:30 PM",
    cargoType: "Electronics",
    weight: "250 kg"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-blue-500";
      case "picked_up": return "bg-yellow-500";
      case "in_transit": return "bg-primary";
      case "delivered": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_transit": return <Badge className="bg-primary">በመንገድ ላይ (In Transit)</Badge>;
      case "delivered": return <Badge className="bg-success">ደርሷል (Delivered)</Badge>;
      case "picked_up": return <Badge className="bg-warning">ተወስዷል (Picked Up)</Badge>;
      default: return <Badge variant="outline">ይጠበቃል (Pending)</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-primary" />
              <span>Shipment {shipment.id}</span>
            </CardTitle>
            {getStatusBadge(shipment.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{shipment.progress}%</span>
            </div>
            <Progress value={shipment.progress} className="h-2" />
          </div>

          {/* Route Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-primary/10">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-medium">{shipment.pickup}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-accent/10">
                <MapPin className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-medium">{shipment.dropoff}</p>
              </div>
            </div>
          </div>

          {/* Driver Info */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {shipment.driver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{shipment.driver.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-warning fill-warning" />
                      <span className="text-sm">{shipment.driver.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{shipment.driver.truck}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="font-medium">Shipment Timeline</h3>
            <div className="space-y-4">
              {shipment.timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${
                      item.completed 
                        ? 'bg-success' 
                        : item.active 
                          ? 'bg-primary animate-pulse' 
                          : 'bg-muted'
                    }`} />
                    {index < shipment.timeline.length - 1 && (
                      <div className={`w-0.5 h-8 ${
                        item.completed ? 'bg-success' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${
                        item.active ? 'text-primary' : 
                        item.completed ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {item.title}
                      </h4>
                      <span className="text-sm text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cargo Details */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Cargo Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <span className="ml-2 font-medium">{shipment.cargoType}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="ml-2 font-medium">{shipment.weight}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ETA */}
          <div className="flex items-center justify-center space-x-2 p-4 bg-primary/10 rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-medium">
              Estimated arrival: {shipment.estimatedArrival}
            </span>
          </div>

          {onTrackLive && (
            <Button onClick={onTrackLive} className="w-full">
              Track Live Location
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentStatus;