import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface PaymentSystemProps {
  shipmentId: string;
  amount: number;
  onPaymentComplete?: (paymentId: string) => void;
}

const PaymentSystem = ({ shipmentId, amount, onPaymentComplete }: PaymentSystemProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [formData, setFormData] = useState({
    telebirrPhone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });

  const paymentMethods = [
    {
      id: "telebirr",
      name: "Telebirr",
      icon: <Smartphone className="h-5 w-5" />,
      description: "Pay with Telebirr mobile wallet",
      fee: 0,
      popular: true
    },
    {
      id: "cash",
      name: "Cash on Delivery",
      icon: <Banknote className="h-5 w-5" />,
      description: "Pay cash when shipment is delivered",
      fee: 0,
      popular: false
    },
    {
      id: "bank-transfer",
      name: "Bank Transfer",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Direct bank transfer",
      fee: 25,
      popular: false
    }
  ];

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    const paymentId = `PAY-${Date.now()}`;
    setPaymentComplete(true);
    setIsProcessing(false);
    
    toast.success("Payment completed successfully!");
    
    if (onPaymentComplete) {
      onPaymentComplete(paymentId);
    }
  };

  const selectedMethod = paymentMethods.find(method => method.id === paymentMethod);
  const totalAmount = amount + (selectedMethod?.fee || 0);

  if (paymentComplete) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
          <p className="text-muted-foreground mb-4">
            Your payment of {totalAmount.toLocaleString()} ETB has been processed.
          </p>
          <Badge className="bg-success text-success-foreground">
            Shipment #{shipmentId} - Paid
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Secure Payment</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Shipment #{shipmentId}</span>
              <Badge variant="outline">Payment Due</Badge>
            </div>
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-primary">{amount.toLocaleString()} ETB</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <Label className="text-base font-medium mb-4 block">Select Payment Method</Label>
            <div className="grid gap-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        paymentMethod === method.id ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        {method.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{method.name}</span>
                          {method.popular && (
                            <Badge className="bg-accent text-accent-foreground text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {method.fee > 0 ? (
                        <span className="text-sm text-muted-foreground">+{method.fee} ETB fee</span>
                      ) : (
                        <span className="text-sm text-success">No fee</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details Form */}
          {paymentMethod === "telebirr" && (
            <div className="space-y-4">
              <Separator />
              <div>
                <Label htmlFor="telebirr-phone">Telebirr Phone Number</Label>
                <Input
                  id="telebirr-phone"
                  placeholder="+251 9XX XXX XXX"
                  value={formData.telebirrPhone}
                  onChange={(e) => setFormData({...formData, telebirrPhone: e.target.value})}
                />
              </div>
            </div>
          )}

          {paymentMethod === "bank-transfer" && (
            <div className="space-y-4">
              <Separator />
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="card-name">Cardholder Name</Label>
                  <Input
                    id="card-name"
                    placeholder="Full name on card"
                    value={formData.cardName}
                    onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "cash" && (
            <div className="space-y-4">
              <Separator />
              <div className="bg-warning/10 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium text-warning">Cash on Delivery</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      You will pay {amount.toLocaleString()} ETB in cash when the shipment is delivered. 
                      Please ensure you have the exact amount ready.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Summary */}
          {selectedMethod && (
            <div className="space-y-4">
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Shipment Cost:</span>
                  <span>{amount.toLocaleString()} ETB</span>
                </div>
                {selectedMethod.fee > 0 && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Payment Fee:</span>
                    <span>+{selectedMethod.fee} ETB</span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">{totalAmount.toLocaleString()} ETB</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Button */}
          <Button 
            onClick={handlePayment}
            disabled={!paymentMethod || isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <DollarSign className="h-4 w-4 mr-2" />
                {paymentMethod === "cash" ? "Confirm Cash Payment" : `Pay ${totalAmount.toLocaleString()} ETB`}
              </>
            )}
          </Button>

          {/* Security Notice */}
          <div className="text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Your payment is secured with 256-bit SSL encryption</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSystem;