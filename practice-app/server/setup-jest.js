import mongoose from "mongoose";
afterAll(async () => {
    console.log("Closing connection to DB");
    await mongoose.connection.close();
});