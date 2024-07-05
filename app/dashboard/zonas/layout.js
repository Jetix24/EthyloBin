import ZoneList from "./components/ZoneList";

export default async function ZonasLayout({ children }) {

  return (
    <div className="h-full">
        <ZoneList />
        {children}
    </div>
  );
}