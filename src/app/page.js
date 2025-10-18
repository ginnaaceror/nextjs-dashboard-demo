import { getData } from "@/lib/api";
import ErrorDisplay from "@/components/ErrorBoundary";

export default async function Page() {
  try {
    await getData("");

    return (
      <div>
        <h1>Dashboard de Transacciones</h1>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <ErrorDisplay error={error} />
      </div>
    );
  }
}
