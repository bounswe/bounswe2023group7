import express from "express";
import morgan from "morgan";
import router from "./routes/index.js";
import swaggerDocs from "./utils/swagger.js";
import { config } from "dotenv";
import connectToDb from "./utils/db.js";
config();
const app = express();

app.use(morgan('dev'));
app.use("/api", router );
app.use(express.json());
const port = process.env.PORT || 8080;
const apiUrl = process.env.API_URL;

app.listen(port, () => {
  console.log(`App started at http://${apiUrl}`);
  swaggerDocs(app, apiUrl);
  connectToDb();
});

export default app;