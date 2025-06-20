import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  insertPickupSchema, 
  insertQuoteSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);
      res.json({ success: true, id: contact.id });
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  // Pickup request submission
  app.post("/api/pickup", async (req, res) => {
    try {
      const validatedData = insertPickupSchema.parse(req.body);
      const pickup = await storage.createPickupRequest(validatedData);
      res.json({ success: true, id: pickup.id });
    } catch (error) {
      res.status(400).json({ error: "Invalid pickup request data" });
    }
  });

  // Quote request and calculation
  app.post("/api/quote", async (req, res) => {
    try {
      const { fromCity, toCity, weight, serviceType } = req.body;
      
      // Calculate estimated cost based on weight and service type
      const weightNum = parseFloat(weight);
      let baseRate = 50; // Base rate per kg
      
      // Adjust rate based on service type
      switch (serviceType) {
        case "Express Delivery (1-2 days)":
          baseRate *= 1.5;
          break;
        case "Same Day Delivery":
          baseRate *= 2.5;
          break;
        case "International Delivery":
          baseRate *= 3;
          break;
        default:
          baseRate = 50;
      }
      
      const estimatedCost = Math.round(weightNum * baseRate);
      
      const validatedData = insertQuoteSchema.parse({
        fromCity,
        toCity,
        weight,
        serviceType,
        estimatedCost
      });
      
      const quote = await storage.createQuoteRequest(validatedData);
      res.json({ success: true, estimatedCost, id: quote.id });
    } catch (error) {
      res.status(400).json({ error: "Invalid quote request data" });
    }
  });

  // Tracking endpoint
  app.get("/api/track/:trackingNumber", async (req, res) => {
    try {
      const { trackingNumber } = req.params;
      const tracking = await storage.getTrackingData(trackingNumber);
      
      if (!tracking) {
        return res.status(404).json({ error: "Tracking number not found" });
      }

      // Generate timeline based on current status
      const generateTimeline = (currentStatus: string) => {
        const baseTimeline = [
          {
            status: "Package Received",
            location: "Gurgaon Sorting Facility",
            time: "2024-12-19 10:30 AM",
            completed: true
          },
          {
            status: "In Transit",
            location: tracking.location,
            time: "2024-12-19 02:45 PM",
            completed: ["In Transit", "Out for Delivery", "Delivered"].includes(currentStatus)
          },
          {
            status: "Out for Delivery",
            location: currentStatus === "Out for Delivery" ? tracking.location : "Local Delivery Center",
            time: currentStatus === "Delivered" ? "2024-12-20 09:15 AM" : currentStatus === "Out for Delivery" ? "Today 09:15 AM" : "Expected: Today",
            completed: ["Out for Delivery", "Delivered"].includes(currentStatus)
          },
          {
            status: "Delivered",
            location: "Destination Address",
            time: currentStatus === "Delivered" ? "2024-12-20 06:00 PM" : `Expected: ${tracking.estimatedDelivery || 'Tomorrow'}`,
            completed: currentStatus === "Delivered"
          }
        ];
        
        // If package is just received, show only first step as completed
        if (currentStatus === "Package Received") {
          return baseTimeline.map((item, index) => ({
            ...item,
            completed: index === 0
          }));
        }
        
        return baseTimeline;
      };

      const timeline = generateTimeline(tracking.status);

      res.json({ 
        trackingNumber,
        status: tracking.status,
        location: tracking.location,
        lastUpdate: tracking.lastUpdate,
        senderName: tracking.senderName,
        receiverName: tracking.receiverName,
        packageWeight: tracking.packageWeight,
        serviceType: tracking.serviceType,
        estimatedDelivery: tracking.estimatedDelivery,
        timeline
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tracking data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
