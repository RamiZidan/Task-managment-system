const path = require('path') ;
const express = require('express');
const router = express.Router() ;
/*--------------------------------*/
/* Paths */
const ControllersPath  = path.resolve(__dirname , '..' , 'Controllers'  ) ;
/*-------*/

/* Importing Controllers */ 
const TaskController  = require( path.resolve(ControllersPath , 'task.controller.js' ))  ;
const groupMemberMiddleware = require(path.resolve(__dirname , '..' , 'Middlewares' , 'groupMember.middleware.js')) ;
const groupAdminMiddlware = require(path.resolve(__dirname , '..' , 'Middlewares', 'groupAdmin.middleware.js')) ; 
/*-----------------------*/


router.post('/' , TaskController.createTask ) ;
router.get('/:id' ,groupMemberMiddleware , TaskController.AllTasks); 
router.get('/:id/:id' ,groupMemberMiddleware , TaskController.SingleTask); 
router.delete('/:id/:id' , groupAdminMiddlware  ,TaskController.deleteTask ) ;
// router.patch('/:id' , editTask ) ;



module.exports = router ;   