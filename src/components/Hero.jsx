import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className="inline-flex items-center px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold text-sm tracking-wide">
              CSE HIT THE GROUNDS 2025
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
            Group Stage Draw
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-light">
            Bringing together the best cricket teams for an unforgettable tournament
          </p>

          {/* Event Details */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white pt-6">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-white/90" />
              <span className="text-lg font-medium">November 2025</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/50"></div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-white/90" />
              <span className="text-lg font-medium">University Grounds</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <a
              href="#groups"
              className="inline-block px-10 py-4 bg-white text-htg-green font-bold text-lg rounded-full hover:bg-htg-navy hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              View Groups
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
