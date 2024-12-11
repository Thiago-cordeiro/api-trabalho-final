const input = document.querySelector('.input-task');
const button = document.querySelector('.button-add-task');
const listTasks = document.querySelector('.list-tasks');

let lista = [];

recarregarTarefas();

async function popularArray() {
    const taskValue = input.value.trim();
    if (taskValue === "") {
        window.alert('Erro, digite algo');
    } else {
        try {
            const response = await fetch('http://localhost:3333/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    msg: taskValue,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar tarefa');
            }

            const novaTarefa = await response.json();
            lista.push(novaTarefa);
            input.value = "";
            mostrarLista();
        } catch (error) {
            console.error('Erro:', error);
        }
    }
}

async function mostrarLista() {
    let novaLi = "";

    lista.forEach((item, posicao) => {
        novaLi += `
        <li class="task">
            <p contenteditable="true" onblur="editarTarefa('${item.id}', this.textContent.trim())">${item.msg}</p>
            <img src="./img/trash.svg" alt="tarefa-para-o-lixo" onclick="deletarItem('${item.id}')">
        </li>
        `;
    });
    
    listTasks.innerHTML = novaLi;
}

async function editarTarefa(id, novoTexto) {
    try {
        if (!novoTexto) {
            window.alert('A tarefa não pode estar vazia');
            return;
        }

        const response = await fetch(`http://localhost:3333/customer?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                msg: novoTexto,
            }),
        });

        if (!response.ok) {
            throw new Error('Erro ao editar tarefa');
        }

        const tarefaEditada = lista.find(item => item.id === id);
        if (tarefaEditada) {
            tarefaEditada.msg = novoTexto;
        }
        mostrarLista();
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function deletarItem(id) {
    try {
        const response = await fetch(`http://localhost:3333/customer?id=${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar tarefa');
        }

        lista = lista.filter(item => item.id !== id);
        mostrarLista();
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function recarregarTarefas() {
    try {
        const response = await fetch('http://localhost:3333/customers');

        if (!response.ok) {
            throw new Error('Erro ao carregar tarefas');
        }

        lista = await response.json();
        mostrarLista();
    } catch (error) {
        console.error('Erro:', error);
    }
}

button.addEventListener('click', popularArray);
