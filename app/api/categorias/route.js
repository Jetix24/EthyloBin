import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Categoria from "@/models/Categoria";
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
    const categoria = await Categoria.findOne({
      name,
      userId: new ObjectId(session.user.id),
    });

    if (!categoria) {
      await Categoria.create({ name, userId: new ObjectId(session.user.id) });
      const newCategoria = await Categoria.findOne({
        name,
        userId: new ObjectId(session.user.id),
      });

      return NextResponse.json({ newCategoria }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "Categoria already exists" },
        { status: 400 }
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const db = await connectMongo();
  const ObjectId = db.Types.ObjectId;

  try {
    const categorias = await Categoria.find({
      userId: new ObjectId(session.user.id),
    });

    return NextResponse.json(categorias, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
