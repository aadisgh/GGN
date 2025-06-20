import { 
  users, 
  contactSubmissions,
  pickupRequests,
  quoteRequests,
  trackingData,
  type User, 
  type InsertUser,
  type ContactSubmission,
  type InsertContact,
  type PickupRequest,
  type InsertPickup,
  type QuoteRequest,
  type InsertQuote,
  type TrackingData,
  type InsertTracking
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  createPickupRequest(pickup: InsertPickup): Promise<PickupRequest>;
  createQuoteRequest(quote: InsertQuote): Promise<QuoteRequest>;
  getTrackingData(trackingNumber: string): Promise<TrackingData | undefined>;
  createTrackingData(tracking: InsertTracking): Promise<TrackingData>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const [contact] = await db
      .insert(contactSubmissions)
      .values(insertContact)
      .returning();
    return contact;
  }

  async createPickupRequest(insertPickup: InsertPickup): Promise<PickupRequest> {
    const [pickup] = await db
      .insert(pickupRequests)
      .values(insertPickup)
      .returning();
    return pickup;
  }

  async createQuoteRequest(insertQuote: InsertQuote): Promise<QuoteRequest> {
    const [quote] = await db
      .insert(quoteRequests)
      .values(insertQuote)
      .returning();
    return quote;
  }

  async getTrackingData(trackingNumber: string): Promise<TrackingData | undefined> {
    const [tracking] = await db.select().from(trackingData).where(eq(trackingData.trackingNumber, trackingNumber));
    return tracking || undefined;
  }

  async createTrackingData(insertTracking: InsertTracking): Promise<TrackingData> {
    const [tracking] = await db
      .insert(trackingData)
      .values(insertTracking)
      .returning();
    return tracking;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, ContactSubmission>;
  private pickups: Map<number, PickupRequest>;
  private quotes: Map<number, QuoteRequest>;
  private tracking: Map<string, TrackingData>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.pickups = new Map();
    this.quotes = new Map();
    this.tracking = new Map();
    this.currentId = 1;
    
    // Initialize with some mock tracking data
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockTrackingData = [
      {
        id: 1,
        trackingNumber: "UOC123456789",
        status: "In Transit",
        location: "Delhi Hub",
        lastUpdate: new Date(),
        senderName: "Rajesh Kumar",
        receiverName: "Priya Sharma",
        packageWeight: "2.5 kg",
        serviceType: "Express Delivery",
        estimatedDelivery: "2024-12-22",
      },
      {
        id: 2,
        trackingNumber: "6861417",
        status: "Out for Delivery",
        location: "Mumbai Delivery Center",
        lastUpdate: new Date(),
        senderName: "Amit Patel",
        receiverName: "Sunita Verma",
        packageWeight: "1.2 kg",
        serviceType: "Standard Delivery",
        estimatedDelivery: "2024-12-21",
      },
      {
        id: 3,
        trackingNumber: "6861380",
        status: "Delivered",
        location: "Destination Address",
        lastUpdate: new Date(),
        senderName: "Global Exports Ltd",
        receiverName: "Tech Solutions Inc",
        packageWeight: "5.0 kg",
        serviceType: "International Delivery",
        estimatedDelivery: "2024-12-20",
      },
      {
        id: 4,
        trackingNumber: "UOC987654321",
        status: "Package Received",
        location: "Gurgaon Sorting Facility",
        lastUpdate: new Date(),
        senderName: "E-Commerce Plus",
        receiverName: "Neha Singh",
        packageWeight: "0.8 kg",
        serviceType: "Same Day Delivery",
        estimatedDelivery: "2024-12-21",
      },
      {
        id: 5,
        trackingNumber: "TRK001234567",
        status: "In Transit",
        location: "Bangalore Hub",
        lastUpdate: new Date(),
        senderName: "TechnoSoft Solutions",
        receiverName: "Digital Marketing Co",
        packageWeight: "3.2 kg",
        serviceType: "Express Delivery",
        estimatedDelivery: "2024-12-23",
      }
    ];

    mockTrackingData.forEach(data => {
      this.tracking.set(data.trackingNumber, data);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = this.currentId++;
    const contact: ContactSubmission = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async createPickupRequest(insertPickup: InsertPickup): Promise<PickupRequest> {
    const id = this.currentId++;
    const pickup: PickupRequest = { 
      ...insertPickup, 
      id, 
      createdAt: new Date(),
      instructions: insertPickup.instructions || null
    };
    this.pickups.set(id, pickup);
    return pickup;
  }

  async createQuoteRequest(insertQuote: InsertQuote): Promise<QuoteRequest> {
    const id = this.currentId++;
    const quote: QuoteRequest = { 
      ...insertQuote, 
      id, 
      createdAt: new Date(),
      estimatedCost: insertQuote.estimatedCost || null
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async getTrackingData(trackingNumber: string): Promise<TrackingData | undefined> {
    return this.tracking.get(trackingNumber);
  }

  async createTrackingData(insertTracking: InsertTracking): Promise<TrackingData> {
    const id = this.currentId++;
    const tracking: TrackingData = { 
      ...insertTracking, 
      id, 
      lastUpdate: new Date(),
      senderName: insertTracking.senderName || null,
      receiverName: insertTracking.receiverName || null,
      packageWeight: insertTracking.packageWeight || null,
      serviceType: insertTracking.serviceType || null,
      estimatedDelivery: insertTracking.estimatedDelivery || null
    };
    this.tracking.set(insertTracking.trackingNumber, tracking);
    return tracking;
  }
}

export const storage = new DatabaseStorage();
