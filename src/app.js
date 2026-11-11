// ==========================================
// EXERCÍCIO 1: Classe, Cadastro e Listagem
// ==========================================

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

    // Método toString() exigido no Exercício 1
    toString() {
        return `ID: ${this._id} | Nome: ${this._nome} | Idade: ${this._idade} anos | Cargo: ${this._cargo} | Salário: R$ ${this._salario.toFixed(2)}`;
    }
}

// Estado da aplicação (Array de objetos da classe Funcionario)
let funcionarios = [];
let proximoId = 1;

// Referências aos elementos do DOM
const formFuncionario = document.getElementById('form-funcionario');
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');
const inputCargo = document.getElementById('cargo');
const inputSalario = document.getElementById('salario');
const tbodyFuncionarios = document.getElementById('tbody-funcionarios');

// Formatador de moeda para exibição na tabela
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para renderizar a tabela de funcionários
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
            <td>-</td>
        `;

        tbodyFuncionarios.appendChild(tr);
    }
}

// Evento de submissão do formulário para cadastrar funcionário
formFuncionario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = inputNome.value.trim();
    const idade = parseInt(inputIdade.value, 10);
    const cargo = inputCargo.value.trim();
    const salario = parseFloat(inputSalario.value);

    if (!nome || isNaN(idade) || !cargo || isNaN(salario)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const novoFuncionario = new Funcionario(proximoId++, nome, idade, cargo, salario);
    funcionarios.push(novoFuncionario);

    console.log('Funcionário cadastrado ->', novoFuncionario.toString());

    formFuncionario.reset();
    inputNome.focus();
    renderizarTabela();
});

// Inicializa a tabela vazia ao carregar a página
renderizarTabela();
