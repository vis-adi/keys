export interface User {
  id: number;
  username: string;
  device: string;
  firstSeen: string;
  ipAddress: string;
  os: string;
  browser: string;
  location: string;
  status: 'active' | 'idle' | 'offline';
  lastActive: string;
}

export interface LogEntry {
  id: number;
  userId: number;
  timestamp: string;
  type: 'keylog' | 'screenshot' | 'clipboard' | 'system';
  content: string;
  application?: string;
}

// Mock user data
export const users: User[] = [
  {
    id: 1,
    username: 'Jesish',
    device: 'Linux Mobile',
    firstSeen: '2024-04-24 11:59:48 UTC',
    ipAddress: '192.168.1.23',
    os: 'Ubuntu 22.04',
    browser: 'Firefox 120.0',
    location: 'New York, US',
    status: 'active',
    lastActive: '2024-04-24 12:30:15 UTC'
  },
  {
    id: 2,
    username: 'Jeril',
    device: 'Windows 11',
    firstSeen: '2024-04-24 10:15:22 UTC',
    ipAddress: '192.168.1.45',
    os: 'Windows 11 Pro',
    browser: 'Chrome 123.0',
    location: 'Los Angeles, US',
    status: 'active',
    lastActive: '2024-04-24 12:29:30 UTC'
  },
  {
    id: 3,
    username: 'Amber',
    device: 'macOS Laptop',
    firstSeen: '2024-04-24 09:22:10 UTC',
    ipAddress: '192.168.1.87',
    os: 'macOS 14.3',
    browser: 'Safari 17.3',
    location: 'London, UK',
    status: 'idle',
    lastActive: '2024-04-24 12:10:05 UTC'
  },
  {
    id: 4,
    username: 'Kevin',
    device: 'Android Phone',
    firstSeen: '2024-04-24 08:45:32 UTC',
    ipAddress: '192.168.1.112',
    os: 'Android 14',
    browser: 'Chrome Mobile 123.0',
    location: 'Berlin, Germany',
    status: 'active',
    lastActive: '2024-04-24 12:31:18 UTC'
  },
  {
    id: 5,
    username: 'Rachel',
    device: 'Windows 10',
    firstSeen: '2024-04-24 07:33:19 UTC',
    ipAddress: '192.168.1.156',
    os: 'Windows 10 Home',
    browser: 'Edge 122.0',
    location: 'Toronto, Canada',
    status: 'offline',
    lastActive: '2024-04-24 11:45:22 UTC'
  },
  {
    id: 6,
    username: 'Michael',
    device: 'iPad Pro',
    firstSeen: '2024-04-24 12:05:40 UTC',
    ipAddress: '192.168.1.201',
    os: 'iPadOS 17.4',
    browser: 'Safari 17.4',
    location: 'Sydney, Australia',
    status: 'active',
    lastActive: '2024-04-24 12:25:11 UTC'
  }
];

// Generate mock logs for each user
export const generateLogsForUser = (userId: number, count: number = 20): LogEntry[] => {
  const applications = ['Chrome', 'Firefox', 'Word', 'Excel', 'Terminal', 'VS Code', 'Slack', 'Zoom', 'Outlook'];
  const logTypes: ('keylog' | 'screenshot' | 'clipboard' | 'system')[] = ['keylog', 'screenshot', 'clipboard', 'system'];
  
  const getRandomContent = (type: 'keylog' | 'screenshot' | 'clipboard' | 'system') => {
    switch (type) {
      case 'keylog':
        return ['password123', 'hello world', 'confidential information', 'secret key', 'login details', 'private message'][Math.floor(Math.random() * 6)];
      case 'screenshot':
        return 'Screenshot captured: screen_' + Math.floor(Math.random() * 1000) + '.png';
      case 'clipboard':
        return ['copied text', 'API key: SKdj38d7SKJDwe', 'https://example.com/login', 'username: admin', 'password: secure123'][Math.floor(Math.random() * 5)];
      case 'system':
        return ['System startup', 'Application launched', 'Network connection', 'USB device connected', 'File accessed'][Math.floor(Math.random() * 5)];
    }
  };
  
  const logs: LogEntry[] = [];
  
  // Current time
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const type = logTypes[Math.floor(Math.random() * logTypes.length)];
    const timeOffset = Math.floor(Math.random() * 60 * 24); // Random minutes within 24 hours
    const logTime = new Date(now.getTime() - timeOffset * 60000);
    
    logs.push({
      id: i + 1,
      userId,
      timestamp: logTime.toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      type,
      content: getRandomContent(type),
      application: type !== 'system' ? applications[Math.floor(Math.random() * applications.length)] : undefined
    });
  }
  
  // Sort logs by timestamp (newest first)
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};