import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Truck, 
  Navigation, 
  Zap,
  RefreshCw,
  Maximize2,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface MapLocation {
  id: string;
  lat: number;
  lng: number;
  type: "truck" | "pickup" | "delivery" | "checkpoint";
  status: "active" | "completed" | "pending";
  title: string;
  description?: string;
}

interface RealTimeMapProps {
  shipmentId?: string;
  showAllVehicles?: boolean;
  height?: string;
}

const RealTimeMap = ({ shipmentId, showAllVehicles = false, height = "400px" }: RealTimeMapProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  // Sample locations for demonstration
  const [locations, setLocations] = useState<MapLocation[]>([
    {
      id: "truck-1",
      lat: 9.1450,
      lng: 40.4897,
      type: "truck",
      status: "active",
      title: "FW-001 (Alemayehu T.)",
      description: "En route to Dire Dawa - ETA 2h 15min"
    },
    {
      id: "pickup-1", 
      lat: 9.0302,
      lng: 38.7444,
      type: "pickup",
      status: "completed",
      title: "Pickup Point",
      description: "Addis Ababa Warehouse - Completed 2h ago"
    },
    {
      id: "delivery-1",
      lat: 9.5925,
      lng: 41.8663,
      type: "delivery", 
      status: "pending",
      title: "Delivery Point",
      description: "Dire Dawa Industrial Zone - ETA 2h 15min"
    },
    {
      id: "checkpoint-1",
      lat: 8.5391,
      lng: 39.2622,
      type: "checkpoint",
      status: "completed", 
      title: "Adama Checkpoint",
      description: "Passed 45 minutes ago"
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!shipmentId && !showAllVehicles) return;

    const interval = setInterval(() => {
      setLocations(prev => 
        prev.map(location => {
          if (location.type === "truck" && location.status === "active") {
            // Simulate truck movement
            return {
              ...location,
              lat: location.lat + (Math.random() - 0.5) * 0.01,
              lng: location.lng + (Math.random() - 0.5) * 0.01
            };
          }
          return location;
        })
      );
      setLastUpdated(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, [shipmentId, showAllVehicles]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 1000);
  };

  const getLocationIcon = (location: MapLocation) => {
    switch (location.type) {
      case "truck":
        return <Truck className="h-4 w-4" />;
      case "pickup":
        return <MapPin className="h-4 w-4" />;
      case "delivery": 
        return <MapPin className="h-4 w-4" />;
      case "checkpoint":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getLocationColor = (location: MapLocation) => {
    if (location.status === "completed") return "text-success";
    if (location.status === "pending") return "text-muted-foreground";
    
    switch (location.type) {
      case "truck": return "text-accent";
      case "pickup": return "text-primary";
      case "delivery": return "text-secondary";
      case "checkpoint": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getLocationBg = (location: MapLocation) => {
    if (location.status === "completed") return "bg-success/10 border-success/20";
    if (location.status === "pending") return "bg-muted/10 border-muted/20";
    
    switch (location.type) {
      case "truck": return "bg-accent/10 border-accent/20";
      case "pickup": return "bg-primary/10 border-primary/20"; 
      case "delivery": return "bg-secondary/10 border-secondary/20";
      case "checkpoint": return "bg-success/10 border-success/20";
      default: return "bg-muted/10 border-muted/20";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Navigation className="h-5 w-5 text-primary" />
            <span>Real-Time Tracking</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative bg-muted" style={{ height }}>
          {/* Map Container */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50">
            {/* Ethiopia outline/background pattern */}
            <div className="absolute inset-4 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Interactive GPS Map</p>
                <p className="text-xs">Real-time vehicle tracking</p>
              </div>
            </div>

            {/* Render location markers */}
            {locations.map((location) => (
              <div
                key={location.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10`}
                style={{
                  left: `${20 + (location.lng - 38) * 15}%`,
                  top: `${80 - (location.lat - 8) * 15}%`
                }}
                onClick={() => setSelectedLocation(location)}
              >
                <div className={`p-2 rounded-full border-2 ${getLocationBg(location)} ${getLocationColor(location)} transition-all hover:scale-110 ${
                  location.type === "truck" ? "animate-pulse" : ""
                }`}>
                  {getLocationIcon(location)}
                </div>
                
                {/* Location label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                  <div className="bg-background/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium shadow-sm border whitespace-nowrap">
                    {location.title}
                  </div>
                </div>
              </div>
            ))}

            {/* Route line simulation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--success))', stopOpacity: 0.6 }} />
                  <stop offset="50%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--muted-foreground))', stopOpacity: 0.4 }} />
                </linearGradient>
              </defs>
              <path
                d="M 20% 80% Q 40% 60% 60% 70% Q 80% 75% 85% 65%"
                stroke="url(#routeGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 border shadow-sm">
              <h4 className="text-xs font-semibold mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span>Active Vehicle</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Pickup Point</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span>Delivery Point</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span>Checkpoint</span>
                </div>
              </div>
            </div>

            {/* Speed indicator */}
            {locations.some(l => l.type === "truck" && l.status === "active") && (
              <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 border shadow-sm">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Current Speed</p>
                    <p className="text-sm font-bold">65 km/h</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Location Detail Popup */}
          {selectedLocation && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
              <Card className="w-64 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1 rounded ${getLocationBg(selectedLocation)} ${getLocationColor(selectedLocation)}`}>
                        {getLocationIcon(selectedLocation)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{selectedLocation.title}</p>
                        <Badge className={`text-xs ${
                          selectedLocation.status === "completed" ? "bg-success text-success-foreground" :
                          selectedLocation.status === "pending" ? "bg-muted text-muted-foreground" :
                          "bg-accent text-accent-foreground"
                        }`}>
                          {selectedLocation.status}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedLocation(null)}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                  {selectedLocation.description && (
                    <p className="text-xs text-muted-foreground">{selectedLocation.description}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeMap;