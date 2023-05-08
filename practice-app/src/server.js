import app from "./app.js";
import { config } from "dotenv";
config();
const port = process.env.PORT || 8080;
const apiUrl = process.env.API_URL;


app.listen(port, () => {
  console.log(`App started at http://${apiUrl}`);
});