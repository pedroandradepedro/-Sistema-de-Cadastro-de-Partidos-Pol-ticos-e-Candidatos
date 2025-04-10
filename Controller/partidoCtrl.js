import Partido from "../model/partido.js";
export default class PartidoCtrl {
  //POST
  gravar(requisicao, resposta) {
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;
      const nome = dados.nome;
      const sigla = dados.sigla;
      if (codigo && nome && sigla) {
        const partido = new Partido(codigo, nome, sigla);
        partido
          .gravar()
          .then(() => {
            resposta.status(201).json({
              status: true,
              mensagem: "Partido gravado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao gravar o partido: " + erro,
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
      const codigo = dados.codigo;
      const nome = dados.nome;
      const sigla = dados.sigla;

      if (codigo && nome && sigla) {
        const partido = new Partido(codigo, nome, sigla);
        partido
          .alterar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "partido alterado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao alterar o partido: " + erro,
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
      const codigo = dados.codigo;
      if (codigo) {
        const partido = new Partido(codigo);
        cliente
          .excluir()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Partido excluído com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao excluir o partido: " + erro,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o código do partido a ser excluído!",
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
      const partido = new partido();
      partido
        .consultar()
        .then((listaPartidos) => {
          resposta.status(200).json({
            status: true,
            partidos: listaPartidos,
          });
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: "Erro ao consultar os partidos: " + erro,
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
