import {StreamChat} from "stream-chat";
import {ENV} from "./env.js";

const apikey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apikey || !apiSecret){
    throw new Error("Stream API key or secret is missing in environment variables");
}

export const chatClient = StreamChat.getInstance(apikey , apiSecret);

export const upsertStreamUser = async(userData)=>{
    try {
        await chatClient.upsertUser(userData);
        console.log(`Stream user with ID ${userData.id} upserted successfully.`);
    } catch (error) {
        console.error("Error upserting Stream user: ", error);
    }
}
export const deleteStreamUser = async(userId)=>{
    try {
        await chatClient.deleteUser(userId)
        console.log(`Stream user with ID ${userId} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting the Stream user: ", error);
    }
}
