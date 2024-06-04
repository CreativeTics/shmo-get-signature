const express = require("express");
const cors = require("cors");
const queryRoutes = require("./routes/queryRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api", queryRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
