import { Router } from "express";
import CandidatoCtrl from "../Controller/candidatoCtrl.js";

const rotaCandidato = Router(); //mini aplicação http
const canCtrl = new CandidatoCtrl();

rotaCandidato.get("/", canCtrl.consultar);
rotaCandidato.post("/", canCtrl.gravar);
rotaCandidato.put("/", canCtrl.alterar);
rotaCandidato.patch("/", canCtrl.alterar);
rotaCandidato.delete("/", canCtrl.excluir);

export default rotaCandidato;
