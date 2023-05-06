import express from "express";
import morgan from "morgan";
import router from "./routes/index.js"
import { config } from "dotenv";
import connectToDb from "./utils/db.js";
const app = express();
config();
app.use( morgan('dev'));
app.use("/api", router );
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
  connectToDb();
});