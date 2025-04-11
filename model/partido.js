import PartidoDB from "../DataBase/partidoDB.js";

export default class Partido {
  #codigo;
  #nome;
  #sigla;

  constructor(codigo, nome, sigla) {
    this.#codigo = codigo;
    this.#nome = nome;
    this.#sigla = sigla;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get nome() {
    return this.#nome;
  }

  set sigla(novaSigla) {
    this.#sigla = novaSigla;
  }

  get sigla() {
    return this.#sigla;
  }

  set codigo(novoCodigo) {
    this.#codigo = novoCodigo;
  }

  get codigo() {
    return this.#codigo;
  }

  //formato JSON de um objeto
  toJSON() {
    return {
      codigo: this.#codigo,
      nome: this.#nome,
      sigla: this.#sigla,
    };
  }

  async gravar() {
    const parDB = new PartidoDB();
    parDB.gravar(this);
  }

  async alterar() {
    const parDB = new PartidoDB();
    parDB.alterar(this);
  }

  async excluir() {
    const parDB = new PartidoDB();
    parDB.excluir(this);
  }

  async consultar() {
    const parDB = new PartidoDB();
    return await parDB.consultar(this);
  }
}
