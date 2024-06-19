import mongoose from 'mongoose';

const categoriaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // Relación con MateriaPrima (una categoría puede tener varias materias primas)
    materiasPrimas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MateriaPrima',
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Categoria || mongoose.model('Categoria', categoriaSchema);
