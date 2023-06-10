const mongoose = require('mongoose');
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true , 'name field is required'] 
    },
    email:{
        type:String,
        // matching regex
        unique:[true , 'you have been registered before please login'],
        required:[true , 'email field is required']
    },
    password: {
        type:String,
        required:[true , 'password field is required'],
        minlength:8
    },
    groups:[
        {type:mongoose.Types.ObjectId , ref:'Group'}
    ],
    joinRequests:[
        {type:mongoose.Types.ObjectId , ref:'Group'}
    ]
});

UserSchema.methods.createJWT = function(){
    return jwt.sign( {_id:this._id}, process.env.JWT_SECRET ,  {expiresIn:process.env.JWT_LIFETIME}) ;
} ;
UserSchema.pre('save' , async function(next){
    let salt = await  bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt );
    next()
});

UserSchema.methods.checkPassword = async function (password){
    let check = await bcrypt.compare( password , this.password  );
    return check ;
};

module.exports = mongoose.model('User' , UserSchema) ; 
