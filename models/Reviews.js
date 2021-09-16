const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReviewsSchema = new Schema({
  type:{
    type: String
  },
  data: [{
    subname : {
      type: String
    },
    time : {
      type: String
    },
    description : {
      type: String
    },
    price:{
      type:Number
    }
  }]
});

ReviewsSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  
  ReviewsSchema.set('toJSON', {
    virtuals: true
  });
module.exports = Highlight = mongoose.model('reviews', ReviewsSchema);