import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Download, Activity, Clock, AlertTriangle, Eye, Clipboard, Keyboard, Cpu } from 'lucide-react';
import Navbar from '../components/Navbar';
import { users, generateLogsForUser, LogEntry } from '../data/mockData';

const LogsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState(users.find(u => u.id === Number(userId)));
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [currentTime, setCurrentTime] = useState(new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC');

  useEffect(() => {
    // Find user
    const foundUser = users.find(u => u.id === Number(userId));
    setUser(foundUser);
    
    // Simulate loading logs
    setTimeout(() => {
      if (foundUser) {
        setLogs(generateLogsForUser(foundUser.id));
      }
      setLoading(false);
    }, 1000);
    
    // Update current time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
    }, 1000);
    
    return () => clearInterval(timeInterval);
  }, [userId]);

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.type === filter);
    
  // Get icon for log type
  const getLogTypeIcon = (type: string) => {
    switch (type) {
      case 'keylog':
        return <Keyboard className="h-4 w-4" />;
      case 'screenshot':
        return <Eye className="h-4 w-4" />;
      case 'clipboard':
        return <Clipboard className="h-4 w-4" />;
      case 'system':
        return <Cpu className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };
  
  // Get color for log type
  const getLogTypeColor = (type: string) => {
    switch (type) {
      case 'keylog':
        return 'text-red-400';
      case 'screenshot':
        return 'text-blue-400';
      case 'clipboard':
        return 'text-yellow-400';
      case 'system':
        return 'text-green-400';
      default:
        return 'text-neon-green';
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <div className="grid-bg"></div>
      <Navbar />
      
      <div className="flex-1 p-6">
        {/* Header and back button */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Link to="/dashboard" className="text-neon-blue flex items-center mr-4 hover:underline">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold header-glow">ACCESS LOGS</h1>
            </div>
            
            {user && (
              <div className="flex items-center text-sm text-neon-green/70">
                <span className="font-bold text-neon-blue mr-2">{user.username}</span>
                <span className="mr-2">|</span>
                <span>ID: #{user.id}</span>
                <span className="mx-2">|</span>
                <span>{user.device}</span>
                <span className="mx-2">|</span>
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full mr-2 ${
                    user.status === 'active' ? 'bg-green-500 pulse' : 
                    user.status === 'idle' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="uppercase text-xs">{user.status}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <button className="flex items-center bg-darker-bg border border-neon-green/50 text-neon-green 
                          px-3 py-1 rounded mr-2 hover:bg-neon-green/10 transition-all duration-300 text-sm">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </button>
            
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-darker-bg border border-neon-green/50 text-neon-green 
                          pl-8 pr-8 py-1 rounded hover:bg-neon-green/10 transition-all duration-300 text-sm"
              >
                <option value="all">All Events</option>
                <option value="keylog">Keystrokes</option>
                <option value="screenshot">Screenshots</option>
                <option value="clipboard">Clipboard</option>
                <option value="system">System</option>
              </select>
              <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4" />
            </div>
          </div>
        </div>
        
        {/* System stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-darker-bg border border-neon-green/30 rounded p-4 flex items-center">
            <Clock className="h-7 w-7 text-neon-blue mr-3" />
            <div>
              <div className="text-xs text-neon-green/70">CURRENT TIME</div>
              <div className="text-neon-blue font-bold">{currentTime}</div>
            </div>
          </div>
          
          <div className="bg-darker-bg border border-neon-green/30 rounded p-4 flex items-center">
            <Activity className="h-7 w-7 text-neon-green mr-3" />
            <div>
              <div className="text-xs text-neon-green/70">LOG ENTRIES</div>
              <div className="text-neon-green font-bold">{logs.length} Total Events</div>
            </div>
          </div>
          
          <div className="bg-darker-bg border border-neon-green/30 rounded p-4 flex items-center">
            <AlertTriangle className="h-7 w-7 text-orange-400 mr-3" />
            <div>
              <div className="text-xs text-neon-green/70">SUSPICIOUS ACTIVITY</div>
              <div className="text-orange-400 font-bold">{Math.floor(logs.length * 0.15)} Flagged Events</div>
            </div>
          </div>
        </div>
        
        {/* Logs table */}
        <div className="bg-darker-bg border border-neon-green/30 rounded overflow-hidden">
          <div className="p-4 border-b border-neon-green/20">
            <h2 className="text-lg font-bold flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              {filter === 'all' ? 'ALL ACTIVITY LOGS' : filter.toUpperCase() + ' LOGS'}
            </h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <span className="loader"></span>
                  <span className="loader"></span>
                  <span className="loader"></span>
                </div>
                <p className="text-neon-green/70">Loading logs...</p>
              </div>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-neon-green/50">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No logs found for the selected filter.</p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neon-green/20 bg-black/20">
                    <th className="py-3 px-4 text-left text-xs text-neon-green/70">TIMESTAMP</th>
                    <th className="py-3 px-4 text-left text-xs text-neon-green/70">TYPE</th>
                    <th className="py-3 px-4 text-left text-xs text-neon-green/70">APPLICATION</th>
                    <th className="py-3 px-4 text-left text-xs text-neon-green/70">DATA</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-neon-green/10 hover:bg-neon-green/5">
                      <td className="py-3 px-4 text-sm">{log.timestamp}</td>
                      <td className="py-3 px-4">
                        <div className={`flex items-center ${getLogTypeColor(log.type)}`}>
                          {getLogTypeIcon(log.type)}
                          <span className="ml-2 text-sm capitalize">{log.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{log.application || '-'}</td>
                      <td className="py-3 px-4">
                        <div className="max-w-md truncate text-sm">
                          {log.content}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogsPage;