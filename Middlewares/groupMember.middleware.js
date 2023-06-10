const path = require('path') ;
const {BadRequestError}= require(path.resolve(__dirname , '..','errors')) ;
const User = require(path.resolve( __dirname , '..' , 'Models' , 'user.js')) ;   
const Group = require(path.resolve( __dirname , '..' , 'Models' , 'group.js')) ;   
const groupMiddleware = async (req , res , next)=>{
    let groupId = req.params.groupId ;
    for(let i = 0  ;i < req.user.groups.length();i++){
        if(groupId == req.user.groups[i]){
            next()
            return ;
        }
    }
    throw new BadRequestError('Bad Request');
}
module.exports = groupMiddleware ; 
