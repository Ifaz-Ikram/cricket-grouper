import React from 'react';
import { Trophy, Users, Shield, Award, Target, Calendar, MapPin, Building2, CheckCircle2 } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Trophy,
      title: 'Premier Corporate Cricket',
      copy: 'Flagship tournament hosted by CSE, celebrating teamwork and competition.',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Users,
      title: '20 Teams, 4 Groups',
      copy: 'A balanced draw with clean constraints keeps matchups fair and exciting.',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: Shield,
      title: 'Fairness by Design',
      copy: 'No two teams from the same organization land in the same group—guaranteed.',
      gradient: 'from-htg-primary to-htg-primary-dark',
    },
  ];

  const milestones = [
    { icon: Calendar, label: 'Draw Day', value: 'November 2025' },
    { icon: MapPin, label: 'Venue', value: 'University Grounds' },
    { icon: Building2, label: 'Hosts', value: 'CSE Community' },
  ];

  const formatPoints = [
    '20 teams split into 4 groups of 5',
    'Organizations never meet themselves in the group stage',
    'Transparent draw sequence with instant redraw if constraints fail',
  ];

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-htg-primary font-semibold text-xs uppercase tracking-wider backdrop-blur-sm">
            <Award size={16} />
            The Tournament
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            CSE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-htg-primary to-htg-primary-light">
              Hit The Grounds
            </span>{' '}
            2025
          </h1>
          <p className="text-xl text-htg-text-muted max-w-3xl mx-auto leading-relaxed">
            A crisp, simple stage for corporate cricket. We keep the experience focused on the draw and the matches, not on visual noise.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-8 animate-fade-in hover:bg-white/5"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                <item.icon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">{item.title}</h3>
              <p className="text-htg-text-muted leading-relaxed text-base">{item.copy}</p>
            </div>
          ))}
        </div>

        {/* Tournament Format & Key Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tournament Format Card */}
          <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-htg-dark-900 via-htg-dark-800 to-htg-dark-900 text-white p-8 lg:p-10 shadow-2xl relative overflow-hidden animate-scale-in border border-white/5">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Target size={28} className="text-white" />
                </div>
                <p className="text-sm uppercase tracking-wider text-white/70 font-semibold">Tournament Format</p>
              </div>
              <h2 className="text-4xl font-black mb-6">Draw. Group. Compete.</h2>
              <ul className="space-y-4">
                {formatPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-htg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={16} className="text-htg-dark-950" />
                    </div>
                    <span className="text-white/90 text-lg leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Details Card */}
          <div className="glass-card rounded-3xl p-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-sm uppercase tracking-wider text-htg-text-muted font-bold mb-6">Key Details</h3>
            <div className="space-y-4">
              {milestones.map((item, index) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/5 bg-white/5 p-5 hover:bg-white/10 hover:border-htg-primary/20 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-htg-primary/10 group-hover:bg-htg-primary/20 flex items-center justify-center transition-colors border border-htg-primary/20">
                      <item.icon size={20} className="text-htg-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wide text-htg-text-muted font-semibold mb-1">{item.label}</p>
                      <p className="text-lg font-bold text-white">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="glass-card rounded-3xl p-8 lg:p-10 animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-htg-primary to-htg-primary-dark flex items-center justify-center flex-shrink-0 shadow-lg">
              <Shield size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-white mb-3">Fair Play Guaranteed</h3>
              <p className="text-htg-text-muted text-lg leading-relaxed">
                Our advanced algorithmic draw system ensures complete fairness. Every team gets an equal opportunity,
                and the constraint that no two teams from the same organization share a group is strictly enforced.
                The system automatically redraws if any constraint violation is detected, ensuring transparency and fairness throughout the process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
