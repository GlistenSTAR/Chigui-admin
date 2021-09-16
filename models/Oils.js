const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OilsSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  price: {
    type: String,
    required: true
  }, 
  referr:{
    type : String,
    required : true
  }
});
OilsSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

OilsSchema.set('toJSON', {
  virtuals: true
});

module.exports = Highlight = mongoose.model('oils', OilsSchema);