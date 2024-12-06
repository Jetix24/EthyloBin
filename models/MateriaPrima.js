import mongoose from "mongoose";

const materiaPrimaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    reserva: {
      type: Number,
      default: 0, // Nuevo campo para reserva con valor por defecto 0
    },
    // Relación con Zona (una materia prima se puede almacenar en una sola zona)
    zona: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zona",
    },
    // Relación con Categoría (una materia prima debe estar categorizada)
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    // Relación con Proveedor
    proveedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proveedor",
    },
    // Campos adicionales
    contable: {
      type: Boolean,
      default: true,
    },
    medida: {
      type: String,
      required: true,
      trim: true,
    },
    minimoAlmacen: {
      type: Number,
      required: true,
    },
    // Relación con Usuario
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.MateriaPrima ||
  mongoose.model("MateriaPrima", materiaPrimaSchema);
