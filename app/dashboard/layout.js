import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import Sidebar from "@/components/sidebar/Sidebar";
import getCurrentUser from "../actions/getCurrentUser";

export default async function LayoutPrivate({ children }) {
  // const session = await getServerSession(authOptions);
  
  // if (!session) 
  //   redirect(config.auth.loginUrl);

  // const user = await getCurrentUser(session)
  // console.log('user',user)
  // if(user?.hasAccess === false || user?.hasAccess === undefined){
  //   redirect(config.auth.landUrlPri);
  // }

  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
