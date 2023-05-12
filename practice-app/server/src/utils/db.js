import mongoose from "mongoose";
import { config } from "dotenv";
config();
const dbURI = process.env.DB_URI || 'mongodb+srv://senaalciii:<password>@practice-app.a6lf0ms.mongodb.net/';

async function connectToDb() {
    try {
        mongoose.set("strictQuery", false);
        console.log("Connecting to db: " + dbURI);
        await mongoose.connect(dbURI);
        console.log("Connected to DB");
    } catch (e) {
        console.error("Failed to connect to DB");
        process.exit(1);
    }
}

export default connectToDb;