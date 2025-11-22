export interface ChatConversation extends Record<string, unknown> {
  id: string;
  participants: string[];
  messages: {
    id: string;
    sender: string;
    message: string;
    timestamp: string;
  }[];
  status: "Active" | "Closed";
  createdAt: string;
  updatedAt: string;
  facility?: string;
}

export const chatConversations: ChatConversation[] = [
  {
    id: "CHAT-001",
    participants: ["John Doe (Facility Admin)", "Support Agent"],
    messages: [
      {
        id: "msg-1",
        sender: "John Doe",
        message: "Hi, I'm having trouble with the booking system.",
        timestamp: "2023-10-01T09:00:00Z",
      },
      {
        id: "msg-2",
        sender: "Support Agent",
        message: "Hello John! What specific issue are you experiencing?",
        timestamp: "2023-10-01T09:05:00Z",
      },
      {
        id: "msg-3",
        sender: "John Doe",
        message: "The calendar isn't loading properly.",
        timestamp: "2023-10-01T09:10:00Z",
      },
    ],
    status: "Active",
    createdAt: "2023-10-01T09:00:00Z",
    updatedAt: "2023-10-01T09:10:00Z",
    facility: "Facility ABC",
  },
  {
    id: "CHAT-002",
    participants: ["Jane Smith (Facility Admin)", "Support Agent"],
    messages: [
      {
        id: "msg-4",
        sender: "Jane Smith",
        message: "Can you help with billing questions?",
        timestamp: "2023-10-02T14:00:00Z",
      },
      {
        id: "msg-5",
        sender: "Support Agent",
        message: "Of course! What billing issue are you facing?",
        timestamp: "2023-10-02T14:02:00Z",
      },
    ],
    status: "Active",
    createdAt: "2023-10-02T14:00:00Z",
    updatedAt: "2023-10-02T14:02:00Z",
    facility: "Facility XYZ",
  },
  {
    id: "CHAT-003",
    participants: ["Mike Johnson (Client)", "Support Agent"],
    messages: [
      {
        id: "msg-6",
        sender: "Mike Johnson",
        message: "I want to complain about the service I received.",
        timestamp: "2023-10-03T11:00:00Z",
      },
      {
        id: "msg-7",
        sender: "Support Agent",
        message: "I'm sorry to hear that. Can you provide more details?",
        timestamp: "2023-10-03T11:05:00Z",
      },
      {
        id: "msg-8",
        sender: "Mike Johnson",
        message: "The grooming was very poor quality.",
        timestamp: "2023-10-03T11:10:00Z",
      },
      {
        id: "msg-9",
        sender: "Support Agent",
        message:
          "Thank you for the feedback. We'll investigate and get back to you.",
        timestamp: "2023-10-03T11:15:00Z",
      },
    ],
    status: "Closed",
    createdAt: "2023-10-03T11:00:00Z",
    updatedAt: "2023-10-03T11:15:00Z",
    facility: "Facility DEF",
  },
];
