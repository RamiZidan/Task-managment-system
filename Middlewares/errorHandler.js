const path = require('path') ;

const CustomAPIError = require(path.resolve(__dirname , '..' , 'errors' , 'CustomAPIError.js') );
const {StatusCodes}= require('http-status-codes');

const errorHandler = (err , req , res ,next ) => {
    // return res.status(500).json(err.message) ;//development 
    let customError = {
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR ,
        msg:err.message || "something went wrong"
    };
    if(err.name =='ValidationError'){
        customError.msg ={ "fields" : Object.keys(err.errors) ,  "message" :Object.values(err.errors).map((item)=> item.message) } ;
        customError.statusCode = 400 ;
    }
    if(err.code && err.code == 11000 ) {
        customError.msg = `Duplicate value entered ${Object.keys(err.keyValue)} choose another value` ;
        customError.statusCode = 400 ;
    }
    if(err.name == 'CastError'){
        customError.msg =`no Item with id ${err.value}` ;
        customError.statusCode = 404 ;
    }
    return res.status(customError.statusCode).json(customError.msg) ;
}
module.exports = errorHandler ;
