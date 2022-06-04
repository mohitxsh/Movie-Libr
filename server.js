const express = require("express");
const connectDB = require("./config/db");

const app = express();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
