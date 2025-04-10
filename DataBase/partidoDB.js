import conectar from "./conexao.js";
import Partido from "../model/partido.js";

export default class PartidoDB {
  constructor() {
    this.init();
  }

  async init() {
    try {
      const conexao = await conectar();
      const sql = `CREATE TABLE IF NOT EXISTS partido (
                codigo VARCHAR(10) NOT NULL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                sigla VARCHAR(10) NOT NULL
            )`;
      await conexao.execute(sql);
    } catch (erro) {
      console.log("Erro ao iniciar a tabela partido:" + erro);
    }
  }

  async gravar(partido) {
    if (partido instanceof Partido) {
      const conexao = await conectar();
      const sql = `INSERT INTO partido (codigo, nome, sigla)
                         VALUES ( ?, ?, ? )`;
      const parametros = [partido.codigo, partido.nome, partido.sigla];

      await conexao.execute(sql, parametros);
      await conexao.release(); //liberar a conexão para o pool
    }
  }
  async alterar(partido) {
    if (partido instanceof Partido) {
      const conexao = await conectar();
      const sql = `UPDATE partido SET 
                         nome = ?, sigla = ? WHERE codigo = ?`;
      const parametros = [partido.nome, partido.sigla, partido.codigo];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }
  async excluir(partido) {
    if (partido instanceof Partido) {
      const conexao = await conectar();
      const sql = `DELETE FROM partido WHERE codigo = ?`;
      const parametros = [partido.codigo];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }
  async consultar() {
    const conexao = await conectar();
    const sql = `SELECT * FROM partido ORDER BY nome`;
    const [registros, campos] = await conexao.execute(sql);
    await conexao.release();
    let listaPartidos = [];
    for (const registro of registros) {
      const partido = new Partido(
        registro.codigo,
        registro.nome,
        registro.sigla
      );
      listaPartidos.push(partido);
    }
    return listaPartidos;
  }
}
