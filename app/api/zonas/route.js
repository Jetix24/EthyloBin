import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Zona from "@/models/Zona";
import MateriaPrima from "@/models/MateriaPrima"; // Asegúrate de importar el modelo MateriaPrima
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
export async function GET() {
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

// Método PUT para actualizar una zona
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
    const zona = await Zona.findOneAndUpdate(
      { _id: new ObjectId(id), userId: new ObjectId(session.user.id) },
      { name },
      { new: true }
    );
    if (!zona)
      return NextResponse.json({ error: "Zona not found" }, { status: 404 });

    return NextResponse.json(zona, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Método DELETE para eliminar una zona
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
    let sinAreaZone = await Zona.findOne({
      name: "Sin área",
      userId: new ObjectId(session.user.id),
    });

    if (!sinAreaZone) {
      sinAreaZone = await Zona.create({
        name: "Sin área",
        userId: new ObjectId(session.user.id),
      });
    }

    // Actualizar las materias primas que tienen la zona que se va a eliminar
    await MateriaPrima.updateMany(
      { zona: new ObjectId(id) },
      { zona: sinAreaZone._id }
    );

    // Eliminar la zona
    const zona = await Zona.findOneAndDelete({
      _id: new ObjectId(id),
      userId: new ObjectId(session.user.id),
    });
    if (!zona)
      return NextResponse.json({ error: "Zona not found" }, { status: 404 });

    return NextResponse.json({ message: "Zona deleted" }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
