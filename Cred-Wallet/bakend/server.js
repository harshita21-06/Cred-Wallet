const connectToMongo = require("./database/db");
const express = require("express");
var cors = require("cors");
const path = require("path");

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cards", require("./routes/cards"));
// app.use(express.static(__dirname + "/public"));
// app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.render("server");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Cred-Wallet backend listening at http://localhost:${port}`);
});