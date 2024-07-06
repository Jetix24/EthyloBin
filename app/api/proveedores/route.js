import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Proveedor from "@/models/Proveedor";
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
    const proveedor = await Proveedor.findOne({
      name,
      userId: new ObjectId(session.user.id),
    });

    if (!proveedor) {
      await Proveedor.create({ name, userId: new ObjectId(session.user.id) });
      const newProveedor = await Proveedor.findOne({
        name,
        userId: new ObjectId(session.user.id),
      });

      return NextResponse.json({ newProveedor }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "Proveedor already exists" },
        { status: 400 }
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const db = await connectMongo();
  const ObjectId = db.Types.ObjectId;

  try {
    const proveedores = await Proveedor.find({
      userId: new ObjectId(session.user.id),
    });

    return NextResponse.json(proveedores, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Método PUT para actualizar un proveedor
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
    const proveedor = await Proveedor.findOneAndUpdate(
      { _id: new ObjectId(id), userId: new ObjectId(session.user.id) },
      { name },
      { new: true }
    );
    if (!proveedor)
      return NextResponse.json({ error: "Proveedor not found" }, { status: 404 });

    return NextResponse.json(proveedor, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Método DELETE para eliminar un proveedor
export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const db = await connectMongo();
  const ObjectId = db.Types.ObjectId;

  try {
    // Verificar si la zona "Sin área" existe, si no, crearla
    let sinProveedor = await Proveedor.findOne({
      name: "Sin proveedor",
      userId: new ObjectId(session.user.id),
    });

    if (!sinProveedor) {
      sinProveedor = await Proveedor.create({
        name: "Sin proveedor",
        userId: new ObjectId(session.user.id),
      });
    }

    // Actualizar las materias primas que tienen la zona que se va a eliminar
    await MateriaPrima.updateMany(
      { proveedor: new ObjectId(id) },
      { proveedor: sinProveedor._id }
    );

    // Eliminar el proveedor
    const proveedor = await Proveedor.findOneAndDelete({
      _id: new ObjectId(id),
      userId: new ObjectId(session.user.id),
    });
    if (!proveedor)
      return NextResponse.json({ error: "Proveedor not found" }, { status: 404 });

    return NextResponse.json({ message: "Proveedor deleted" }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}