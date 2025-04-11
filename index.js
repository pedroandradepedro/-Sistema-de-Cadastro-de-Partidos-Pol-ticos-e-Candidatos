import express from "express";
import rotaPartido from "./Routes/rotaPartido.js";
import rotaCandidato from "./Routes/rotaCandidato.js";
import autenticar from "./secure/autenticar.js";
import session from "express-session";

const localhost = "0.0.0.0";
const porta = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  session({
    secret: "ch4v3s3cr3t4",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30, // 30 minutos
    },
  })
);

app.use("/partidos", rotaPartido);
app.use("/candidatos", rotaCandidato);

app.get("/login", (requisicao, resposta) => {
  resposta.redirect("/login.html");
});

app.post("/login", (requisicao, resposta) => {
  const usuario = requisicao.body.usuario;
  const senha = requisicao.body.senha;
  if (usuario === "admin" && senha === "admin") {
    requisicao.session.autenticado = true;
    resposta.redirect("/menu.html");
  } else {
    resposta.redirect("login.html");
  }
});

app.get("/logout", (requisicao, resposta) => {
  requisicao.session.destroy();
  resposta.redirect("/login.html");
});

app.use(express.static("./public"));

app.use(autenticar, express.static("./private"));

app.listen(porta, localhost, () => {
  console.log(`O servidor está disponível em http://${localhost}:${porta};`);
});
