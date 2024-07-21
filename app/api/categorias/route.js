import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Categoria from "@/models/Categoria";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import MateriaPrima from "@/models/MateriaPrima";

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
    // Verificar si la categoría "Sin categoría" existe, si no, crearla
    let sinCategoria = await Categoria.findOne({
      name: "Sin categoría",
      userId: new ObjectId(session.user.id),
    });
  
    if (!sinCategoria) {
      sinCategoria = await Categoria.create({
        name: "Sin categoría",
        userId: new ObjectId(session.user.id),
      });
    }
  
    // Actualizar las materias primas que tienen la categoría que se va a eliminar
    await MateriaPrima.updateMany(
      { categoria: new ObjectId(id) },
      { categoria: sinCategoria._id }
    );
  
    // Eliminar la categoría
    const categoria = await Categoria.findOneAndDelete({
      _id: new ObjectId(id),
      userId: new ObjectId(session.user.id),
    });
    if (!categoria)
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
  
    return NextResponse.json({ message: "Categoría eliminada" }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

}
