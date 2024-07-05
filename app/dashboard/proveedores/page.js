import EmptyState from "@/components/EmptyState";
import clsx from "clsx";

const Home = () => {
  return (
    <div className={clsx("lg:pl-80 h-full lg:block", "block")}>
      <EmptyState tipo={"un proveedor para ver que hace falta de comprar"} />
    </div>
  );
};

export default Home;
