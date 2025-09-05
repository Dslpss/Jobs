import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Code, Settings } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg group-hover:shadow-lg transition-all duration-300">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              DevJobs
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'default' : 'ghost'}
                className={location.pathname === '/' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
              >
                Vagas
              </Button>
            </Link>
            <Link to="/admin">
              <Button 
                variant={location.pathname === '/admin' ? 'default' : 'ghost'}
                className={location.pathname === '/admin' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;