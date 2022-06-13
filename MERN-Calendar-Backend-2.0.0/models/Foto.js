const { Schema, model } = require('mongoose');

const FotoSchema = Schema({
  foto: {
      type: String,
      required: true,
      unique:true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
}
});

FotoSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});


module.exports = model('Foto', FotoSchema );