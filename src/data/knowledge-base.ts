export interface KnowledgeBaseArticle extends Record<string, unknown> {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  views: number;
  helpful: number;
}

export const knowledgeBaseArticles: KnowledgeBaseArticle[] = [
  {
    id: "KB-001",
    title: "How to Reset Your Password",
    content:
      "To reset your password, go to the login page and click 'Forgot Password'. Enter your email address and follow the instructions sent to your email. If you don't receive the email, check your spam folder.",
    category: "Account Management",
    tags: ["password", "login", "security"],
    createdAt: "2023-09-01T10:00:00Z",
    updatedAt: "2023-09-01T10:00:00Z",
    author: "Support Team",
    views: 1250,
    helpful: 98,
  },
  {
    id: "KB-002",
    title: "Setting Up Facility Services",
    content:
      "To configure services for your facility: 1. Go to Facility Configuration. 2. Select the services you offer (boarding, daycare, grooming). 3. Set pricing and availability. 4. Save changes. Contact support if you need help with custom configurations.",
    category: "Facility Setup",
    tags: ["services", "configuration", "pricing"],
    createdAt: "2023-09-05T14:00:00Z",
    updatedAt: "2023-09-10T09:00:00Z",
    author: "Admin Team",
    views: 890,
    helpful: 85,
  },
  {
    id: "KB-003",
    title: "Troubleshooting Booking Issues",
    content:
      "If bookings aren't working: 1. Check your internet connection. 2. Clear browser cache. 3. Ensure your subscription is active. 4. Verify service availability. If issues persist, submit a support ticket with error details.",
    category: "Technical Support",
    tags: ["bookings", "troubleshooting", "errors"],
    createdAt: "2023-09-08T11:00:00Z",
    updatedAt: "2023-09-08T11:00:00Z",
    author: "Tech Support",
    views: 675,
    helpful: 76,
  },
  {
    id: "KB-004",
    title: "Managing Client Information",
    content:
      "To manage client data: Access the Clients section from your dashboard. You can add new clients, update contact information, view pet details, and track service history. Always ensure data privacy compliance.",
    category: "Client Management",
    tags: ["clients", "data", "privacy"],
    createdAt: "2023-09-12T16:00:00Z",
    updatedAt: "2023-09-12T16:00:00Z",
    author: "Compliance Team",
    views: 543,
    helpful: 92,
  },
  {
    id: "KB-005",
    title: "Billing and Payment Setup",
    content:
      "Configure billing: 1. Go to Subscription & Billing. 2. Set up payment gateways. 3. Configure tax settings. 4. Set up automatic invoicing. Contact billing support for custom pricing plans.",
    category: "Billing",
    tags: ["billing", "payments", "invoicing"],
    createdAt: "2023-09-15T13:00:00Z",
    updatedAt: "2023-09-15T13:00:00Z",
    author: "Billing Team",
    views: 432,
    helpful: 88,
  },
];
