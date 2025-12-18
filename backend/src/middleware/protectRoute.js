import {requireAuth } from '@clerk/express'
import User from '../models/User.js'

export const protectRoute = [
    requireAuth(),
    async (req,res,next)=>{
        try{
            const clerkID = req.auth().userId;
            if(!clerkID) return res.status(401).json({msg:"Unauthorized"});

            const user = await User.findOne({clerkID});
            if(!user) return res.status(401).json({msg:"Unauthorized"});
            req.user = user; //attach user to req object
            next();
        }
        catch(err){
            return res.status(401).json({msg:"Unauthorized"});
        }
    }
        
]
