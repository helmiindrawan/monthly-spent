import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import { useTransactions } from './hooks/useTransactions';

function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Monthly Spending</h1>
            <p className="text-gray-500 mt-1">Track your expenses easily</p>
          </div>
        </header>

        <main>
          <TransactionForm onAdd={addTransaction} />

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 px-1">Transaction History</h2>
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
            />
          </div>
        </main>

        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Monthly Spending App</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
