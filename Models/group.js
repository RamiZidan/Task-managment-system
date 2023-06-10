const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name:{
        type:String,
        maxlength:100 ,
        required:[true , 'group name field is required']
    },
    description:{
        type:String,
        maxlength:100
    },
    manager:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    },
    private:{
        type:Boolean,
        required:[true , 'group type field is required']
    },
    members:[
        {type:mongoose.Types.ObjectId , ref:'User'}
    ]
});

module.exports =  mongoose.model('Group' , GroupSchema) ; 
