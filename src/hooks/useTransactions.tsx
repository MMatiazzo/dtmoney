import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

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
  createTransation: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("transaction")
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransation(transactionInput: TransactionInput) {
    const response = await api.post("/transaction", {
      ...transactionInput,
      createdAt: new Date()
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransation }}>
      {children}
    </ TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}