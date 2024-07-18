import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

export default async function Layout({ children }) { 
  // const session = await getServerSession(authOptions);
  
  // if (session) {
  //   const db = await connectMongo();
  //   const user = await User.findById(session.user.id);
  //   if(user?.hasAccess === true){
  //     redirect(config.auth.callbackUrl);
  //   }
  // }


  return (
    <div className="h-full">
      {children}
    </div>
  );
}
