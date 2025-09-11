import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  X, 
  Truck, 
  Package, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

interface Notification {
  id: string;
  type: "quote" | "status" | "payment" | "alert" | "success";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
}

interface NotificationSystemProps {
  userType: "shipper" | "driver" | "admin";
}

const NotificationSystem = ({ userType }: NotificationSystemProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simulate receiving notifications based on user type
    const mockNotifications: Record<string, Notification[]> = {
      shipper: [
        {
          id: "1",
          type: "quote",
          title: "New Driver Quote",
          message: "Alemayehu T. quoted 12,500 ETB for your Addis Ababa → Dire Dawa shipment",
          timestamp: "2 minutes ago",
          isRead: false,
          actionUrl: "/quotes",
          actionText: "View Quote"
        },
        {
          id: "2",
          type: "status",
          title: "Shipment Update",
          message: "Your shipment FW-001 has been picked up and is now in transit",
          timestamp: "1 hour ago",
          isRead: false
        },
        {
          id: "3",
          type: "success",
          title: "Delivery Completed",
          message: "Shipment FW-002 has been successfully delivered to Gondar",
          timestamp: "3 hours ago",
          isRead: true
        }
      ],
      driver: [
        {
          id: "1",
          type: "quote",
          title: "New Load Available",
          message: "Medical supplies shipment from Mekelle to Dessie - 1.2 tons",
          timestamp: "5 minutes ago",
          isRead: false,
          actionUrl: "/loads",
          actionText: "View Load"
        },
        {
          id: "2",
          type: "payment",
          title: "Payment Received",
          message: "15,400 ETB payment received for shipment FW-001",
          timestamp: "2 hours ago",
          isRead: false
        },
        {
          id: "3",
          type: "alert",
          title: "Route Update",
          message: "Traffic alert on Addis Ababa - Dire Dawa route. Consider alternate path.",
          timestamp: "4 hours ago",
          isRead: true
        }
      ],
      admin: [
        {
          id: "1",
          type: "alert",
          title: "Verification Pending",
          message: "23 driver verification requests awaiting review",
          timestamp: "10 minutes ago",
          isRead: false,
          actionUrl: "/admin/verifications",
          actionText: "Review"
        },
        {
          id: "2",
          type: "status",
          title: "System Update",
          message: "Platform maintenance scheduled for tonight 2:00 AM - 4:00 AM",
          timestamp: "1 hour ago",
          isRead: false
        }
      ]
    };

    const userNotifications = mockNotifications[userType] || [];
    setNotifications(userNotifications);
    setUnreadCount(userNotifications.filter(n => !n.isRead).length);
  }, [userType]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "quote": return <DollarSign className="h-4 w-4 text-success" />;
      case "status": return <Truck className="h-4 w-4 text-accent" />;
      case "payment": return <DollarSign className="h-4 w-4 text-success" />;
      case "alert": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "success": return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "quote": return "border-l-success";
      case "status": return "border-l-accent";
      case "payment": return "border-l-success";
      case "alert": return "border-l-destructive";
      case "success": return "border-l-success";
      default: return "border-l-muted";
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-background border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowNotifications(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 hover:bg-muted/50 transition-colors ${getNotificationColor(notification.type)} ${
                      !notification.isRead ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium">{notification.title}</h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{notification.timestamp}</span>
                            </div>
                            {notification.actionUrl && (
                              <Button variant="ghost" size="sm" className="text-xs">
                                {notification.actionText}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissNotification(notification.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t">
              <Button variant="ghost" size="sm" className="w-full">
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;