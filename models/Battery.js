const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BatteriesSchema = new Schema({
  brand: {
    type: String,
    required: true
  }, 
  price: {
    type: String,
    required: true
  }, 
  referrence:{
    type : String,
    required : true
  }
});
BatteriesSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

BatteriesSchema.set('toJSON', {
  virtuals: true
});

module.exports = Highlight = mongoose.model('batteries', BatteriesSchema);



