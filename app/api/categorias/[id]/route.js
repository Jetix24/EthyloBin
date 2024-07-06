import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Categoria from "@/models/Categoria";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const body = await req.json();
  const { id, name } = body;
  if (!id || !name)
    return NextResponse.json(
      { error: "ID and name are required" },
      { status: 400 }
    );

  const db = await connectMongo();
  const ObjectId = db.Types.ObjectId;

  try {
    
    const categoria = await Categoria.findByIdAndUpdate(
      { _id: new ObjectId(id), userId: new ObjectId(session.user.id) },
      { name },
      { new: true }
    );

    if (!categoria)
      return NextResponse.json({ error: "Categoria not found" },{ status: 404 });

    return NextResponse.json({ categoria }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { id } = params;

  await connectMongo();
  const ObjectId = require("mongoose").Types.ObjectId;

  try {
    const categoria = await Categoria.findByIdAndDelete(new ObjectId(id));

    if (!categoria) {
      return NextResponse.json(
        { error: "Categoria not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Categoria deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
