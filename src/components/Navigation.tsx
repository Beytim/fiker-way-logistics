import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, Home, ArrowLeft } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (isHomePage) return null;

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button 
        asChild 
        variant="outline" 
        size="sm"
        className="bg-background/95 backdrop-blur-sm shadow-soft"
      >
        <Link to="/" className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <Truck className="h-4 w-4" />
          <span className="hidden sm:inline">Back to FikerWay</span>
        </Link>
      </Button>
    </div>
  );
};

export default Navigation;