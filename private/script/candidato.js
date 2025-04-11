const formCadCandidato = document.getElementById("formCandidato");
const acao = "cadastrar";

function manipularEnvio(evento) {
  if (!formCadCandidato.checkValidity()) {
    formCadCandidato.classList.add("was-validated");
  } else {
    adicionarCandidato();
    formCadCandidato.reset();
    mostrarTabelaCandidatos();
  }
  evento.preventDefault();
  evento.stopPropagation();
}

function pegarDadosCandidato() {
  const cpf = document.getElementById("cpf").value;
  const titulo = document.getElementById("titulo").value;
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const numero = document.getElementById("numero").value;
  const bairro = document.getElementById("bairro").value;
  const cidade = document.getElementById("nome").value;
  const uf = document.getElementById("uf").value;
  const cep = document.getElementById("cep").value;
  const renda = document.getElementById("renda").value;

  return {
    cpf: cpf,
    titulo: titulo,
    nome: nome,
    endereco: endereco,
    numero: numero,
    bairro: bairro,
    cidade: cidade,
    uf: uf,
    cep: cep,
    renda: renda,
  };
}

function adicionarCandidato() {
  const dadosCandidato = pegarDadosCandidato();
  fetch("http://localhost:3000/candidatos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosCandidato),
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

function atualizarCandidato() {
  if (confirm("confirma a atualização do candidato?")) {
    const dadosCandidato = pegarDadosCandidato();
    fetch("http://localhost:3000/candidatos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosCandidato),
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

function excluirCandidato() {
  //é necessário enviar a requisição HTTP usando fetch API (método DELETE)
  if (confirm("Confirma a exclusão do candidato selecionado")) {
    fetch("http://localhost:3000/candidatos"),
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cpf: document.getElementById("cpf").value,
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
function mostrarTabelaCandidatos() {
  fetch("http://localhost:3000/candidatos", {
    method: "GET",
  })
    .then((resposta) => {
      return resposta.json();
    })
    .then((dadosRecebidos) => {
      if (dadosRecebidos.status) {
        const candidatos = dadosRecebidos.candidatos;
        if (candidatos.length > 0) {
          const espacoTabela = document.getElementById("espacoTabela");
          espacoTabela.innerHTML = "";

          const tabela = document.createElement("table");
          tabela.className = "table table-striped table-hover";
          const cabecalho = document.createElement("thead");
          const corpo = document.createElement("tbody");
          cabecalho.innerHTML = `
                <tr>
                    <th>CPF</th>
                    <th>Título</th>
                    <th>Nome</th>
                    <th>Rua</th>
                    <th>Num</th>
                    <th>Bairro</th>
                    <th>City</th>
                    <th>UF</th>
                    <th>CEP</th>
                    <th>Renda</th>
                </tr>
            `;
          tabela.appendChild(cabecalho);
          for (let i = 0; i < candidatos.length; i++) {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                        <td>${candidatos[i].cpf}</td>
                        <td>${candidatos[i].titulo}</td>
                        <td>${candidatos[i].nome}</td>
                        <td>${candidatos[i].endereco}</td>
                        <td>${candidatos[i].numero}</td>
                        <td>${candidatos[i].bairro}</td>
                        <td>${candidatos[i].cidade}</td>
                        <td>${candidatos[i].uf}</td>
                        <td>${candidatos[i].cep}</td>
                        <td>${candidatos[i].renda}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="pegarCandidato('${candidatos[i].cpf}',
                            '${candidatos[i].titulo}','${candidatos[i].nome}','${candidatos[i].endereco}','${candidatos[i].numero}','${candidatos[i].bairro}','${candidatos[i].cidade}','${candidatos[i].uf}','${candidatos[i].cep}','${candidatos[i].renda}','atualizar')"><i class="bi bi-pencil"></i></button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="pegarCandidato('${candidatos[i].cpf}',
                            '${candidatos[i].titulo}','${candidatos[i].nome}','${candidatos[i].endereco}','${candidatos[i].numero}','${candidatos[i].bairro}','${candidatos[i].cidade}','${candidatos[i].uf}','${candidatos[i].cep}','${candidatos[i].renda}','excluir')"><i class="bi bi-trash"></i></button>
                        </td>
                    `;
            corpo.appendChild(linha);
          }
          tabela.appendChild(corpo);
          espacoTabela.appendChild(tabela);
        } else {
          mostrarMensagem("Não há candidatos cadastrados", "warning");
        }
      } else {
        mostrarMensagem(dadosRecebidos.mensagem, "danger");
      }
    })
    .catch((erro) => {
      mostrarMensagem(erro, "danger");
    });
}

function pegarCandidato(
  cpf,
  titulo,
  nome,
  endereco,
  numero,
  bairro,
  cidade,
  uf,
  cep,
  renda,
  acao = "atualizar"
) {
  document.getElementById("cpf").value = cpf;
  document.getElementById("titulo").value = titulo;
  document.getElementById("nome").value = nome;
  document.getElementById("endereco").value = endereco;
  document.getElementById("numero").value = numero;
  document.getElementById("bairro").value = bairro;
  document.getElementById("cidade").value = cidade;
  document.getElementById("uf").value = uf;
  document.getElementById("cep").value = cep;
  document.getElementById("renda").value = renda;
  if (acao === "atualizar") {
    document.getElementById("cpf").disabled = true;
    document.getElementById("atualizar").disabled = false;
    document.getElementById("cadastrar").disabled = true;
    document.getElementById("excluir").disabled = true;
  } else if (acao === "excluir") {
    document.getElementById("cpf").disabled = true;
    document.getElementById("atualizar").disabled = true;
    document.getElementById("cadastrar").disabled = true;
    document.getElementById("excluir").disabled = false;
  }
}

formCadCandidato.onsubmit = manipularEnvio;
document.getElementById("atualizar").onclick = atualizarCandidato;
document.getElementById("excluir").onclick = atualizarCandidato;
mostrarTabelaCandidatos();
