import mongoose from 'mongoose';

const proveedorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
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

export default mongoose.models.Proveedor || mongoose.model('Proveedor', proveedorSchema);
