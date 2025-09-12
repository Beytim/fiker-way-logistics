import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, CheckCircle, DollarSign } from "lucide-react";

const DriverQuotes = () => {
  const quotes = [
    {
      id: "Q001",
      driver: "አለማየሁ ታደሰ",
      rating: 4.9,
      amount: 18500,
      truck: "Mercedes Actros"
    },
    {
      id: "Q002", 
      driver: "መሰረት በቀለ",
      rating: 4.7,
      amount: 17200,
      truck: "Volvo FH16"
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
                    {quote.driver.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-semibold">{quote.driver}</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span>{quote.rating}</span>
                    <Badge variant="outline">{quote.truck}</Badge>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-success">
                  {quote.amount.toLocaleString()} ETB
                </div>
                <Button className="mt-2">
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