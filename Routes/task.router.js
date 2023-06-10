const path = require('path') ;
const express = require('express');
const router = express.Router() ;
/*--------------------------------*/
/* Paths */
const ControllersPath  = path.resolve(__dirname , '..' , 'Controllers'  ) ;
/*-------*/

/* Importing Controllers */ 
const { createTask , editTask , deleteTask , getTask }  = require( path.resolve(ControllersPath , 'task.controller.js' ))  ;
/*-----------------------*/


router.post('/' , createTask ) ;
// router.get('/' , AllTasks); // for the current group 
// router.patch('/:id' , editTask ) ;
// router.delete('/:id' , deleteTask ) ;
// router.get('/:id' , getTask ) ;


module.exports = router ;   