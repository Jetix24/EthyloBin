import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Categoria from "@/models/Categoria";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { id } = params;
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  await connectMongo();
  const ObjectId = require("mongoose").Types.ObjectId;

  try {
    const categoria = await Categoria.findByIdAndUpdate(
      new ObjectId(id),
      { name },
      { new: true }
    );

    if (!categoria) {
      return NextResponse.json(
        { error: "Categoria not found" },
        { status: 404 }
      );
    }

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
