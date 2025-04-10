import express from "express";

const porta = 3000;
const localhost = "0.0.0.0";

const app = express();

app.use(express.static("./public"));

app.use(express.static("./private"));

app.listen(porta, localhost, () => {
  console.log(`O servidor está disponível em http://${localhost}:${porta};`);
});
