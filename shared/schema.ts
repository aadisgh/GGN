import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  serviceType: text("service_type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pickupRequests = pgTable("pickup_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  packageSize: text("package_size").notNull(),
  pickupDate: text("pickup_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  instructions: text("instructions"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  fromCity: text("from_city").notNull(),
  toCity: text("to_city").notNull(),
  weight: text("weight").notNull(),
  serviceType: text("service_type").notNull(),
  estimatedCost: integer("estimated_cost"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const trackingData = pgTable("tracking_data", {
  id: serial("id").primaryKey(),
  trackingNumber: text("tracking_number").notNull().unique(),
  status: text("status").notNull(),
  location: text("location").notNull(),
  lastUpdate: timestamp("last_update").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertPickupSchema = createInsertSchema(pickupRequests).omit({
  id: true,
  createdAt: true,
});

export const insertQuoteSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  createdAt: true,
});

export const insertTrackingSchema = createInsertSchema(trackingData).omit({
  id: true,
  lastUpdate: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type PickupRequest = typeof pickupRequests.$inferSelect;
export type InsertPickup = z.infer<typeof insertPickupSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type TrackingData = typeof trackingData.$inferSelect;
export type InsertTracking = z.infer<typeof insertTrackingSchema>;
