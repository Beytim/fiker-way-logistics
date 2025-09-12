import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, Package, Truck } from "lucide-react";
import { toast } from "sonner";

const NotificationSystem = () => {
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
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">ማሳወቂያዎች (Notifications)</h2>
            <Badge className="bg-destructive text-destructive-foreground">2</Badge>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {notifications.map((notification) => (
            <Card key={notification.id} className="cursor-pointer hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{notification.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                  </div>
                  
                  {!notification.read && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default NotificationSystem;