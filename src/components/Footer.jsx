import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Trophy } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Teams', path: '/teams' },
    { name: 'Groups', path: '/groups' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'info@htg.cse.lk', href: 'mailto:info@htg.cse.lk' },
    { icon: Phone, text: '+94 XX XXX XXXX', href: 'tel:+94XXXXXXXXX' },
    { icon: MapPin, text: 'University of Moratuwa', href: '#' },
  ];

  return (
    <footer className="relative bg-htg-dark-950 border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-htg-primary/50 to-transparent blur-sm"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-htg-primary/10 flex items-center justify-center border border-htg-primary/20">
                <Trophy size={24} className="text-htg-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">HTG 2025</h3>
                <p className="text-sm text-htg-text-muted">Hit The Grounds</p>
              </div>
            </div>
            <p className="text-htg-text-muted text-base leading-relaxed max-w-md">
              CSE Hit The Grounds - The premier corporate cricket tournament bringing together the best teams for an unforgettable sporting experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-htg-text-muted hover:text-htg-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-htg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 text-htg-text-muted hover:text-htg-primary transition-colors duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-htg-primary/10 flex items-center justify-center transition-colors border border-white/5 group-hover:border-htg-primary/20">
                      <item.icon size={18} className="text-htg-primary" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-htg-text-muted text-sm">
              &copy; {currentYear} CSE Hit The Grounds. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-htg-text-muted text-sm">
              <span>Made with</span>
              <span className="text-red-500 animate-pulse">♥</span>
              <span>for cricket enthusiasts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
