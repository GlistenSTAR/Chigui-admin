const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ElectronicsSchema = new Schema({
  name: {
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
  description: {
    type: String,
    required: true
  },  
});

ElectronicsSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ElectronicsSchema.set('toJSON', {
    virtuals: true
});

module.exports = Highlight = mongoose.model('electronics', ElectronicsSchema);