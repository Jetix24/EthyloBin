import Sidebar from "@/components/sidebar/Sidebar";
import CategoriaList from "./components/CategoriaList";

export default async function materiaprimaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <CategoriaList />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
