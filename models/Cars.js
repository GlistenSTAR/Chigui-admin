const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CarsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mark: {
    type: String,
    required: true
  },
  model: [
    {
      modelName: {
        type: String,
      },
      year: [
        {
          date:{
            type:String,
          },
          cylinder:[
            {
              cylinderName:{
                type : String
              }
            }
          ]
        }
      ]
    },
  ],  
});

CarsSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  
CarsSchema.set('toJSON', {
  virtuals: true
});

module.exports = Post = mongoose.model('cars', CarsSchema);
