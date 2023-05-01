import express from "express";
import morgan from "morgan";
const app = express();

app.use('/', morgan('dev'));
app.get('/', (_, res) => {
    return res.status(200).send("Welcome to the practice app!");
});
const port = 8080;


app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});