import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Clock, Activity, ExternalLink, UserCheck, Server, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { users, User } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState({ uptime: '23h 45m', captured: 1458, alerts: 2 });
  const [currentTime, setCurrentTime] = useState(new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC');

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setActiveUsers(users);
      setLoading(false);
    }, 1000);

    // Update current time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <div className="grid-bg"></div>
      <Navbar />
      
      <div className="flex-1 p-6">
        {/* Header and stats */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold header-glow mb-2 flex items-center">
            <ShieldAlert className="mr-2 h-8 w-8" />
            ACTIVE USERS
          </h1>
          <div className="text-sm text-neon-green/70">Total users: {activeUsers.length}</div>
        </div>
        
        {/* System stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-darker-bg border border-neon-green/30 rounded p-4 flex items-center">
            <Clock className="h-8 w-8 text-neon-blue mr-4" />
            <div>
              <div className="text-xs text-neon-green/70">SYSTEM TIME</div>
              <div className="text-neon-blue font-bold">{currentTime}</div>
            </div>
          </div>
          
          <div className="bg-darker-bg border border-neon-green/30 rounded p-4 flex items-center">
            <Server className="h-8 w-8 text-neon-blue mr-4" />
            <div>
              <div className="text-xs text-neon-green/70">SYSTEM STATUS</div>
              <div className="flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2 pulse"></span>
                <span className="text-neon-blue font-bold">OPERATIONAL ({systemStatus.uptime})</span>
              </div>
            </div>
          </div>
          
          <div className="bg-darker-bg border border-neon-green/30 rounded p-4 flex items-center">
            <AlertTriangle className="h-8 w-8 text-orange-400 mr-4" />
            <div>
              <div className="text-xs text-neon-green/70">SYSTEM ALERTS</div>
              <div className="text-orange-400 font-bold">{systemStatus.alerts} Active Alerts</div>
            </div>
          </div>
        </div>
        
        {/* Users grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <span className="loader"></span>
                <span className="loader"></span>
                <span className="loader"></span>
              </div>
              <p className="text-neon-green/70">Scanning network...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeUsers.map((user) => (
              <div key={user.id} className="card relative p-5 rounded border border-neon-green/50 bg-darker-bg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{user.username}</h3>
                    <p className="text-xs text-neon-green/70">ID: #{user.id}</p>
                  </div>
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full mr-2 ${
                      user.status === 'active' ? 'bg-green-500 pulse' : 
                      user.status === 'idle' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-xs uppercase">{user.status}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <span className="text-xs text-neon-green/70 w-24">Device:</span>
                    <span className="text-sm">{user.device}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-xs text-neon-green/70 w-24">IP Address:</span>
                    <span className="text-sm">{user.ipAddress}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-xs text-neon-green/70 w-24">Location:</span>
                    <span className="text-sm">{user.location}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-xs text-neon-green/70 w-24">First Seen:</span>
                    <span className="text-sm">{user.firstSeen}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-xs text-neon-green/70 w-24">Last Active:</span>
                    <span className="text-sm">{user.lastActive}</span>
                  </div>
                </div>
                
                <Link
                  to={`/logs/${user.id}`}
                  className="block w-full bg-neon-green/10 border border-neon-green text-neon-green text-center 
                            py-2 rounded btn-glow transition-all duration-300 tracking-wider font-bold"
                >
                  <div className="flex items-center justify-center">
                    <Activity className="h-4 w-4 mr-2" />
                    ACCESS LOGS
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        
        {/* Activity feed */}
        <div className="mt-8 bg-darker-bg border border-neon-green/30 rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              REAL-TIME ACTIVITY
            </h2>
            <button className="text-xs text-neon-blue flex items-center">
              View All <ExternalLink className="h-3 w-3 ml-1" />
            </button>
          </div>
          
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-b border-neon-green/10 pb-2 last:border-b-0">
                <div className="flex items-center">
                  <div className="mr-3">
                    <UserCheck className="h-4 w-4 text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="text-neon-blue font-bold">{users[i % users.length].username}</span> 
                      <span className="text-neon-green/70"> - {['Keylog captured', 'Screenshot taken', 'Clipboard copied', 'System event', 'New login detected'][i]}</span>
                    </p>
                    <p className="text-xs text-neon-green/50">
                      {new Date(Date.now() - i * 5 * 60000).toISOString().replace('T', ' ').slice(0, 19)} UTC
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;