import express from "express";
import {connectDb} from "./src/db/db.js";

const app = express();


app.get("/", (req, res) => {
  res.send("Server is healthy!!");
});


const port = process.env.PORT || 8080;

await connectDb();




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});