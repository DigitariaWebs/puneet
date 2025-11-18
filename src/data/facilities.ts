export const facilities = [
  {
    id: 1,
    name: "Paws & Play Daycare",
    status: "active",
    plan: "Premium",
    dayJoined: "2023-06-15",
    subscriptionEnd: "2024-06-15",
    locationsList: [
      {
        name: "Main Campus",
        address: "123 Main St, Cityville",
        services: ["daycare", "grooming"],
      },
      {
        name: "Branch Office",
        address: "456 Elm St, Cityville",
        services: ["boarding"],
      },
    ],
    clients: [
      {
        person: {
          name: "Alice Johnson",
          email: "alice@example.com",
          phone: "123-456-7890",
        },
        status: "active",
      },
      {
        person: {
          name: "Bob Smith",
          email: "bob@example.com",
          phone: "098-765-4321",
        },
        status: "active",
      },
      {
        person: { name: "Charlie Brown", email: "charlie@example.com" },
        status: "inactive",
      },
    ],
    usersList: [
      {
        person: { name: "Admin User", email: "admin@pawsplay.com" },
        role: "Admin",
      },
      {
        person: { name: "Manager One", email: "manager1@pawsplay.com" },
        role: "Manager",
      },
      {
        person: { name: "Staff One", email: "staff1@pawsplay.com" },
        role: "Staff",
      },
    ],
  },
  {
    id: 2,
    name: "Furry Friends Grooming",
    status: "active",
    plan: "Basic",
    dayJoined: "2023-08-22",
    subscriptionEnd: "2024-08-22",
    locationsList: [
      {
        name: "Downtown Salon",
        address: "789 Oak St, Townburg",
        services: ["grooming", "daycare"],
      },
    ],
    clients: [
      {
        person: {
          name: "Diana Prince",
          email: "diana@example.com",
          phone: "111-222-3333",
        },
        status: "active",
      },
      {
        person: { name: "Eve Adams", email: "eve@example.com" },
        status: "active",
      },
    ],
    usersList: [
      {
        person: { name: "Admin Groom", email: "admin@furryfriends.com" },
        role: "Admin",
      },
      {
        person: { name: "Staff Groom", email: "staff@furryfriends.com" },
        role: "Staff",
      },
    ],
  },
  {
    id: 3,
    name: "Happy Tails Boarding",
    status: "inactive",
    plan: "Enterprise",
    dayJoined: "2023-03-10",
    subscriptionEnd: "2024-03-10",
    locationsList: [
      {
        name: "Main Kennel",
        address: "321 Pine St, Villagetown",
        services: ["boarding", "grooming"],
      },
      {
        name: "East Wing",
        address: "654 Cedar St, Villagetown",
        services: ["boarding"],
      },
      {
        name: "West Annex",
        address: "987 Birch St, Villagetown",
        services: ["daycare"],
      },
    ],
    clients: [
      {
        person: {
          name: "Frank Miller",
          email: "frank@example.com",
          phone: "444-555-6666",
        },
        status: "active",
      },
      {
        person: { name: "Grace Lee", email: "grace@example.com" },
        status: "inactive",
      },
      {
        person: {
          name: "Henry Wilson",
          email: "henry@example.com",
          phone: "777-888-9999",
        },
        status: "active",
      },
    ],
    usersList: [
      {
        person: { name: "Admin Board", email: "admin@happytails.com" },
        role: "Admin",
      },
      {
        person: { name: "Manager Board", email: "manager@happytails.com" },
        role: "Manager",
      },
      {
        person: { name: "Staff Board1", email: "staff1@happytails.com" },
        role: "Staff",
      },
      {
        person: { name: "Staff Board2", email: "staff2@happytails.com" },
        role: "Staff",
      },
    ],
  },
  {
    id: 4,
    name: "Pet Paradise Vet",
    status: "active",
    plan: "Premium",
    dayJoined: "2023-11-05",
    subscriptionEnd: "2024-11-05",
    locationsList: [
      {
        name: "Central Clinic",
        address: "147 Maple St, Metro City",
        services: ["vet", "grooming"],
      },
    ],
    clients: [
      {
        person: {
          name: "Ivy Chen",
          email: "ivy@example.com",
          phone: "000-111-2222",
        },
        status: "active",
      },
      {
        person: { name: "Jack Davis", email: "jack@example.com" },
        status: "active",
      },
      {
        person: {
          name: "Karen Taylor",
          email: "karen@example.com",
          phone: "333-444-5555",
        },
        status: "inactive",
      },
    ],
    usersList: [
      {
        person: { name: "Admin Vet", email: "admin@petparadise.com" },
        role: "Admin",
      },
      {
        person: { name: "Manager Vet", email: "manager@petparadise.com" },
        role: "Manager",
      },
      {
        person: { name: "Staff Vet", email: "staff@petparadise.com" },
        role: "Staff",
      },
    ],
  },
  {
    id: 5,
    name: "Whisker Wonderland",
    status: "active",
    plan: "Basic",
    dayJoined: "2023-09-18",
    subscriptionEnd: "2024-09-18",
    locationsList: [
      {
        name: "Cat Haven",
        address: "258 Spruce St, Catville",
        services: ["daycare", "boarding"],
      },
      {
        name: "Play Area",
        address: "369 Fir St, Catville",
        services: ["daycare"],
      },
    ],
    clients: [
      {
        person: {
          name: "Liam Garcia",
          email: "liam@example.com",
          phone: "666-777-8888",
        },
        status: "active",
      },
      {
        person: { name: "Mia Rodriguez", email: "mia@example.com" },
        status: "active",
      },
    ],
    usersList: [
      {
        person: { name: "Admin Cat", email: "admin@whisker.com" },
        role: "Admin",
      },
      {
        person: { name: "Staff Cat", email: "staff@whisker.com" },
        role: "Staff",
      },
    ],
  },
];
