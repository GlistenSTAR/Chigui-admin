const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const QuoteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phonenumber: {
    type: Number,
    required: true
  },
  detail: {
    type: String
  },
  date: {
    type: String,
    default: Date.now
  },
  time: {
    type: String,
    default: Date.now
  },
  total_price: {
    type: Number,
  },
  motor:[{
    motorCylinder: {
      type: String,
      required: true
    },
    motormodel: {
      type: String,
      required: true
    },
    motorname: {
      type: String,
      required: true
    },
    motoryear: {
      type: String,
      required: true
    }
  }],
  services : [{
    price: {
      type: String
    },
    service_name: {
      type:String,
      required: true
    },
    time: {
      type: Number,
    }
  }]
});
QuoteSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

QuoteSchema.set('toJSON', {
    virtuals: true
});
module.exports = User = mongoose.model('Quotes', QuoteSchema);
