const path = require('path') ;
const express = require('express');
const router = express.Router() ;
/*--------------------------------*/
/* Paths */
const ControllersPath  = path.resolve(__dirname , '..' , 'Controllers'  ) ;
/*-------*/

/* Importing Controllers */ 
const { Register, Login}  = require( path.resolve(ControllersPath , 'auth.controller.js' ))  ;
/*-----------------------*/

router.post('/register'  , Register ) ; 
router.post('/login'     , Login    ) ;

module.exports = router ;