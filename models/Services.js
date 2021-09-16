const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ServicesSchema = new Schema({
  service_type: {
    type:String
  },
  data :[{
    name: {
      type: String
    },
    subdata:[
      {
        subname : {
          type : String
        },
        price: { 
          type : String
        },
        time: { 
          type : String
        },
        service_list : { 
          type : Array 
        }
      }
    ]
  }] 
});

ServicesSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  
ServicesSchema.set('toJSON', {
    virtuals: true
  });

module.exports = Services = mongoose.model('services', ServicesSchema);
