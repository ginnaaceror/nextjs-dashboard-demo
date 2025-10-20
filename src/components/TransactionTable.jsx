"use client";

import { useState } from "react";
import Image from "next/image";
import { formatCurrency, formatDate, maskCardNumber } from "@/utils/format";
import { getCurrentMonth } from "@/utils/filters";
import SearchBar from "./SearchBar";
import TransactionModal from "./TransactionModal";

function filterTransactionsBySearch(transaction, searchTerm) {
  if (!searchTerm) return true;

  const term = searchTerm.toLowerCase();

  const formattedDate = formatDate(transaction.createdAt).toLowerCase();

  const statusText =
    transaction.status === "SUCCESSFUL"
      ? "cobro exitoso"
      : "cobro no realizado";

  const paymentMethod = transaction.paymentMethod?.toLowerCase() || "";
  const franchise = transaction.franchise?.toLowerCase() || "";

  const salesType =
    transaction.salesType === "PAYMENT_LINK" ? "link de pago" : "datáfono";

  return (
    transaction.id?.toLowerCase().includes(term) ||
    transaction.status?.toLowerCase().includes(term) ||
    statusText.includes(term) ||
    String(transaction.transactionReference || "").includes(term) ||
    transaction.amount?.toString().includes(term) ||
    formattedDate.includes(term) ||
    paymentMethod.includes(term) ||
    franchise.includes(term) ||
    salesType.includes(term)
  );
}

export default function TransactionTable({ transactions, period }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleSearchChange = (value) => setSearchTerm(value);
  const handleTransactionClick = (transaction) =>
    setSelectedTransaction(transaction);
  const handleCloseModal = () => setSelectedTransaction(null);

  const tableHeaderBase =
    "px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-light";
  const tableHeaderLeft = `${tableHeaderBase} text-left`;
  const tableHeaderRight = `${tableHeaderBase} text-right`;
  const tableCellBase = "px-4 py-4";

  const filteredTransactions = transactions.filter((transaction) =>
    filterTransactionsBySearch(transaction, searchTerm)
  );

  const getTableTitle = () => {
    switch (period) {
      case "today":
        return "Tus ventas de hoy";
      case "week":
        return "Tus ventas de esta semana";
      case "month":
      default:
        return `Tus ventas de ${getCurrentMonth()}`;
    }
  };

  const getTransactionIcon = (transaction) => {
    if (transaction.salesType === "PAYMENT_LINK") {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6">
          <span
            className="material-symbols-outlined text-bold-blue text-xl rotate-130"
            style={{
              fontVariationSettings: '"wght" 250',
            }}
          >
            link
          </span>
        </span>
      );
    }

    return (
      <Image
        src="/terminal-contactless.svg"
        alt="Terminal"
        width={30}
        height={30}
      />
    );
  };

  const getStatusText = (status) => {
    return status === "SUCCESSFUL" ? "Cobro exitoso" : "Cobro no realizado";
  };

  const getPaymentIcon = (transaction) => {
    if (!transaction.paymentMethod) return null;

    const paymentMethod = transaction.paymentMethod.toUpperCase();

    let logoKey = paymentMethod;

    if (paymentMethod === "CARD" && transaction.franchise) {
      logoKey = transaction.franchise.toUpperCase();
    }

    const PAYMENT_LOGOS = {
      VISA: "/visa_logo.svg",
      MASTERCARD: "/mastercard_logo.svg",
      PSE: "/pse_logo.svg",
      NEQUI: "/nequi_logo.svg",
      DAVIPLATA: "/daviplata_logo.svg",
      BANCOLOMBIA: "/bancolombia_logo.svg",
    };

    const logoSrc = PAYMENT_LOGOS[logoKey];

    if (logoSrc) {
      return (
        <Image
          src={logoSrc}
          alt={logoKey}
          width={40}
          height={24}
          className="object-contain"
        />
      );
    }

    return (
      <div className="w-10 h-6 bg-gray-light rounded flex items-center justify-center">
        <span className="text-gray-600 text-xs font-bold">
          {logoKey.substring(0, 3)}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient p-6">
        <h2 className="text-white text-lg font-semibold">{getTableTitle()}</h2>
      </div>

      <div className="p-4 border-b border-gray-light">
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-light">
            <tr>
              <th className={`${tableHeaderLeft} w-[18%]`}>Transacción</th>
              <th className={`${tableHeaderLeft} w-[18%]`}>Fecha y hora</th>
              <th className={`${tableHeaderLeft} w-[18%]`}>Método de pago</th>
              <th className={`${tableHeaderLeft} w-[26%]`}>
                ID transacción Bold
              </th>
              <th className={`${tableHeaderRight} w-[20%]`}>Monto</th>
            </tr>
          </thead>
        </table>
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full min-w-[800px]">
            <tbody className="bg-white divide-y divide-gray-light">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No se encontraron transacciones
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    onClick={() => handleTransactionClick(transaction)}
                    className="hover:bg-gray-light cursor-pointer transition-colors"
                  >
                    {/* Columna: Transacción (estado) */}
                    <td className={`${tableCellBase} w-[18%]`}>
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="flex-shrink-0">
                          {getTransactionIcon(transaction)}
                        </div>
                        <span className="text-sm text-gray-dark truncate">
                          {getStatusText(transaction.status)}
                        </span>
                      </div>
                    </td>

                    <td
                      className={`${tableCellBase} text-sm text-gray-600 w-[18%]`}
                    >
                      <div className="truncate">
                        {formatDate(transaction.createdAt)}
                      </div>
                    </td>

                    <td className={`${tableCellBase} w-[18%]`}>
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="flex-shrink-0">
                          {getPaymentIcon(transaction)}
                        </div>
                        <span className="text-sm text-gray-dark truncate">
                          {maskCardNumber(transaction.transactionReference)}
                        </span>
                      </div>
                    </td>

                    <td
                      className={`${tableCellBase} text-sm text-gray-600 w-[26%]`}
                    >
                      <div className="truncate" title={transaction.id}>
                        {transaction.id}
                      </div>
                    </td>

                    <td className={`${tableCellBase} text-right w-[20%]`}>
                      <div>
                        <div className="text-sm font-semibold text-gray-dark">
                          {formatCurrency(transaction.amount)}
                        </div>
                        {transaction.deduction && (
                          <div className="text-xs text-gray-500">
                            Deducción Bold
                            <div className="text-red-600">
                              {formatCurrency(transaction.deduction)}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTransactions.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-light bg-gray-light">
          <p className="text-sm text-gray-600">
            Mostrando {filteredTransactions.length} de {transactions.length}{" "}
            transacciones
          </p>
        </div>
      )}

      {selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
