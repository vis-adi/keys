import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    
    const terminalLines = [
      'Initializing security protocol...',
      'Establishing secure connection...',
      'Activating authentication module...',
      'System ready. Awaiting credentials.',
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < terminalLines.length) {
        setTerminalText(prev => prev ? `${prev}\n> ${terminalLines[i]}` : `> ${terminalLines[i]}`);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Authentication failed. Invalid credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="grid-bg"></div>
      
      <div className="max-w-md w-full bg-darker-bg border border-neon-green/50 rounded-lg shadow-lg overflow-hidden">
        <div className="p-1 bg-neon-green/10">
          <div className="flex items-center justify-between px-3 py-1">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-neon-green/70">secure-login.exe</div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <ShieldAlert className="w-16 h-16 text-neon-green" />
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2 text-neon-green header-glow">CYBERTRACK</h1>
          <p className="text-center text-sm mb-6 text-neon-green/70">KEYLOGGER ACCESS TERMINAL</p>
          
          <div className="bg-black/50 border border-neon-green/30 rounded p-3 mb-6 h-24 overflow-hidden">
            <pre className="text-xs text-neon-green font-mono whitespace-pre-line">{terminalText}</pre>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex items-center border border-neon-green/50 rounded bg-black/30 px-3 py-2">
                <User className="w-4 h-4 text-neon-green mr-2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="bg-transparent border-none outline-none w-full text-neon-green placeholder-neon-green/30"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center border border-neon-green/50 rounded bg-black/30 px-3 py-2">
                <Lock className="w-4 h-4 text-neon-green mr-2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="bg-transparent border-none outline-none w-full text-neon-green placeholder-neon-green/30"
                  required
                />
              </div>
              
              {error && (
                <p className="mt-2 text-xs text-red-400">{error}</p>
              )}
              
              <p className="mt-2 text-xs text-neon-green/50">Default: admin / admin123</p>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neon-green/10 border border-neon-green text-neon-green py-2 rounded btn-glow 
                        transition-all duration-300 font-bold tracking-wider"
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <span className="loader"></span>
                  <span className="loader"></span>
                  <span className="loader"></span>
                </div>
              ) : 'ACCESS SYSTEM'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;