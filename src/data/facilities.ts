export const facilities = [
  {
    id: 1,
    name: "Paws & Play Daycare",
    status: "active",
    plan: "Premium",
    dayJoined: "2025-06-15",
    subscriptionEnd: "2026-06-15",
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
    dayJoined: "2025-08-22",
    subscriptionEnd: "2026-08-22",
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
    dayJoined: "2025-03-10",
    subscriptionEnd: "2026-03-10",
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
    dayJoined: "2025-11-05",
    subscriptionEnd: "2026-11-05",
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
    dayJoined: "2025-09-18",
    subscriptionEnd: "2026-09-18",
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
  {
    id: 6,
    name: "Pet Groomers Paradise",
    status: "active",
    plan: "Premium",
    dayJoined: "2025-07-12",
    subscriptionEnd: "2026-07-12",
    locationsList: [
      {
        name: "Main Salon",
        address: "741 Elm St, Groomtown",
        services: ["grooming", "daycare"],
      },
      {
        name: "Express Lane",
        address: "852 Oak St, Groomtown",
        services: ["grooming"],
      },
    ],
    clients: [
      {
        person: {
          name: "Nina Patel",
          email: "nina@example.com",
          phone: "999-000-1111",
        },
        status: "active",
      },
      {
        person: {
          name: "Oscar Kim",
          email: "oscar@example.com",
          phone: "222-333-4444",
        },
        status: "active",
      },
      {
        person: { name: "Paula Lee", email: "paula@example.com" },
        status: "inactive",
      },
    ],
    usersList: [
      {
        person: { name: "Admin Groom2", email: "admin@petgroomers.com" },
        role: "Admin",
      },
      {
        person: { name: "Manager Groom", email: "manager@petgroomers.com" },
        role: "Manager",
      },
      {
        person: { name: "Staff Groom2", email: "staff2@petgroomers.com" },
        role: "Staff",
      },
    ],
  },
  {
    id: 7,
    name: "Animal Care Center",
    status: "active",
    plan: "Basic",
    dayJoined: "2025-10-05",
    subscriptionEnd: "2026-10-05",
    locationsList: [
      {
        name: "Central Clinic",
        address: "963 Pine St, Careville",
        services: ["vet", "grooming", "boarding"],
      },
    ],
    clients: [
      {
        person: {
          name: "Quinn Taylor",
          email: "quinn@example.com",
          phone: "555-666-7777",
        },
        status: "active",
      },
      {
        person: { name: "Rachel Adams", email: "rachel@example.com" },
        status: "active",
      },
    ],
    usersList: [
      {
        person: { name: "Admin Care", email: "admin@animalcare.com" },
        role: "Admin",
      },
      {
        person: { name: "Staff Care", email: "staff@animalcare.com" },
        role: "Staff",
      },
    ],
  },
  {
    id: 8,
    name: "Feline Friends",
    status: "inactive",
    plan: "Enterprise",
    dayJoined: "2025-02-20",
    subscriptionEnd: "2026-02-20",
    locationsList: [
      {
        name: "Cat Lounge",
        address: "147 Birch St, Feline City",
        services: ["daycare", "boarding"],
      },
      {
        name: "Grooming Room",
        address: "258 Cedar St, Feline City",
        services: ["grooming"],
      },
    ],
    clients: [
      {
        person: {
          name: "Sam Wilson",
          email: "sam@example.com",
          phone: "888-999-0000",
        },
        status: "active",
      },
      {
        person: { name: "Tina Garcia", email: "tina@example.com" },
        status: "inactive",
      },
      {
        person: {
          name: "Uma Patel",
          email: "uma@example.com",
          phone: "111-222-3333",
        },
        status: "active",
      },
    ],
    usersList: [
      {
        person: { name: "Admin Feline", email: "admin@felinefriends.com" },
        role: "Admin",
      },
      {
        person: { name: "Manager Feline", email: "manager@felinefriends.com" },
        role: "Manager",
      },
      {
        person: { name: "Staff Feline1", email: "staff1@felinefriends.com" },
        role: "Staff",
      },
      {
        person: { name: "Staff Feline2", email: "staff2@felinefriends.com" },
        role: "Staff",
      },
    ],
  },
  {
    id: 9,
    name: "Doggy Day Spa",
    status: "active",
    plan: "Premium",
    dayJoined: "2025-12-01",
    subscriptionEnd: "2026-12-01",
    locationsList: [
      {
        name: "Spa Center",
        address: "369 Maple St, Dogtown",
        services: ["grooming", "daycare", "boarding"],
      },
    ],
    clients: [
      {
        person: {
          name: "Victor Chen",
          email: "victor@example.com",
          phone: "444-555-6666",
        },
        status: "active",
      },
      {
        person: { name: "Wendy Liu", email: "wendy@example.com" },
        status: "active",
      },
      {
        person: {
          name: "Xavier Kim",
          email: "xavier@example.com",
          phone: "777-888-9999",
        },
        status: "active",
      },
    ],
    usersList: [
      {
        person: { name: "Admin Spa", email: "admin@doggyspa.com" },
        role: "Admin",
      },
      {
        person: { name: "Manager Spa", email: "manager@doggyspa.com" },
        role: "Manager",
      },
      {
        person: { name: "Staff Spa", email: "staff@doggyspa.com" },
        role: "Staff",
      },
    ],
  },
  {
    id: 10,
    name: "Exotic Pets Hub",
    status: "active",
    plan: "Basic",
    dayJoined: "2025-05-15",
    subscriptionEnd: "2026-05-15",
    locationsList: [
      {
        name: "Exotic Wing",
        address: "741 Walnut St, Exoticville",
        services: ["boarding", "vet"],
      },
      {
        name: "Reptile Room",
        address: "852 Chestnut St, Exoticville",
        services: ["boarding"],
      },
    ],
    clients: [
      {
        person: {
          name: "Yara Ahmed",
          email: "yara@example.com",
          phone: "000-111-2222",
        },
        status: "active",
      },
      {
        person: { name: "Zoe Martinez", email: "zoe@example.com" },
        status: "active",
      },
    ],
    usersList: [
      {
        person: { name: "Admin Exotic", email: "admin@exoticpets.com" },
        role: "Admin",
      },
      {
        person: { name: "Staff Exotic", email: "staff@exoticpets.com" },
        role: "Staff",
      },
    ],
  },
];
