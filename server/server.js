require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// Routes
app.use("/api", require("./routes/teamRoutes"));
app.use("/api", require("./routes/soloRoutes"));
app.use("/api", require("./routes/matchRoutes"));
app.use("/api", require("./routes/reviewRoutes"));

app.listen(process.env.PORT || 5000, () => console.log("Server running 🚀"));
