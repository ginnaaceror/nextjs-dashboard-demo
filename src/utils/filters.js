export function filterByDate(transactions, filter) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.createdAt);

    switch (filter) {
      case "today":
        return transactionDate >= today;

      case "week":
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return transactionDate >= weekAgo;

      case "month":
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return transactionDate >= firstDayOfMonth;

      default:
        return true;
    }
  });
}

export function filterBySearch(transactions, searchTerm) {
  if (!searchTerm.trim()) return transactions;

  const term = searchTerm.toLowerCase();

  return transactions.filter((transaction) => {
    const searchableFields = [
      transaction.id,
      transaction.status,
      transaction.paymentMethod?.type,
      transaction.amount?.toString(),
      transaction.transactionReference,
    ];

    return searchableFields.some((field) =>
      field?.toLowerCase().includes(term)
    );
  });
}

export function filterByPaymentType(transactions, filters) {
  if (filters.all) return transactions;

  const hasSpecificFilters = filters.dataphone || filters.paymentLink;
  if (!hasSpecificFilters) return transactions;

  return transactions.filter((transaction) => {
    const isTerminal = transaction.salesType === "TERMINAL";
    const isPaymentLink = transaction.salesType === "PAYMENT_LINK";

    return (
      (filters.dataphone && isTerminal) ||
      (filters.paymentLink && isPaymentLink)
    );
  });
}

export function calculateTotal(transactions) {
  return transactions
    .filter((t) => t.status === "SUCCESSFUL")
    .reduce((sum, t) => sum + (t.amount || 0), 0);
}

export function getCurrentMonth() {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return months[new Date().getMonth()];
}
