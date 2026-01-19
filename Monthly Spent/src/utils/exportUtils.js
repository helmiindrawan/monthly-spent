import * as XLSX from 'xlsx';

export const exportToExcel = (transactions) => {
    if (!transactions || transactions.length === 0) {
        alert("No transactions to export");
        return;
    }

    const workbook = XLSX.utils.book_new();

    // Group transactions by month (YYYY-MM)
    const grouped = transactions.reduce((acc, t) => {
        const date = new Date(t.date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const key = `${year}-${month}`;

        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push({
            Date: t.date,
            Description: t.description,
            Amount: t.amount
        });
        return acc;
    }, {});

    // Create a sheet for each month
    Object.keys(grouped).sort().forEach(monthKey => {
        const sheetData = grouped[monthKey];
        const worksheet = XLSX.utils.json_to_sheet(sheetData);

        // Add simple column widths
        const wscols = [
            { wch: 15 }, // Date
            { wch: 40 }, // Description
            { wch: 15 }, // Amount
        ];
        worksheet['!cols'] = wscols;

        XLSX.utils.book_append_sheet(workbook, worksheet, monthKey);
    });

    XLSX.writeFile(workbook, `Monthly_Spending_${new Date().toISOString().slice(0, 10)}.xlsx`);
};
