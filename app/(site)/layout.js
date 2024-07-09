import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import getCurrentUser from "../actions/getCurrentUser";

export default async function LayoutPrivate({ children }) { 
//   const session = await getServerSession(authOptions);
//   const user = await getCurrentUser(session);

//   if (!user.hasAcess) {
//     redirect(config.auth.landUrlPri);
//   }else{
//     if (session) redirect(config.auth.callbackUrl);
//   }
  

  return (
    <div className="h-full">
      {children}
    </div>
  );
}
