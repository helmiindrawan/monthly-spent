import { useState, useEffect } from 'react';

const STORAGE_KEY = 'monthly_transactions';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Failed to parse transactions", e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (transaction) => {
        const newTransaction = {
            ...transaction,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            amount: parseFloat(transaction.amount) // Ensure amount is number
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const clearTransactions = () => {
        setTransactions([]);
    };

    return {
        transactions,
        addTransaction,
        deleteTransaction,
        clearTransactions
    };
};
