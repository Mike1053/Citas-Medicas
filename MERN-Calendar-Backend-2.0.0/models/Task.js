const { Schema, model } = require('mongoose');

const TaskSchema = Schema({
    title: { 
      type: String, 
      required: true, 
      trim: true, 
      unique: true 
    },
    
    description: {
      type: String,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    start: {
      type: Date,
      required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
  });

  TaskSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Task", TaskSchema);