# Dashboard Pages to Implement

This document outlines the dashboard pages for the pet care SaaS platform, organized by the main sections in the sidebar. Each page includes key features, UI components, and functionality to implement.

## Overview

### Dashboard (/)

- **Purpose**: Main overview page with key metrics and quick actions
- **Components**:
  - Metric cards: Total Facilities, Total Users, Revenue (this month), Bookings
  - Recent activity feed
  - Quick action buttons (Create facility, View reports)
  - Charts: Revenue trends, booking volume
- **Data Sources**: Aggregated stats from all tenants

## Tenant Management

### Facilities (/dashboard/facilities)

- **Purpose**: Manage all tenant facilities
- **Features**:
  - Facilities table with columns: Name, Status, Plan, Users, Last Activity
  - Filters: Status (active/inactive), Plan type, Date created
  - Actions: Create new facility, Edit, Suspend/Activate, Delete
  - Bulk actions: Export list, Send notifications
- **Components**: DataTable, Filters, Action buttons

### Facility Configuration (/dashboard/facility-config)

- **Purpose**: Configure settings that apply to all facilities
- **Sections**:
  - Service settings: Enable/disable services (boarding, daycare, grooming)
  - Pricing structures: Default pricing, tax settings
  - Booking rules: Cut-off times, deposits, cancellation policies
  - Check-in/out times: Default schedules
  - Vaccination requirements: Mandatory records
  - User roles: Default permissions
  - Staff scheduling: Configuration options
  - Pet categories: Weight/size limits, breed restrictions
  - Custom fields: For pets, customers, bookings
  - Reports: Default dashboard layouts
  - Waivers & contracts: Templates
- **Components**: Form sections, Toggle switches, Input fields

### User & Roles (/dashboard/users)

- **Purpose**: Global user management across all facilities
- **Features**:
  - Users table: Name, Email, Role, Facility, Status, Last Login
  - Role management: Assign/revoke roles (Facility Admin, Manager, Staff, Customer)
  - Bulk actions: Reset passwords, Enable 2FA, Impersonate
  - User search and filters
  - Activity logs: Login history, actions performed
- **Components**: DataTable, Role selector, Action menus

## Platform Operations

### Subscription & Billing (/dashboard/billing)

- **Purpose**: Manage plans, pricing, and billing
- **Sections**:
  - Plans management: Create/edit plans (Free, Basic, Premium, Enterprise)
  - Feature configuration: What's included in each plan
  - Usage limits: Pets, users, storage, bookings
  - Payment gateways: Stripe, PayPal integration settings
  - Tax/VAT: Region-based configuration
  - Invoicing: Automatic generation, receipts
  - Refunds/credits: Processing interface
  - Revenue analytics: Monthly/yearly reports
- **Components**: Plan cards, Feature toggles, Analytics charts

### Global Settings (/dashboard/settings)

- **Purpose**: Platform-wide branding and integrations
- **Sections**:
  - Branding: Platform name, domain, logo, color theme
  - White-labeling: Custom themes for tenants
  - Integrations: Payment gateways, SMS/email providers, third-party apps (QuickBooks, etc.)
  - Templates: Email/SMS notifications, booking confirmations, waivers
  - Languages & currency: Supported options
- **Components**: File upload, Color picker, Integration toggles

### Compliance & Data (/dashboard/compliance)

- **Purpose**: Data management and legal compliance
- **Features**:
  - Data retention policies: Set expiration rules
  - GDPR/CCPA settings: Consent management
  - Audit logs: All tenant activities
  - Backup/restore: Database operations
  - API keys: Management interface
  - Data export/deletion: User data controls
  - Legal docs: Terms of Service, Privacy Policy management
- **Components**: Policy forms, Log viewer, Backup controls

## Support & Features

### Support & Communication (/dashboard/support)

- **Purpose**: Customer support and communication tools
- **Features**:
  - Support tickets: Queue management, priority assignment
  - Chat system: In-app messaging
  - SLA management: Response time tracking
  - Knowledge base: Help center articles
  - Announcements: Push notifications to facilities
  - Performance metrics: Support stats
- **Components**: Ticket list, Chat interface, Metrics dashboard

### Task & Operations (/dashboard/tasks)

- **Purpose**: Operational task management
- **Features**:
  - Task templates: Pre-defined tasks per service (cleaning, feeding, grooming)
  - Automatic assignment: Tasks created with bookings
  - Completion tracking: Photo proof, notes
  - Internal audit trail: Task history
- **Components**: Template editor, Task list, Progress indicators

### AI & Personalization (/dashboard/ai)

- **Purpose**: AI-powered features (future-ready)
- **Features**:
  - AI chat assistant: Client booking suggestions
  - Summary notes: Automated reports from messages
  - Insights: Capacity predictions, promotion suggestions
  - Personalization: Facility-specific recommendations
- **Components**: AI settings, Preview interfaces

## Analytics & Reporting

### Analytics & Reporting (/dashboard/analytics)

- **Purpose**: Comprehensive analytics dashboard
- **Sections**:
  - Global metrics: Total facilities, users, bookings, revenue
  - Facility performance: Usage stats, activity trends
  - Revenue reports: Breakdown by service, time period
  - Booking analytics: Service popularity, trends
  - Export options: CSV, XLSX, PDF formats
  - Real-time monitoring: Uptime, errors, billing activity
- **Components**: Interactive charts, Date pickers, Export buttons

## Implementation Notes

- **Authentication**: All pages require admin authentication
- **Responsive Design**: Mobile-friendly layouts
- **Loading States**: Use loading.tsx for async operations
- **Error Handling**: Use error.tsx for failed operations
- **Data Fetching**: Implement API calls for real data
- **Permissions**: Role-based access control
- **Testing**: Unit tests for components, integration tests for pages
