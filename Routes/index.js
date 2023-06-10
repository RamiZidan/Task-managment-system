const express = require('express')
const router = express.Router() ;

const path = require('path');
const AuthRouter  = require('./auth.router' ) ;
const GroupRouter = require('./group.router') ; 
const UserRouter  = require('./user.router') ;
const TaskRouter  = require('./task.router') ;
const authMiddleware  = require(path.resolve( __dirname , '..' , 'Middlewares' , 'auth.js')) ;

router.use('/api/v1/auth' ,  AuthRouter ) ; // no  auth  
router.use('/api/v1', authMiddleware ) ;
router.use('/api/v1/user' , UserRouter);
router.use('/api/v1/group',  GroupRouter ) ;
router.use('/api/v1/task' , TaskRouter );

module.exports = router ;