import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import MateriaPrima from "@/models/MateriaPrima";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { id } = params;
  const { name, cantidad } = await req.json();

  if (!name || cantidad == null) {
    return NextResponse.json(
      { error: "Name and cantidad are required" },
      { status: 400 }
    );
  }

  await connectMongo();
  const ObjectId = require("mongoose").Types.ObjectId;

  try {
    const materiaPrima = await MateriaPrima.findByIdAndUpdate(
      new ObjectId(id),
      { name, cantidad },
      { new: true }
    );

    if (!materiaPrima) {
      return NextResponse.json(
        { error: "Materia Prima not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ materiaPrima }, { status: 200 });
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
    const materiaPrima = await MateriaPrima.findByIdAndDelete(new ObjectId(id));

    if (!materiaPrima) {
      return NextResponse.json(
        { error: "Materia Prima not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Materia Prima deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
