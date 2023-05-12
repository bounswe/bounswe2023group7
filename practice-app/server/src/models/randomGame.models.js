import mongoose from "mongoose";

const randomGameSchema = mongoose.Schema({
    appId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    }, 
    shortDescription: {
        type: String
    },
    headerImage: {
        type: String 
    }, 
    price: {
        type: String
    },
    email: {
        type: String, 
        required: true
    }
});
randomGameSchema.index({appId: 1, email: 1}, {unique: true});

export const RandomGame = mongoose.model('RandomGames', randomGameSchema);

export async function getHistoryByEmail(email){
    return await RandomGame.find({email: email});
}

export async function addToHistory(model){
    return await RandomGame.create(model);
}
