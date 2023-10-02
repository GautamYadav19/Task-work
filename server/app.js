const express = require("express");
const connectDB = require("./db");
const taskRoutes = require("./routes/tasks");

const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();

// Connect to the database
connectDB();
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);

app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use("/api", taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server error" });
});

app.listen(process.env.PORT || "3000", () => {});
module.exports = app;
