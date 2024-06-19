import mongoose from 'mongoose';

const materiaPrimaSchema = mongoose.Schema(
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
    // Relación con Zona (una materia prima se puede almacenar en una sola zona)
    zona: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Zona',
    },
    // Relación con Categoría (una materia prima debe estar categorizada)
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.MateriaPrima || mongoose.model('MateriaPrima', materiaPrimaSchema);
