require("dotenv").config();
const MONGOURI = process.env.MONGOURI;
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const multer = require("multer");

require("./models/user");
require("./models/post");
require("./models/library");
app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));
app.use(require("./routes/library"));
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Conectado ao Mongo");
});
mongoose.connection.on("err", (err) => {
  console.log("Erro ao conectar o Mongo", err);
});

app.listen(port, () => {
  console.log(`####### REALGRAM API #######`);
  console.log(`Servidor iniciado na porta: ${port}`);
});
