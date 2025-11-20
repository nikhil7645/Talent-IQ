import moongoose from 'mongoose';

import {ENV} from "./env.js";

export const connectDB = async()=>{
    try{
        if(!ENV.DB_URL){
            throw new Error("Database URL is not defined in environment variables");
        }
        
        const conn = await moongoose.connect(ENV.DB_URL);
        console.log("Database connected successfully" , conn.connection.host);
    }catch(err){
        console.log("Database connection failed");
        console.log(err);
        process.exit(1);
    }
}