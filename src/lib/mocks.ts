export const invoicesMock = [
  {
    id: 1,
    client_name: 'Client 1',
    total_amount: 100,
    status: 'paid',
    items: [
      {
        id: 1,
        description: 'Change button color',
        amount: 250,
      },
      {
        id: 2,
        description: 'Implement animated navigation menu',
        amount: 450,
      },
      {
        id: 3,
        description: 'Optimize website images for faster loading',
        amount: 300,
      },
      {
        id: 4,
        description: 'Add form validation to user registration',
        amount: 350,
      },
      {
        id: 5,
        description: 'Create a responsive layout for mobile devices',
        amount: 400,
      },
    ],
  },
  {
    id: 2,
    client_name: 'Client 2',
    total_amount: 200,
    status: 'unpaid',
    items: [
      {
        id: 1,
        description: 'Change button color',
        amount: 250,
      },
      {
        id: 2,
        description: 'Implement animated navigation menu',
        amount: 780,
      },
      {
        id: 3,
        description: 'Optimize website images for faster loading',
        amount: 110,
      },
      {
        id: 4,
        description: 'Add form validation to user registration',
        amount: 350,
      },
      {
        id: 5,
        description: 'Create a responsive layout for mobile devices',
        amount: 400,
      },
    ],
  },
];

export const clientsMock = [
  { id: 1, name: 'Client 1' },
  { id: 2, name: 'Client 2' },
];
