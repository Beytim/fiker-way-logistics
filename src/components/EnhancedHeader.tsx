import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Truck, 
  Search, 
  Bell, 
  User, 
  Menu,
  Globe,
  Phone,
  MessageSquare,
  Settings,
  LogOut,
  Activity,
  MapPin,
  Package
} from "lucide-react";
import NotificationSystem from "./NotificationSystem";

interface EnhancedHeaderProps {
  userType?: "shipper" | "driver" | "admin";
  userName?: string;
  userRating?: number;
  unreadNotifications?: number;
}

const EnhancedHeader = ({ 
  userType, 
  userName = "Guest User", 
  userRating = 4.8,
  unreadNotifications = 3 
}: EnhancedHeaderProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [quickSearch, setQuickSearch] = useState("");
  const [language, setLanguage] = useState("English");
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

  const handleQuickSearch = () => {
    if (quickSearch.trim()) {
      if (quickSearch.startsWith("FW-")) {
        window.location.href = `/track?id=${quickSearch}`;
      } else {
        // Search functionality
        console.log("Searching for:", quickSearch);
      }
    }
  };

  const getUserTypeColor = () => {
    switch (userType) {
      case "shipper": return "bg-primary text-primary-foreground";
      case "driver": return "bg-accent text-accent-foreground";
      case "admin": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getUserTypeIcon = () => {
    switch (userType) {
      case "shipper": return <Package className="h-3 w-3" />;
      case "driver": return <Truck className="h-3 w-3" />;
      case "admin": return <Settings className="h-3 w-3" />;
      default: return <User className="h-3 w-3" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FikerWay
            </span>
          </Link>

          {/* Connection Status */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success animate-pulse' : 'bg-destructive'}`} />
            <span className="text-xs text-muted-foreground">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Quick Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Quick track (FW-001) or search..."
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleQuickSearch()}
              className="pl-10 pr-4 bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLanguage(language === "English" ? "አማርኛ" : "English")}
            className="hidden sm:flex items-center space-x-1"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs">{language === "English" ? "EN" : "አማ"}</span>
          </Button>

          {/* Emergency Contact */}
          <Button 
            variant="ghost" 
            size="sm"
            className="hidden sm:flex text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => window.location.href = 'tel:+251911234567'}
          >
            <Phone className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-destructive text-destructive-foreground">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="py-4">
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <NotificationSystem userType={userType || "shipper"} />
              </div>
            </SheetContent>
          </Sheet>

          {/* User Profile */}
          {userType && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-medium">{userName}</div>
                    <Badge className={`text-xs ${getUserTypeColor()}`}>
                      {getUserTypeIcon()}
                      <span className="ml-1">{userType}</span>
                    </Badge>
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="py-4 space-y-6">
                  <div className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-3">
                      <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                        {userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{userName}</h3>
                    <Badge className={`mt-1 ${getUserTypeColor()}`}>
                      {getUserTypeIcon()}
                      <span className="ml-1">{userType?.toUpperCase()}</span>
                    </Badge>
                    {userRating && (
                      <div className="flex items-center justify-center space-x-1 mt-2 text-sm text-muted-foreground">
                        <span>⭐ {userRating}</span>
                        <span>•</span>
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Profile Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Preferences
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="py-4 space-y-6">
                <div className="flex items-center space-x-2">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold">FikerWay</span>
                </div>

                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Quick track or search..."
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleQuickSearch()}
                    className="pl-10"
                  />
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  <Link to="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted">
                    <Package className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                  <Link to="/shipper" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted">
                    <Package className="h-4 w-4" />
                    <span>Ship Load</span>
                  </Link>
                  <Link to="/driver" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted">
                    <Truck className="h-4 w-4" />
                    <span>Drive</span>
                  </Link>
                  <Link to="/track" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted">
                    <MapPin className="h-4 w-4" />
                    <span>Track</span>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Status Bar */}
      {!isOnline && (
        <div className="bg-warning text-warning-foreground text-center py-1 text-xs">
          <Activity className="h-3 w-3 inline mr-1" />
          Working offline - Some features may be limited
        </div>
      )}
    </header>
  );
};

export default EnhancedHeader;