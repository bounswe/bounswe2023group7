import express from "express";
import morgan from "morgan";
import router from "./routes/index.js";
import connectToDb from "./utils/db.js";
import swaggerDocs from "./utils/swagger.js";
import cors from "cors";

import { config } from "dotenv";

config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Define the allowed origins
const allowedOrigins = ["http://127.0.0.1:3000", "http://localhost:3000"];

app.use(cors());

app.use("/api", router);

const apiUrl = process.env.API_URL;

swaggerDocs(app, apiUrl);
connectToDb();

export default app;
