import EmptyState from "@/components/EmptyState";
export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <EmptyState tipo={"areas para comenzar así tu recorrido"} />
    </main>
  );
}
