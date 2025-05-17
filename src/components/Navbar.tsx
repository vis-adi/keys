import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, LogOut, Terminal } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-darker-bg border-b border-neon-green/30 py-3 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="h-6 w-6 text-neon-green" />
          <span className="text-xl font-bold tracking-wider text-neon-green">CYBERTRACK</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center">
            <Terminal className="h-4 w-4 text-neon-green mr-2" />
            <span className="text-xs text-neon-green/70">ADMIN:SYSTEM</span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center px-3 py-1 border border-neon-green/50 rounded 
                      hover:bg-neon-green/10 transition-all duration-300 text-sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;