import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Truck, 
  Package, 
  DollarSign,
  MapPin,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  Activity
} from "lucide-react";

interface AnalyticsDashboardProps {
  userType: "shipper" | "driver" | "admin";
}

const AnalyticsDashboard = ({ userType }: AnalyticsDashboardProps) => {
  // Sample data for different user types
  const getMetrics = () => {
    switch (userType) {
      case "shipper":
        return {
          primary: [
            { title: "Total Shipments", value: "47", change: "+12%", icon: <Package className="h-5 w-5" />, positive: true },
            { title: "Active Deliveries", value: "3", change: "+1", icon: <Truck className="h-5 w-5" />, positive: true },
            { title: "Total Spent", value: "245,800 ETB", change: "+8%", icon: <DollarSign className="h-5 w-5" />, positive: false },
            { title: "On-Time Delivery", value: "94%", change: "+2%", icon: <Clock className="h-5 w-5" />, positive: true }
          ],
          secondary: [
            { title: "Favorite Drivers", value: "8", description: "Trusted partners" },
            { title: "Average Rating", value: "4.7", description: "Driver satisfaction" },
            { title: "Routes Covered", value: "12", description: "Different destinations" },
            { title: "Cost Saved", value: "15%", description: "vs traditional logistics" }
          ]
        };
      case "driver":
        return {
          primary: [
            { title: "Monthly Earnings", value: "45,300 ETB", change: "+15%", icon: <DollarSign className="h-5 w-5" />, positive: true },
            { title: "Trips Completed", value: "127", change: "+8", icon: <CheckCircle className="h-5 w-5" />, positive: true },
            { title: "Driver Rating", value: "4.8", change: "+0.2", icon: <Star className="h-5 w-5" />, positive: true },
            { title: "Active Hours", value: "156h", change: "+12h", icon: <Clock className="h-5 w-5" />, positive: true }
          ],
          secondary: [
            { title: "Fuel Efficiency", value: "12.5 km/L", description: "Average consumption" },
            { title: "Regular Customers", value: "23", description: "Repeat business" },
            { title: "Distance Covered", value: "2,450 km", description: "This month" },
            { title: "Perfect Deliveries", value: "98%", description: "No damage/delays" }
          ]
        };
      case "admin":
        return {
          primary: [
            { title: "Total Users", value: "1,247", change: "+45", icon: <Users className="h-5 w-5" />, positive: true },
            { title: "Active Shipments", value: "23", change: "-2", icon: <Package className="h-5 w-5" />, positive: false },
            { title: "Revenue", value: "485,600 ETB", change: "+18%", icon: <DollarSign className="h-5 w-5" />, positive: true },
            { title: "Platform Rating", value: "4.6", change: "+0.1", icon: <Star className="h-5 w-5" />, positive: true }
          ],
          secondary: [
            { title: "Verified Drivers", value: "89", description: "Out of 112 total" },
            { title: "Support Tickets", value: "8", description: "Open issues" },
            { title: "Cities Covered", value: "15", description: "Across Ethiopia" },
            { title: "Success Rate", value: "96%", description: "Successful deliveries" }
          ]
        };
    }
  };

  const metrics = getMetrics();
  
  const recentActivity = {
    shipper: [
      { icon: <Package className="h-4 w-4 text-primary" />, title: "New shipment FW-048 created", time: "5 min ago", status: "info" },
      { icon: <CheckCircle className="h-4 w-4 text-success" />, title: "FW-045 delivered successfully", time: "1 hour ago", status: "success" },
      { icon: <Star className="h-4 w-4 text-warning" />, title: "Driver Alemayehu rated 5 stars", time: "3 hours ago", status: "info" },
      { icon: <DollarSign className="h-4 w-4 text-accent" />, title: "Payment of 15,400 ETB processed", time: "5 hours ago", status: "success" }
    ],
    driver: [
      { icon: <CheckCircle className="h-4 w-4 text-success" />, title: "Trip FW-001 completed successfully", time: "2 hours ago", status: "success" },
      { icon: <Package className="h-4 w-4 text-primary" />, title: "New load offer received from HealthCorp", time: "4 hours ago", status: "info" },
      { icon: <Star className="h-4 w-4 text-warning" />, title: "Received 5-star rating from customer", time: "6 hours ago", status: "success" },
      { icon: <DollarSign className="h-4 w-4 text-accent" />, title: "Earnings updated: +15,400 ETB", time: "8 hours ago", status: "success" }
    ],
    admin: [
      { icon: <Users className="h-4 w-4 text-primary" />, title: "New driver registration: Bekele T.", time: "10 min ago", status: "info" },
      { icon: <AlertTriangle className="h-4 w-4 text-destructive" />, title: "System alert: High traffic detected", time: "30 min ago", status: "warning" },
      { icon: <CheckCircle className="h-4 w-4 text-success" />, title: "Payment dispute resolved", time: "1 hour ago", status: "success" },
      { icon: <Star className="h-4 w-4 text-warning" />, title: "Platform rating improved to 4.6", time: "2 hours ago", status: "success" }
    ]
  };

  const activity = recentActivity[userType];

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.primary.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className={`flex items-center space-x-1 text-sm mt-1 ${
                      metric.positive ? "text-success" : "text-destructive"
                    }`}>
                      {metric.positive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <div className="text-muted-foreground">
                    {metric.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Performance Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Performance Chart Visualization</p>
              <p className="text-sm text-muted-foreground">
                {userType === "shipper" && "Shipment volume and cost trends"}
                {userType === "driver" && "Earnings and trip completion trends"}  
                {userType === "admin" && "Platform growth and user engagement"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Secondary Metrics */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {metrics.secondary.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{metric.value}</p>
                    <p className="text-sm font-medium">{metric.title}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {activity.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      item.status === "success" ? "bg-success/10" :
                      item.status === "warning" ? "bg-warning/10" :
                      "bg-primary/10"
                    }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions based on user type */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {userType === "shipper" && (
              <>
                <Button variant="outline" size="sm">Export Shipment Data</Button>
                <Button variant="outline" size="sm">Download Invoices</Button>
                <Button variant="outline" size="sm">Performance Report</Button>
              </>
            )}
            {userType === "driver" && (
              <>
                <Button variant="outline" size="sm">Download Earnings Report</Button>
                <Button variant="outline" size="sm">Trip Summary</Button>
                <Button variant="outline" size="sm">Tax Documents</Button>
              </>
            )}
            {userType === "admin" && (
              <>
                <Button variant="outline" size="sm">Generate Platform Report</Button>
                <Button variant="outline" size="sm">User Analytics</Button>
                <Button variant="outline" size="sm">Financial Dashboard</Button>
                <Button variant="outline" size="sm">System Health Check</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;