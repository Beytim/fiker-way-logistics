import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, Calendar, DollarSign, Truck } from "lucide-react";
import { toast } from "@/components/ui/sonner";

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
  onSubmit: (data: ShipmentFormData) => void;
  onCancel?: () => void;
}

const ShipmentForm = ({ onSubmit, onCancel }: ShipmentFormProps) => {
  const [formData, setFormData] = useState<ShipmentFormData>({
    pickupLocation: "",
    deliveryLocation: "",
    cargoType: "",
    weight: "",
    dimensions: "",
    pickupDate: "",
    deliveryDate: "",
    specialInstructions: "",
    budget: "",
    urgency: "medium"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ShipmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['pickupLocation', 'deliveryLocation', 'cargoType', 'weight', 'pickupDate'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof ShipmentFormData]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSubmit(formData);
      toast.success("Shipment request posted successfully!");
      
      // Reset form
      setFormData({
        pickupLocation: "",
        deliveryLocation: "",
        cargoType: "",
        weight: "",
        dimensions: "",
        pickupDate: "",
        deliveryDate: "",
        specialInstructions: "",
        budget: "",
        urgency: "medium"
      });
    } catch (error) {
      toast.error("Failed to post shipment request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      default: return "bg-accent text-accent-foreground";
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-primary" />
          <span>Create New Shipment Request</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Route Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pickup" className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Pickup Location *</span>
              </Label>
              <Input
                id="pickup"
                placeholder="Enter pickup address"
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="delivery" className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Delivery Location *</span>
              </Label>
              <Input
                id="delivery"
                placeholder="Enter delivery address"
                value={formData.deliveryLocation}
                onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Cargo Information */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cargo-type">Cargo Type *</Label>
              <Select value={formData.cargoType} onValueChange={(value) => handleInputChange('cargoType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cargo type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="textiles">Textiles</SelectItem>
                  <SelectItem value="food">Food Products</SelectItem>
                  <SelectItem value="medical">Medical Supplies</SelectItem>
                  <SelectItem value="construction">Construction Materials</SelectItem>
                  <SelectItem value="automotive">Automotive Parts</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (tons) *</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="2.5"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions (L×W×H)</Label>
              <Input
                id="dimensions"
                placeholder="2m × 1.5m × 1m"
                value={formData.dimensions}
                onChange={(e) => handleInputChange('dimensions', e.target.value)}
              />
            </div>
          </div>

          {/* Date and Urgency */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup-date" className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Pickup Date *</span>
              </Label>
              <Input
                id="pickup-date"
                type="date"
                value={formData.pickupDate}
                onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="delivery-date">Preferred Delivery Date</Label>
              <Input
                id="delivery-date"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Urgency Level</Label>
              <Select value={formData.urgency} onValueChange={(value: "low" | "medium" | "high") => handleInputChange('urgency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Budget */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span>Budget (ETB)</span>
              </Label>
              <Input
                id="budget"
                type="number"
                placeholder="15000"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              />
            </div>
            
            <div className="flex items-end">
              <Badge className={getUrgencyColor(formData.urgency)}>
                {formData.urgency.toUpperCase()} PRIORITY
              </Badge>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Fragile items, special handling requirements, delivery instructions..."
              rows={3}
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Truck className="h-4 w-4 mr-2 animate-pulse" />
                  Posting Request...
                </>
              ) : (
                <>
                  <Package className="h-4 w-4 mr-2" />
                  Post Shipment Request
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShipmentForm;