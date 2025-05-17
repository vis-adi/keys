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

// Modal management
const addUserModal = document.getElementById('add-user-modal');
const addUserBtn = document.getElementById('add-user-btn');
const cancelAddUserBtn = document.getElementById('cancel-add-user');
const addUserForm = document.getElementById('add-user-form');

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

// Dashboard
function renderDashboard() {
  const grid = document.getElementById('users-grid');
  grid.innerHTML = users.map(user => `
    <div class="user-card">
      <button class="delete-user" onclick="deleteUser(${user.id})">×</button>
      <h3>${user.username}</h3>
      <div class="user-info">
        <p>ID: #${user.id}</p>
        <p>Device: ${user.device}</p>
        <p>Status: ${user.status}</p>
      </div>
      <div class="user-actions">
        <button onclick="showLogs(${user.id})">Access Logs</button>
      </div>
    </div>
  `).join('');
}

// Add user functionality
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

  // Hook for backend integration
  addUserToBackend(newUser);

  users.push(newUser);
  renderDashboard();
  addUserModal.classList.add('hidden');
  addUserForm.reset();
});

// Delete user functionality
function deleteUser(userId) {
  if (confirm('Are you sure you want to delete this user?')) {
    // Hook for backend integration
    deleteUserFromBackend(userId);
    
    users = users.filter(user => user.id !== userId);
    renderDashboard();
  }
}

// Backend integration hooks
function addUserToBackend(user) {
  // TODO: Implement backend integration
  console.log('Adding user to backend:', user);
}

function deleteUserFromBackend(userId) {
  // TODO: Implement backend integration
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