import Candidato from "../model/candidato.js";

export default class CandidatoCtrl {
  //POST
  gravar(requisicao, resposta) {
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const cpf = dados.cpf;
      const titulo = dados.titulo;
      const nome = dados.nome;
      const endereco = dados.endereco;
      const numero = dados.numero;
      const bairro = dados.bairro;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const cep = dados.cep;
      const renda = dados.renda;
      if (
        cpf &&
        titulo &&
        nome &&
        endereco &&
        numero &&
        bairro &&
        cidade &&
        uf &&
        cep &&
        renda
      ) {
        const candidato = new Candidato(
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
        );
        candidato
          .gravar()
          .then(() => {
            resposta.status(201).json({
              status: true,
              mensagem: "Candidato gravado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao gravar o candidato: " + erro,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Todos os campos devem ser informados",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }

  //PUT ou PATCH
  alterar(requisicao, resposta) {
    if (
      (requisicao.method === "PUT" || requisicao.method === "PATCH") &&
      requisicao.is("application/json")
    ) {
      const dados = requisicao.body;
      const cpf = dados.cpf;
      const titulo = dados.titulo;
      const nome = dados.nome;
      const endereco = dados.endereco;
      const numero = dados.numero;
      const bairro = dados.bairro;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const cep = dados.cep;
      const renda = dados.renda;

      if (
        cpf &&
        titulo &&
        nome &&
        endereco &&
        numero &&
        bairro &&
        cidade &&
        uf &&
        cep &&
        renda
      ) {
        const candidato = new Candidato(
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
        );
        candidato
          .alterar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Candidato alterado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao alterar o candidato: " + erro,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Todos os campos devem ser informados",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }

  //DELETE
  excluir(requisicao, resposta) {
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const cpf = dados.cpf;
      if (cpf) {
        const candidato = new Candidato(cpf);
        candidato
          .excluir()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Candidato excluído com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao excluir o candidato: " + erro,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o CPF do candidato a ser excluído!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }

  //GET
  consultar(requisicao, resposta) {
    if (requisicao.method === "GET") {
      const candidato = new Candidato();
      candidato
        .consultar()
        .then((listaCandidatos) => {
          resposta.status(200).json({
            status: true,
            candidatos: listaCandidatos,
          });
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao consultar os candidatos: " + erro,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }
}
