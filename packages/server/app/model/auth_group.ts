module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AuthGroupSchema = new Schema(
    {
      name: { type: String, unique: true },
      remark: { type: String, default: '' },
      permissions: { type: Array, default: [] },
      modifiable: { type: Boolean, default: true },
    },
    {
      timestamps: true,
    },
  );

  return mongoose.model('auth_group', AuthGroupSchema);
};
