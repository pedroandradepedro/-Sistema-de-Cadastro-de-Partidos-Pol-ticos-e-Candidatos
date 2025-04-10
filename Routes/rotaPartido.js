import { Router } from "express";
import PartidoCtrl from "../Controller/partidoCtrl.js";

const rotaPartido = Router(); //mini aplicação http
const parCtrl = new PartidoCtrl();

rotaPartido.get("/", parCtrl.consultar);
rotaPartido.post("/", parCtrl.gravar);
rotaPartido.put("/", parCtrl.alterar);
rotaPartido.patch("/", parCtrl.alterar);
rotaPartido.delete("/", parCtrl.excluir);

export default rotaPartido;
