# Sistema de Gestão de Funcionários - Startup de Tecnologia (EC02)

Aplicação web desenvolvida em JavaScript (ES6+), HTML5 e CSS3 para o gerenciamento de funcionários de uma startup de tecnologia, contemplando operações de CRUD, orientação a objetos e geração de relatórios dinâmicos com métodos de array (Streams JS).

## Estrutura de Exercícios Implementados

- **Exercício 1 (Cadastro e Listagem):** Interface com formulário HTML, classe `Funcionario` encapsulada com construtor, `getters`, `setters` e método `toString()`, armazenamento em array de objetos e renderização dinâmica em `<table>`.
- **Exercício 2 (Exclusão e Edição):** Manipulação de DOM com botões de ação por registro, atualização via métodos da classe `Funcionario` e eventos `onclick` com funções anônimas.
- **Exercício 3 (Funções Anônimas e Expressões Lambda):** Refatoração dos eventos de clique e das rotinas de busca, atualização e remoção para *arrow functions* e expressões lambda (`find`, `findIndex`, `forEach`).
- **Exercício 4 (Relatórios com Streams JS):** Indicadores gerenciais em tempo real utilizando `filter`, `map`, `reduce` e `new Set()`:
  - Funcionários com salário superior a R$ 5.000,00;
  - Média salarial da equipe;
  - Lista de cargos únicos (sem repetição);
  - Lista de nomes em letras maiúsculas.

## Como Executar com Docker

Na raiz do projeto, execute:

```bash
docker compose up -d --build
```

Acesse no navegador: http://localhost:8081
