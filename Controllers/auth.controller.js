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
/*-----------------*/

const Register = async (req, res ) =>{
    let {name , password , email } = req.body; 
    if(!name || !password || !email ){
        throw new BadRequestError('All values are required') ;
    }
    let user = await User.create({name , email , password });
 
    let token =  user.createJWT() ; 
    return res.status(StatusCodes.OK).json({token});
}

const Login = async (req, res ) =>{
    let {email , password } = req.body ; 
    
    if(!email || !password )
    {
        throw new BadRequestError('All Values are required') ;
    }
    let user = await User.findOne({email}) ; 
    console.log(user);
    if(!user){
        throw new BadRequestError('email or password is wrong') ;
    }
    let passwordCheck = await user.checkPassword(password) ;
    if(!passwordCheck){
        
        throw new BadRequestError('email or password is wrong') ;
    }
    let token =  user.createJWT() ;
    return res.status(StatusCodes.OK).json({token}) ;
}


module.exports = { Register , Login };
