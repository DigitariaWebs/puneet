export interface Incident extends Record<string, unknown> {
  id: string;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Resolved";
  reporter: string; // facility admin name or "System"
  facility: string; // facility name
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
  attachments?: string[]; // URLs or file names
  involvedStaff?: {
    name: string;
    role: string;
    email: string;
    phone?: string;
  }[];
  involvedClients?: {
    name: string;
    email: string;
    phone?: string;
    petName?: string;
  }[];
}

export const incidents: Incident[] = [
  {
    id: "INC-001",
    title: "Pet Injury During Daycare Session",
    description:
      "A client's dog was injured during playtime at the daycare facility, requiring veterinary attention.",
    severity: "High",
    status: "Resolved",
    reporter: "Sarah Wilson (Facility Admin)",
    facility: "Facility ABC",
    createdAt: "2023-10-01T10:00:00Z",
    updatedAt: "2023-10-01T11:00:00Z",
    resolvedAt: "2023-10-01T11:00:00Z",
    resolutionNotes:
      "Inspected play area, reinforced safety protocols, and covered veterinary costs. Staff retrained on supervision.",
    attachments: ["incident_report.pdf", "vet_bill.jpg"],
    involvedStaff: [
      {
        name: "Emily Davis",
        role: "Daycare Supervisor",
        email: "emily.davis@facilityabc.com",
        phone: "555-123-4567",
      },
      {
        name: "Tom Johnson",
        role: "Daycare Attendant",
        email: "tom.johnson@facilityabc.com",
        phone: "555-234-5678",
      },
    ],
    involvedClients: [
      {
        name: "Robert Martinez",
        email: "robert.martinez@email.com",
        phone: "555-345-6789",
        petName: "Buddy",
      },
    ],
  },
  {
    id: "INC-002",
    title: "Unsatisfactory Grooming Service",
    description:
      "Client reported poor grooming quality - pet's coat was unevenly cut and matted fur remained.",
    severity: "Medium",
    status: "In Progress",
    reporter: "John Doe (Facility Admin)",
    facility: "Facility XYZ",
    createdAt: "2023-10-02T14:30:00Z",
    updatedAt: "2023-10-03T09:00:00Z",
    involvedStaff: [
      {
        name: "Anna Lee",
        role: "Groomer",
        email: "anna.lee@facilityxyz.com",
        phone: "555-456-7890",
      },
    ],
    involvedClients: [
      {
        name: "Maria Garcia",
        email: "maria.garcia@email.com",
        phone: "555-567-8901",
        petName: "Whiskers",
      },
    ],
  },
  {
    id: "INC-003",
    title: "Boarding Facility Cleanliness Issues",
    description:
      "Client complained about dirty kennels and strong odors during their pet's boarding stay.",
    severity: "Medium",
    status: "Open",
    reporter: "Jane Smith (Facility Admin)",
    facility: "Facility DEF",
    createdAt: "2023-10-04T16:45:00Z",
    updatedAt: "2023-10-04T16:45:00Z",
    involvedStaff: [
      {
        name: "Carlos Rodriguez",
        role: "Boarding Manager",
        email: "carlos.rodriguez@facilitydef.com",
        phone: "555-678-9012",
      },
      {
        name: "Linda Chen",
        role: "Cleaning Staff",
        email: "linda.chen@facilitydef.com",
      },
    ],
    involvedClients: [
      {
        name: "David Wilson",
        email: "david.wilson@email.com",
        phone: "555-789-0123",
        petName: "Max",
      },
    ],
  },
  {
    id: "INC-004",
    title: "Delayed Pet Pickup After Service",
    description:
      "Client waited 45 minutes past scheduled pickup time for their pet after grooming appointment.",
    severity: "Low",
    status: "Resolved",
    reporter: "Mike Johnson (Facility Admin)",
    facility: "Facility GHI",
    createdAt: "2023-10-05T02:00:00Z",
    updatedAt: "2023-10-05T03:30:00Z",
    resolvedAt: "2023-10-05T03:30:00Z",
    resolutionNotes:
      "Apologized to client, provided complimentary service, and reviewed scheduling procedures.",
    involvedStaff: [
      {
        name: "Rachel Kim",
        role: "Front Desk",
        email: "rachel.kim@facilityghi.com",
        phone: "555-890-1234",
      },
      {
        name: "Kevin Patel",
        role: "Groomer",
        email: "kevin.patel@facilityghi.com",
      },
    ],
    involvedClients: [
      {
        name: "Jennifer Taylor",
        email: "jennifer.taylor@email.com",
        phone: "555-901-2345",
        petName: "Luna",
      },
    ],
  },
  {
    id: "INC-005",
    title: "Staff Misconduct with Client Pet",
    description:
      "Client reported inappropriate handling of their pet by staff member during check-in.",
    severity: "Critical",
    status: "Open",
    reporter: "Lisa Brown (Facility Admin)",
    facility: "Facility JKL",
    createdAt: "2023-10-06T12:00:00Z",
    updatedAt: "2023-10-06T12:00:00Z",
    involvedStaff: [
      {
        name: "James Wilson",
        role: "Receptionist",
        email: "james.wilson@facilityjkl.com",
        phone: "555-012-3456",
      },
    ],
    involvedClients: [
      {
        name: "Susan Anderson",
        email: "susan.anderson@email.com",
        phone: "555-123-4567",
        petName: "Charlie",
      },
    ],
  },
];
