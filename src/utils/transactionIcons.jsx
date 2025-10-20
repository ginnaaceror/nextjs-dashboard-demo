import Image from "next/image";

export function getTransactionIcon(transaction) {
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
}

export function getPaymentIcon(transaction) {
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
}

export function getStatusText(status) {
  return status === "SUCCESSFUL" ? "Cobro exitoso" : "Cobro no realizado";
}
