import {Inngest} from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { upsertStreamUser , deleteStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "talent-iq" });

const syncUser = inngest.createFunction(
    {id:"sync/user"},
    {event:"clerk/user.created"},
    async ({event})=>{
        await connectDB();
        const {id , email_addresses , first_name,last_name , profile_image_url} = event.data;
        const newUser = {
            clerkID: id,
            email:email_addresses[0].email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage:profile_image_url
        }
        await User.create(newUser);
        
        await upsertStreamUser({
            id: id,
            name: newUser.name,
            email: newUser.email,
            image: newUser.profileImage
        });
    }
)

const deleteUserFromDb = inngest.createFunction(
    {id:"delete-user-from-db"},
    {event:"clerk/user.deleted"},
    async ({event})=>{
        await connectDB();
        const {id} = event.data;
        
        await User.deleteOne({clerkID:id});
        await deleteStreamUser(id.toString());
    }
)

export const functions = [syncUser , deleteUserFromDb];
