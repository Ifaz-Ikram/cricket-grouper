import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Trophy, Users, Sparkles, Shield } from 'lucide-react';

const Home = () => {
  const stats = [
    { label: 'Teams', value: '20', icon: Users },
    { label: 'Groups', value: '4', icon: Trophy },
    { label: 'Format', value: 'Round Robin', icon: Shield },
  ];

  const eventDetails = [
    { icon: Calendar, label: 'Date', value: 'November 2025' },
    { icon: MapPin, label: 'Venue', value: 'University Grounds' },
    { icon: Users, label: 'Hosted by', value: 'CSE Community' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-htg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-htg-accent/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-htg-primary font-semibold text-xs uppercase tracking-wider backdrop-blur-sm">
                <Sparkles size={14} />
                CSE Hit The Grounds 2025
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                  Group Stage Draw for the{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-htg-primary to-htg-primary-light">
                    corporate cricket
                  </span>{' '}
                  showdown.
                </h1>
                <p className="text-xl text-htg-text-muted max-w-2xl leading-relaxed">
                  Twenty elite teams. Four balanced groups. A clean, fast live draw experience—ready when you are.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-htg-primary/10 flex items-center justify-center mb-3 border border-htg-primary/20">
                      <stat.icon size={24} className="text-htg-primary" />
                    </div>
                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-xs font-bold text-htg-text-muted uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/groups"
                  className="group btn-primary-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-htg-primary text-htg-dark-950 font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 hover:-translate-y-1"
                >
                  Start the draw
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/teams"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/10 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  View teams
                </Link>
              </div>
            </div>

            {/* Right Card */}
            <div className="relative animate-scale-in lg:mt-0 mt-10">
              <div className="glass-panel rounded-3xl p-1">
                <div className="bg-htg-dark-900/50 rounded-[22px] p-8 lg:p-10 space-y-8 backdrop-blur-sm">
                  <div className="flex items-center justify-between pb-6 border-b border-white/5">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-htg-primary font-bold mb-2">Live Event</p>
                      <h2 className="text-3xl lg:text-4xl font-black text-white">Hit The Grounds Draw</h2>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-htg-primary to-htg-primary-dark flex items-center justify-center shadow-lg animate-float">
                      <Trophy size={32} className="text-white" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {eventDetails.map((item, index) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 px-5 py-4 hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="w-12 h-12 rounded-xl bg-htg-primary/10 flex items-center justify-center flex-shrink-0 border border-htg-primary/20">
                          <item.icon size={20} className="text-htg-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs uppercase tracking-wide text-htg-text-muted font-semibold mb-1">{item.label}</p>
                          <p className="text-lg font-bold text-white">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-htg-primary/20 bg-htg-primary/5 px-6 py-4">
                    <div className="flex items-start gap-3">
                      <Shield size={20} className="text-htg-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-htg-text-muted leading-relaxed">
                        <span className="font-bold text-htg-primary">Balanced algorithmic draw:</span> no two teams from the same organization land in the same group.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
