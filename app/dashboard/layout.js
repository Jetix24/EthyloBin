import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import Sidebar from "@/components/Common/sidebar/Sidebar";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect(config.auth.loginUrl);
  }

  const db = await connectMongo();
  const user = await User.findById(session.user.id);
  
  if(user?.hasAccess === false){
    redirect(config.auth.landUrlPri);
  }

  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}