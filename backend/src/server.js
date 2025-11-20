import express from "express";  //using  instead of const express = require('express'); by changing "type":"module", in package.json
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";


const app = express();
const __dirname = path.resolve();

app.get("/health" , (req,res)=>{
    res.status(200).json({msg:"api is up and running"});
})
app.get("/books" , (req,res)=>{
    res.status(200).json({msg:"book api is up and running"});
})

//make ready for deployement
if(ENV.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname , "../frontend/dist")));

    app.get("/*", (req,res)=>{
        res.sendFile(path.join(__dirname , "../frontend","dist","index.html"));
    });
}


const startServer = async () =>{
    try{
        await connectDB();  //database connection
        app.listen(ENV.PORT , ()=>{
            console.log(`Server is running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
        });
    } catch(err){
        console.log("Failed to start server");
        console.log(err);
    }
}

startServer();