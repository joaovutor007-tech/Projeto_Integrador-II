// Agenda CTBJ - Funcionalidades principais

const form = document.getElementById("form-agenda");
const tipo = document.getElementById("tipo");
const titulo = document.getElementById("titulo");
const disciplina = document.getElementById("disciplina");
const data = document.getElementById("data");
const observacao = document.getElementById("observacao");
const campoDisciplina = document.getElementById("campo-disciplina");
const listaAgenda = document.getElementById("lista-agenda");
const botoesFiltro = document.querySelectorAll(".btn-filtro");

let itensAgenda = JSON.parse(localStorage.getItem("agendaCTBJ")) || [];
let filtroAtual = "todos";
let itemEditando = null;


// Mostrar ou esconder o campo de disciplina
tipo.addEventListener("change", function () {
    if (tipo.value === "prova" || tipo.value === "trabalho") {
        campoDisciplina.style.display = "block";
        disciplina.required = true;
    } else {
        campoDisciplina.style.display = "none";
        disciplina.required = false;
        disciplina.value = "";
    }
});


// Salvar os dados no navegador
function salvarLocalStorage() {
    localStorage.setItem("agendaCTBJ", JSON.stringify(itensAgenda));
}


// Formatar a data para exibição
function formatarData(dataTexto) {
    const partes = dataTexto.split("-");

    if (partes.length !== 3) {
        return dataTexto;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


// Retornar o nome do tipo
function nomeTipo(tipo) {
    const nomes = {
        atividade: "Atividade",
        prova: "Prova",
        trabalho: "Trabalho",
        evento: "Evento"
    };

    return nomes[tipo] || tipo;
}


// Exibir os itens na tela
function renderizarAgenda() {
    listaAgenda.innerHTML = "";

    let itensFiltrados = itensAgenda.filter(function (item) {
        return filtroAtual === "todos" || item.tipo === filtroAtual;
    });

    // Organizar por data
    itensFiltrados.sort(function (a, b) {
        return a.data.localeCompare(b.data);
    });

    if (itensFiltrados.length === 0) {
        listaAgenda.innerHTML = `
            <p style="text-align: center; color: #6c757d;">
                Nenhum item cadastrado nesta categoria.
            </p>
        `;
        return;
    }

    itensFiltrados.forEach(function (item) {
        const card = document.createElement("div");
        card.className = `item-card ${item.tipo}`;

        let detalhes = `
            <p><strong>Tipo:</strong> ${nomeTipo(item.tipo)}</p>
            <p><strong>Data:</strong> ${formatarData(item.data)}</p>
        `;

        if (item.disciplina) {
            detalhes += `<p><strong>Disciplina:</strong> ${item.disciplina}</p>`;
        }

        if (item.observacao) {
            detalhes += `<p><strong>Observações:</strong> ${item.observacao}</p>`;
        }

        card.innerHTML = `
            <div class="item-info">
                <h3>${item.titulo}</h3>
                ${detalhes}
            </div>

            <div>
                <button class="btn-editar" data-id="${item.id}">
                    Editar
                </button>

                <button class="btn-excluir" data-id="${item.id}">
                    Excluir
                </button>
            </div>
        `;

        listaAgenda.appendChild(card);
    });

    adicionarEventosDosBotoes();
}


// Adicionar eventos aos botões Editar e Excluir
function adicionarEventosDosBotoes() {
    const botoesExcluir = document.querySelectorAll(".btn-excluir");
    const botoesEditar = document.querySelectorAll(".btn-editar");

    botoesExcluir.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const id = Number(botao.dataset.id);

            itensAgenda = itensAgenda.filter(function (item) {
                return item.id !== id;
            });

            salvarLocalStorage();
            renderizarAgenda();
        });
    });

    botoesEditar.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const id = Number(botao.dataset.id);

            const item = itensAgenda.find(function (item) {
                return item.id === id;
            });

            if (!item) {
                return;
            }

            itemEditando = id;

            tipo.value = item.tipo;
            titulo.value = item.titulo;
            disciplina.value = item.disciplina || "";
            data.value = item.data;
            observacao.value = item.observacao || "";

            if (item.tipo === "prova" || item.tipo === "trabalho") {
                campoDisciplina.style.display = "block";
                disciplina.required = true;
            } else {
                campoDisciplina.style.display = "none";
                disciplina.required = false;
            }

            document.getElementById("btn-salvar").textContent =
                "Atualizar na Agenda";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });
}


// Cadastrar ou atualizar um item
form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const novoItem = {
        id: itemEditando || Date.now(),
        tipo: tipo.value,
        titulo: titulo.value.trim(),
        disciplina: disciplina.value.trim(),
        data: data.value,
        observacao: observacao.value.trim()
    };

    if (itemEditando) {
        const indice = itensAgenda.findIndex(function (item) {
            return item.id === itemEditando;
        });

        if (indice !== -1) {
            itensAgenda[indice] = novoItem;
        }

        itemEditando = null;
        document.getElementById("btn-salvar").textContent =
            "Salvar na Agenda";
    } else {
        itensAgenda.push(novoItem);
    }

    salvarLocalStorage();
    renderizarAgenda();
    form.reset();

    campoDisciplina.style.display = "none";
    disciplina.required = false;
});


// Filtros da agenda
botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
        botoesFiltro.forEach(function (botaoAtual) {
            botaoAtual.classList.remove("active");
        });

        botao.classList.add("active");

        filtroAtual = botao.dataset.categoria;

        renderizarAgenda();
    });
});


// Exibir os dados quando a página for carregada
renderizarAgenda();