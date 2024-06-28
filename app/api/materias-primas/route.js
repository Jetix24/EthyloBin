import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import MateriaPrima from "@/models/MateriaPrima";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

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

  const db = await connectMongo();
  const ObjectId = db.Types.ObjectId;

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
