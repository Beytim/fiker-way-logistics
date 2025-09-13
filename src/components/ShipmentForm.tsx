import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, MapPin, Plus } from "lucide-react";
import { toast } from "sonner";

interface ShipmentFormData {
  pickupLocation: string;
  deliveryLocation: string;
  cargoType: string;
  weight: string;
  dimensions: string;
  pickupDate: string;
  deliveryDate: string;
  specialInstructions: string;
  budget: string;
  urgency: "low" | "medium" | "high";
}

interface ShipmentFormProps {
  onSubmit?: (data: ShipmentFormData) => void;
}

const ShipmentForm = ({ onSubmit }: ShipmentFormProps) => {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    cargoType: "",
    weight: "",
    truckType: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const shipmentData: ShipmentFormData = {
      pickupLocation: formData.pickupLocation,
      deliveryLocation: formData.dropoffLocation,
      cargoType: formData.cargoType,
      weight: formData.weight,
      dimensions: "",
      pickupDate: "",
      deliveryDate: "",
      specialInstructions: "",
      budget: "",
      urgency: "medium"
    };
    
    onSubmit?.(shipmentData);
    toast.success("ጫነት ተመዝግቧል! (Shipment posted!)");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Package className="h-6 w-6 text-primary" />
          <CardTitle>ጫነት መላክ (Post a Load)</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label>ከወዲህ (Pickup Location)</Label>
              <Select value={formData.pickupLocation} onValueChange={(value) => setFormData({...formData, pickupLocation: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="ከተማ ይምረጡ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="addis-ababa">Addis Ababa</SelectItem>
                  <SelectItem value="dire-dawa">Dire Dawa</SelectItem>
                  <SelectItem value="mekelle">Mekelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>ወዲያ (Drop-off Location)</Label>
              <Select value={formData.dropoffLocation} onValueChange={(value) => setFormData({...formData, dropoffLocation: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="መድረሻ ይምረጡ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="addis-ababa">Addis Ababa</SelectItem>
                  <SelectItem value="dire-dawa">Dire Dawa</SelectItem>
                  <SelectItem value="mekelle">Mekelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>የጫነት አይነት (Cargo Type)</Label>
              <Input 
                placeholder="General Cargo, Electronics, etc."
                value={formData.cargoType}
                onChange={(e) => setFormData({...formData, cargoType: e.target.value})}
              />
            </div>
            
            <div>
              <Label>ክብደት (Weight in kg)</Label>
              <Input 
                type="number" 
                placeholder="በኪሎ ግራም"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            ጫነት መላክ (Post Shipment)
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>
  );
};

export default ShipmentForm;