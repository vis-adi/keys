// Mock data
let users = [
  { id: 1, username: 'Jesish', device: 'Linux Mobile', status: 'active' },
  { id: 2, username: 'Jeril', device: 'Windows 11', status: 'active' },
  { id: 3, username: 'Amber', device: 'macOS Laptop', status: 'idle' },
  { id: 4, username: 'Kevin', device: 'Android Phone', status: 'active' },
  { id: 5, username: 'Rachel', device: 'Windows 10', status: 'offline' }
];

// Page management
const pages = {
  login: document.getElementById('login-page'),
  dashboard: document.getElementById('dashboard-page'),
  logs: document.getElementById('logs-page')
};

function showPage(pageId) {
  Object.values(pages).forEach(page => page.classList.add('hidden'));
  pages[pageId].classList.remove('hidden');
}

// Login handling
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin123') {
    showPage('dashboard');
    renderDashboard();
  } else {
    alert('Invalid credentials');
  }
});

function renderDashboard() {
  const grid = document.getElementById('users-grid');
  grid.innerHTML = users.map(user => `
    <div class="user-card" data-id="${user.id}">
      <div class="checkbox-container">
        <input type="checkbox" class="user-checkbox" data-id="${user.id}">
      </div>
      <h3>${user.username}</h3>
      <div class="user-info">
        <p>ID: #${user.id}</p>
        <p>Device: ${user.device}</p>
        <p>Status: ${user.status}</p>
      </div>
    </div>
  `).join('');

  attachCheckboxListeners();

  // Ensure delete actions exist
  if (!document.querySelector('.delete-actions')) {
    const deleteActions = document.createElement('div');
    deleteActions.className = 'delete-actions hidden';
    deleteActions.innerHTML = `
      <button class="btn-secondary" onclick="cancelDelete()">Cancel</button>
      <button class="btn-danger" onclick="deleteSelectedUsers()">Delete Selected</button>
    `;
    document.getElementById('dashboard-page').appendChild(deleteActions);
  }
}

function attachCheckboxListeners() {
  document.querySelectorAll('.user-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checked = document.querySelectorAll('.user-checkbox:checked');
      const dashboard = document.getElementById('dashboard-page');
      const deleteBar = document.querySelector('.delete-actions');

      if (checked.length > 0) {
        dashboard.classList.add('delete-mode');
        deleteBar.classList.remove('hidden');
      } else {
        dashboard.classList.remove('delete-mode');
        deleteBar.classList.add('hidden');
      }
    });
  });
}

// Add user functionality
const addUserModal = document.getElementById('add-user-modal');
const addUserBtn = document.getElementById('add-user-btn');
const cancelAddUserBtn = document.getElementById('cancel-add-user');
const addUserForm = document.getElementById('add-user-form');
const deleteBtn = document.getElementById('delete-mode-btn');

let isDeleteMode = false;

addUserBtn.addEventListener('click', () => {
  addUserModal.classList.remove('hidden');
});

cancelAddUserBtn.addEventListener('click', () => {
  addUserModal.classList.add('hidden');
  addUserForm.reset();
});

addUserForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newUser = {
    id: users.length + 1,
    username: document.getElementById('new-username').value,
    device: document.getElementById('new-device').value,
    status: document.getElementById('new-status').value
  };

  addUserToBackend(newUser);
  users.push(newUser);
  renderDashboard();
  addUserModal.classList.add('hidden');
  addUserForm.reset();
});

// Manual delete mode toggle (optional button)
deleteBtn.addEventListener('click', () => {
  isDeleteMode = !isDeleteMode;
  const dashboard = document.getElementById('dashboard-page');
  const deleteBar = document.querySelector('.delete-actions');
  dashboard.classList.toggle('delete-mode', isDeleteMode);
  deleteBar.classList.toggle('hidden', !isDeleteMode);
});

function cancelDelete() {
  isDeleteMode = false;
  const dashboard = document.getElementById('dashboard-page');
  const deleteBar = document.querySelector('.delete-actions');
  dashboard.classList.remove('delete-mode');
  deleteBar.classList.add('hidden');
  document.querySelectorAll('.user-checkbox').forEach(checkbox => {
    checkbox.checked = false;
  });
}

function deleteSelectedUsers() {
  const selectedUsers = Array.from(document.querySelectorAll('.user-checkbox:checked'))
    .map(checkbox => parseInt(checkbox.dataset.id));

  if (selectedUsers.length === 0) {
    alert('Please select users to delete');
    return;
  }

  if (confirm(`Are you sure you want to delete ${selectedUsers.length} user(s)?`)) {
    selectedUsers.forEach(userId => deleteUserFromBackend(userId));
    users = users.filter(user => !selectedUsers.includes(user.id));
    renderDashboard();
    cancelDelete();
  }
}

// Backend integration hooks
function addUserToBackend(user) {
  console.log('Adding user to backend:', user);
}

function deleteUserFromBackend(userId) {
  console.log('Deleting user from backend:', userId);
}

// Logs
function showLogs(userId) {
  showPage('logs');
  const terminal = document.getElementById('logs-terminal');
  const logs = generateMockLogs();
  terminal.innerHTML = logs.map(log => `
    <div class="log-entry">
      <span class="log-timestamp">[${log.timestamp}]</span>
      <span>${log.content}</span>
    </div>
  `).join('');
}

function generateMockLogs() {
  const logs = [];
  const now = new Date();

  for (let i = 0; i < 20; i++) {
    const time = new Date(now - i * 60000);
    logs.push({
      timestamp: time.toISOString().replace('T', ' ').slice(0, 19),
      content: ['password123', 'hello world', 'confidential info', 'secret key'][Math.floor(Math.random() * 4)]
    });
  }

  return logs;
}

// Navigation
document.getElementById('logout-btn').addEventListener('click', () => {
  showPage('login');
});

document.getElementById('back-btn').addEventListener('click', () => {
  showPage('dashboard');
});
