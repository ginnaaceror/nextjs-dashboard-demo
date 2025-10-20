"use client";

import { useEffect } from "react";
import { formatCurrency, formatDate, maskCardNumber } from "@/utils/format";
import { getTransactionIcon, getPaymentIcon } from "@/utils/transactionIcons";

export default function TransactionModal({ transaction, onClose }) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!transaction) return null;

  const getStatusInfo = () => {
    if (transaction.status === "SUCCESSFUL") {
      return {
        label: "¡Cobro exitoso!",
        icon: "✓",
        color: "text-green-600",
        bgColor: "bg-green-50",
      };
    }
    return {
      label: "Cobro no realizado",
      icon: "⚠",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-light/60 z-40 animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-50 animate-slide-in-right overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="material-icons text-gray-600">close</span>
        </button>

        <div className="p-6 pt-16">
          <div
            className={`flex items-center gap-2 mb-4 ${statusInfo.bgColor} p-3 rounded-lg`}
          >
            <span className={`material-icons text-2xl ${statusInfo.color}`}>
              {transaction.status === "SUCCESSFUL"
                ? "check_circle"
                : "error_outline"}
            </span>
            <span className={`font-semibold ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-4xl font-bold text-bold-blue">
              {formatCurrency(transaction.amount)}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {formatDate(transaction.createdAt)}
            </p>
          </div>

          <div className="border-t border-gray-200 my-6" />

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-500">ID transacción Bold</span>
              <span className="text-sm font-medium text-gray-dark text-right">
                {transaction.id}
              </span>
            </div>

            {transaction.deduction && (
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-500">Deducción Bold</span>
                <span className="text-sm font-medium text-red-600">
                  {formatCurrency(transaction.deduction)}
                </span>
              </div>
            )}

            <div className="border-t border-gray-200" />

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Método de pago</span>
              <div className="flex items-center gap-2">
                {getPaymentIcon(transaction)}
                <span className="text-sm font-medium text-gray-dark">
                  {maskCardNumber(transaction.transactionReference)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Tipo de pago</span>
              <div className="flex items-center gap-2">
                {getTransactionIcon(transaction)}
                <span className="text-sm font-medium text-gray-dark">
                  {transaction.salesType === "PAYMENT_LINK"
                    ? "Link de pagos"
                    : "Terminal"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
