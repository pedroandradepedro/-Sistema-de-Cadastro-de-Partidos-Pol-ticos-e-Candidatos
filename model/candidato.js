import CandidatoDB from "../DataBase/candidatoDB.js";

export default class Candidato {
  #cpf;
  #titulo;
  #nome;
  #endereco;
  #numero;
  #bairro;
  #cidade;
  #uf;
  #cep;
  #renda;

  constructor(
    cpf,
    titulo,
    nome,
    endereco,
    numero,
    bairro,
    cidade,
    uf,
    cep,
    renda
  ) {
    this.#cpf = cpf;
    this.#titulo = titulo;
    this.#nome = nome;
    this.#endereco = endereco;
    this.#numero = numero;
    this.#bairro = bairro;
    this.#cidade = cidade;
    this.#uf = uf;
    this.#cep = cep;
    this.#renda = renda;
  }

  set cpf(novoCpf) {
    this.#cpf = novoCpf;
  }

  get cpf() {
    return this.#cpf;
  }

  set titulo(novoTitulo) {
    this.#titulo = novoTitulo;
  }

  get titulo() {
    return this.#titulo;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get nome() {
    return this.#nome;
  }

  set endereco(novoEndereco) {
    this.#endereco = novoEndereco;
  }

  get endereco() {
    return this.#endereco;
  }

  set numero(novoNumero) {
    this.#numero = novoNumero;
  }

  get numero() {
    return this.#numero;
  }

  set bairro(novoBairro) {
    this.#bairro = novoBairro;
  }

  get bairro() {
    return this.#bairro;
  }

  set cidade(novaCidade) {
    this.#cidade = novaCidade;
  }

  get cidade() {
    return this.#cidade;
  }

  set uf(novaUf) {
    this.#uf = novaUf;
  }

  get uf() {
    return this.#uf;
  }

  set cep(novoCep) {
    this.#cep = novoCep;
  }

  get cep() {
    return this.#cep;
  }

  set renda(novaRenda) {
    this.#renda = novaRenda;
  }

  get renda() {
    return this.#renda;
  }

  //formato JSON de um objeto
  toJSON() {
    return {
      cpf: this.#cpf,
      titulo: this.#titulo,
      nome: this.#nome,
      endereco: this.#endereco,
      numero: this.#numero,
      bairro: this.#bairro,
      cidade: this.#cidade,
      uf: this.#uf,
      cep: this.#cep,
      renda: this.#renda,
    };
  }

  async gravar() {
    const canDB = new CandidatoDB();
    canDB.gravar(this);
  }

  async alterar() {
    const canDB = new CandidatoDB();
    canDB.alterar(this);
  }

  async excluir() {
    const canDB = new CandidatoDB();
    canDB.excluir(this);
  }

  async consultar() {
    const canDB = new CandidatoDB();
    return await canDB.consultar(this);
  }
}
