import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  Truck,
  Clock,
  Star,
  Users,
  MapPin,
  Zap,
  Target,
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    growth: number;
    target: number;
  };
  shipments: {
    total: number;
    completed: number;
    inProgress: number;
    cancelled: number;
  };
  performance: {
    onTimeDelivery: number;
    customerSatisfaction: number;
    driverUtilization: number;
    avgResponseTime: number;
  };
  trends: {
    dailyShipments: number[];
    weeklyRevenue: number[];
    monthlyGrowth: number[];
  };
}

interface AdvancedAnalyticsProps {
  userType: "shipper" | "driver" | "admin";
  timeRange?: "7d" | "30d" | "90d" | "1y";
}

const AdvancedAnalytics = ({ userType, timeRange = "30d" }: AdvancedAnalyticsProps) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState("overview");

  useEffect(() => {
    loadAnalyticsData();
  }, [userType, timeRange]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockData: AnalyticsData = {
        revenue: {
          current: userType === "admin" ? 2850000 : userType === "driver" ? 45000 : 125000,
          previous: userType === "admin" ? 2400000 : userType === "driver" ? 38000 : 115000,
          growth: userType === "admin" ? 18.8 : userType === "driver" ? 18.4 : 8.7,
          target: userType === "admin" ? 3000000 : userType === "driver" ? 50000 : 140000
        },
        shipments: {
          total: userType === "admin" ? 1247 : userType === "driver" ? 89 : 23,
          completed: userType === "admin" ? 1156 : userType === "driver" ? 85 : 21,
          inProgress: userType === "admin" ? 78 : userType === "driver" ? 3 : 2,
          cancelled: userType === "admin" ? 13 : userType === "driver" ? 1 : 0
        },
        performance: {
          onTimeDelivery: userType === "admin" ? 96.2 : userType === "driver" ? 98.8 : 94.5,
          customerSatisfaction: userType === "admin" ? 4.7 : userType === "driver" ? 4.9 : 4.8,
          driverUtilization: userType === "admin" ? 78.5 : userType === "driver" ? 85.2 : 0,
          avgResponseTime: userType === "admin" ? 2.3 : userType === "driver" ? 1.8 : 5.2
        },
        trends: {
          dailyShipments: Array.from({length: 7}, () => Math.floor(Math.random() * 50) + 20),
          weeklyRevenue: Array.from({length: 4}, () => Math.floor(Math.random() * 100000) + 50000),
          monthlyGrowth: Array.from({length: 12}, () => Math.floor(Math.random() * 30) + 5)
        }
      };
      
      setData(mockData);
      setIsLoading(false);
    }, 1500);
  };

  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 animate-pulse" />
            <span>Loading Analytics...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={65} className="h-2" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({length: 4}).map((_, i) => (
                <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getMetricCards = () => {
    const baseCards = [
      {
        title: "Revenue",
        value: `${(data.revenue.current / 1000).toFixed(0)}K ETB`,
        change: `+${data.revenue.growth}%`,
        icon: DollarSign,
        color: "text-success",
        bgColor: "bg-success/10",
        progress: (data.revenue.current / data.revenue.target) * 100
      },
      {
        title: "Shipments",
        value: data.shipments.total.toString(),
        change: `${data.shipments.completed} completed`,
        icon: Package,
        color: "text-primary",
        bgColor: "bg-primary/10",
        progress: (data.shipments.completed / data.shipments.total) * 100
      },
      {
        title: "On-Time Delivery",
        value: `${data.performance.onTimeDelivery}%`,
        change: "Above target",
        icon: Clock,
        color: "text-accent",
        bgColor: "bg-accent/10",
        progress: data.performance.onTimeDelivery
      },
      {
        title: "Satisfaction",
        value: data.performance.customerSatisfaction.toString(),
        change: "Excellent",
        icon: Star,
        color: "text-warning",
        bgColor: "bg-warning/10",
        progress: (data.performance.customerSatisfaction / 5) * 100
      }
    ];

    if (userType === "driver") {
      baseCards[0].title = "Monthly Earnings";
      baseCards[1].title = "Trips Completed";
      baseCards[2].title = "Delivery Rate";
      baseCards[3].title = "Driver Rating";
    }

    return baseCards;
  };

  const metricCards = getMetricCards();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Advanced Analytics</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            Last updated: {new Date().toLocaleTimeString()}
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {metric.title}
                  </p>
                  <p className="text-xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.change}</p>
                </div>
                <div className={`w-10 h-10 rounded-full ${metric.bgColor} flex items-center justify-center`}>
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
              </div>
              <Progress value={metric.progress} className="h-1.5" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs value={activeMetric} onValueChange={setActiveMetric}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-success" />
                  <span>Revenue Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Revenue Chart</p>
                    <p className="text-xs text-muted-foreground">
                      {data.revenue.growth > 0 ? "↗" : "↘"} {data.revenue.growth}% growth
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipment Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-primary" />
                  <span>Shipment Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full"
                          style={{ width: `${(data.shipments.completed / data.shipments.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{data.shipments.completed}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Progress</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full"
                          style={{ width: `${(data.shipments.inProgress / data.shipments.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{data.shipments.inProgress}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cancelled</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-destructive h-2 rounded-full"
                          style={{ width: `${(data.shipments.cancelled / data.shipments.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{data.shipments.cancelled}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold">{data.performance.onTimeDelivery}%</p>
                <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                <Progress value={data.performance.onTimeDelivery} className="mt-2 h-1" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold">{data.performance.customerSatisfaction}</p>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
                <Progress value={(data.performance.customerSatisfaction / 5) * 100} className="mt-2 h-1" />
              </CardContent>
            </Card>
            
            {userType === "admin" && (
              <Card>
                <CardContent className="p-4 text-center">
                  <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{data.performance.driverUtilization}%</p>
                  <p className="text-sm text-muted-foreground">Driver Utilization</p>
                  <Progress value={data.performance.driverUtilization} className="mt-2 h-1" />
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold">{data.performance.avgResponseTime}min</p>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <Progress value={Math.max(0, 100 - (data.performance.avgResponseTime * 10))} className="mt-2 h-1" />
              </CardContent>
            </Card>
          </div>

          {/* Performance Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="h-8 w-8 text-success" />
                    </div>
                    <h4 className="font-semibold">Delivery Excellence</h4>
                    <p className="text-2xl font-bold text-success">{data.performance.onTimeDelivery}%</p>
                    <p className="text-xs text-muted-foreground">On-time delivery rate</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="h-8 w-8 text-warning" />
                    </div>
                    <h4 className="font-semibold">Customer Happiness</h4>
                    <p className="text-2xl font-bold text-warning">{data.performance.customerSatisfaction}/5</p>
                    <p className="text-xs text-muted-foreground">Average rating</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Activity className="h-8 w-8 text-accent" />
                    </div>
                    <h4 className="font-semibold">Response Speed</h4>
                    <p className="text-2xl font-bold text-accent">{data.performance.avgResponseTime}min</p>
                    <p className="text-xs text-muted-foreground">Average response time</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-success mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Daily Trends Chart</p>
                    <p className="text-xs text-muted-foreground">
                      Avg: {Math.round(data.trends.dailyShipments.reduce((a, b) => a + b, 0) / data.trends.dailyShipments.length)} shipments/day
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Trajectory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Growth Chart</p>
                    <p className="text-xs text-muted-foreground">
                      Monthly growth: +{data.revenue.growth}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>AI-Powered Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <h4 className="font-medium text-success">Performance Excellent</h4>
                        <p className="text-sm text-muted-foreground">
                          Your delivery performance is 12% above platform average. Keep up the great work!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-warning mt-0.5" />
                      <div>
                        <h4 className="font-medium text-warning">Peak Hours Opportunity</h4>
                        <p className="text-sm text-muted-foreground">
                          Consider scheduling more deliveries between 2-4 PM for 15% higher earnings.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-medium text-accent">Route Optimization</h4>
                        <p className="text-sm text-muted-foreground">
                          Using our AI route optimizer could save you an average of 850 ETB per trip.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Optimize Delivery Times</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Schedule deliveries during off-peak hours to reduce costs by up to 20%.
                    </p>
                    <Button size="sm" variant="outline">
                      View Schedule
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Expand Service Area</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      High demand detected in Bahir Dar region. Consider expanding operations.
                    </p>
                    <Button size="sm" variant="outline">
                      Explore Markets
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;