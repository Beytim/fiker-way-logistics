import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import ShipmentForm from "@/components/ShipmentForm";
import DriverQuotes from "@/components/DriverQuotes";
import ShipmentStatus from "@/components/ShipmentStatus";
import PaymentSystem from "@/components/PaymentSystem";
import MessagingSystem from "@/components/MessagingSystem";
import RealTimeMap from "@/components/RealTimeMap";
import QuickActions from "@/components/QuickActions";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import VehicleManagement from "@/components/VehicleManagement";
import LiveTracking from "@/components/LiveTracking";
import NotificationSystem from "@/components/NotificationSystem";
import { 
  Truck, 
  Package, 
  Shield, 
  Users, 
  MapPin, 
  Star,
  Globe,
  ChevronRight,
  Phone,
  Mail,
  Search,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  BarChart3,
  MessageSquare,
  Navigation,
  Zap,
  Target,
  Gauge
} from "lucide-react";

const Index = () => {
  const [language, setLanguage] = useState("English");
  const [trackingId, setTrackingId] = useState("");
  const [activeDemo, setActiveDemo] = useState("shipment");
  const [liveStats, setLiveStats] = useState({
    activeShipments: 1247,
    totalDrivers: 3892,
    completedDeliveries: 15674,
    citiesCovered: 47,
    avgDeliveryTime: "4.2h",
    customerSatisfaction: 4.8
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeShipments: prev.activeShipments + Math.floor(Math.random() * 3),
        completedDeliveries: prev.completedDeliveries + Math.floor(Math.random() * 2)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "English" ? "አማርኛ" : "English");
  };

  const handleQuickTrack = () => {
    if (trackingId.trim()) {
      window.location.href = `/track?id=${trackingId}`;
    }
  };

  const translations = {
    English: {
      hero: {
        title: "FikerWay",
        subtitle: "Ethiopia's Trusted Freight Network",
        description: "Connect shippers with verified drivers across Ethiopia. Safe, reliable, and culturally adapted logistics for your business.",
        cta: "Get Started",
        trackPlaceholder: "Enter tracking ID (e.g., FW-001)",
        trackButton: "Track Shipment"
      },
      userTypes: {
        title: "Choose Your Role",
        shipper: {
          title: "I'm a Shipper",
          description: "Send goods across Ethiopia with trusted, verified drivers",
          features: ["Post cargo requests", "Real-time tracking", "Secure payments"]
        },
        driver: {
          title: "I'm a Driver",
          description: "Earn money by transporting goods with your truck",
          features: ["Accept load offers", "Flexible schedule", "Fair earnings"]
        },
        admin: {
          title: "Admin Portal",
          description: "Manage platform operations and oversee logistics",
          features: ["User management", "Analytics", "Payment oversight"]
        }
      },
      features: {
        title: "Why Choose FikerWay?",
        trust: {
          title: "Community Trust",
          description: "Verified drivers with ratings and community endorsements"
        },
        offline: {
          title: "Works Offline",
          description: "Access core features even with poor connectivity"
        },
        local: {
          title: "Locally Adapted",
          description: "Built for Ethiopian logistics with cultural understanding"
        },
        secure: {
          title: "Secure Payments",
          description: "Multiple payment options including Telebirr and cash"
        }
      }
    },
    አማርኛ: {
      hero: {
        title: "ፍከርዋይ",
        subtitle: "የኢትዮጵያ የተመከረ የጭነት መረብ",
        description: "በኢትዮጵያ ውስጥ አስተማማኝ ሾፌሮች ጋር ጭነት ላኪዎችን ያገናኛል። ለንግድዎ ደህንነቱ የተጠበቀ፣ አስተማማኝ እና በባህል የተላመደ ሎጂስቲክስ።",
        cta: "ይጀምሩ",
        trackPlaceholder: "የመከታተያ መለያ ያስገቡ (ለምሳሌ፣ FW-001)",
        trackButton: "ጭነት ይከታተሉ"
      },
      userTypes: {
        title: "የእርስዎን ሚና ይምረጡ",
        shipper: {
          title: "እኔ ጭነት ላኪ ነኝ",
          description: "በኢትዮጵያ ውስጥ በተመከሩ ሾፌሮች እቃዎችን ይላኩ",
          features: ["የጭነት ጥያቄዎችን ይለጥፉ", "በተገላቢጦሽ ክትትል", "ደህንነቱ የተጠበቀ ክፍያዎች"]
        },
        driver: {
          title: "እኔ ሾፌር ነኝ",
          description: "በመኪናዎ እቃ በማጓጓዝ ገንዘብ ያግኙ",
          features: ["የጭነት ጥያቄዎችን ይቀበሉ", "ተለዋዋጭ መርሃ ግብር", "ተገቢ ገቢ"]
        },
        admin: {
          title: "የአስተዳዳሪ በር",
          description: "የመድረክ ሥራዎችን ያስተዳድሩ እና ሎጂስቲክስን ይቆጣጠሩ",
          features: ["የተጠቃሚ አስተዳደር", "ትንታኔዎች", "የክፍያ ክትትል"]
        }
      },
      features: {
        title: "ለምን ፍከርዋይን ይመርጣሉ?",
        trust: {
          title: "የማህበረሰብ እምነት",
          description: "በደረጃና በማህበረሰብ ማረጋገጫ የተመዘገቡ ሾፌሮች"
        },
        offline: {
          title: "ከመስመር ውጭ ይሠራል",
          description: "ደካማ ግንኙነት ሲኖር እንኳ ዋና ዋና ባህሪያትን ይደርሱ"
        },
        local: {
          title: "በአካባቢ የተላመደ",
          description: "ለኢትዮጵያ ሎጂስቲክስ በባህል ግንዛቤ የተገነባ"
        },
        secure: {
          title: "ደህንነቱ የተጠበቀ ክፍያዎች",
          description: "ቴሌብርን እና ጥሬ ገንዘብን ጨምሮ ብዙ የክፍያ አማራጮች"
        }
      }
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">{t.hero.title}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span>{language}</span>
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Phone className="h-4 w-4 mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero">
          <div className="absolute inset-0 bg-primary/20" />
        </div>
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-secondary text-secondary-foreground">
              🇪🇹 Made for Ethiopia
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
              {t.hero.subtitle}
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              {t.hero.description}
            </p>
            
            {/* Quick Track and CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 max-w-md">
                <div className="flex">
                  <input
                    type="text"
                    placeholder={t.hero.trackPlaceholder}
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleQuickTrack()}
                    className="flex-1 px-4 py-3 rounded-l-lg border-0 bg-white/95 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <Button 
                    onClick={handleQuickTrack}
                    className="rounded-l-none bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button asChild size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm">
                <a href="#user-types">{t.hero.cta}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section id="user-types" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.userTypes.title}</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Shipper Card */}
            <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t.userTypes.shipper.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t.userTypes.shipper.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {t.userTypes.shipper.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full bg-primary hover:bg-primary/90">
                    <Link to="/shipper">Continue as Shipper</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Driver Card */}
            <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-accent/50">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mb-6">
                    <Truck className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t.userTypes.driver.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t.userTypes.driver.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {t.userTypes.driver.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="mt-6 w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <Link to="/driver">Continue as Driver</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admin Card */}
            <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-warning/50">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mb-6">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t.userTypes.admin.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t.userTypes.admin.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {t.userTypes.admin.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-warning rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="mt-6 w-full border-warning text-warning hover:bg-warning hover:text-warning-foreground">
                    <Link to="/admin">Admin Access</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Platform Statistics */}
      <section className="py-16 bg-gradient-primary">
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <Activity className="h-4 w-4 mr-2" />
              Live Platform Stats
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">Real-Time Operations</h2>
            <p className="text-white/90 text-lg">Watch FikerWay in action across Ethiopia</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {liveStats.activeShipments.toLocaleString()}
              </div>
              <div className="text-white/80 text-sm">Active Shipments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {liveStats.totalDrivers.toLocaleString()}
              </div>
              <div className="text-white/80 text-sm">Verified Drivers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {liveStats.completedDeliveries.toLocaleString()}
              </div>
              <div className="text-white/80 text-sm">Deliveries Done</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {liveStats.citiesCovered}
              </div>
              <div className="text-white/80 text-sm">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {liveStats.avgDeliveryTime}
              </div>
              <div className="text-white/80 text-sm">Avg Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center justify-center">
                <Star className="h-5 w-5 mr-1" />
                {liveStats.customerSatisfaction}
              </div>
              <div className="text-white/80 text-sm">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Demo Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Experience the Platform</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore all the powerful features that make FikerWay Ethiopia's leading logistics platform
            </p>
          </div>

          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
              <TabsTrigger value="shipment" className="text-xs">Ship Load</TabsTrigger>
              <TabsTrigger value="tracking" className="text-xs">Live Track</TabsTrigger>
              <TabsTrigger value="quotes" className="text-xs">Get Quotes</TabsTrigger>
              <TabsTrigger value="payment" className="text-xs">Pay Secure</TabsTrigger>
              <TabsTrigger value="messaging" className="text-xs">Chat</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
              <TabsTrigger value="vehicles" className="text-xs">Fleet</TabsTrigger>
              <TabsTrigger value="map" className="text-xs">Map View</TabsTrigger>
            </TabsList>

            <div className="max-w-6xl mx-auto">
              <TabsContent value="shipment">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Package className="h-5 w-5 text-primary" />
                      <CardTitle>Ship Your Load</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ShipmentForm onSubmit={(data) => {
                      console.log("Demo shipment:", data);
                      setActiveDemo("quotes");
                    }} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tracking">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-5 w-5 text-accent" />
                      <CardTitle>Live Tracking</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <LiveTracking shipmentId="FW-001" />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quotes">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-success" />
                      <CardTitle>Driver Quotes</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DriverQuotes 
                      shipmentId="DEMO-001" 
                      onSelectDriver={(quote) => {
                        console.log("Selected driver:", quote);
                        setActiveDemo("payment");
                      }} 
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-warning" />
                      <CardTitle>Secure Payment</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <PaymentSystem 
                      amount={2500} 
                      shipmentId="DEMO-001"
                      onPaymentComplete={() => {
                        console.log("Payment completed");
                        setActiveDemo("messaging");
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messaging">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-accent" />
                      <CardTitle>Real-time Communication</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <MessagingSystem 
                      userType="shipper" 
                      currentShipmentId="DEMO-001"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <CardTitle>Business Analytics</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <AnalyticsDashboard userType="admin" />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vehicles">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-accent" />
                      <CardTitle>Fleet Management</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <VehicleManagement />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="map">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-success" />
                      <CardTitle>Interactive Map</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <RealTimeMap />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Logistics Solution</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Instant Matching</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  AI-powered algorithm matches shippers with the most suitable drivers in seconds
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Smart route optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Real-time availability</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Capacity matching</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-trust rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Trust & Safety</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Comprehensive verification system ensures safe and reliable transport
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Driver background checks</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Vehicle inspections</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Insurance coverage</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-warm rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">End-to-End Tracking</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Complete visibility from pickup to delivery with real-time updates
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>GPS tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Status notifications</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Delivery confirmation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold">Flexible Payments</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Multiple payment options adapted for Ethiopian market
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Telebirr integration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Cash on delivery</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Bank transfers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">Real-time Communication</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Built-in messaging system for seamless coordination
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>In-app messaging</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Voice calls</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Document sharing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Gauge className="h-6 w-6 text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold">Performance Analytics</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Comprehensive insights to optimize your logistics operations
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Delivery metrics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Cost analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Performance reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions & Status Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Control Center</h2>
            <p className="text-muted-foreground text-lg">
              Quick access to all platform features and real-time status overview
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-warning" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QuickActions userType="shipper" />
                </CardContent>
              </Card>
            </div>

            {/* Live Status Cards */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-success">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Shipments</p>
                        <p className="text-2xl font-bold text-success">247</p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +12% from yesterday
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-accent">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Available Drivers</p>
                        <p className="text-2xl font-bold text-accent">892</p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <Activity className="h-3 w-3 mr-1" />
                          98% online rate
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <Truck className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-warning">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                        <p className="text-2xl font-bold text-warning">2.3 min</p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          30% faster than target
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-warning" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                        <p className="text-2xl font-bold text-primary">99.2%</p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Above industry standard
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Notification Center */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  <span>Live Notifications</span>
                  <Badge className="ml-auto bg-accent text-accent-foreground">3 New</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-md">
                  <NotificationSystem userType="admin" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.features.title}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors">
                <Users className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{t.features.trust.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.features.trust.description}</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{t.features.offline.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.features.offline.description}</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{t.features.local.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.features.local.description}</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-warning/20 transition-colors">
                <Shield className="h-8 w-8 text-warning" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{t.features.secure.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.features.secure.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Truck className="h-6 w-6 text-secondary" />
              <span className="text-lg font-semibold">{t.hero.title}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <a href="mailto:info@fikerway.com" className="flex items-center space-x-1 hover:text-secondary transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@fikerway.com</span>
              </a>
              <a href="tel:+251911234567" className="flex items-center space-x-1 hover:text-secondary transition-colors">
                <Phone className="h-4 w-4" />
                <span>+251 911 234 567</span>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-background/20 text-center text-sm opacity-75">
            <p>© 2024 FikerWay. Built with ❤️ for Ethiopia's logistics future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;