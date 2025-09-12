import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Truck, Home, ArrowLeft, User } from "lucide-react";
import NotificationSystem from "./NotificationSystem";

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  // Determine user type based on current route
  const getUserType = () => {
    if (location.pathname.includes("/shipper")) return "shipper";
    if (location.pathname.includes("/driver")) return "driver";
    if (location.pathname.includes("/admin")) return "admin";
    return "shipper"; // default
  };

  if (isHomePage) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Button 
            asChild 
            variant="ghost" 
            size="sm"
            className="flex items-center space-x-2"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">FikerWay</span>
            </Link>
          </Button>
          
          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Profile</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <NotificationSystem userType={getUserType()} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;