import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, CheckCircle, DollarSign } from "lucide-react";

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
  shipmentId?: string;
  onSelectDriver?: (quote: DriverQuote) => void;
}

const DriverQuotes = ({ shipmentId, onSelectDriver }: DriverQuotesProps) => {
  const quotes: DriverQuote[] = [
    {
      id: "Q001",
      driverName: "አለማየሁ ታደሰ",
      rating: 4.9,
      quotedPrice: 18500,
      vehicleType: "Mercedes Actros",
      vehicleNumber: "ETH-3-12345",
      totalTrips: 150,
      estimatedTime: "6 hours",
      distance: "420 km",
      isVerified: true,
      specializations: ["Electronics", "Fragile Items"],
      responseTime: "2 minutes"
    },
    {
      id: "Q002", 
      driverName: "መሰረት በቀለ",
      rating: 4.7,
      quotedPrice: 17200,
      vehicleType: "Volvo FH16",
      vehicleNumber: "ETH-5-67890",
      totalTrips: 89,
      estimatedTime: "5.5 hours",
      distance: "420 km",
      isVerified: true,
      specializations: ["General Cargo", "Construction Materials"],
      responseTime: "5 minutes"
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">የአሽከርካሪዎች ምላሽ (Driver Quotes)</h2>
      
      {quotes.map((quote) => (
        <Card key={quote.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {quote.driverName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-semibold">{quote.driverName}</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span>{quote.rating}</span>
                    <Badge variant="outline">{quote.vehicleType}</Badge>
                    {quote.isVerified && <Badge className="bg-success">Verified</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {quote.totalTrips} trips • {quote.estimatedTime} • {quote.distance}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-success">
                  {quote.quotedPrice.toLocaleString()} ETB
                </div>
                <Button 
                  className="mt-2"
                  onClick={() => onSelectDriver?.(quote)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  ምላሽ ተቀበል
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DriverQuotes;