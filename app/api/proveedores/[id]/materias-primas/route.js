import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import MateriaPrima from "@/models/MateriaPrima";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const db = await connectMongo();
  const ObjectId = db.Types.ObjectId;

  try {
    const materiasPrimas = await MateriaPrima.find({
      proveedor: new ObjectId(params.id),
      userId: new ObjectId(session.user.id),
    });

    return NextResponse.json(materiasPrimas, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
