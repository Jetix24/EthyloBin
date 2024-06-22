import { authOptions } from "@/libs/next-auth";
import { getServerSession } from "next-auth";

export default async function getSession() {
	return await getServerSession(authOptions);
}