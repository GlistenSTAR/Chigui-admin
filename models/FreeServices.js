const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FreeServicesSchema = new Schema({
    service_name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    free:{
        type : Boolean,
        required : true
    },
    guarantee:{
        type : Boolean,
        required : true
    }
});
FreeServicesSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

FreeServicesSchema.set('toJSON', {
    virtuals: true
});

module.exports = Highlight = mongoose.model('freeServices', FreeServicesSchema);



