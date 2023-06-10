const path = require('path') ;
const {BadRequestError}= require(path.resolve(__dirname , '..','errors')) ;
const User = require(path.resolve( __dirname , '..' , 'Models' , 'user.js')) ;   
const Group = require(path.resolve( __dirname , '..' , 'Models' , 'group.js')) ;   
const groupMiddleware = async (req , res , next)=>{
    let groupId = req.params.id ;
    let group = await Group.findOne({_id:groupId , manager:req.user._id });
    if(!group) {
        throw new BadRequestError('Group not found ');
    }
    req.group = group ; 
    next();
}
module.exports = groupMiddleware ; 
