module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const DictSchema = new Schema({
    key: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    tag: {
      type: String,
    },
    note: {
      type: String,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    type: {
      type: String,
      enum: [ 'number', 'boolean', 'string', 'array' ],
    },
  });

  return mongoose.model('dict', DictSchema);
};
