import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Home, 
  Package, 
  Truck, 
  Shield, 
  MapPin, 
  Bell,
  User,
  Search,
  X,
  Phone,
  MessageSquare,
  BarChart3
} from "lucide-react";
import NotificationSystem from "./NotificationSystem";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getCurrentUserType = () => {
    if (location.pathname.includes('/driver')) return 'driver';
    if (location.pathname.includes('/admin')) return 'admin';
    return 'shipper';
  };

  const navigationItems = [
    { href: "/", icon: Home, label: "Home", active: location.pathname === "/" },
    { href: "/shipper", icon: Package, label: "Ship Load", active: location.pathname === "/shipper" },
    { href: "/driver", icon: Truck, label: "Drive", active: location.pathname === "/driver" },
    { href: "/track", icon: MapPin, label: "Track", active: location.pathname === "/track" },
    { href: "/admin", icon: Shield, label: "Admin", active: location.pathname === "/admin" }
  ];

  const quickActions = [
    { icon: Search, label: "Quick Track", action: () => window.location.href = '/track' },
    { icon: Phone, label: "Emergency", action: () => window.location.href = 'tel:+251911234567' },
    { icon: MessageSquare, label: "Support", action: () => {} },
    { icon: BarChart3, label: "Reports", action: () => {} }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b bg-gradient-primary">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-6 w-6 text-white" />
                      <span className="text-lg font-bold text-white">FikerWay</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <Badge className="bg-white/20 text-white border-white/30">
                      {getCurrentUserType().charAt(0).toUpperCase() + getCurrentUserType().slice(1)}
                    </Badge>
                    {!isOnline && (
                      <Badge variant="destructive" className="text-xs">
                        Offline
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 p-4">
                  <nav className="space-y-2">
                    <div className="pb-2 mb-4 border-b">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Main Navigation
                      </h3>
                    </div>
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          item.active
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </nav>

                  {/* Quick Actions */}
                  <div className="mt-6">
                    <div className="pb-2 mb-4 border-b">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Quick Actions
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={action.action}
                          className="flex flex-col h-16 space-y-1"
                        >
                          <action.icon className="h-4 w-4" />
                          <span className="text-xs">{action.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-muted/30">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      FikerWay v1.0.0
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Made with ❤️ for Ethiopia
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Center Logo - Desktop */}
          <Link to="/" className="hidden md:flex items-center space-x-2">
            <Truck className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">FikerWay</span>
          </Link>

          {/* Mobile Logo */}
          <Link to="/" className="flex items-center space-x-2 md:hidden">
            <Truck className="h-5 w-5 text-primary" />
            <span className="text-base font-bold">FikerWay</span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {!isOnline && (
              <Badge variant="outline" className="hidden sm:flex text-xs">
                Offline Mode
              </Badge>
            )}
            
            {/* Notifications */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
                  <span className="sr-only">Notifications</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                  <NotificationSystem userType={getCurrentUserType()} />
                </div>
              </SheetContent>
            </Sheet>

            {/* Profile */}
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Mobile Status Bar */}
      {!isOnline && (
        <div className="fixed bottom-0 left-0 right-0 bg-warning text-warning-foreground text-center py-2 text-sm z-40 md:hidden">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-warning-foreground rounded-full animate-pulse"></div>
            <span>Working offline - Some features may be limited</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileLayout;