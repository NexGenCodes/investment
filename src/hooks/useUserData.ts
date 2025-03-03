// src/hooks/useUserData.ts
import { useState, useEffect } from 'react';

// Define the structure for a transaction
interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal'; // Restricting to known types
  amount: number;
  date: string;
}

// Define user data structure
interface UserData {
  balance: number;
  transactions: Transaction[];
}

// Mock data function
const getMockUserData = (): UserData => ({
  balance: 1500.75,
  transactions: [
    { id: 1, type: 'deposit', amount: 500, date: '2025-02-27' },
    { id: 2, type: 'withdrawal', amount: 200, date: '2025-02-26' },
    { id: 3, type: 'deposit', amount: 300, date: '2025-02-25' },
  ],
});

const useUserData = (): { data: UserData | null; loading: boolean; error: string | null } => {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating an API delay
        setTimeout(() => {
          const mockData = getMockUserData();
          setData(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
      
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useUserData;
