import EmptyState from "@/components/EmptyState";
import clsx from "clsx";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import getSession from "../actions/getSession";

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