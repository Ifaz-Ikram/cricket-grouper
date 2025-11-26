import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Teams', path: '/teams' },
    { name: 'Groups', path: '/groups' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-htg-dark-950/80 backdrop-blur-xl shadow-lg border-b border-white/5'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-htg-primary/20 rounded-full blur-md group-hover:bg-htg-primary/40 transition-all duration-300"></div>
              <img
                src="/Logo HW.png"
                alt="HTG Logo"
                className="relative h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <span className="hidden sm:block text-xl font-bold text-white group-hover:text-htg-primary transition-colors">
              HTG 2025
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${isActive(link.path)
                    ? 'text-htg-primary bg-htg-primary/10'
                    : 'text-htg-text-muted hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-htg-primary shadow-[0_0_10px_var(--color-htg-primary)]" />
                )}
              </Link>
            ))}
            <Link
              to="/groups"
              className="ml-4 px-6 py-2.5 rounded-lg font-semibold text-sm text-htg-dark-950 bg-htg-primary hover:bg-htg-primary-light shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Sparkles size={16} />
              Live Draw
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors text-htg-text-muted hover:bg-white/5 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-htg-dark-900/95 backdrop-blur-xl border-t border-white/5 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive(link.path)
                  ? 'bg-htg-primary/10 text-htg-primary'
                  : 'text-htg-text-muted hover:bg-white/5 hover:text-white'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/groups"
            onClick={() => setIsOpen(false)}
            className="block mt-4 px-4 py-3 rounded-lg font-semibold text-htg-dark-950 bg-htg-primary text-center hover:bg-htg-primary-light transition-colors"
          >
            <Sparkles size={16} className="inline mr-2" />
            Live Draw
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
