import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Smartphone, Wallet, DollarSign, Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface PaymentSystemProps {
  amount: number;
  shipmentId: string;
  onPaymentComplete?: (paymentMethod: string) => void;
}

const PaymentSystem = ({ amount, shipmentId, onPaymentComplete }: PaymentSystemProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: "chapa",
      name: "Chapa",
      icon: <CreditCard className="h-5 w-5" />,
      description: "ደህንነታቸው የተረጋገጠ የባንክ ካርድ ክፍያዎች",
      fee: "2.9%"
    },
    {
      id: "telebirr",
      name: "Telebirr",
      icon: <Smartphone className="h-5 w-5" />,
      description: "በቀላሉ የሞባይል ክፍያ",
      fee: "1.5%"
    },
    {
      id: "wallet",
      name: "FikerWay Wallet",
      icon: <Wallet className="h-5 w-5" />,
      description: "ቀድሞ የተሸከማቹ ሂሳቦች",
      fee: "Free"
    },
    {
      id: "cash",
      name: "Cash on Delivery",
      icon: <DollarSign className="h-5 w-5" />,
      description: "በማድረሻ ጊዜ ክፍያ",
      fee: "Free"
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("ክፍያ በተሳካ ሁኔታ ተጠናቅቋል! (Payment successful!)");
      onPaymentComplete?.(selectedMethod);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Payment - {shipmentId}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Total Amount</span>
              <span className="text-2xl font-bold text-primary">{amount.toLocaleString()} ETB</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-sm">
              <span>Base fare</span>
              <span>{(amount * 0.9).toLocaleString()} ETB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Platform fee</span>
              <span>{(amount * 0.1).toLocaleString()} ETB</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Choose Payment Method</h3>
            {paymentMethods.map((method) => (
              <Card 
                key={method.id}
                className={`cursor-pointer transition-all ${
                  selectedMethod === method.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={method.fee === "Free" ? "secondary" : "outline"}>
                        {method.fee}
                      </Badge>
                      {selectedMethod === method.id && (
                        <CheckCircle className="h-5 w-5 text-primary mt-1 ml-auto" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            className="w-full" 
            size="lg"
            disabled={!selectedMethod || isProcessing}
            onClick={handlePayment}
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                <span>Processing...</span>
              </div>
            ) : (
              `Pay ${amount.toLocaleString()} ETB`
            )}
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            <Shield className="h-4 w-4 inline mr-1" />
            Your payment is secured with 256-bit encryption
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSystem;