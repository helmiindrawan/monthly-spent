import { Trash2, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import ShareModal from './ShareModal';

const TransactionList = ({ transactions, onDelete }) => {
    const [shareData, setShareData] = useState(null);

    // Group transactions by "YYYY-MM"
    const groupedTransactions = transactions.reduce((groups, t) => {
        const date = new Date(t.date);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(t);
        return groups;
    }, {});

    // Sort months descending (newest first)
    const sortedMonthKeys = Object.keys(groupedTransactions).sort((a, b) => b.localeCompare(a));

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(/ /g, '-');
    };

    const formatMonthHeader = (key) => {
        const [year, month] = key.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const handleShare = (monthKey, monthTransactions, total) => {
        setShareData({
            monthName: formatMonthHeader(monthKey),
            transactions: monthTransactions,
            total: total
        });
    };

    if (transactions.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                No transactions yet. Start adding some!
            </div>
        );
    }

    return (
        <>
            <div className="space-y-8">
                {sortedMonthKeys.map((monthKey) => {
                    const monthTransactions = groupedTransactions[monthKey].sort((a, b) => new Date(b.date) - new Date(a.date));
                    const monthTotal = monthTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);

                    return (
                        <div key={monthKey} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-lg font-bold text-gray-800">{formatMonthHeader(monthKey)}</h3>
                                    <button
                                        onClick={() => handleShare(monthKey, monthTransactions, monthTotal)}
                                        className="flex items-center gap-1.5 px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-full text-xs font-semibold transition-colors shadow-sm"
                                        title="Share via WhatsApp"
                                    >
                                        <MessageCircle className="w-3.5 h-3.5" />
                                        Share
                                    </button>
                                </div>
                                <span className="text-sm font-medium text-indigo-600 bg-white px-3 py-1 rounded-full shadow-sm">
                                    Total: {formatCurrency(monthTotal)}
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white border-b border-gray-100">
                                            <th className="p-4 text-sm font-semibold text-gray-600">Trx Date</th>
                                            <th className="p-4 text-sm font-semibold text-gray-600">Trx Description</th>
                                            <th className="p-4 text-sm font-semibold text-gray-600 text-right">Trx Amount</th>
                                            <th className="p-4 text-sm font-semibold text-gray-600 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {monthTransactions.map((t) => (
                                            <tr key={t.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                                <td className="p-4 text-gray-700">{formatDate(t.date)}</td>
                                                <td className="p-4 text-gray-800 font-medium">{t.description}</td>
                                                <td className="p-4 text-right text-gray-900 font-semibold">{formatCurrency(t.amount)}</td>
                                                <td className="p-4 text-center">
                                                    <button
                                                        onClick={() => onDelete(t.id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>

            <ShareModal
                isOpen={!!shareData}
                onClose={() => setShareData(null)}
                data={shareData}
            />
        </>
    );
};

export default TransactionList;
