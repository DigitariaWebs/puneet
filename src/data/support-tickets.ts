export interface SupportTicket extends Record<string, unknown> {
  id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High" | "Urgent";
  requester: string; // e.g., "Facility Admin" or client name
  facility: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  category: string; // e.g., "Technical", "Billing", "Service"
  messages?: {
    id: string;
    sender: string;
    message: string;
    timestamp: string;
  }[];
}

export const supportTickets: SupportTicket[] = [
  {
    id: "TICK-001",
    title: "Unable to access booking system",
    description:
      "Facility admin cannot log into the booking dashboard after password reset.",
    status: "In Progress",
    priority: "High",
    requester: "John Doe (Facility Admin)",
    facility: "Facility ABC",
    createdAt: "2023-10-01T09:00:00Z",
    updatedAt: "2023-10-01T10:30:00Z",
    assignedTo: "Support Team A",
    category: "Technical",
    messages: [
      {
        id: "msg-1",
        sender: "John Doe",
        message: "I reset my password but still can't log in.",
        timestamp: "2023-10-01T09:00:00Z",
      },
      {
        id: "msg-2",
        sender: "Support Agent",
        message: "Please try clearing your browser cache and try again.",
        timestamp: "2023-10-01T09:15:00Z",
      },
    ],
  },
  {
    id: "TICK-002",
    title: "Billing discrepancy for October",
    description: "Invoice shows incorrect amount for premium services.",
    status: "Open",
    priority: "Medium",
    requester: "Jane Smith (Facility Admin)",
    facility: "Facility XYZ",
    createdAt: "2023-10-02T14:00:00Z",
    updatedAt: "2023-10-02T14:00:00Z",
    category: "Billing",
  },
  {
    id: "TICK-003",
    title: "Client complaint about service quality",
    description:
      "Client reported unsatisfactory grooming service and wants refund.",
    status: "Resolved",
    priority: "High",
    requester: "Mike Johnson (Client)",
    facility: "Facility DEF",
    createdAt: "2023-10-03T11:00:00Z",
    updatedAt: "2023-10-03T16:00:00Z",
    assignedTo: "Support Team B",
    category: "Service",
    messages: [
      {
        id: "msg-3",
        sender: "Mike Johnson",
        message: "The grooming was terrible, my dog looks awful.",
        timestamp: "2023-10-03T11:00:00Z",
      },
      {
        id: "msg-4",
        sender: "Support Agent",
        message:
          "We're sorry to hear that. We'll process a full refund and investigate.",
        timestamp: "2023-10-03T11:30:00Z",
      },
    ],
  },
  {
    id: "TICK-004",
    title: "Feature request: Mobile app improvements",
    description:
      "Request for better mobile app functionality for staff scheduling.",
    status: "Open",
    priority: "Low",
    requester: "Sarah Wilson (Facility Admin)",
    facility: "Facility GHI",
    createdAt: "2023-10-04T08:00:00Z",
    updatedAt: "2023-10-04T08:00:00Z",
    category: "Feature Request",
  },
  {
    id: "TICK-005",
    title: "Urgent: System outage affecting all bookings",
    description:
      "Complete system downtime preventing any bookings or check-ins.",
    status: "Resolved",
    priority: "Urgent",
    requester: "System Alert",
    facility: "All Facilities",
    createdAt: "2023-10-05T02:00:00Z",
    updatedAt: "2023-10-05T03:00:00Z",
    assignedTo: "DevOps Team",
    category: "Technical",
  },
];
