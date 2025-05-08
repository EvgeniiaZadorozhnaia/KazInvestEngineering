require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mainRouter = require("./routers/mainRouter.js");

const app = express();
const { PORT } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/openAI", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
