const express = require("express");
const connectDb = require("./config/connection.js");
const usersRoute = require("./routes/usersRoute.js");
const authRoute = require("./routes/authRoute.js");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/users", usersRoute);

app.use("/api", authRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
