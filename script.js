// Mock data
const users = [
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

// Dashboard
function renderDashboard() {
  const grid = document.getElementById('users-grid');
  grid.innerHTML = users.map(user => `
    <div class="user-card">
      <h3>${user.username}</h3>
      <div class="user-info">
        <p>ID: #${user.id}</p>
        <p>Device: ${user.device}</p>
        <p>Status: ${user.status}</p>
      </div>
      <button onclick="showLogs(${user.id})">Access Logs</button>
    </div>
  `).join('');
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