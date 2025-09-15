import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Import all feature components
import ShipmentForm from "./ShipmentForm";
import DriverQuotes from "./DriverQuotes";
import ShipmentStatus from "./ShipmentStatus";
import PaymentSystem from "./PaymentSystem";
import MessagingSystem from "./MessagingSystem";
import RealTimeMap from "./RealTimeMap";
import QuickActions from "./QuickActions";
import AnalyticsDashboard from "./AnalyticsDashboard";
import VehicleManagement from "./VehicleManagement";
import LiveTracking from "./LiveTracking";
import NotificationSystem from "./NotificationSystem";

import { 
  Package, 
  Truck, 
  Shield, 
  MapPin, 
  DollarSign,
  MessageSquare,
  BarChart3,
  Users,
  Clock,
  Star,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle,
  Navigation,
  Zap,
  Settings,
  Filter,
  Calendar,
  Eye
} from "lucide-react";

interface UnifiedDashboardProps {
  userType: "shipper" | "driver" | "admin";
}

const UnifiedDashboard = ({ userType }: UnifiedDashboardProps) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [currentShipmentId, setCurrentShipmentId] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState<{shipmentId: string, amount: number} | null>(null);
  const [liveStats, setLiveStats] = useState({
    totalShipments: userType === 'admin' ? 1247 : userType === 'driver' ? 89 : 23,
    activeShipments: userType === 'admin' ? 324 : userType === 'driver' ? 3 : 7,
    completedToday: userType === 'admin' ? 156 : userType === 'driver' ? 2 : 1,
    totalEarnings: userType === 'admin' ? 2850000 : userType === 'driver' ? 45000 : 12000,
    avgRating: userType === 'admin' ? 4.8 : userType === 'driver' ? 4.7 : 4.9,
    responseTime: userType === 'admin' ? "2.3min" : userType === 'driver' ? "1.8min" : "5.2min"
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeShipments: prev.activeShipments + Math.floor(Math.random() * 2),
        completedToday: prev.completedToday + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getUserSpecificTabs = () => {
    const baseTabs = [
      { id: "overview", label: "Overview", icon: BarChart3 },
      { id: "shipments", label: "Shipments", icon: Package },
      { id: "tracking", label: "Live Tracking", icon: Navigation },
      { id: "messages", label: "Messages", icon: MessageSquare },
      { id: "payments", label: "Payments", icon: DollarSign }
    ];

    if (userType === "shipper") {
      return [
        ...baseTabs,
        { id: "post-load", label: "Post Load", icon: Package },
        { id: "find-drivers", label: "Find Drivers", icon: Users }
      ];
    } else if (userType === "driver") {
      return [
        ...baseTabs,
        { id: "available-loads", label: "Available Loads", icon: Truck },
        { id: "earnings", label: "Earnings", icon: DollarSign },
        { id: "vehicle", label: "My Vehicle", icon: Settings }
      ];
    } else {
      return [
        ...baseTabs,
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "users", label: "User Management", icon: Users },
        { id: "vehicles", label: "Fleet Management", icon: Truck },
        { id: "system", label: "System Health", icon: Activity }
      ];
    }
  };

  const getStatsCards = () => {
    if (userType === "shipper") {
      return [
        { 
          title: "Active Shipments", 
          value: liveStats.activeShipments, 
          icon: Package, 
          color: "text-primary",
          bgColor: "bg-primary/10",
          change: "+2 today",
          progress: 75
        },
        { 
          title: "Total Spent", 
          value: `ETB ${liveStats.totalEarnings.toLocaleString()}`, 
          icon: DollarSign, 
          color: "text-success",
          bgColor: "bg-success/10",
          change: "+12% this month",
          progress: 60
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
          value: liveStats.responseTime, 
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
          value: liveStats.activeShipments, 
          icon: Truck, 
          color: "text-accent",
          bgColor: "bg-accent/10",
          change: "+1 new",
          progress: 45
        },
        { 
          title: "Monthly Earnings", 
          value: `ETB ${liveStats.totalEarnings.toLocaleString()}`, 
          icon: DollarSign, 
          color: "text-success",
          bgColor: "bg-success/10",
          change: "+18% vs last month",
          progress: 78
        },
        { 
          title: "Driver Rating", 
          value: liveStats.avgRating, 
          icon: Star, 
          color: "text-warning",
          bgColor: "bg-warning/10",
          change: "Excellent",
          progress: 95
        },
        { 
          title: "Completed Today", 
          value: liveStats.completedToday, 
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
          value: `ETB ${(liveStats.totalEarnings * 100).toLocaleString()}`, 
          icon: DollarSign, 
          color: "text-success",
          bgColor: "bg-success/10",
          change: "+23% this quarter",
          progress: 91
        },
        { 
          title: "Active Shipments", 
          value: liveStats.totalShipments, 
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

  const tabs = getUserSpecificTabs();
  const statsCards = getStatsCards();

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              {userType === "shipper" && <Package className="h-8 w-8 text-primary" />}
              {userType === "driver" && <Truck className="h-8 w-8 text-accent" />}
              {userType === "admin" && <Shield className="h-8 w-8 text-warning" />}
              {userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's your platform overview.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-success text-success-foreground">
              <Activity className="h-3 w-3 mr-1" />
              Online
            </Badge>
            <QuickActions userType={userType} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {statsCards.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
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

      {/* Main Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 mb-6">
          {tabs.slice(0, 8).map((tab) => (
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
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Real-time Activity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Real-time Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <RealTimeMap />
                </div>
              </CardContent>
            </Card>

            {/* Notifications & Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  Live Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NotificationSystem userType={userType} />
              </CardContent>
            </Card>
          </div>

          {/* Analytics Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-success" />
                  Performance Analytics
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsDashboard userType={userType} />
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
                onTrackLive={() => {
                  setActiveSection("tracking");
                  setCurrentShipmentId("FW-001");
                }}
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
                Live Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <LiveTracking shipmentId={currentShipmentId || "FW-001"} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                Communications
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
              {showPayment ? (
                <PaymentSystem 
                  amount={showPayment.amount}
                  shipmentId={showPayment.shipmentId}
                  onPaymentComplete={() => setShowPayment(null)}
                />
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No pending payments</p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setShowPayment({shipmentId: "DEMO-001", amount: 2500})}
                  >
                    Demo Payment Flow
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
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

            <TabsContent value="find-drivers">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    Available Drivers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DriverQuotes 
                    shipmentId="DEMO-001"
                    onSelectDriver={(quote) => {
                      console.log("Selected driver:", quote);
                      setActiveSection("shipments");
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}

        {userType === "admin" && (
          <>
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Advanced Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsDashboard userType="admin" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vehicles">
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
          </>
        )}
      </Tabs>
    </div>
  );
};

export default UnifiedDashboard;