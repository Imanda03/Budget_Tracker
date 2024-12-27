export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    category: string;
    amount: number;
    date: string;
    description: string;
}

export const mockTransactions: Transaction[] = [
    {
        id: '1',
        type: 'income',
        category: 'Salary',
        amount: 5000,
        date: '2024-09-25',
        description: 'Monthly salary'
    },
    {
        id: '2',
        type: 'expense',
        category: 'Shopping',
        amount: 150,
        date: '2024-09-24',
        description: 'Groceries'
    },
    {
        id: '3',
        type: 'expense',
        category: 'Transport',
        amount: 30,
        date: '2024-09-24',
        description: 'Uber ride'
    },
    {
        id: '4',
        type: 'income',
        category: 'Freelance',
        amount: 1000,
        date: '2024-09-23',
        description: 'Project payment'
    },
];