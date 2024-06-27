import EmptyState from "@/components/EmptyState";
import clsx from "clsx";

export default async function Home() {

  return (
    <div
      className={clsx(
        "lg:pl-80 h-full lg:block", 'block'
      )}
    >
      <EmptyState />
    </div>
  )
};