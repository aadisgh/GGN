import { db } from "./db";
import { trackingData } from "@shared/schema";

async function seedDatabase() {
  try {
    console.log("Seeding database with tracking data...");
    
    const mockTrackingData = [
      {
        trackingNumber: "UOC123456789",
        status: "In Transit",
        location: "Delhi Hub",
        senderName: "Rajesh Kumar",
        receiverName: "Priya Sharma",
        packageWeight: "2.5 kg",
        serviceType: "Express Delivery",
        estimatedDelivery: "2024-12-22",
      },
      {
        trackingNumber: "6861417",
        status: "Out for Delivery",
        location: "Mumbai Delivery Center",
        senderName: "Amit Patel",
        receiverName: "Sunita Verma",
        packageWeight: "1.2 kg",
        serviceType: "Standard Delivery",
        estimatedDelivery: "2024-12-21",
      },
      {
        trackingNumber: "6861380",
        status: "Delivered",
        location: "Destination Address",
        senderName: "Global Exports Ltd",
        receiverName: "Tech Solutions Inc",
        packageWeight: "5.0 kg",
        serviceType: "International Delivery",
        estimatedDelivery: "2024-12-20",
      },
      {
        trackingNumber: "UOC987654321",
        status: "Package Received",
        location: "Gurgaon Sorting Facility",
        senderName: "E-Commerce Plus",
        receiverName: "Neha Singh",
        packageWeight: "0.8 kg",
        serviceType: "Same Day Delivery",
        estimatedDelivery: "2024-12-21",
      },
      {
        trackingNumber: "TRK001234567",
        status: "In Transit",
        location: "Bangalore Hub",
        senderName: "TechnoSoft Solutions",
        receiverName: "Digital Marketing Co",
        packageWeight: "3.2 kg",
        serviceType: "Express Delivery",
        estimatedDelivery: "2024-12-23",
      }
    ];

    for (const data of mockTrackingData) {
      await db.insert(trackingData).values(data).onConflictDoNothing();
    }
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();