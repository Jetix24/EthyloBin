import mongoose from "mongoose";

const categoriaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Relación con MateriaPrima (una categoría puede tener varias materias primas)
    materiasPrimas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MateriaPrima",
      },
    ],
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

export default mongoose.models.Categoria ||
  mongoose.model("Categoria", categoriaSchema);
