const tabela = document.querySelector('.tabela-js')

// Faz uma requisição a um usuário com um ID específico
axios.get('http://127.0.0.1:5000/list').then(function (resposta) {
    // manipula o sucesso da requisição
    console.log(resposta.data);
    getData(resposta.data);
}).catch(function(error){ // Tratamento de erro caso dê problema na requisição
    console.log(error)
});

// Percorrer o objeto de uma array e imprimindo uma propriedade (nome)
function getData(dados){
    dados.map((item)=>{
        tabela.innerHTML += `
        <tr>
            <th scope="row">${item.ID}</th>
            <td>${item.TAREFA}</td>
            <td>
                <span class="material-symbols-outlined text-danger" onclick="excluirTarefa(${item.ID})">
                    delete
                </span>
                <span class="material-symbols-outlined text-success" onclick="atualizarTarefa('${item.TAREFA}')">
                    edit
                </span>
            </td>
        </tr>
        `
    });
}

////////////// POST //////////////
const addBtn = document.querySelector(".add");

addBtn.addEventListener('click', function (event) {
  event.preventDefault();

const tarefaInput = document.getElementById("tarefa");
const novaTarefa = tarefaInput.value;
if (novaTarefa != ""){
  axios.post('http://127.0.0.1:5000/add', {Tarefa: novaTarefa})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Erro na requisição POST', error);
    });   

  tarefaInput.value = "";
}
else{
  console.log("Erro: O campo de tarefa está vazio.")
}

});

// Atualizar Tarefa (PUT)
function atualizarTarefa(tarefaAntiga) {
    const tarefaNova = prompt("Digite a nova tarefa:", tarefaAntiga);

    if (tarefaNova !== null) {
        axios.put('http://127.0.0.1:5000/updateTarefa', { "TAREFA_ANTIGA": tarefaAntiga, "TAREFA_NOVA": tarefaNova })
            .then(function (resposta) {
                // Atualiza a tabela após atualizar a tarefa
                tabela.innerHTML = "";
                getData(resposta.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

// Excluir Tarefa (DELETE)
function excluirTarefa(tarefaId) {
    if (confirm(`Deseja realmente excluir a tarefa com ID ${tarefaId}?`)) {
        axios.delete(`http://127.0.0.1:5000/delete/${tarefaId}`)
            .then(function (resposta) {
                // Atualiza a tabela após excluir a tarefa
                tabela.innerHTML = "";
                getData(resposta.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}