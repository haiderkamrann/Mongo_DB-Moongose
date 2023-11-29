// Server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("../Routes/Routes.js");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/userdata");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
