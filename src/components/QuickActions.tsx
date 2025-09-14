import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  MessageCircle, 
  MapPin,
  Bell,
  Settings,
  Phone,
  AlertTriangle,
  Truck,
  Package,
  DollarSign,
  Star
} from "lucide-react";
import { toast } from "sonner";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
  badge?: string;
  urgent?: boolean;
}

interface QuickActionsProps {
  userType: "shipper" | "driver" | "admin";
  onActionClick?: (actionId: string) => void;
}

const QuickActions = ({ userType, onActionClick }: QuickActionsProps) => {
  const handleAction = (actionId: string, action: () => void) => {
    action();
    onActionClick?.(actionId);
  };

  const shipperActions: QuickAction[] = [
    {
      id: "post-load",
      title: "Post New Load", 
      description: "Create a new shipment request",
      icon: <Plus className="h-5 w-5" />,
      color: "bg-primary text-primary-foreground",
      action: () => toast.success("Opening new load form...")
    },
    {
      id: "track-shipment",
      title: "Track Shipments",
      description: "Monitor your active deliveries", 
      icon: <MapPin className="h-5 w-5" />,
      color: "bg-accent text-accent-foreground",
      action: () => toast.success("Opening tracking dashboard..."),
      badge: "3 active"
    },
    {
      id: "find-drivers",
      title: "Browse Drivers",
      description: "Find verified drivers in your area",
      icon: <Search className="h-5 w-5" />,
      color: "bg-secondary text-secondary-foreground",
      action: () => toast.success("Opening driver directory...")
    },
    {
      id: "messages",
      title: "Messages",
      description: "Chat with drivers and support",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "bg-success text-success-foreground",
      action: () => toast.success("Opening messages..."),
      badge: "2 new"
    },
    {
      id: "emergency",
      title: "Emergency Support",
      description: "24/7 customer assistance",
      icon: <Phone className="h-5 w-5" />,
      color: "bg-destructive text-destructive-foreground",
      action: () => toast.success("Connecting to emergency support..."),
      urgent: true
    },
    {
      id: "payment-history",
      title: "Payments",
      description: "View payment history and invoices",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-warning text-warning-foreground",
      action: () => toast.success("Opening payment dashboard...")
    }
  ];

  const driverActions: QuickAction[] = [
    {
      id: "find-loads",
      title: "Available Loads",
      description: "Browse and accept new jobs",
      icon: <Package className="h-5 w-5" />,
      color: "bg-primary text-primary-foreground", 
      action: () => toast.success("Browsing available loads..."),
      badge: "12 nearby"
    },
    {
      id: "current-job",
      title: "Current Job",
      description: "Manage your active delivery",
      icon: <Truck className="h-5 w-5" />,
      color: "bg-accent text-accent-foreground",
      action: () => toast.success("Opening current job details..."),
      badge: "In progress"
    },
    {
      id: "navigation", 
      title: "Navigation",
      description: "Get directions to pickup/delivery",
      icon: <MapPin className="h-5 w-5" />,
      color: "bg-success text-success-foreground",
      action: () => toast.success("Opening navigation...")
    },
    {
      id: "earnings",
      title: "Earnings",
      description: "Track your income and payments",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-secondary text-secondary-foreground",
      action: () => toast.success("Opening earnings dashboard...")
    },
    {
      id: "messages",
      title: "Messages", 
      description: "Chat with shippers and support",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "bg-warning text-warning-foreground",
      action: () => toast.success("Opening messages..."),
      badge: "1 new"
    },
    {
      id: "emergency",
      title: "Emergency",
      description: "Report issues or get help",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "bg-destructive text-destructive-foreground",
      action: () => toast.success("Opening emergency support..."),
      urgent: true
    }
  ];

  const adminActions: QuickAction[] = [
    {
      id: "user-management",
      title: "User Management",
      description: "Manage drivers and shippers",
      icon: <Settings className="h-5 w-5" />,
      color: "bg-primary text-primary-foreground",
      action: () => toast.success("Opening user management..."),
      badge: "5 pending"
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "Platform performance metrics",
      icon: <Star className="h-5 w-5" />,
      color: "bg-accent text-accent-foreground",
      action: () => toast.success("Opening analytics dashboard...")
    },
    {
      id: "support-tickets",
      title: "Support Tickets",
      description: "Handle customer support requests",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "bg-warning text-warning-foreground",
      action: () => toast.success("Opening support tickets..."),
      badge: "8 open"
    },
    {
      id: "payments",
      title: "Payment System",
      description: "Monitor transactions and payouts",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-success text-success-foreground", 
      action: () => toast.success("Opening payment system...")
    },
    {
      id: "live-tracking",
      title: "Live Tracking",
      description: "Monitor all active shipments",
      icon: <MapPin className="h-5 w-5" />,
      color: "bg-secondary text-secondary-foreground",
      action: () => toast.success("Opening live tracking overview..."),
      badge: "23 active"
    },
    {
      id: "system-alerts",
      title: "System Alerts",
      description: "Critical system notifications",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "bg-destructive text-destructive-foreground",
      action: () => toast.success("Opening system alerts..."),
      badge: "2 critical",
      urgent: true
    }
  ];

  const getActionsForUser = () => {
    switch (userType) {
      case "shipper": return shipperActions;
      case "driver": return driverActions; 
      case "admin": return adminActions;
      default: return [];
    }
  };

  const actions = getActionsForUser();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {actions.map((action) => (
        <Card 
          key={action.id} 
          className={`cursor-pointer transition-all duration-200 hover:shadow-medium hover:scale-[1.02] ${
            action.urgent ? "ring-2 ring-destructive/20 border-destructive/30" : "hover:border-primary/30"
          }`}
          onClick={() => handleAction(action.id, action.action)}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${action.color} flex-shrink-0`}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-sm">{action.title}</h3>
                  {action.badge && (
                    <Badge 
                      className={`ml-2 text-xs ${
                        action.urgent 
                          ? "bg-destructive text-destructive-foreground animate-pulse" 
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {action.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickActions;