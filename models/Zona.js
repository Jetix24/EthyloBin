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
      trim: true, //trim hace que no se guarden espacios en blanco al principio y al final
    },
    // Relación con MateriaPrima (una zona puede tener varios productos/materia prima)
    materiasPrimas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MateriaPrima',
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Zona || mongoose.model('Zona', zonaSchema);
