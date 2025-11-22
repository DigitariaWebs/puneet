export interface Announcement extends Record<string, unknown> {
  id: string;
  title: string;
  content: string;
  target: "All Facilities" | "Specific Facilities";
  facilities?: string[]; // if specific
  createdAt: string;
  author: string;
  status: "Draft" | "Published" | "Archived";
  priority: "Low" | "Normal" | "High";
}

export const announcements: Announcement[] = [
  {
    id: "ANN-001",
    title: "Platform Maintenance Scheduled",
    content: "The platform will undergo scheduled maintenance on October 15th from 2-4 AM EST. Services may be temporarily unavailable during this time.",
    target: "All Facilities",
    createdAt: "2023-10-01T08:00:00Z",
    author: "Platform Admin",
    status: "Published",
    priority: "High",
  },
  {
    id: "ANN-002",
    title: "New Feature: Enhanced Booking System",
    content: "We've released an updated booking system with improved mobile support and faster check-in processes. Check out the new features in your dashboard.",
    target: "All Facilities",
    createdAt: "2023-10-03T10:00:00Z",
    author: "Product Team",
    status: "Published",
    priority: "Normal",
  },
  {
    id: "ANN-003",
    title: "Holiday Hours Reminder",
    content: "Please note our adjusted hours for the upcoming holiday. Support will be limited from Dec 24-26. Emergency support available via email.",
    target: "All Facilities",
    createdAt: "2023-10-05T14:00:00Z",
    author: "Support Team",
    status: "Published",
    priority: "Normal",
  },
  {
    id: "ANN-004",
    title: "Facility-Specific Update",
    content: "Facility ABC: New grooming equipment has been installed. Staff training will occur next week.",
    target: "Specific Facilities",
    facilities: ["Facility ABC"],
    createdAt: "2023-10-07T09:00:00Z",
    author: "Operations Team",
    status: "Published",
    priority: "Low",
  },
  {
    id: "ANN-005",
    title: "Draft: Upcoming Training Session",
    content: "A training session on the new CRM features will be held on October 20th. Details to follow.",
    target: "All Facilities",
    createdAt: "2023-10-08T11:00:00Z",
    author: "Training Team",
    status: "Draft",
    priority: "Normal",
  },
];
