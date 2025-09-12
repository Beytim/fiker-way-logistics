import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LiveTracking from "@/components/LiveTracking";
import { Search, Package, ArrowRight } from "lucide-react";

const TrackingPage = () => {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get("id") || "");
  const [isTracking, setIsTracking] = useState(!!searchParams.get("id"));

  const handleTrack = () => {
    if (trackingId.trim()) {
      setIsTracking(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTrack();
    }
  };

  if (isTracking && trackingId) {
    return <LiveTracking shipmentId={trackingId} />;
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <Package className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Track Your Shipment</h1>
            <p className="text-muted-foreground">
              Enter your shipment ID to get real-time tracking information
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Enter Tracking ID</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tracking-id">Shipment ID</Label>
                <div className="flex space-x-2">
                  <Input
                    id="tracking-id"
                    placeholder="FW-001"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleTrack} disabled={!trackingId.trim()}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Demo tracking IDs you can try:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTrackingId("FW-001")}
                  >
                    FW-001
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTrackingId("FW-002")}
                  >
                    FW-002
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTrackingId("FW-003")}
                  >
                    FW-003
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>
              Don't have a tracking ID? 
              <Button variant="link" className="px-2">
                Contact our support team
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;