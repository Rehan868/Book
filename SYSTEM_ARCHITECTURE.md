# Hotel PMS System Architecture Documentation

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Database Schema](#database-schema)
4. [Core Modules](#core-modules)
5. [Data Flow Analysis](#data-flow-analysis)
6. [Business Logic](#business-logic)
7. [Integration Points](#integration-points)
8. [Security Architecture](#security-architecture)
9. [Performance Considerations](#performance-considerations)
10. [Development Guidelines](#development-guidelines)

## System Overview

The Hotel Property Management System (PMS) is a comprehensive application designed to manage all aspects of hotel operations. It provides functionality for managing bookings, rooms, guests, staff, expenses, reporting, and an owner portal for property owners to monitor their investments.

### Key Features

- **Booking Management**: Create, modify, and cancel reservations
- **Room Management**: Track room status, maintenance, and cleaning
- **Guest Management**: Store guest information and preferences
- **Staff Management**: Manage user accounts, roles, and permissions
- **Financial Management**: Track revenue, expenses, and generate reports
- **Owner Portal**: Provide property owners with performance insights
- **Reporting**: Generate comprehensive operational and financial reports
- **Calendar View**: Visual representation of room availability and bookings
- **Maintenance Tracking**: Log and track maintenance issues
- **Cleaning Management**: Schedule and track room cleaning

### System Architecture

The system follows a client-server architecture with a React-based frontend and a Next.js backend. Data is stored in a relational database (PostgreSQL) with proper normalization and indexing for optimal performance.

## Technology Stack

- **Frontend**: React.js, Tailwind CSS, shadcn/ui components
- **Backend**: Next.js (App Router), Server Actions
- **Database**: PostgreSQL
- **Authentication**: JWT-based authentication
- **State Management**: React Context API, Server Components
- **API**: RESTful API endpoints, Server Actions
- **Deployment**: Vercel

## Database Schema

### Core Tables

#### Users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  department VARCHAR(100),
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  last_login TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

