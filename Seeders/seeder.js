require('dotenv').config()
const { json } = require('express');
const connectDB = require('../db/connect.js')
const product = require('../models/modelName.js')

const jsonProduct = require('./seeder.json') ;

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI) ;
        await product.deleteMany({}) ; 
        await product.create(jsonProduct);
        process.exit(3) ;
    }catch(err){
        console.log(err) ;
        process.exit(1) ;
    }
}

start()
