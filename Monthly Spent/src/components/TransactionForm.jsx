import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const TransactionForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount || !formData.description || !formData.date) return;

        onAdd(formData);
        setFormData({
            date: new Date().toISOString().split('T')[0],
            amount: '',
            description: ''
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-600" />
                Add Transaction
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="w-full md:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trx Date</label>
                    <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div className="w-full md:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trx Description</label>
                    <input
                        type="text"
                        required
                        placeholder="Groceries, Rent, Coffee..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div className="w-full md:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trx Amount (IDR)</label>
                    <input
                        type="number"
                        required
                        placeholder="0"
                        step="1"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    Add
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
