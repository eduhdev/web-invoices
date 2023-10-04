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
        due_date: '2023-08-07',
      },
      {
        id: 2,
        description: 'Implement animated navigation menu',
        amount: 450,
        due_date: '2023-09-15',
      },
      {
        id: 3,
        description: 'Optimize website images for faster loading',
        amount: 300,
        due_date: '2023-09-30',
      },
      {
        id: 4,
        description: 'Add form validation to user registration',
        amount: 350,
        due_date: '2023-10-10',
      },
      {
        id: 5,
        description: 'Create a responsive layout for mobile devices',
        amount: 400,
        due_date: '2023-10-25',
      },
    ],
  },
  {
    id: 2,
    client_name: 'Client 2',
    total_amount: 200,
    status: 'unpaid',
  },
  {
    id: 3,
    client_name: 'Client 3',
    total_amount: 300,
    status: 'paid',
  },
  {
    id: 4,
    client_name: 'Client 4',
    total_amount: 400,
    status: 'unpaid',
  },
  {
    id: 5,
    client_name: 'Client 5',
    total_amount: 500,
    status: 'paid',
  },
];

export const clientsMock = [
  { id: 1, name: 'Client 1' },
  { id: 2, name: 'Client 2' },
];
