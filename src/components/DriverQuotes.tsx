import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign,
  Phone,
  MessageCircle,
  Shield,
  Award
} from "lucide-react";

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

interface DriverQuotesProps {
  shipmentId: string;
  onSelectDriver: (quote: DriverQuote) => void;
}

const DriverQuotes = ({ shipmentId, onSelectDriver }: DriverQuotesProps) => {
  const [quotes, setQuotes] = useState<DriverQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching driver quotes
    const fetchQuotes = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockQuotes: DriverQuote[] = [
        {
          id: "DQ-001",
          driverName: "Alemayehu Tadesse",
          rating: 4.9,
          totalTrips: 127,
          vehicleType: "Medium Truck (5 tons)",
          vehicleNumber: "ET-AA-1234",
          quotedPrice: 12500,
          estimatedTime: "4-6 hours",
          distance: "275 km",
          isVerified: true,
          specializations: ["Electronics", "Fragile Items"],
          responseTime: "2 minutes ago",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: "DQ-002",
          driverName: "Meseret Bekele",
          rating: 4.7,
          totalTrips: 89,
          vehicleType: "Large Truck (8 tons)",
          vehicleNumber: "ET-OR-5678",
          quotedPrice: 11800,
          estimatedTime: "5-7 hours",
          distance: "275 km",
          isVerified: true,
          specializations: ["Construction Materials", "Heavy Cargo"],
          responseTime: "5 minutes ago"
        },
        {
          id: "DQ-003",
          driverName: "Dawit Haile",
          rating: 4.8,
          totalTrips: 156,
          vehicleType: "Medium Truck (6 tons)",
          vehicleNumber: "ET-TG-9012",
          quotedPrice: 13200,
          estimatedTime: "4-5 hours",
          distance: "275 km",
          isVerified: true,
          specializations: ["Medical Supplies", "Express Delivery"],
          responseTime: "1 minute ago"
        },
        {
          id: "DQ-004",
          driverName: "Hanan Mohammed",
          rating: 4.6,
          totalTrips: 73,
          vehicleType: "Small Truck (3 tons)",
          vehicleNumber: "ET-AM-3456",
          quotedPrice: 10500,
          estimatedTime: "6-8 hours",
          distance: "275 km",
          isVerified: false,
          specializations: ["Textiles", "Food Products"],
          responseTime: "8 minutes ago"
        }
      ];
      
      setQuotes(mockQuotes);
      setLoading(false);
    };

    fetchQuotes();
  }, [shipmentId]);

  const handleSelectDriver = (quote: DriverQuote) => {
    setSelectedQuote(quote.id);
    onSelectDriver(quote);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return "text-success";
    if (rating >= 4.5) return "text-warning";
    return "text-muted-foreground";
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Driver Quotes</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                  <div className="h-8 bg-muted rounded w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Driver Quotes ({quotes.length})</h3>
        <Badge className="bg-accent text-accent-foreground">
          New quotes arriving
        </Badge>
      </div>

      <div className="space-y-4">
        {quotes.map((quote) => (
          <Card 
            key={quote.id} 
            className={`transition-all duration-200 hover:shadow-medium cursor-pointer ${
              selectedQuote === quote.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                {/* Driver Info */}
                <div className="flex items-center space-x-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={quote.avatar} alt={quote.driverName} />
                    <AvatarFallback>
                      {quote.driverName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{quote.driverName}</h4>
                      {quote.isVerified && (
                        <Badge className="bg-success text-success-foreground text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className={`h-4 w-4 fill-current ${getRatingColor(quote.rating)}`} />
                        <span className="font-medium">{quote.rating}</span>
                        <span>({quote.totalTrips} trips)</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Truck className="h-4 w-4" />
                        <span>{quote.vehicleNumber}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{quote.responseTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {quote.specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote Details */}
                <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-6">
                  <div className="text-center lg:text-right">
                    <div className="text-2xl font-bold text-success">
                      {quote.quotedPrice.toLocaleString()} ETB
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {quote.estimatedTime} • {quote.distance}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {quote.vehicleType}
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
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => handleSelectDriver(quote)}
                      disabled={selectedQuote === quote.id}
                    >
                      {selectedQuote === quote.id ? 'Selected' : 'Select Driver'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {quotes.length === 0 && !loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">No quotes yet</h4>
            <p className="text-muted-foreground">
              Drivers are reviewing your shipment request. Quotes typically arrive within 15-30 minutes.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DriverQuotes;