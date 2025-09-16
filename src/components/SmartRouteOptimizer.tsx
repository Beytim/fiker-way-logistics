import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Fuel, 
  DollarSign,
  Route,
  Zap,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from "lucide-react";

interface RouteOption {
  id: string;
  name: string;
  distance: string;
  duration: string;
  fuelCost: number;
  tollCost: number;
  difficulty: "easy" | "medium" | "hard";
  traffic: "light" | "moderate" | "heavy";
  roadCondition: "excellent" | "good" | "fair" | "poor";
  savings: number;
  co2Reduction: number;
  waypoints: string[];
}

interface SmartRouteOptimizerProps {
  origin: string;
  destination: string;
  cargoWeight?: number;
  vehicleType?: string;
  onRouteSelect?: (route: RouteOption) => void;
}

const SmartRouteOptimizer = ({ 
  origin, 
  destination, 
  cargoWeight = 2500,
  vehicleType = "Medium Truck",
  onRouteSelect 
}: SmartRouteOptimizerProps) => {
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);

  useEffect(() => {
    optimizeRoutes();
  }, [origin, destination, cargoWeight, vehicleType]);

  const optimizeRoutes = async () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);

    // Simulate AI route optimization
    const progressInterval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizationProgress(100);
      
      // Generate optimized routes
      const optimizedRoutes: RouteOption[] = [
        {
          id: "route-1",
          name: "AI Optimized Route",
          distance: "420 km",
          duration: "5h 45m",
          fuelCost: 2800,
          tollCost: 150,
          difficulty: "easy",
          traffic: "light",
          roadCondition: "excellent",
          savings: 850,
          co2Reduction: 15,
          waypoints: ["Addis Ababa", "Adama", "Awash", "Dire Dawa"]
        },
        {
          id: "route-2", 
          name: "Fastest Route",
          distance: "435 km",
          duration: "5h 20m",
          fuelCost: 3200,
          tollCost: 300,
          difficulty: "medium",
          traffic: "moderate",
          roadCondition: "good",
          savings: 450,
          co2Reduction: 8,
          waypoints: ["Addis Ababa", "Bishoftu", "Adama", "Dire Dawa"]
        },
        {
          id: "route-3",
          name: "Scenic Route",
          distance: "465 km", 
          duration: "6h 15m",
          fuelCost: 2600,
          tollCost: 0,
          difficulty: "hard",
          traffic: "light",
          roadCondition: "fair",
          savings: 1200,
          co2Reduction: 22,
          waypoints: ["Addis Ababa", "Debre Zeit", "Nazret", "Awash", "Dire Dawa"]
        }
      ];
      
      setRoutes(optimizedRoutes);
      setSelectedRoute(optimizedRoutes[0].id);
      clearInterval(progressInterval);
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-success text-success-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "hard": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case "light": return "text-success";
      case "moderate": return "text-warning";
      case "heavy": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getRoadConditionIcon = (condition: string) => {
    switch (condition) {
      case "excellent": return <CheckCircle className="h-4 w-4 text-success" />;
      case "good": return <CheckCircle className="h-4 w-4 text-accent" />;
      case "fair": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "poor": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Navigation className="h-5 w-5 text-primary" />
              <span>Smart Route Optimizer</span>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={optimizeRoutes}
              disabled={isOptimizing}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isOptimizing ? 'animate-spin' : ''}`} />
              Re-optimize
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Route Summary */}
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  <span className="font-medium">{origin}</span> → <span className="font-medium">{destination}</span>
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Cargo: {cargoWeight}kg</span>
                <span>Vehicle: {vehicleType}</span>
              </div>
            </div>

            {/* Optimization Progress */}
            {isOptimizing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-accent animate-pulse" />
                    <span>AI Optimizing Routes...</span>
                  </span>
                  <span>{Math.round(optimizationProgress)}%</span>
                </div>
                <Progress value={optimizationProgress} className="h-2" />
              </div>
            )}

            {/* Route Options */}
            {routes.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Optimized Route Options</h3>
                {routes.map((route) => (
                  <Card 
                    key={route.id}
                    className={`cursor-pointer transition-all ${
                      selectedRoute === route.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{route.name}</h4>
                          <Badge className={getDifficultyColor(route.difficulty)}>
                            {route.difficulty}
                          </Badge>
                          {route.savings > 500 && (
                            <Badge className="bg-success text-success-foreground">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              Save {route.savings} ETB
                            </Badge>
                          )}
                        </div>
                        {selectedRoute === route.id && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 text-sm">
                            <Route className="h-3 w-3" />
                            <span>{route.distance}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Distance</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 text-sm">
                            <Clock className="h-3 w-3" />
                            <span>{route.duration}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Duration</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 text-sm">
                            <Fuel className="h-3 w-3" />
                            <span>{route.fuelCost} ETB</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Fuel Cost</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 text-sm">
                            <DollarSign className="h-3 w-3" />
                            <span>{route.tollCost} ETB</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Tolls</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-muted-foreground">Traffic:</span>
                            <span className={getTrafficColor(route.traffic)}>
                              {route.traffic}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-muted-foreground">Road:</span>
                            {getRoadConditionIcon(route.roadCondition)}
                            <span>{route.roadCondition}</span>
                          </div>
                        </div>
                        {route.co2Reduction > 0 && (
                          <Badge variant="outline" className="text-xs">
                            🌱 -{route.co2Reduction}% CO₂
                          </Badge>
                        )}
                      </div>

                      {/* Waypoints */}
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground mb-1">Route:</p>
                        <div className="flex items-center space-x-1 text-xs">
                          {route.waypoints.map((waypoint, index) => (
                            <React.Fragment key={index}>
                              <span className="font-medium">{waypoint}</span>
                              {index < route.waypoints.length - 1 && (
                                <span className="text-muted-foreground">→</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {selectedRoute && (
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        const route = routes.find(r => r.id === selectedRoute);
                        if (route) {
                          onRouteSelect?.(route);
                        }
                      }}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Start Navigation
                    </Button>
                    <Button variant="outline">
                      Share Route
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartRouteOptimizer;