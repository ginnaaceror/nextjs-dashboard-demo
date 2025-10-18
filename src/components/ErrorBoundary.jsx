"use client";

export default function ErrorDisplay({ error }) {
  return (
    <div className="p-10 text-center bg-red-50 border border-red-200 rounded-lg my-5">
      <h2 className="text-red-600 text-xl font-semibold mb-4">
        Error de Conexión
      </h2>

      <p className="text-red-700 mb-5">
        No se pudieron cargar las transacciones desde la API.
      </p>

      <p className="text-gray-600 text-sm mb-5">
        Detalle técnico: {error.message}
      </p>
    </div>
  );
}
