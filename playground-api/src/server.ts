import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import apiRouter from "./apiRouter";

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.options('*', cors());

app.get("/", (req, res) => {
  res.json({ message: "The Playground API lives here!" });
});

app.use("/api/", apiRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

mongoose.connect('mongodb://playground-mongo:27017/playground-api')
.then(() => {
  console.log("Connected to Mongo!");
})
.catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});