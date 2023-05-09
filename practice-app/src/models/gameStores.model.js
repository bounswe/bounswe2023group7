import mongoose from "mongoose";
const { Schema } = mongoose;

const gameStoresModel = new Schema ( {
    store_id: {
        type: Number,
    },
    store_name: {
    type: String,
    },
    store_images: {
        store_banner : {
            type: String,
        },
        store_logo : {
            type: String,
        },
        store_icon : {
            type: String,
        }
    }
});

const GameStores = mongoose.model("gamestores", gameStoresModel);

export default GameStores;