"use client";

import { useState, useEffect, useRef } from "react";

export default function FilterPanel({ filters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCheckboxChange = (filterKey) => {
    onFilterChange({
      ...filters,
      [filterKey]: !filters[filterKey],
    });
  };

  const handleDataphoneChange = () => handleCheckboxChange("dataphone");
  const handlePaymentLinkChange = () => handleCheckboxChange("paymentLink");
  const handleAllChange = () => handleCheckboxChange("all");
  const handleTogglePanel = () => setIsOpen(!isOpen);
  const handleClosePanel = () => setIsOpen(false);

  const hasActiveFilters =
    filters.dataphone || filters.paymentLink || filters.all;

  const applyButtonClasses = hasActiveFilters
    ? "w-full mt-4 py-2 rounded-full text-sm font-medium transition-all bg-bold-red text-white hover:shadow-lg cursor-pointer"
    : "w-full mt-4 py-2 rounded-full text-sm font-medium transition-all bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={handleTogglePanel}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-light rounded-lg hover:bg-gray-light transition-colors"
      >
        <span className="text-sm font-medium text-gray-dark">Filtrar</span>
        <span className="material-icons text-lg">tune</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-light rounded-lg shadow-xl z-20 animate-slide-down">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-dark mb-3">
              Filtrar
            </h3>

            <div className="space-y-3">
              <label className="label-checkbox  group">
                <input
                  type="checkbox"
                  checked={filters.dataphone}
                  onChange={handleDataphoneChange}
                  className="input-checkbox"
                />
                <span className="text-sm text-gray-dark group-hover:text-gray-dark">
                  Cobro con datáfono
                </span>
              </label>

              <label className="label-checkbox  group">
                <input
                  type="checkbox"
                  checked={filters.paymentLink}
                  onChange={handlePaymentLinkChange}
                  className="input-checkbox"
                />
                <span className="text-sm text-gray-dark group-hover:text-gray-dark">
                  Cobro con link de pago
                </span>
              </label>

              <label className="label-checkbox  group">
                <input
                  type="checkbox"
                  checked={filters.all}
                  onChange={handleAllChange}
                  className="input-checkbox"
                />
                <span className="text-sm text-gray-dark group-hover:text-dark">
                  Ver todos
                </span>
              </label>
            </div>

            <button
              onClick={handleClosePanel}
              disabled={!hasActiveFilters}
              className={applyButtonClasses}
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
