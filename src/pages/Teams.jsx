import React from 'react';
import { Users, Shield, Building2, Trophy } from 'lucide-react';
import { organizationsData } from '../data/organizationsData';

const Teams = () => {
  const totalTeams = Object.values(organizationsData).reduce(
    (count, teams) => count + teams.length,
    0
  );
  const totalOrgs = Object.keys(organizationsData).length;

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-htg-primary font-semibold text-xs uppercase tracking-wider backdrop-blur-sm">
            <Users size={16} />
            The Contenders
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Meet the teams{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-htg-primary to-htg-primary-light">
              lining up
            </span>{' '}
            for the draw
          </h1>
          <p className="text-xl text-htg-text-muted max-w-3xl mx-auto leading-relaxed">
            Every organization gets a fair shot—no duplicate orgs in the same group. Scan the roster before the shuffle.
          </p>

          {/* Stats Cards */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="glass-card inline-flex items-center gap-3 px-6 py-4 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-htg-primary/10 flex items-center justify-center border border-htg-primary/20">
                <Trophy size={24} className="text-htg-primary" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{totalTeams}</div>
                <div className="text-xs font-semibold text-htg-text-muted uppercase tracking-wide">Teams</div>
              </div>
            </div>
            <div className="glass-card inline-flex items-center gap-3 px-6 py-4 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-htg-primary/10 flex items-center justify-center border border-htg-primary/20">
                <Building2 size={24} className="text-htg-primary" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{totalOrgs}</div>
                <div className="text-xs font-semibold text-htg-text-muted uppercase tracking-wide">Organizations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(organizationsData).map(([orgName, teams], index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 animate-fade-in hover:bg-white/5"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Organization Header */}
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white/5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-htg-primary to-htg-primary-dark flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Shield size={24} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wide text-htg-text-muted font-semibold mb-1">Organization</p>
                  <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">{orgName}</h3>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-htg-primary/10 text-htg-primary border border-htg-primary/20 whitespace-nowrap">
                  {teams.length} {teams.length === 1 ? 'team' : 'teams'}
                </span>
              </div>

              {/* Teams List */}
              <div className="space-y-2">
                {teams.map((teamName, teamIndex) => (
                  <div
                    key={teamIndex}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-htg-primary/30 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-htg-dark-950 border border-white/10 group-hover:border-htg-primary group-hover:text-htg-primary text-xs font-bold flex items-center justify-center text-htg-text-muted transition-all">
                      {teamIndex + 1}
                    </div>
                    <span className="font-semibold text-htg-text-main flex-1">{teamName}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
