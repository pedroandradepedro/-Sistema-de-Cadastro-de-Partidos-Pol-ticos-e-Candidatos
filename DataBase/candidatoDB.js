import conectar from "./conexao.js";
import Candidato from "../model/candidato.js";

export default class CandidatoDB {
  constructor() {
    this.init();
  }

  async init() {
    try {
      const conexao = await conectar();
      const sql = `CREATE TABLE IF NOT EXISTS candidato (
                cpf VARCHAR(14) NOT NULL PRIMARY KEY,
                titulo VARCHAR(100) NOT NULL,
                nome VARCHAR(100) NOT NULL,
                endereco VARCHAR(100) NOT NULL,
                numero VARCHAR(10) NOT NULL,
                bairro VARCHAR(100) NOT NULL,
                cidade VARCHAR(100) NOT NULL,
                uf VARCHAR(100) NOT NULL,
                cep VARCHAR(10) NOT NULL,
                renda VARCHAR(100) NOT NULL
            )`;
      await conexao.execute(sql);
    } catch (erro) {
      console.log("Erro ao iniciar a tabela candidato:" + erro);
    }
  }

  async gravar(candidato) {
    if (candidato instanceof Candidato) {
      const conexao = await conectar();
      const sql = `INSERT INTO candidato (cpf, titulo, nome, endereco, numero, bairro, cidade, uf, cep, renda)
                         VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;
      const parametros = [
        candidato.cpf,
        candidato.titulo,
        candidato.nome,
        candidato.endereco,
        candidato.numero,
        candidato.bairro,
        candidato.cidade,
        candidato.uf,
        candidato.cep,
        candidato.renda,
      ];

      await conexao.execute(sql, parametros);
      await conexao.release(); //liberar a conexão para o pool
    }
  }
  async alterar(candidato) {
    if (candidato instanceof Candidato) {
      const conexao = await conectar();
      const sql = `UPDATE candidato SET 
                         titulo = ?, nome = ?, endereco = ?, numero = ?, bairro = ?, cidade = ?, uf = ?, cep = ?, renda = ? WHERE cpf = ?`;
      const parametros = [
        candidato.titulo,
        candidato.nome,
        candidato.endereco,
        candidato.numero,
        candidato.bairro,
        candidato.cidade,
        candidato.uf,
        candidato.cep,
        candidato.renda,
        candidato.cpf,
      ];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }
  async excluir(candidato) {
    if (candidato instanceof Candidato) {
      const conexao = await conectar();
      const sql = `DELETE FROM candidato WHERE cpf = ?`;
      const parametros = [candidato.cpf];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }
  async consultar() {
    const conexao = await conectar();
    const sql = `SELECT * FROM candidato ORDER BY nome`;
    const [registros, campos] = await conexao.execute(sql);
    await conexao.release();
    let listaCandidatos = [];
    for (const registro of registros) {
      const candidato = new Candidato(
        registro.cpf,
        registro.titulo,
        registro.nome,
        registro.endereco,
        registro.numero,
        registro.bairro,
        registro.cidade,
        registro.uf,
        registro.cep,
        registro.renda
      );
      listaCandidatos.push(candidato);
    }
    return listaCandidatos;
  }
}
