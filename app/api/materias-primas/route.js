import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongo from "@/libs/mongoose";
import MateriaPrima from "@/models/MateriaPrima";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

// Crear una nueva materia prima
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const body = await req.json();
  const {
    name,
    cantidad,
    zona,
    categoria,
    proveedor,
    contable,
    medida,
    minimoAlmacen,
  } = body;

  console.log("Datos recibidos:", body);

  if (
    !name ||
    !categoria ||
    !medida ||
    cantidad == null ||
    minimoAlmacen == null
  )
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );

  await connectMongo();
  const ObjectId = mongoose.Types.ObjectId;

  try {
    const newMateriaPrima = await MateriaPrima.create({
      name,
      cantidad,
      zona: zona ? new ObjectId(zona) : null,
      categoria: new ObjectId(categoria),
      proveedor: proveedor ? new ObjectId(proveedor) : null,
      contable,
      medida,
      minimoAlmacen,
      userId: new ObjectId(session.user.id),
    });

    return NextResponse.json({ newMateriaPrima }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Obtener todas las materias primas del usuario
export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  await connectMongo();
  const ObjectId = mongoose.Types.ObjectId;

  try {
    const materiasPrimas = await MateriaPrima.find({
      userId: new ObjectId(session.user.id),
    });

    return NextResponse.json(materiasPrimas, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Actualizar una materia prima
export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const body = await req.json();
  const {
    name,
    cantidad,
    zona,
    categoria,
    proveedor,
    contable,
    medida,
    minimoAlmacen,
  } = body;

  if (
    !name ||
    !categoria ||
    !medida ||
    cantidad == null ||
    minimoAlmacen == null
  )
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );

  await connectMongo();
  const ObjectId = mongoose.Types.ObjectId;

  try {
    const updatedMateriaPrima = await MateriaPrima.findByIdAndUpdate(
      id,
      {
        name,
        cantidad,
        zona: zona ? new ObjectId(zona) : null,
        categoria: new ObjectId(categoria),
        proveedor: proveedor ? new ObjectId(proveedor) : null,
        contable,
        medida,
        minimoAlmacen,
      },
      { new: true }
    );

    if (!updatedMateriaPrima) {
      return NextResponse.json(
        { error: "Materia prima not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ updatedMateriaPrima }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Eliminar una materia prima
export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await connectMongo();
  const ObjectId = mongoose.Types.ObjectId;

  try {
    const deletedMateriaPrima = await MateriaPrima.findByIdAndDelete(id);

    if (!deletedMateriaPrima) {
      return NextResponse.json(
        { error: "Materia prima not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Materia prima deleted" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
