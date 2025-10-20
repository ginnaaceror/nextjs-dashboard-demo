"use client";

import { useState, useEffect, useMemo } from "react";
import NavBar from "./NavBar";
import TransactionCard from "./TransactionCard";
import DateFilter from "./DateFilter";
import FilterPanel from "./FilterPanel";
import TransactionTable from "./TransactionTable";
import {
  filterByDate,
  filterByPaymentType,
  calculateTotal,
} from "@/utils/filters";

export default function Dashboard({ initialTransactions = [] }) {
  const transactions = useMemo(() => {
    const validTransactions = Array.isArray(initialTransactions)
      ? initialTransactions
      : [];
    return [...validTransactions].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [initialTransactions]);

  const [dateFilter, setDateFilter] = useState(() => {
    try {
      const saved =
        typeof window !== "undefined" &&
        localStorage.getItem("bold_dateFilter");
      return saved || "month";
    } catch (error) {
      console.error("Error al cargar dateFilter desde localStorage:", error);
      return "month";
    }
  });

  const [paymentFilters, setPaymentFilters] = useState(() => {
    const defaults = { dataphone: false, paymentLink: false, all: true };
    try {
      const raw =
        typeof window !== "undefined" &&
        localStorage.getItem("bold_paymentFilters");
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        typeof parsed === "object" &&
        ["dataphone", "paymentLink", "all"].every((k) => k in parsed)
      ) {
        return parsed;
      }
      return defaults;
    } catch (error) {
      console.error(
        "Error al cargar paymentFilters desde localStorage:",
        error
      );
      return defaults;
    }
  });

  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem("bold_dateFilter", dateFilter);
      localStorage.setItem(
        "bold_paymentFilters",
        JSON.stringify(paymentFilters)
      );
    } catch (error) {
      console.error("Error al guardar filtros en localStorage:", error);
    }
  }, [dateFilter, paymentFilters]);

  useEffect(() => {
    let result = transactions;

    result = filterByDate(result, dateFilter);

    result = filterByPaymentType(result, paymentFilters);

    const total = calculateTotal(result);

    setFilteredTransactions(result);
    setTotalSales(total);
  }, [dateFilter, paymentFilters, transactions]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <TransactionCard
              total={totalSales}
              period={dateFilter}
              transactions={filteredTransactions}
            />
          </div>

          <div className="lg:col-span-2 flex flex-col justify-start items-end gap-4">
            <DateFilter
              activeFilter={dateFilter}
              onFilterChange={setDateFilter}
            />
            <FilterPanel
              filters={paymentFilters}
              onFilterChange={setPaymentFilters}
            />
          </div>
        </div>

        <div className="mb-8">
          <TransactionTable
            transactions={filteredTransactions}
            period={dateFilter}
          />
        </div>
      </main>
    </div>
  );
}
