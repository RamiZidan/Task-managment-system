const path = require('path') ;
const express = require('express');
const router = express.Router() ;
/*--------------------------------*/
/* Paths */
const ControllersPath  = path.resolve(__dirname , '..' , 'Controllers'  ) ;
/*-------*/

/* Importing Controllers */ 
const UserController  = require( path.resolve(ControllersPath , 'user.controller.js' ))  ;
/*-----------------------*/


router.get('/' , UserController.Users );
router.get('/requests' , UserController.Requests)
router.post('/accept' , UserController.AcceptRequest ) ;
router.get('/search' , UserController.UserSearch ) ;
module.exports = router ;   