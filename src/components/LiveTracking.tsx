import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Truck, 
  Phone, 
  MessageCircle, 
  Clock,
  Navigation,
  AlertTriangle,
  CheckCircle,
  Star
} from "lucide-react";

interface LiveTrackingProps {
  shipmentId: string;
}

const LiveTracking = ({ shipmentId }: LiveTrackingProps) => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 9.1450,
    lng: 40.4897,
    address: "Near Bole International Airport, Addis Ababa"
  });

  const [eta, setEta] = useState("2 hours 15 minutes");
  const [progress, setProgress] = useState(65);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 2, 100));
      
      // Simulate ETA countdown
      const currentHours = parseInt(eta.split(" ")[0]);
      const currentMinutes = parseInt(eta.split(" ")[2]);
      const totalMinutes = currentHours * 60 + currentMinutes;
      
      if (totalMinutes > 5) {
        const newTotalMinutes = totalMinutes - Math.floor(Math.random() * 3) - 1;
        const newHours = Math.floor(newTotalMinutes / 60);
        const newMinutes = newTotalMinutes % 60;
        setEta(`${newHours} hours ${newMinutes} minutes`);
      }
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [eta]);

  const shipmentDetails = {
    id: shipmentId,
    from: "Addis Ababa",
    to: "Dire Dawa",
    cargo: "Electronics",
    driver: {
      name: "Alemayehu Tadesse",
      rating: 4.8,
      phone: "+251 911 234 567",
      vehicleNumber: "ET-AA-1234"
    },
    status: "in-transit"
  };

  const milestones = [
    {
      name: "Pickup Complete",
      location: "Addis Ababa",
      time: "2 hours ago",
      status: "completed"
    },
    {
      name: "Highway Checkpoint",
      location: "Adama Junction",
      time: "45 minutes ago", 
      status: "completed"
    },
    {
      name: "Rest Stop",
      location: "Awash Station",
      time: "Current location",
      status: "current"
    },
    {
      name: "Final Checkpoint",
      location: "Dire Dawa Outskirts",
      time: "In 1 hour",
      status: "pending"
    },
    {
      name: "Delivery",
      location: "Dire Dawa Industrial Zone", 
      time: eta,
      status: "pending"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "current": return <Truck className="h-4 w-4 text-accent" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Live Tracking - {shipmentDetails.id}</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {shipmentDetails.from} → {shipmentDetails.to}
              </p>
            </div>
            <Badge className="bg-accent text-accent-foreground mt-2 md:mt-0">
              IN TRANSIT
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <Card className="h-96">
            <CardContent className="p-0 h-full">
              <div className="relative h-full bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Live GPS Map Integration
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Current: {currentLocation.address}
                  </p>
                </div>
                
                {/* Simulated truck icon */}
                <div 
                  className="absolute animate-pulse"
                  style={{
                    top: '45%',
                    left: '60%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="bg-accent text-accent-foreground p-2 rounded-full shadow-lg">
                    <Truck className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress & Driver Info */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Delivery Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span className="font-bold">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-gradient-primary h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>ETA: {eta}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Driver Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{shipmentDetails.driver.name}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <span className="text-sm">{shipmentDetails.driver.rating}</span>
                      <Badge variant="outline" className="text-xs ml-2">
                        ✓ Verified
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>Vehicle: {shipmentDetails.driver.vehicleNumber}</p>
                  <p>Phone: {shipmentDetails.driver.phone}</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    SMS
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Journey Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Journey Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(milestone.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      milestone.status === "current" ? "text-accent" : 
                      milestone.status === "completed" ? "text-success" : 
                      "text-muted-foreground"
                    }`}>
                      {milestone.name}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {milestone.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {milestone.location}
                  </p>
                </div>
                {milestone.status === "current" && (
                  <Badge className="bg-accent text-accent-foreground text-xs">
                    Current
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div className="flex-1">
              <p className="text-sm font-medium">Emergency Support</p>
              <p className="text-xs text-muted-foreground">24/7 customer support available</p>
            </div>
            <Button variant="destructive" size="sm">
              Emergency Call
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default LiveTracking;