const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();
app.use(cors());
//connect database
connectDB();

//init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the movie library API" })
);

//routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/watchlist", require("./routes/watchlist"));
app.use(express.static(path.join(__dirname, "client", "build")));
const PORT = process.env.PORT || 5000;
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
