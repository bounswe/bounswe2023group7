import express from "express";
import morgan from "morgan";
import router from "./routes/index.js";
import swaggerDocs from "./utils/swagger.js";
import { config } from "dotenv";
config();
const app = express();

app.use(morgan('dev'));
app.use("/api", router );
const port = 8080;
const apiUrl = process.env.API_URL;

app.listen(port, () => {
  console.log(`App started at http://${apiUrl}`);
  swaggerDocs(app, apiUrl);
});