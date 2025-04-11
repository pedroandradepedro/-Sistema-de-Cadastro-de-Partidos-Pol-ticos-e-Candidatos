const formCadPartido = document.getElementById("formPartido");
const acao = "cadastrar";

function manipularEnvio(evento) {
  if (!formCadPartido.checkValidity()) {
    formCadPartido.classList.add("was-validated");
  } else {
    adicionarPartido();
    formCadPartido.reset();
    mostrarTabelaPartidos();
  }
  evento.preventDefault();
  evento.stopPropagation();
}

function pegarDadosPartido() {
  const codigo = document.getElementById("codigo").value;
  const nome = document.getElementById("nome").value;
  const sigla = document.getElementById("sigla").value;

  return {
    codigo: codigo,
    nome: nome,
    sigla: sigla,
  };
}

function adicionarPartido() {
  const dadosPartido = pegarDadosPartido();
  fetch("http://localhost:3000/partidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosPartido),
  })
    .then((resposta) => {
      return resposta.json();
    })
    .then((dadosRecebidos) => {
      if (dadosRecebidos.status) {
        mostrarMensagem(dadosRecebidos.mensagem, "success");
      } else {
        mostrarMensagem(dadosRecebidos.mensagem, "danger");
      }
    })
    .catch((erro) => {
      mostrarMensagem(erro, "danger");
    });
}

function atualizarPartido() {
  if (confirm("confirma a atualização do partido?")) {
    const dadosPartido = pegarDadosPartido();
    fetch("http://localhost:3000/partidos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosPartido),
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dadosRecebidos) => {
        if (dadosRecebidos.status) {
          mostrarMensagem(dadosRecebidos.mensagem, "success");
        } else {
          mostrarMensagem(dadosRecebidos.mensagem, "danger");
        }
      })
      .catch((erro) => {
        mostrarMensagem(erro, "danger");
      });
  }
}

function excluirPartido() {
  //é necessário enviar a requisição HTTP usando fetch API (método DELETE)
  if (confirm("Confirma a exclusão do partido selecionado")) {
    fetch("http://localhost:3000/partidos"),
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo: document.getElementById("codigo").value,
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dadosRecebidos) => {
            if (dadosRecebidos.status) {
              mostrarMensagem(dadosRecebidos.mensagem, "success");
            } else {
              mostrarMensagem(dadosRecebidos.mensagem, "danger");
            }
          })
          .catch((erro) => {
            mostrarMensagem(erro, "danger");
          }),
      };
  }
}

function mostrarMensagem(mensagem, tipo = "success") {
  const espacoMensagem = document.getElementById("mensagem");
  espacoMensagem.innerHTML = `<div class="alert alert-${tipo}" role="alert">
        ${mensagem}
    </div>`;
  setInterval(() => {
    espacoMensagem.innerHTML = "";
  }, 5000);
}
function mostrarTabelaPartidos() {
  fetch("http://localhost:3000/partidos", {
    method: "GET",
  })
    .then((resposta) => {
      return resposta.json();
    })
    .then((dadosRecebidos) => {
      if (dadosRecebidos.status) {
        const partidos = dadosRecebidos.partidos;
        if (partidos.length > 0) {
          const espacoTabela = document.getElementById("espacoTabela");
          espacoTabela.innerHTML = "";

          const tabela = document.createElement("table");
          tabela.className = "table table-striped table-hover";
          const cabecalho = document.createElement("thead");
          const corpo = document.createElement("tbody");
          cabecalho.innerHTML = `
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Sigla</th>
                </tr>
            `;
          tabela.appendChild(cabecalho);
          for (let i = 0; i < partidos.length; i++) {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                        <td>${partidos[i].codigo}</td>
                        <td>${partidos[i].nome}</td>
                        <td>${partidos[i].sigla}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="pegarPartido('${partidos[i].codigo}',
                            '${partidos[i].nome}','${partidos[i].sigla}','atualizar')"><i class="bi bi-pencil"></i></button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="pegarPartido('${partidos[i].codigo}',
                            '${partidos[i].nome}','${partidos[i].sigla}','excluir')"><i class="bi bi-trash"></i></button>
                        </td>
                    `;
            corpo.appendChild(linha);
          }
          tabela.appendChild(corpo);
          espacoTabela.appendChild(tabela);
        } else {
          mostrarMensagem("Não há partidos cadastrados", "warning");
        }
      } else {
        mostrarMensagem(dadosRecebidos.mensagem, "danger");
      }
    })
    .catch((erro) => {
      mostrarMensagem(erro, "danger");
    });
}

function pegarPartido(codigo, nome, sigla, acao = "atualizar") {
  document.getElementById("codigo").value = codigo;
  document.getElementById("nome").value = nome;
  document.getElementById("sigla").value = sigla;
  if (acao === "atualizar") {
    document.getElementById("codigo").disabled = true;
    document.getElementById("atualizar").disabled = false;
    document.getElementById("cadastrar").disabled = true;
    document.getElementById("excluir").disabled = true;
  } else if (acao === "excluir") {
    document.getElementById("codigo").disabled = true;
    document.getElementById("atualizar").disabled = true;
    document.getElementById("cadastrar").disabled = true;
    document.getElementById("excluir").disabled = false;
  }
}

formCadPartido.onsubmit = manipularEnvio;
document.getElementById("atualizar").onclick = atualizarPartido;
document.getElementById("excluir").onclick = atualizarPartido;
mostrarTabelaPartidos();
