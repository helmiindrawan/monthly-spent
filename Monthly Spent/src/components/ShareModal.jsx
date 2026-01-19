import { X, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

const ShareModal = ({ isOpen, onClose, data }) => {
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (data) {
            const { monthName, transactions, total } = data;

            const formatCurrency = (amount) => {
                return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }).format(amount);
            };

            const formatDateShort = (dateString) => {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
            };

            let text = `*Monthly Spending - ${monthName}*\n\n`;
            transactions.forEach(t => {
                text += `• ${formatDateShort(t.date)} - ${t.description}: ${formatCurrency(t.amount)}\n`;
            });
            text += `\n*TOTAL: ${formatCurrency(total)}*`;

            setMessage(text);
        }
    }, [data]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all scale-100 opacity-100">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800">Export for WhatsApp</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 bg-gray-50">
                    <div className="bg-[#dcf8c6] p-4 rounded-lg shadow-sm border border-green-100 relative mb-4">
                        {/* WhatsApp Bubble Triangle */}
                        <div className="absolute top-0 -left-2 w-4 h-4 bg-[#dcf8c6] transform rotate-45 border-l border-b border-green-100"></div>

                        <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                            {message}
                        </pre>
                    </div>

                    <button
                        onClick={handleCopy}
                        className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-200 shadow-sm ${copied
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-white border-2 border-green-600 text-green-700 hover:bg-green-50'
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-5 h-5" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-5 h-5" />
                                Copy to Clipboard
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
