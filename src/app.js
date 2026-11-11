document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('employee-form');
  const tbody = document.querySelector('#employee-table tbody');
  const STORAGE_KEY = 'employees';

  function loadEmployees() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  function saveEmployees(employees) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }

  function renderTable() {
    const employees = loadEmployees();
    tbody.innerHTML = '';

    employees.forEach((emp, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${emp.name}</td>
        <td>${emp.role}</td>
        <td>${emp.email}</td>
        <td><button class="btn-delete" data-index="${index}">Remover</button></td>
      `;
      tbody.appendChild(tr);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const role = document.getElementById('role').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !role || !email) return;

    const employees = loadEmployees();
    employees.push({ name, role, email });
    saveEmployees(employees);
    renderTable();
    form.reset();
  });

  tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
      const index = parseInt(e.target.dataset.index, 10);
      const employees = loadEmployees();
      employees.splice(index, 1);
      saveEmployees(employees);
      renderTable();
    }
  });

  renderTable();
});
