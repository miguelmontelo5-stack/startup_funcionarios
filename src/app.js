// =========================================================
// EXERCÍCIOS 1 e 2: Classe, Cadastro, Listagem, Edição e Exclusão
// =========================================================

class Funcionario {
    constructor(id, nome, idade, cargo, salario) {
        this._id = id;
        this._nome = nome;
        this._idade = Number(idade);
        this._cargo = cargo;
        this._salario = Number(salario);
    }

    // Métodos de acesso (Getters e Setters)
    get id() {
        return this._id;
    }

    get nome() {
        return this._nome;
    }

    set nome(novoNome) {
        this._nome = novoNome;
    }

    get idade() {
        return this._idade;
    }

    set idade(novaIdade) {
        this._idade = Number(novaIdade);
    }

    get cargo() {
        return this._cargo;
    }

    set cargo(novoCargo) {
        this._cargo = novoCargo;
    }

    get salario() {
        return this._salario;
    }

    set salario(novoSalario) {
        this._salario = Number(novoSalario);
    }

    // Método da classe para atualizar os atributos na edição (Exercício 2)
    atualizarDados(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    // Método toString() exigido no Exercício 1
    toString() {
        return `ID: ${this._id} | Nome: ${this._nome} | Idade: ${this._idade} anos | Cargo: ${this._cargo} | Salário: R$ ${this._salario.toFixed(2)}`;
    }
}

// Estado da aplicação (Array de objetos da classe Funcionario)
let funcionarios = [];
let proximoId = 1;
let idEmEdicao = null;

// Referências aos elementos do DOM
const formFuncionario = document.getElementById('form-funcionario');
const formTitulo = document.getElementById('form-titulo');
const inputId = document.getElementById('funcionario-id');
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');
const inputCargo = document.getElementById('cargo');
const inputSalario = document.getElementById('salario');
const btnSalvar = document.getElementById('btn-salvar');
const btnCancelar = document.getElementById('btn-cancelar');
const tbodyFuncionarios = document.getElementById('tbody-funcionarios');

// Formatador de moeda para exibição na tabela
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Busca funcionário pelo ID (formato tradicional para ser refatorado no Exercício 3)
function buscarFuncionarioPorId(id) {
    for (let i = 0; i < funcionarios.length; i++) {
        if (funcionarios[i].id === id) {
            return funcionarios[i];
        }
    }
    return null;
}

// Carrega os dados do funcionário no formulário para edição
function carregarFormularioEdicao(id) {
    const funcionario = buscarFuncionarioPorId(id);
    if (!funcionario) return;

    idEmEdicao = funcionario.id;
    inputId.value = funcionario.id;
    inputNome.value = funcionario.nome;
    inputIdade.value = funcionario.idade;
    inputCargo.value = funcionario.cargo;
    inputSalario.value = funcionario.salario;

    formTitulo.textContent = 'Editar Funcionário';
    btnSalvar.textContent = 'Atualizar';
    btnCancelar.style.display = 'inline-block';
    inputNome.focus();
}

// Limpa o formulário e restaura o modo de cadastro
function resetarFormulario() {
    idEmEdicao = null;
    inputId.value = '';
    formFuncionario.reset();
    formTitulo.textContent = 'Cadastrar Funcionário';
    btnSalvar.textContent = 'Cadastrar';
    btnCancelar.style.display = 'none';
}

// Exclui um funcionário da lista pelo ID
function excluirFuncionario(id) {
    for (let i = 0; i < funcionarios.length; i++) {
        if (funcionarios[i].id === id) {
            console.log('Funcionário excluído ->', funcionarios[i].toString());
            funcionarios.splice(i, 1);
            break;
        }
    }

    if (idEmEdicao === id) {
        resetarFormulario();
    }

    renderizarTabela();
}

// Renderiza a tabela de funcionários e cria os botões Editar e Excluir com onclick e funções anônimas
function renderizarTabela() {
    tbodyFuncionarios.innerHTML = '';

    if (funcionarios.length === 0) {
        tbodyFuncionarios.innerHTML = `
            <tr>
                <td colspan="6" class="empty-row">Nenhum funcionário cadastrado.</td>
            </tr>
        `;
        return;
    }

    for (let i = 0; i < funcionarios.length; i++) {
        const func = funcionarios[i];
        const tr = document.createElement('tr');
        tr.title = func.toString();

        tr.innerHTML = `
            <td>${func.id}</td>
            <td>${func.nome}</td>
            <td>${func.idade}</td>
            <td>${func.cargo}</td>
            <td>${formatarMoeda(func.salario)}</td>
        `;

        // Coluna de ações criada via DOM para atrelar eventos onclick com funções anônimas (Exercício 2)
        const tdAcoes = document.createElement('td');

        const btnEditar = document.createElement('button');
        btnEditar.type = 'button';
        btnEditar.className = 'btn btn-edit';
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = function () {
            carregarFormularioEdicao(func.id);
        };

        const btnExcluir = document.createElement('button');
        btnExcluir.type = 'button';
        btnExcluir.className = 'btn btn-delete';
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = function () {
            excluirFuncionario(func.id);
        };

        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir);
        tr.appendChild(tdAcoes);

        tbodyFuncionarios.appendChild(tr);
    }
}

// Evento onclick com função anônima no botão principal (Cadastrar / Atualizar)
btnSalvar.onclick = function (event) {
    event.preventDefault();

    const nome = inputNome.value.trim();
    const idade = parseInt(inputIdade.value, 10);
    const cargo = inputCargo.value.trim();
    const salario = parseFloat(inputSalario.value);

    if (!nome || isNaN(idade) || idade <= 0 || !cargo || isNaN(salario) || salario < 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    if (idEmEdicao !== null) {
        // Atualiza funcionário existente usando métodos da classe Funcionario
        const funcionarioExistente = buscarFuncionarioPorId(idEmEdicao);
        if (funcionarioExistente) {
            funcionarioExistente.atualizarDados(nome, idade, cargo, salario);
            console.log('Funcionário atualizado ->', funcionarioExistente.toString());
        }
    } else {
        // Cadastra novo funcionário
        const novoFuncionario = new Funcionario(proximoId++, nome, idade, cargo, salario);
        funcionarios.push(novoFuncionario);
        console.log('Funcionário cadastrado ->', novoFuncionario.toString());
    }

    resetarFormulario();
    inputNome.focus();
    renderizarTabela();
};

// Evento onclick com função anônima no botão Cancelar edição
btnCancelar.onclick = function () {
    resetarFormulario();
};

// Inicializa a tabela ao carregar a página
renderizarTabela();
