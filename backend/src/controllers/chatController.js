import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
    try{
        //use clerkid for stream (not mongodb id) => it should match the id in stream dashboard
        const token = chatClient.createToken(req.user.clerkID);
        res.status(200).json({
            token,
            userId : req.user.clerkID,
            userName: req.user.name,
            userImage: req.user.image
        })
    } catch (error){
        console.log("Error in getStreamToken controller: ",error);
        res.status(500).json({message : "Internal server error"});
    }
}
