// ====================================================================
// EXERCÍCIOS 1, 2 e 3: Classe, CRUD, Funções Anônimas e Expressões Lambda
// ====================================================================

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

// Formatador de moeda reescrito como Arrow Function
const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// ====================================================================
// EXERCÍCIO 3: Funções de manipulação (busca, atualização, remoção)
// reescritas com Arrow Functions e Expressões Lambda no array
// ====================================================================

// Busca funcionário pelo ID usando expressão lambda (.find)
const buscarFuncionarioPorId = (id) => funcionarios.find(f => f.id === id) || null;

// Busca funcionário pelo Nome usando expressão lambda (.find)
const buscarFuncionarioPorNome = (nome) =>
    funcionarios.find(f => f.nome.toLowerCase() === nome.trim().toLowerCase()) || null;

// Atualiza um funcionário existente no array usando expressão lambda
const atualizarFuncionario = (id, nome, idade, cargo, salario) => {
    const funcionario = buscarFuncionarioPorId(id);
    if (funcionario) {
        funcionario.atualizarDados(nome, idade, cargo, salario);
        console.log('Funcionário atualizado ->', funcionario.toString());
    }
};

// Carrega os dados do funcionário no formulário para edição (Arrow Function)
const carregarFormularioEdicao = (id) => {
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
};

// Limpa o formulário e restaura o modo de cadastro (Arrow Function)
const resetarFormulario = () => {
    idEmEdicao = null;
    inputId.value = '';
    formFuncionario.reset();
    formTitulo.textContent = 'Cadastrar Funcionário';
    btnSalvar.textContent = 'Cadastrar';
    btnCancelar.style.display = 'none';
};

// Remove funcionário do array usando expressão lambda (.findIndex)
const excluirFuncionario = (id) => {
    const indice = funcionarios.findIndex(f => f.id === id);
    if (indice !== -1) {
        console.log('Funcionário excluído ->', funcionarios[indice].toString());
        funcionarios.splice(indice, 1);
    }

    if (idEmEdicao === id) {
        resetarFormulario();
    }

    renderizarTabela();
};

// Renderiza a tabela percorrendo o array com expressão lambda (.forEach)
const renderizarTabela = () => {
    tbodyFuncionarios.innerHTML = '';

    if (funcionarios.length === 0) {
        tbodyFuncionarios.innerHTML = `
            <tr>
                <td colspan="6" class="empty-row">Nenhum funcionário cadastrado.</td>
            </tr>
        `;
        return;
    }

    funcionarios.forEach(func => {
        const tr = document.createElement('tr');
        tr.title = func.toString();

        tr.innerHTML = `
            <td>${func.id}</td>
            <td>${func.nome}</td>
            <td>${func.idade}</td>
            <td>${func.cargo}</td>
            <td>${formatarMoeda(func.salario)}</td>
        `;

        const tdAcoes = document.createElement('td');

        const btnEditar = document.createElement('button');
        btnEditar.type = 'button';
        btnEditar.className = 'btn btn-edit';
        btnEditar.textContent = 'Editar';
        // Substituição de função anônima tradicional por Arrow Function (Exercício 3):
        // Antes: btnEditar.onclick = function () { carregarFormularioEdicao(func.id); };
        btnEditar.onclick = () => carregarFormularioEdicao(func.id);

        const btnExcluir = document.createElement('button');
        btnExcluir.type = 'button';
        btnExcluir.className = 'btn btn-delete';
        btnExcluir.textContent = 'Excluir';
        // Substituição de função anônima tradicional por Arrow Function (Exercício 3):
        // Antes: btnExcluir.onclick = function () { excluirFuncionario(func.id); };
        btnExcluir.onclick = () => excluirFuncionario(func.id);

        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir);
        tr.appendChild(tdAcoes);

        tbodyFuncionarios.appendChild(tr);
    });
};

// Evento de clique no botão principal (Cadastrar / Atualizar)
// Antes (Função anônima tradicional): btnSalvar.onclick = function (event) { ... };
// Depois (Arrow Function):
btnSalvar.onclick = (event) => {
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
        atualizarFuncionario(idEmEdicao, nome, idade, cargo, salario);
    } else {
        const novoFuncionario = new Funcionario(proximoId++, nome, idade, cargo, salario);
        funcionarios.push(novoFuncionario);
        console.log('Funcionário cadastrado ->', novoFuncionario.toString());
    }

    resetarFormulario();
    inputNome.focus();
    renderizarTabela();
};

// Evento de clique no botão Cancelar edição
// Antes (Função anônima tradicional): btnCancelar.onclick = function () { resetarFormulario(); };
// Depois (Arrow Function):
btnCancelar.onclick = () => resetarFormulario();

// Inicializa a tabela ao carregar a página
renderizarTabela();
