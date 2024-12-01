import EmptyState from "@/components/EmptyState";
export default async function Dashboard() {
  return (
    <main className="h-full p-8 pb-24 bg-gray_200">
      <EmptyState tipo={"No hay nada"} />
    </main>
  );
}
