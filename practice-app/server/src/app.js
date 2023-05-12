import express from "express";
import morgan from "morgan";
import router from "./routes/index.js";
import connectToDb from "./utils/db.js";
import swaggerDocs from "./utils/swagger.js";
import { config } from "dotenv";
import cors from "cors";
config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use("/api", router );

const apiUrl = process.env.API_URL;

swaggerDocs(app, apiUrl);
connectToDb();

export default app;