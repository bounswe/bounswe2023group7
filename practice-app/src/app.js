import express from "express";
import morgan from "morgan";
import router from "./routes/index.js"
const app = express();

app.use( morgan('dev'));
app.use("/api", router );
const port = 8080;


app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});