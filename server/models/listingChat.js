import { connectDb } from "./db.js";

const mongoose = await connectDb();

const listingChatSchema = new mongoose.Schema({
    buyer:{type:mongoose.Schema.Types.ObjectId, ref: "buyer"},
    listing: {type:mongoose.Schema.Types.ObjectId, ref: "listing"},
    message: [{
        content:string
    }]
});

const listingChat = mongoose.model('listingChat',listingChatSchema,'listingChats')

export async function createListingChat(buyer,listing,message){
    const newListingChat = await listingChat.create({
        buyer,
        listing,
        message
    });
    return newListingChat
}

export async function findListingChatBySellerId(){
    
}
