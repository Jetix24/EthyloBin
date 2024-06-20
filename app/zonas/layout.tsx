import Sidebar from "@/components/sidebar/Sidebar";
import ZoneList from "./components/ZoneList";


export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode
}) {
 // const zonas = await getZones();

  return (
    <Sidebar>
      <div className="h-full">
      <ZoneList  />
        {children}
      </div>
    </Sidebar>
  )
};