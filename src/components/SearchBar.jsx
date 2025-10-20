"use client";

export default function SearchBar({ value, onChange, placeholder = "Buscar" }) {
  const handleInputChange = (e) => onChange(e.target.value);
  const handleClear = () => onChange("");

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <span className="material-icons text-xl">search</span>
      </div>

      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bold-blue focus:border-transparent transition-all"
      />

      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <span className="material-icons text-lg">close</span>
        </button>
      )}
    </div>
  );
}
