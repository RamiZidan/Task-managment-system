const path = require('path') ;
require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors') 
// const helmet = require('helmet') ;
// const cors = require('cors') ; 
// const xss = require('xss-clear') ;
// const rateLimiter = require('express-rate-limit') ;

/*---------------------------------*/

/* IMPORTS */
    // Paths 
    const RoutesPath = path.resolve(__dirname , 'Routes');
    const MiddlewarePath = path.resolve(__dirname , 'Middlewares') ;
    const dbPath = path.resolve(__dirname , 'db') ;
    // Routers 
    const Routes  = require(path.resolve(RoutesPath , 'index.js' ));
    // Middlewares
    const errorMiddleware    = require(path.resolve( MiddlewarePath , 'errorHandler.js'));
    const notFoundMiddleware = require(path.resolve(MiddlewarePath , 'notFoundMiddleware.js')) ;
    

    // db connection
    const connectDB = require(path.resolve(dbPath , 'connect.js' ) ) ;
/*--------*/

/* Using imports */
app.use(express.json());
app.use(express.static('./public'));

// // rate limiter
// app.set('trust proxy' , 1 ) ;
// app.use(rateLimiter({
//     windowMs: 15 * 60 * 1000 , // 15 min 
//     max:100 
// })) ;
// // end  

// app.use(helmet() ) ;
// app.use(cors() ) ;
// app.use(xss() ) ;


app.use('/' ,  Routes) ;  
// notes:
// check how to make array of ids in mongoose 

// user can log in and register *
// admin can create group / delete / edit *
// add users to it / remove users *
// assign tasks for each user / edit /remove / mark as done 
// list my groups *
// list users in my group *
// make an add request for user to join your group *
// user can accept the request or deny it *
// get my requests *
// search for groups/users which is public 


app.use(notFoundMiddleware) ;
app.use(errorMiddleware) ;

const start = async ()=>{
    try{
        connectDB(process.env.MONGO_URI) ;
        app.listen(process.env.PORT || 5000 , ()=>{
            console.log(`Server listening on Port ${process.env.PORT||5000}`) ;
        });
    }catch(err){
        console.log(err) ;
    }
}
 
start()
