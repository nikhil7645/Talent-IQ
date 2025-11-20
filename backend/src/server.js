import express from "express";  //using  instead of const express = require('express'); by changing "type":"module", in package.json
import { ENV } from "./lib/env.js";


const app = express();

console.log(ENV.PORT);
console.log(ENV.DB_URL);
app.get("/health" , (req,res)=>{
    res.status(200).json({msg:"api is up and running"});
})

app.listen(3000 , ()=> console.log("Server is running on port:", ENV.PORT));
