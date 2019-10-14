module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AuthUserSchema = new Schema({
    // login info
    username: { type: String, required: true },
    password: { type: String, required: true },

    nickname: { type: String, required: true },
    avatar: { type: String, default: '' },
  });

  return mongoose.model('auth_user', AuthUserSchema);
};
