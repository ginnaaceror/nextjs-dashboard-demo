import { getData } from "@/lib/api";
import ErrorDisplay from "@/components/ErrorBoundary";
import Dashboard from "@/components/Dashboard";

export default async function Page() {
  try {
    const data = await getData("");

    return <Dashboard initialTransactions={data.data || []} />;
  } catch (error) {
    return (
      <div className="min-h-screen bg-[#f6f4f9] flex items-center justify-center p-4">
        <ErrorDisplay error={error} />
      </div>
    );
  }
}
