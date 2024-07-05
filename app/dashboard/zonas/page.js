import EmptyState from "@/components/EmptyState";
import clsx from "clsx";
import ZonesList from "./components/ZoneList";

export default async function Home() {
  return (
    <div className={clsx("lg:pl-80 h-full lg:block", "block")}>
      <ZonesList />
      <EmptyState tipo={"una área para organizar tus productos"} />
    </div>
  );
}
