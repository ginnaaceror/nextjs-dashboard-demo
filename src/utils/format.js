export function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}:00`;
}

export function formatMonthYear(dateString) {
  const date = new Date(dateString);
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

  return `${months[date.getMonth()]}, ${date.getFullYear()}`;
}

export function maskCardNumber(cardNumber) {
  if (!cardNumber) return "";
  const cardStr = String(cardNumber);
  const lastFour = cardStr.slice(-4);
  return `**** ${lastFour}`;
}

export function getPaymentMethodName(franchise) {
  const methods = {
    VISA: "VISA",
    MASTERCARD: "Mastercard",
    AMEX: "American Express",
    PSE: "PSE",
    BANCOLOMBIA: "Bancolombia",
    NEQUI: "Nequi",
    DAVIPLATA: "Daviplata",
  };

  return methods[franchise?.toUpperCase()] || franchise || "Otro";
}
