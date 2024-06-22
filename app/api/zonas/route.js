import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Zona from "@/models/Zona";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const body = await req.json();
  const { name } = body;
  if (!name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const db = await connectMongo();
  const ObjectId = db.Types.ObjectId;

  try {
    const zona = await Zona.findOne({
      name,
      userId: new ObjectId(session.user.id),
    });

    if (!zona) {
      await Zona.create({ name, userId: new ObjectId(session.user.id) });
      const newZona = await Zona.findOne({
        name,
        userId: new ObjectId(session.user.id),
      });

      return NextResponse.json({ newZona }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "Zona already exists" },
        { status: 400 }
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Método GET para obtener todas las zonas del usuario
export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const db = await connectMongo();
  const ObjectId = db.Types.ObjectId;

  try {
    const zonas = await Zona.find({
      userId: new ObjectId(session.user.id),
    });

    return NextResponse.json(zonas, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
