import React, { createContext, useState, useContext, useEffect } from 'react';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';

// Create a context for transactions
const TransactionsContext = createContext();

// Provider component
export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  // Fetch transactions function
  const fetchTransactions = async () => {
    setLoading(true);
    if (user) {
      try {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let transactionsArray = [];
        querySnapshot.forEach((doc) => {
          transactionsArray.push(doc.data());
        });

        setTransactions(transactionsArray);
        // toast.success("Transactions Fetched!");
        console.log(transactionsArray);
        
      } catch (error) {
        console.error("Error fetching transactions:", error);
        // toast.error("Failed to fetch transactions");
      }
    }
    setLoading(false);
  };

  const addTransaction = async (transaction) => {
    try {
      const newArr = [...transactions, transaction];
      setTransactions(newArr);
      
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      
      toast.success("Transaction Added!");
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
      return false;
    }
  };

  // Calculate balance
  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    return {
      income: incomeTotal,
      expense: expensesTotal,
      balance: incomeTotal - expensesTotal
    };
  };

  // Fetch transactions when user changes
  useEffect(() => {
    fetchTransactions();
  }, [user]);

  // Provide context values
  return (
    <TransactionsContext.Provider 
      value={{ 
        transactions, 
        setTransactions, 
        fetchTransactions, 
        addTransaction, 
        calculateBalance,
        loading 
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

// Custom hook to use the transactions context
export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};