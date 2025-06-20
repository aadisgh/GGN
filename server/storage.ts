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
    const mockTracking: TrackingData = {
      id: 1,
      trackingNumber: "UOC123456789",
      status: "In Transit",
      location: "Delhi Hub",
      lastUpdate: new Date(),
    };
    this.tracking.set("UOC123456789", mockTracking);
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
      createdAt: new Date() 
    };
    this.pickups.set(id, pickup);
    return pickup;
  }

  async createQuoteRequest(insertQuote: InsertQuote): Promise<QuoteRequest> {
    const id = this.currentId++;
    const quote: QuoteRequest = { 
      ...insertQuote, 
      id, 
      createdAt: new Date() 
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
      lastUpdate: new Date() 
    };
    this.tracking.set(insertTracking.trackingNumber, tracking);
    return tracking;
  }
}

export const storage = new MemStorage();
