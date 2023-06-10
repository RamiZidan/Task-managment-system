const path = require('path') ;
/*---------------------------------------------------------------------*/

/* paths */
const modelsPath = path.resolve(__dirname , '..' , 'Models') ;
const MiddlewaresPath = path.resolve(__dirname ,'..' , 'Middlewares') ;
/*------*/
const {BadRequestError , NotFoundError } = require(path.resolve( __dirname, '..','errors' ,'index'  ));
const {StatusCodes} = require('http-status-codes');
/* Importing Models*/
const Group = require(path.resolve(modelsPath , 'group.js') ) ;
const User = require(path.resolve(modelsPath , 'user.js')) ;

/*-----------------*/
// get my groups as a {manager , user} // work on accepting the join order later
const AllGroups = async function (req , res ){
    let page= req.query.page ;
    let limit = req.query.limit || 10; 
    const groups = await Group.find({private:false}).select('-private -__v ').skip((page-1)*limit).limit(limit);
    return res.json(groups); 
}
const singleGroup = async function (req , res )
{
    let GroupId = req.params.id; 
    let group = await Group.findOne({_id:GroupId , private:0});
    if(!group){
        throw new NotFoundError('group not found');
    }
    return res.json(group);
}

const myGroups = async function (req, res ){
    let groups = req.user.groups ;
    return res.json({groups});
}

const GroupMembers = async function (req ,res){
    let groupId = req.params.groupId;
    let group = await Group.findOne({_id:groupId}) ;
    return res.json({memebers:group.memebers});    
}
const CreateGroup = async function (req , res ){
    const userId = req.user._id ;
    const {name , description , private} = req.body ;
    let members = [userId];
    const group = await Group.create({manager:userId , name , description , private ,members});
    req.user.groups.push(group._id); // test this probably it will fail
    await User.findByIdAndUpdate(req.user._id , req.user ) ;
    return res.json({msg:'created successfully'}) ;
}

const GroupSearch = async function (req ,res ){
    
    let groupName = req.query.group ;
    let groups = await Group.find({name:new RegExp(`\w*${groupName}\w*`) , private:false}).select('-members -manager -private') ;
    return res.json({groups});
}
const EditGroup = async function (req ,res ) {
    const GroupId =req.params.id ; 
    const {name , description , private } = req.body ; 
    const group = req.group ;

    if(req.body.members){
        let addMembers = [] ;
        let deleteMembers = [] ; 
        let updMembers = req.body.members
        for(let i = 0 ; i < updMembers.length ;i++)
        {
            if(updMembers[i].includes('+'))
            {
                let userId = updMembers[i].split('+')[1] ; 
                let user = await User.findOne({_id:userId});
                if(!user){
                    throw new NotFoundError(`user with ID ${userId} not found`) ;
                }
                user.joinRequests= user.joinRequests? user.joinRequests : [] ;
                user.joinRequests.push(GroupId) ; 
                                
                let updated = await User.findByIdAndUpdate({_id:userId} , user  , {runValidator:true , new:true}) ;

            }
            else if(updMembers[i].includes('-'))
            {
                deleteMembers.push(updMembers[i].split('-')[1]);
            }
        }
        let members = group.members;
        for(let i =0 ;i < deleteMembers.length ;i++){
            if(members.includes(deleteMembers[i])){
                 let index = members.indexOf( deleteMembers[i] );
                members.splice(index , 1 ) ;
            }
        }
        
        req.body.members = members ;
    }
    
    const updatedGroup = await Group.findByIdAndUpdate( {_id:GroupId , manager:req.user._id}, req.body  , {runValidator:true});
    return res.json({msg:"updated successfully" , group:updatedGroup});
}
const DeleteGroup = async function (req, res){
    await Group.findOneAndDelete({_id:req.params.id });
    return res.json({msg:"Group has been deleted successfully"});
}
const GroupController = { GroupMembers,CreateGroup , AllGroups ,EditGroup , DeleteGroup ,singleGroup , myGroups , GroupSearch} ;

module.exports = GroupController ; 