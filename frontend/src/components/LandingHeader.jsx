import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import TowerBridgeSVG from './icons/MainLogo';
import { useAuth } from '../../hooks/auth-context';

const LandingHeader = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const AuthButtons = () => {
    if (isAuthenticated) {
      return (
        <Button 
          onClick={handleLogout}
          className="bg-[#FF6B35] text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Logout
        </Button>
      );
    }

    return (
      <>
        <Link 
          to="/login" 
          className="text-[#1A5F7A] hover:bg-blue-50 px-4 py-2 rounded"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="bg-[#FF6B35] text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Register
        </Link>
      </>
    );
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Complaint', path: '/complaint' },
    { label: 'Legal Aid', path: '/legal-aid' },
    { label: 'About', path: '/about' },
    { label: 'Admin Dashboard', path: '/adminDashboard' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <div className="text-[#1A5F7A]">
              <TowerBridgeSVG />
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-[#1A5F7A]">NyayaSetu</h2>
        </div>
        
        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-gray-600 hover:text-[#1A5F7A]">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {menuItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="text-gray-600 hover:text-[#1A5F7A] transition py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 flex flex-col space-y-3">
                  {isAuthenticated ? (
                    <Button 
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="bg-[#FF6B35] text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                    >
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="text-center text-[#1A5F7A] border border-[#1A5F7A] px-4 py-2 rounded hover:bg-blue-50 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register" 
                        className="text-center bg-[#FF6B35] text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Desktop menu */}
        <div className="hidden md:block">
          <ScrollArea className="w-full max-w-md">
            <nav className="flex space-x-6">
              {menuItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="text-gray-600 hover:text-[#1A5F7A] transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <AuthButtons />
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;