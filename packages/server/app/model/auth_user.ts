module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AuthUserSchema = new Schema(
    {
      // login info
      username: { type: String, required: true },
      password: { type: String, required: true },

      nickname: { type: String, default: '' },
      avatar: { type: String, default: '' },

      role: { type: Schema.Types.ObjectId, ref: 'auth_group', required: true },
    },
    {
      timestamps: true,
    },
  );

  return mongoose.model('auth_user', AuthUserSchema);
};
