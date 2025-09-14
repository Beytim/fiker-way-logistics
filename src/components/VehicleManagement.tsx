import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Truck, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin,
  Fuel,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Wrench,
  FileText
} from "lucide-react";
import { toast } from "sonner";

interface Vehicle {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
  year: number;
  type: "small-truck" | "medium-truck" | "large-truck" | "pickup";
  capacity: string;
  status: "active" | "maintenance" | "inactive";
  fuelType: "gasoline" | "diesel" | "electric";
  lastMaintenance: Date;
  nextMaintenance: Date;
  location: string;
  documents: {
    insurance: { valid: boolean; expiry: Date };
    license: { valid: boolean; expiry: Date };
    inspection: { valid: boolean; expiry: Date };
  };
}

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      plateNumber: "ET-AA-1234",
      make: "Isuzu",
      model: "NPR",
      year: 2020,
      type: "medium-truck",
      capacity: "3.5 tons",
      status: "active",
      fuelType: "diesel",
      lastMaintenance: new Date(2024, 0, 15),
      nextMaintenance: new Date(2024, 3, 15),
      location: "Addis Ababa",
      documents: {
        insurance: { valid: true, expiry: new Date(2024, 11, 31) },
        license: { valid: true, expiry: new Date(2025, 5, 30) },
        inspection: { valid: false, expiry: new Date(2024, 2, 15) }
      }
    },
    {
      id: "2", 
      plateNumber: "ET-AA-5678",
      make: "Mitsubishi",
      model: "Canter",
      year: 2019,
      type: "small-truck",
      capacity: "2 tons", 
      status: "maintenance",
      fuelType: "diesel",
      lastMaintenance: new Date(2024, 1, 10),
      nextMaintenance: new Date(2024, 4, 10),
      location: "Bahir Dar",
      documents: {
        insurance: { valid: true, expiry: new Date(2024, 8, 30) },
        license: { valid: true, expiry: new Date(2024, 10, 15) },
        inspection: { valid: true, expiry: new Date(2024, 7, 20) }
      }
    }
  ]);

  const [activeTab, setActiveTab] = useState("fleet");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "maintenance": return "bg-warning text-warning-foreground";
      case "inactive": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    return <Truck className="h-4 w-4" />;
  };

  const getVehicleTypeLabel = (type: string) => {
    switch (type) {
      case "small-truck": return "Small Truck";
      case "medium-truck": return "Medium Truck"; 
      case "large-truck": return "Large Truck";
      case "pickup": return "Pickup";
      default: return "Unknown";
    }
  };

  const isMaintenanceDue = (nextMaintenance: Date) => {
    const today = new Date();
    const daysUntil = Math.ceil((nextMaintenance.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30;
  };

  const hasExpiredDocuments = (vehicle: Vehicle) => {
    const today = new Date();
    return Object.values(vehicle.documents).some(doc => !doc.valid || doc.expiry < today);
  };

  const handleAddVehicle = () => {
    setShowAddForm(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowAddForm(true);
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    setVehicles(prev => prev.filter(v => v.id !== vehicleId));
    toast.success("Vehicle deleted successfully");
  };

  const handleScheduleMaintenance = (vehicleId: string) => {
    toast.success("Maintenance scheduled successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vehicle Management</h2>
        <Button onClick={handleAddVehicle}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("fleet")}
            className={`py-2 border-b-2 font-medium text-sm ${
              activeTab === "fleet"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Fleet Overview
          </button>
          <button
            onClick={() => setActiveTab("maintenance")}
            className={`py-2 border-b-2 font-medium text-sm ${
              activeTab === "maintenance"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Maintenance
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`py-2 border-b-2 font-medium text-sm ${
              activeTab === "documents"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Documents
          </button>
        </nav>
      </div>

      {activeTab === "fleet" && (
        <div className="space-y-6">
          {/* Fleet Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Vehicles</p>
                    <p className="text-xl font-bold">{vehicles.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div>
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-xl font-bold">{vehicles.filter(v => v.status === "active").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Wrench className="h-5 w-5 text-warning" />
                  <div>
                    <p className="text-sm text-muted-foreground">In Maintenance</p>
                    <p className="text-xl font-bold">{vehicles.filter(v => v.status === "maintenance").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="text-sm text-muted-foreground">Needs Attention</p>
                    <p className="text-xl font-bold">
                      {vehicles.filter(v => isMaintenanceDue(v.nextMaintenance) || hasExpiredDocuments(v)).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vehicle List */}
          <div className="grid gap-4">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-medium transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        {getTypeIcon(vehicle.type)}
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{vehicle.plateNumber}</h3>
                          <Badge className={getStatusColor(vehicle.status)}>
                            {vehicle.status.toUpperCase()}
                          </Badge>
                          {isMaintenanceDue(vehicle.nextMaintenance) && (
                            <Badge className="bg-warning text-warning-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              Maintenance Due
                            </Badge>
                          )}
                          {hasExpiredDocuments(vehicle) && (
                            <Badge className="bg-destructive text-destructive-foreground">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Documents Expired
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Vehicle</p>
                            <p className="font-medium">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Type & Capacity</p>
                            <p className="font-medium">{getVehicleTypeLabel(vehicle.type)} - {vehicle.capacity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Location</p>
                            <p className="font-medium flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {vehicle.location}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Fuel Type</p>
                            <p className="font-medium flex items-center">
                              <Fuel className="h-3 w-3 mr-1" />
                              {vehicle.fuelType}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditVehicle(vehicle)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleScheduleMaintenance(vehicle.id)}
                      >
                        <Wrench className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "maintenance" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded ${isMaintenanceDue(vehicle.nextMaintenance) ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>
                        <Wrench className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{vehicle.plateNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          Last: {vehicle.lastMaintenance.toLocaleDateString()} | 
                          Next: {vehicle.nextMaintenance.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isMaintenanceDue(vehicle.nextMaintenance) && (
                        <Badge className="bg-warning text-warning-foreground">
                          Due Soon
                        </Badge>
                      )}
                      <Button variant="outline" size="sm">
                        Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{vehicle.plateNumber}</h4>
                      {hasExpiredDocuments(vehicle) && (
                        <Badge className="bg-destructive text-destructive-foreground">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Action Required
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Insurance</span>
                        <Badge className={vehicle.documents.insurance.valid ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
                          {vehicle.documents.insurance.valid ? "Valid" : "Expired"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>License</span>
                        <Badge className={vehicle.documents.license.valid ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
                          {vehicle.documents.license.valid ? "Valid" : "Expired"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Inspection</span>
                        <Badge className={vehicle.documents.inspection.valid ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
                          {vehicle.documents.inspection.valid ? "Valid" : "Expired"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add/Edit Vehicle Form */}
      {showAddForm && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>{selectedVehicle ? "Edit Vehicle" : "Add New Vehicle"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plateNumber">Plate Number</Label>
                <Input 
                  id="plateNumber" 
                  placeholder="ET-AA-1234"
                  defaultValue={selectedVehicle?.plateNumber}
                />
              </div>
              <div>
                <Label htmlFor="make">Make</Label>
                <Input 
                  id="make" 
                  placeholder="Isuzu"
                  defaultValue={selectedVehicle?.make}
                />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input 
                  id="model" 
                  placeholder="NPR"
                  defaultValue={selectedVehicle?.model}
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input 
                  id="year" 
                  type="number"
                  placeholder="2020"
                  defaultValue={selectedVehicle?.year}
                />
              </div>
              <div>
                <Label htmlFor="type">Vehicle Type</Label>
                <Select defaultValue={selectedVehicle?.type}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Pickup</SelectItem>
                    <SelectItem value="small-truck">Small Truck</SelectItem>
                    <SelectItem value="medium-truck">Medium Truck</SelectItem>
                    <SelectItem value="large-truck">Large Truck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input 
                  id="capacity" 
                  placeholder="3.5 tons"
                  defaultValue={selectedVehicle?.capacity}
                />
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedVehicle(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  toast.success(selectedVehicle ? "Vehicle updated successfully" : "Vehicle added successfully");
                  setShowAddForm(false);
                  setSelectedVehicle(null);
                }}
              >
                {selectedVehicle ? "Update" : "Add"} Vehicle
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VehicleManagement;