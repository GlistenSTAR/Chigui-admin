const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const HighlightSchema = new Schema({
  serviceName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  data: [{
    detail : {
      type: Array
    }
  }]
});
HighlightSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

HighlightSchema.set('toJSON', {
    virtuals: true
});

module.exports = Highlight = mongoose.model('highlights', HighlightSchema);