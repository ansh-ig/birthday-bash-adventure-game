# Interactive Story Experience Application

## Overview

This is a full-stack web application built as an interactive story experience with mini-games. The project uses a modern React frontend with Node.js/Express backend, featuring interactive visual elements, game mechanics, and a romantic narrative theme. The application includes a TypeScript-based development environment with comprehensive UI components and database integration capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React hooks and context, TanStack Query for server state
- **Routing**: React Router for client-side navigation
- **UI Components**: Comprehensive shadcn/ui component system with Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for optimized bundle creation
- **API Design**: RESTful API structure with `/api` prefix

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Shared schema definitions between client and server
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless PostgreSQL (configurable)
- **Fallback**: In-memory storage implementation for development

## Key Components

### Interactive Game Elements
- **GameCanvas**: HTML5 Canvas-based interactive games including:
  - Balloon popping game for room scene
  - Cake cutting interaction with fireworks
  - Real-time animations and particle effects
- **CharacterDialogue**: Typewriter-effect dialogue system with character avatars
- **Scene Management**: Multi-scene story progression with state tracking

### UI Components
- **Card System**: Story presentation and game interface
- **Button Components**: Interactive navigation and game controls
- **Toast Notifications**: User feedback system
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Shared Infrastructure
- **Schema Definitions**: Type-safe database models with Zod validation
- **User Management**: Basic user authentication structure
- **Error Handling**: Comprehensive error boundaries and API error handling

## Data Flow

1. **Client Initialization**: React app loads with routing and query client setup
2. **Scene Progression**: User interactions trigger scene changes and state updates
3. **Game Interactions**: Canvas events processed for mini-game mechanics
4. **State Persistence**: Scene completion tracking and user progress
5. **API Communication**: RESTful endpoints for user data and game state (expandable)

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Router)
- Express.js for server framework
- TypeScript for type safety

### Database & ORM
- Drizzle ORM with PostgreSQL support
- Neon Database serverless driver
- Zod for schema validation

### UI & Styling
- Tailwind CSS for utility-first styling
- Radix UI for accessible component primitives
- Lucide React for iconography
- class-variance-authority for component variants

### Development Tools
- Vite with React plugin and development enhancements
- ESBuild for production bundling
- tsx for TypeScript execution
- PostCSS with Autoprefixer

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev` runs both frontend and backend
- **Port Configuration**: Frontend on Vite dev server, backend on port 5000
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **Database**: PostgreSQL database with Drizzle ORM integration

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Database**: PostgreSQL connection via environment variables with Neon serverless driver

### Replit Deployment
- **Autoscale Deployment**: Configured for Replit's autoscale infrastructure
- **Port Mapping**: Internal port 5000 mapped to external port 80
- **Environment**: PostgreSQL 16 module enabled for database support
- **Build Process**: Automated build pipeline with npm scripts

## Changelog

```
Changelog:
- June 24, 2025. Initial setup
- June 24, 2025. Added PostgreSQL database integration with Drizzle ORM
- June 24, 2025. Updated dialogue text and character names
- June 24, 2025. Added audio features: balloon pop sounds and Happy Birthday melody
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```