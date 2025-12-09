const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Gstu_web")
.then(() => console.log("MongoDB Connected to Gstu_web"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend running!");
});

app.listen(5000, () => console.log("Server running on port 5000"));
