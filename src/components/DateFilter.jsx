"use client";

export default function DateFilter({ activeFilter, onFilterChange }) {
  const now = new Date();
  const monthName = now.toLocaleDateString("es-CO", { month: "long" });
  const capitalizedMonth =
    monthName.charAt(0).toUpperCase() + monthName.slice(1);

  const filters = [
    { id: "today", label: "Hoy" },
    { id: "week", label: "Esta semana" },
    { id: "month", label: capitalizedMonth },
  ];

  const handleTodayClick = () => onFilterChange("today");
  const handleWeekClick = () => onFilterChange("week");
  const handleMonthClick = () => onFilterChange("month");

  const getButtonClassName = (filterId) => {
    const baseClasses =
      "px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-200";
    const activeClasses = "bg-gray-light text-bold-blue";
    const inactiveClasses = "bg-transparent text-gray-600 hover:text-gray-dark";

    return `${baseClasses} ${
      activeFilter === filterId ? activeClasses : inactiveClasses
    }`;
  };

  const getClickHandler = (filterId) => {
    const handlers = {
      today: handleTodayClick,
      week: handleWeekClick,
      month: handleMonthClick,
    };
    return handlers[filterId] || handleMonthClick;
  };

  const renderFilterButton = (filter) => (
    <button
      key={filter.id}
      onClick={getClickHandler(filter.id)}
      className={getButtonClassName(filter.id)}
    >
      {filter.label}
    </button>
  );

  return (
    <div className="bg-white rounded-md p-1 inline-flex gap-1 w-full justify-around">
      {filters.map(renderFilterButton)}
    </div>
  );
}
