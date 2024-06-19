import mongoose from 'mongoose';

const zonaSchema = mongoose.Schema(
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
    // Relación con MateriaPrima (una zona puede tener varios productos/materia prima)
    materiasPrimas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MateriaPrima',
    }],
    // Relación con Usuario
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Zona || mongoose.model('Zona', zonaSchema);
