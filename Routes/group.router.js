const path = require('path') ;
const express = require('express');
const router = express.Router() ;
/*--------------------------------*/
/* Paths */
const ControllersPath  = path.resolve(__dirname , '..' , 'Controllers'  ) ;
/*-------*/

/* Importing Controllers */ 
const GroupController  = require( path.resolve(ControllersPath , 'group.controller.js' )) ;
const groupMemberMiddleware = require( path.resolve (__dirname , '..' , 'Middlewares' , 'groupMember.middleware.js') ) ;
const groupAdminMiddleware = require( path.resolve (__dirname , '..' , 'Middlewares' , 'groupAdmin.middleware.js') ) ;
/*-----------------------*/

router.get('/search' , GroupController.GroupSearch );

router.post('/' , GroupController.CreateGroup ) ;
router.get('/'  , GroupController.AllGroups) ;
router.get('/:id' ,GroupController.singleGroup ) ;

router.get('/:id/memebers' , groupMemberMiddleware , GroupController.GroupMembers );
router.get('/my' , GroupController.myGroups);

router.delete('/:id' , groupAdminMiddleware ,  GroupController.DeleteGroup ) ;
router.patch('/:id' , groupAdminMiddleware , GroupController.EditGroup) ;

module.exports = router ;