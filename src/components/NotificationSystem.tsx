import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, Package, Truck, X } from "lucide-react";
import { toast } from "sonner";

interface NotificationSystemProps {
  userType: "shipper" | "driver" | "admin";
}

const NotificationSystem = ({ userType }: NotificationSystemProps) => {
  const [notifications] = useState([
    {
      id: "N001",
      type: "shipment",
      title: "ጫነት ደርሷል",
      message: "የእርስዎ ጫነት #FW-001 ድሬዳዋ ደርሷል።",
      timestamp: "2 ደቂቃ በፊት",
      read: false
    },
    {
      id: "N002", 
      type: "driver",
      title: "አዲስ ጫነት ጥያቄ",
      message: "አዲስ ጫነት ጥያቄ ከአዲስ አበባ ወደ ባሕር ዳር።",
      timestamp: "15 ደቂቃ በፊት",
      read: false
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "shipment": return <Package className="h-5 w-5 text-primary" />;
      case "driver": return <Truck className="h-5 w-5 text-accent" />;
      default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="w-full">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Notifications</h3>
            <Badge variant="destructive" className="text-xs">
              {notifications.filter(n => !n.read).length}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            Mark all read
          </Button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 hover:bg-muted/50 cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{notification.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3 border-t bg-muted/30">
        <Button variant="outline" size="sm" className="w-full text-xs">
          View All Notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationSystem;