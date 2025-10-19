"use client";

import { formatCurrency } from "@/utils/format";
import { useState } from "react";

export default function TransactionCard({ total, period, transactions }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleShowTooltip = () => setShowTooltip(true);
  const handleHideTooltip = () => setShowTooltip(false);

  const getTitle = () => {
    const now = new Date();
    const monthName = now.toLocaleDateString("es-CO", { month: "long" });
    const capitalizedMonth =
      monthName.charAt(0).toUpperCase() + monthName.slice(1);

    switch (period) {
      case "today":
        return "Total de ventas de hoy";
      case "week":
        return "Total de ventas de esta semana";
      case "month":
      default:
        return `Total de ventas de ${capitalizedMonth}`;
    }
  };

  const getDate = () => {
    const now = new Date();
    switch (period) {
      case "today":
        return now.toLocaleDateString("es-CO", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      case "week":
        return "Últimos 7 días";
      case "month":
      default:
        return now.toLocaleDateString("es-CO", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-bold-blue to-bold-red px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-base font-medium">{getTitle()}</h2>

          <div className="relative">
            <button
              onMouseEnter={handleShowTooltip}
              onMouseLeave={handleHideTooltip}
              className="hover:bg-white/20 transition-all rounded-full p-1"
            >
              <span className="material-icons text-white text-xl">
                info_outline
              </span>
            </button>

            {showTooltip && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white text-gray-600 text-xs p-3 rounded-lg shadow-xl z-10 animate-fade-in">
                <p>
                  Este es el total de ventas realizadas en{" "}
                  {getDate().toLowerCase()}.
                  {transactions &&
                    ` Se han realizado ${transactions.length} transacciones.`}
                </p>
                <div className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white px-6 py-8 text-center">
        <div className="mb-3">
          <p className="text-3xl md:text-4xl font-bold text-gray-900">
            {formatCurrency(total)}
          </p>
        </div>

        <p className="text-sm text-gray-600">{getDate()}</p>
      </div>
    </div>
  );
}
