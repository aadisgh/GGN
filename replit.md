# replit.md

## Overview

This is a full-stack courier service web application for "United Overseas Couriers GGN" built with React (Vite), Express.js, and designed for PostgreSQL with Drizzle ORM. The application provides a comprehensive logistics platform with features including package tracking, quote calculation, pickup scheduling, and contact management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion for smooth animations
- **State Management**: React Query (TanStack Query) for server state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: tsx for TypeScript execution in development

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured for Neon serverless)
- **Session Storage**: PostgreSQL table-based sessions
- **Development Fallback**: In-memory storage implementation for development

## Key Components

### Database Schema
Located in `shared/schema.ts`:
- **users**: User authentication and management
- **contactSubmissions**: Contact form submissions
- **pickupRequests**: Package pickup scheduling
- **quoteRequests**: Shipping cost estimates
- **trackingData**: Package tracking information

### API Endpoints
- `POST /api/contact` - Submit contact form
- `POST /api/pickup` - Schedule package pickup
- `POST /api/quote` - Calculate shipping quotes
- `GET /api/track/:trackingNumber` - Track package status

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling navigation
- **HeroSection**: Landing section with animated counters
- **ServicesSection**: Service offerings display
- **TrackingSection**: Package tracking functionality
- **QuoteSection**: Shipping cost calculator
- **ContactSection**: Contact form with validation
- **PickupSection**: Pickup scheduling form
- **WhatsAppWidget**: Floating WhatsApp contact button

## Data Flow

1. **Client Requests**: React frontend makes API calls using fetch with React Query
2. **API Processing**: Express.js server validates requests using Zod schemas
3. **Database Operations**: Drizzle ORM handles PostgreSQL operations
4. **Response Handling**: Structured JSON responses with error handling
5. **State Updates**: React Query manages cache invalidation and updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless connection
- **drizzle-orm**: Type-safe database operations
- **@radix-ui/***: Accessible UI components
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **react-hook-form**: Form management
- **zod**: Schema validation

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling for server
- **tailwindcss**: Utility-first CSS framework
- **vite**: Frontend build tool and dev server

## Deployment Strategy

### Development
- **Dev Server**: `npm run dev` runs both frontend (Vite) and backend (tsx)
- **Port Configuration**: Frontend dev server proxies API calls to backend
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `npm run db:push`

### Deployment Targets
- **Platform**: Replit with autoscale deployment
- **Port**: External port 80 mapping to local port 5000
- **Environment**: PostgreSQL module enabled in Replit

## Changelog
```
Changelog:
- June 20, 2025. Initial setup
```

## User Preferences

Preferred communication style: Simple, everyday language.