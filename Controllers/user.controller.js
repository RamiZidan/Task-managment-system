const path = require('path') ;
/*---------------------------------------------------------------------*/

/* paths */
const modelsPath = path.resolve(__dirname , '..' , 'Models') ;
const MiddlewaresPath = path.resolve(__dirname ,'..' , 'Middlewares') ;
/*------*/
const {BadRequestError} = require(path.resolve( __dirname, '..','errors' ,'index'  ));
const {StatusCodes} = require('http-status-codes');
/* Importing Models*/
const User = require(path.resolve(modelsPath , 'user.js') ) ;
const Group =require(path.resolve(modelsPath , 'group.js'));
/*-----------------*/

const Users = async function(req, res) { // development , make search operation
    let users = await User.find().select('-password -groups -groupsIDs -__v');
    return res.json({users:users});
}

const Requests = async function(req , res ){
    return res.json({requests: req.user.joinRequests});
}
const AcceptRequest = async function (req, res ){
    let groupId = req.body.groupId ;
    let state = req.body.state ;
    let requests = req.user.joinRequests ;
    if(state == true ){

        let idx = requests.indexOf(groupId) ;
        if(idx == -1 ){
            throw new BadRequestError('group does not exist in request') ; 
        }
        
        let group = await Group.findOne({_id:groupId });
        if(!group){
            throw new BadRequestError('group either have been deleted or does not exist ');
        }
        group.memebers = group.memebers ? group.memebers : [];
        group.memebers.push(req.user._id) ;
        await Group.findByIdAndUpdate(group._id , group ) ; 
    }
    requests.splice(requests.indexOf(groupId) , 1 ) ;
    req.user.joinRequests = requests ;
    req.user.groups.push(groupId); // retest this again
    await User.findByIdAndUpdate(req.user._id , req.user ) ;
    return res.json({msg:'you joined the group successfully '}) ;
}

const UserSearch = async function (req, res ){
    let name = req.query.name ;
    let users = await User.find({name: new RegExp(`\w*${name}\w*`)}).select('-password -groups -joinRequests -groupsIDs -createdAt -updatedAt') ;
    return res.json({users}) ;
}
let UserController = {
    Users,
    Requests,
    AcceptRequest,
    UserSearch
}
module.exports = UserController ;
