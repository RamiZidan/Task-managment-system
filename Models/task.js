const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    body:{
        type:String, // do we need manager for simplicity ? 
        required:[true, 'body field is required']
    },
    groupId:{
        type:mongoose.Types.ObjectId,
        requierd:[true , 'field is required']
    },
    userId:{
        type:mongoose.Types.ObjectId, 
        required:[true, 'field is required']
    },
    status:{
        type:Boolean,
        default:false
    }
});

module.exports =  mongoose.model('Task' , TaskSchema) ; 
