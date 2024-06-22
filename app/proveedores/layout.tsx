import Sidebar from "@/components/sidebar/Sidebar";
import ProveedorList from "./components/ProveedorList";

export default async function ProveedoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full">
        <ProveedorList />
        {children}
      </div>
    </Sidebar>
  );
}
