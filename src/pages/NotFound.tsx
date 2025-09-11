import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Truck, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-8">
          <Truck className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
        </div>
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Oops! This route doesn't exist on FikerWay
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <a href="/" className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Return to FikerWay</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
