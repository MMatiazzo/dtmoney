import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "./services/api";

interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  createdAt: string;
  type: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransation: (transaction: TransactionInput) => void; 
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("transaction")
      .then(response => setTransactions(response.data.transactions))
  }, []);

  function createTransation(transaction: TransactionInput): void {
    api.post("/transaction", transaction);
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransation}}>
      {children}
    </ TransactionsContext.Provider>
  );
}