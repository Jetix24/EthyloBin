import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import Sidebar from "@/components/sidebar/Sidebar";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function LayoutPrivate({ children }) {
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser();

  if (!session) redirect(config.auth.loginUrl);
  if (!user.hasAccess) redirect(config.auth.loginUrl);

  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
