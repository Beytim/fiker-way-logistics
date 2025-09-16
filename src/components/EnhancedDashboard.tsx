import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Import all enhanced components
import EnhancedHeader from "./EnhancedHeader";
import SmartRouteOptimizer from "./SmartRouteOptimizer";
import AdvancedAnalytics from "./AdvancedAnalytics";
import CustomerSupport from "./CustomerSupport";
import ShipmentForm from "./ShipmentForm";
import DriverQuotes from "./DriverQuotes";
import ShipmentStatus from "./ShipmentStatus";
import PaymentSystem from "./PaymentSystem";
import MessagingSystem from "./MessagingSystem";
import RealTimeMap from "./RealTimeMap";
import QuickActions from "./QuickActions";
import VehicleManagement from "./VehicleManagement";
import LiveTracking from "./LiveTracking";
import NotificationSystem from "./NotificationSystem";

import { 
  Package, 
  Truck, 
  Shield, 
  BarChart3,
  MessageSquare,
  DollarSign,
  Navigation,
  Settings,
  Users,
  Activity,
  Star,
  Clock,
  CheckCircle,
  TrendingUp,
  Zap,
  Target,
  MapPin,
  Phone,
  AlertTriangle,
  Calendar,
  FileText,
  Headphones
} from "lucide-react";

interface EnhancedDashboardProps {
  userType: "shipper" | "driver" | "admin";
  userName?: string;
  userRating?: number;
}

const EnhancedDashboard = ({ 
  userType, 
  userName = "Demo User",
  userRating = 4.8 
}: EnhancedDashboardProps) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [liveMetrics, setLiveMetrics] = useState({
    activeShipments: userType === 'admin' ? 1247 : userType === 'driver' ? 3 : 7,
    totalEarnings: userType === 'admin' ? 2850000 : userType === 'driver' ? 45000 : 125000,
    completedToday: userType === 'admin' ? 156 : userType === 'driver' ? 2 : 1,
    avgRating: userType === 'admin' ? 4.8 : userType === 'driver' ? 4.9 : 4.7,
    responseTime: userType === 'admin' ? 2.3 : userType === 'driver' ? 1.8 : 5.2,
    onlineDrivers: userType === 'admin' ? 892 : 0
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: "1",
      type: "shipment",
      title: "New shipment FW-048 created",
      description: "Electronics from Addis Ababa to Dire Dawa",
      timestamp: new Date(Date.now() - 300000),
      status: "info",
      icon: Package
    },
    {
      id: "2",
      type: "delivery",
      title: "FW-045 delivered successfully",
      description: "Customer rated 5 stars",
      timestamp: new Date(Date.now() - 1800000),
      status: "success",
      icon: CheckCircle
    },
    {
      id: "3",
      type: "payment",
      title: "Payment processed",
      description: "15,400 ETB via Telebirr",
      timestamp: new Date(Date.now() - 3600000),
      status: "success",
      icon: DollarSign
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        activeShipments: prev.activeShipments + Math.floor(Math.random() * 2),
        completedToday: prev.completedToday + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getDashboardTabs = () => {
    const baseTabs = [
      { id: "overview", label: "Overview", icon: BarChart3 },
      { id: "shipments", label: "Shipments", icon: Package },
      { id: "tracking", label: "Live Tracking", icon: Navigation },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "messages", label: "Messages", icon: MessageSquare },
      { id: "payments", label: "Payments", icon: DollarSign },
      { id: "support", label: "Support", icon: Headphones }
    ];

    if (userType === "shipper") {
      return [
        ...baseTabs,
        { id: "post-load", label: "Post Load", icon: Package },
        { id: "route-optimizer", label: "Route Optimizer", icon: Navigation }
      ];
    } else if (userType === "driver") {
      return [
        ...baseTabs,
        { id: "available-loads", label: "Available Loads", icon: Truck },
        { id: "vehicle", label: "My Vehicle", icon: Settings },
        { id: "earnings", label: "Earnings", icon: DollarSign }
      ];
    } else {
      return [
        ...baseTabs,
        { id: "users", label: "User Management", icon: Users },
        { id: "fleet", label: "Fleet Management", icon: Truck },
        { id: "system", label: "System Health", icon: Activity }
      ];
    }
  };

  const getQuickStats = () => {
    if (userType === "shipper") {
      return [
        { 
          title: "Active Shipments", 
          value: liveMetrics.activeShipments, 
          icon: Package, 
          color: "text-primary",
          bgColor: "bg-primary/10",
          change: "+2 today",
          progress: 75
        },
        { 
          title: "Total Spent", 
          value: `${(liveMetrics.totalEarnings / 1000).toFixed(0)}K ETB`, 
          icon: DollarSign, 
          color: "text-success",
          bgColor: "bg-success/10",
          change: "+12% this month",
          progress: 68
        },
        { 
          title: "Delivery Success", 
          value: "98.5%", 
          icon: CheckCircle, 
          color: "text-success",
          bgColor: "bg-success/10",
          change: "Above average",
          progress: 98
        },
        { 
          title: "Avg Response", 
          value: `${liveMetrics.responseTime}min`, 
          icon: Clock, 
          color: "text-accent",
          bgColor: "bg-accent/10",
          change: "30% faster",
          progress: 85
        }
      ];
    } else if (userType === "driver") {
      return [
        { 
          title: "Active Trips", 
          value: liveMetrics.activeShipments, 
          icon: Truck, 
          color: "text-accent",
          bgColor: "bg-accent/10",
          change: "+1 new",
          progress: 45
        },
        { 
          title: "Monthly Earnings", 
          value: `${(liveMetrics.totalEarnings / 1000).toFixed(0)}K ETB`, 
          icon: DollarSign, 
          color: "text-success",
          bgColor: "bg-success/10",
          change: "+18% vs last month",
          progress: 78
        },
        { 
          title: "Driver Rating", 
          value: liveMetrics.avgRating, 
          icon: Star, 
          color: "text-warning",
          bgColor: "bg-warning/10",
          change: "Excellent",
          progress: 95
        },
        { 
          title: "Completed Today", 
          value: liveMetrics.completedToday, 
          icon: CheckCircle, 
          color: "text-success",
          bgColor: "bg-success/10",
          change: "On track",
          progress: 67
        }
      ];
    } else {
      return [
        { 
          title: "Platform Users", 
          value: "12,847", 
          icon: Users, 
          color: "text-primary",
          bgColor: "bg-primary/10",
          change: "+5.2% growth",
          progress: 82
        },
        { 
          title: "Total Revenue", 
          value: `${(liveMetrics.totalEarnings / 1000).toFixed(0)}K ETB`, 
          icon: DollarSign, 
          color: "text-success",
          bgColor: "bg-success/10",
          change: "+23% this quarter",
          progress: 91
        },
        { 
          title: "Active Shipments", 
          value: liveMetrics.activeShipments, 
          icon: Package, 
          color: "text-accent",
          bgColor: "bg-accent/10",
          change: "Peak hours",
          progress: 76
        },
        { 
          title: "System Uptime", 
          value: "99.8%", 
          icon: Activity, 
          color: "text-success",
          bgColor: "bg-success/10",
          change: "Excellent",
          progress: 99
        }
      ];
    }
  };

  const tabs = getDashboardTabs();
  const quickStats = getQuickStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <EnhancedHeader 
        userType={userType}
        userName={userName}
        userRating={userRating}
        unreadNotifications={3}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                {userType === "shipper" && <Package className="h-8 w-8 text-primary" />}
                {userType === "driver" && <Truck className="h-8 w-8 text-accent" />}
                {userType === "admin" && <Shield className="h-8 w-8 text-warning" />}
                Enhanced {userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {userName}! Here's your comprehensive platform overview.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-success text-success-foreground">
                <Activity className="h-3 w-3 mr-1" />
                All Systems Online
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-medium transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {stat.title}
                      </p>
                      <p className="text-lg sm:text-xl font-bold">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stat.change}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Progress value={stat.progress} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 xl:grid-cols-9 mb-6">
            {tabs.slice(0, 9).map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="flex items-center gap-1 text-xs"
              >
                <tab.icon className="h-3 w-3" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Main Activity Feed */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Real-time Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`p-2 rounded-full ${
                          activity.status === "success" ? "bg-success/10 text-success" :
                          activity.status === "warning" ? "bg-warning/10 text-warning" :
                          "bg-primary/10 text-primary"
                        }`}>
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {activity.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-warning" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QuickActions userType={userType} />
                </CardContent>
              </Card>

              {/* Live Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-accent" />
                    Live Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <NotificationSystem userType={userType} />
                </CardContent>
              </Card>
            </div>

            {/* Real-time Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-success" />
                    Live Fleet Tracking
                  </div>
                  <Badge className="bg-accent text-accent-foreground">
                    {liveMetrics.activeShipments} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <RealTimeMap showAllVehicles={true} height="100%" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipments Tab */}
          <TabsContent value="shipments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Shipment Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ShipmentStatus 
                  shipmentId="FW-001"
                  onTrackLive={() => setActiveSection("tracking")}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Tracking Tab */}
          <TabsContent value="tracking">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-accent" />
                  Live Tracking Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LiveTracking shipmentId="FW-001" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Analytics Tab */}
          <TabsContent value="analytics">
            <AdvancedAnalytics userType={userType} />
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  Communications Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MessagingSystem userType={userType} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-success" />
                  Payment Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentSystem 
                  amount={2500}
                  shipmentId="DEMO-001"
                  onPaymentComplete={() => toast.success("Payment completed!")}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Support Tab */}
          <TabsContent value="support">
            <CustomerSupport userType={userType} />
          </TabsContent>

          {/* User-specific tabs */}
          {userType === "shipper" && (
            <>
              <TabsContent value="post-load">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      Post New Load
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ShipmentForm onSubmit={(data) => {
                      console.log("New shipment:", data);
                      setActiveSection("shipments");
                    }} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="route-optimizer">
                <SmartRouteOptimizer 
                  origin="Addis Ababa"
                  destination="Dire Dawa"
                  cargoWeight={2500}
                  vehicleType="Medium Truck"
                  onRouteSelect={(route) => {
                    console.log("Selected route:", route);
                    toast.success("Route optimized successfully!");
                  }}
                />
              </TabsContent>
            </>
          )}

          {userType === "admin" && (
            <>
              <TabsContent value="fleet">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-accent" />
                      Fleet Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VehicleManagement />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-success" />
                      System Health Monitor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Activity className="h-8 w-8 text-success" />
                        </div>
                        <h4 className="font-semibold">System Uptime</h4>
                        <p className="text-2xl font-bold text-success">99.8%</p>
                        <p className="text-xs text-muted-foreground">Last 30 days</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Zap className="h-8 w-8 text-accent" />
                        </div>
                        <h4 className="font-semibold">Response Time</h4>
                        <p className="text-2xl font-bold text-accent">245ms</p>
                        <p className="text-xs text-muted-foreground">Average API response</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-semibold">Active Users</h4>
                        <p className="text-2xl font-bold text-primary">2,847</p>
                        <p className="text-xs text-muted-foreground">Currently online</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedDashboard;