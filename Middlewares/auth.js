const jwt = require('jsonwebtoken') ;
const path = require('path') ;
const {UnauthenticatedError}= require(path.resolve(__dirname , '..','errors')) ;
const User = require(path.resolve( __dirname , '..' , 'Models' , 'user.js')) ;   
const authentication = async (req , res , next)=>{
    const authHeader = req.headers.authorization ;
    if(!authHeader || !authHeader.startsWith('Bearer ') ){
        throw new UnauthenticatedError('No Token Provided');
    }
    const token = authHeader.split(' ')[1] ;
    try{
        const payload = jwt.verify(token ,process.env.JWT_SECRET) ;
        const user = await User.findById(payload._id ).select('-password') ;
        if(!user ) throw new UnauthenticatedError('Unvalid User Id provided by token');
        req.user = user ;
        next() ;
    }
    catch(err){
        throw new UnauthenticatedError(err) ;
    }

}
module.exports = authentication; 