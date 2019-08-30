module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AuthUserSchema = new Schema({
    username: { type: String },
    password: { type: String },
  });

  return mongoose.model('auth_user', AuthUserSchema);
};
