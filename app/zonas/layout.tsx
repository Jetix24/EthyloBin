import Sidebar from "@/components/sidebar/Sidebar";
import ZoneList from "./components/ZoneList";

export default async function ZonasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full">
        <ZoneList />
        {children}
      </div>
    </Sidebar>
  );
}
