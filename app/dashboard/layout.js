import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import Sidebar from "@/components/sidebar/Sidebar";

// This is a server-side component to ensure the user is logged in.
// If not, it will redirect to the login page.
// It's applied to all subpages of /dashboard in /app/dashboard/*** pages
// You can also add custom static UI elements like a Navbar, Sidebar, Footer, etc..
// See https://shipfa.st/docs/tutorials/private-page
export default async function LayoutPrivate({ children }) {
  const session = await getServerSession(authOptions);

  //If not session, redirect to login page
  if (!session) redirect(config.auth.loginUrl);
  //if (!session.hasAccess) redirect(config.auth.loginUrl);

  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
