const { Schema, model } = require('mongoose');

const UploadSchema = Schema({
  upload: {
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

UploadSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});


module.exports = model('Upload', UploadSchema );