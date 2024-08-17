import EmptyState from "@/components/EmptyState";
export default async function Dashboard() {
  return (
    <main className="h-full p-8 pb-24 bg-dark_white">
      <EmptyState tipo={"areas para comenzar así tu recorrido"} />
    </main>
  );
}
