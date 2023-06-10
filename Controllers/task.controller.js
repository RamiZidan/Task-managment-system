const path = require('path') ;
/*---------------------------------------------------------------------*/

/* paths */
const modelsPath = path.resolve(__dirname , '..' , 'Models') ;
const MiddlewaresPath = path.resolve(__dirname ,'..' , 'Middlewares') ;
/*------*/
const {BadRequestError , NotFoundError}= require(path.resolve( __dirname, '..','errors' ,'index'  ));
const {StatusCodes} = require('http-status-codes');
/* Importing Models*/
const Task = require(path.resolve(modelsPath , 'task.js') ) ;
const Group = require(path.resolve(modelsPath , 'group.js') ) ;
const User = require(path.resolve(modelsPath , 'user.js') ) ;
/*-----------------*/
const createTask = async function(req ,res ){
    let {groupId , body , userId } = req.body ;
    let ManagerId = req.user._id ;
    let group = await Group.findOne({_id:groupId}) ; 
    if(!group || group.manager.valueOf != ManagerId.valueOf ){
        throw new NotFoundError('group not found');
    }
    if(!group.members.includes(userId)){
        throw new NotFoundError('user not found'); 
    }
    let task = await Task.create({body , userId , groupId }) ;
    return res.json({msg:'task created successfully' , task }) ;
}
const AllTasks = async function (req ,res ){ // test
    let groupId = req.params.groupId ;
    let tasks = await Task.find({groupId: groupId}).select('-body') ;
    return res.json({tasks});
}
const SingleTask = async function (req, res){ // test
    let { taskId }= req.params ;
    let task = await Task.findOne({_id:taskId}) ;
    return res.json({task});
}
const editTask = async function(req ,res ){ // test
    let ManagerId = req.user._id ; 
    let {taskId} = req.params.id ; 
    let {userId , body } = req.body ;
    let task = await Task.findOneAndUpdate( taskId , {userId , body } , {new:true} )  ;
    return res.json({task}) ;
    
}
const deleteTask = async function(req , res ){ // test
    let {taskId} = req.params ;
    await Task.findOneAndDelete({_id:taskId});
    return res.json({msg:'deleted successfully'});
}
let TaskController =  { createTask , AllTasks , SingleTask , editTask , deleteTask };
module.exports = TaskController;
 