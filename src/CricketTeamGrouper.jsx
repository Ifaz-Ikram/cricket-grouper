import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Plus, Trash2, Shuffle, Zap, Sparkles } from 'lucide-react';
import { organizationsData } from './data/organizationsData';

const CricketTeamGrouper = () => {
  const [organizations, setOrganizations] = useState({});
  const [allTeams, setAllTeams] = useState([]); // all teams from data
  const [groups, setGroups] = useState(null);
  const [error, setError] = useState('');
  const [solving, setSolving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load organizations data on mount
  useEffect(() => {
    const orgsWithIds = {};
    const teamsList = [];
    
    Object.entries(organizationsData).forEach(([orgName, teams], index) => {
      const orgId = `org_${index + 1}`;
      orgsWithIds[orgName] = {
        id: orgId,
        name: orgName,
        teams: teams
      };
      
      // Flatten all teams with their organization info
      teams.forEach(teamName => {
        teamsList.push({
          name: teamName,
          org: orgName,
          orgId: orgId
        });
      });
    });
    
    setOrganizations(orgsWithIds);
    setAllTeams(teamsList);
  }, []);

  const isValidAssignment = (groups, teamIndex, groupIndex, teams) => {
    const team = teams[teamIndex];
    const group = groups[groupIndex];
    
    for (let existingTeam of group) {
      if (existingTeam.org === team.org) {
        return false;
      }
    }
    return true;
  };

  const backtrackCSP = (teams, groups, teamIndex) => {
    if (teamIndex === teams.length) {
      return true;
    }

    const team = teams[teamIndex];
    
    for (let groupIndex = 0; groupIndex < 4; groupIndex++) {
      if (groups[groupIndex].length >= 5) continue;
      
      if (isValidAssignment(groups, teamIndex, groupIndex, teams)) {
        groups[groupIndex].push(team);
        
        if (backtrackCSP(teams, groups, teamIndex + 1)) {
          return true;
        }
        
        groups[groupIndex].pop();
      }
    }
    
    return false;
  };

  const solveGrouping = () => {
    if (allTeams.length !== 20) {
      setError(`You have ${allTeams.length} teams. Exactly 20 teams are required for grouping.`);
      return;
    }

    setSolving(true);
    setError('');
    setShowSuccess(false);

    setTimeout(() => {
      const initialGroups = [[], [], [], []];
      const shuffledTeams = [...allTeams].sort(() => Math.random() - 0.5);
      
      const success = backtrackCSP(shuffledTeams, initialGroups, 0);
      
      if (success) {
        setGroups(initialGroups);
        setShowSuccess(true);
        setError('');
      } else {
        setError('Could not create valid groups with these organizations. Please try again.');
        setGroups(null);
      }
      
      setSolving(false);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-700/20 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 blur-2xl opacity-50 animate-pulse"></div>
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400 relative">
                🏏 HIT THE GROUND 2025
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-green-300 text-sm md:text-base font-mono backdrop-blur-sm bg-white/5 rounded-full px-6 py-2 inline-block border border-green-500/30">
            <Sparkles size={16} className="animate-pulse" />
            <span>GROUP STAGE DRAW</span>
            <Sparkles size={16} className="animate-pulse" />
          </div>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8 mb-6 hover:border-cyan-500/50 transition-all duration-300">
          {/* Header with team counter */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Participating Teams</h2>
            <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-bold text-sm">
              {allTeams.length}/20
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-start gap-3 text-red-300 backdrop-blur-sm animate-shake mb-6">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Organizations and Teams - Display only (no clicking) */}
          <div className="space-y-6 mb-6">
            {Object.entries(organizations).map(([orgName, org]) => (
              <div key={org.id} className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{org.name}</h3>
                  <div className="text-xs text-green-300 font-mono bg-white/10 px-3 py-1 rounded-full">
                    {org.teams.length} teams
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {org.teams.map((teamName) => (
                    <span
                      key={teamName}
                      className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-500/20 text-green-300 border border-green-500/40"
                    >
                      {teamName}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Draw Groups Button */}
          {allTeams.length === 20 && (
            <button
              onClick={solveGrouping}
              disabled={solving}
              className="relative w-full py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Shuffle size={24} className={solving ? 'animate-spin' : ''} />
              <span className="relative z-10">{solving ? 'DRAWING GROUPS...' : 'DRAW GROUPS'}</span>
            </button>
          )}
          {allTeams.length !== 20 && (
            <div className="text-center text-red-300 font-semibold py-4">
              ⚠️ You have {allTeams.length} teams. Exactly 20 teams are required.
            </div>
          )}
        </div>

        {/* Groups Display */}
        {groups && (
          <div className={`backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8 ${showSuccess ? 'animate-slide-up' : ''}`}>
            <div className="flex items-center gap-3 mb-6 justify-center">
              <CheckCircle size={32} className="text-green-400 animate-bounce" />
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                GROUPS CREATED!
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
              {groups.map((group, groupIndex) => (
                <div 
                  key={groupIndex} 
                  className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-2xl p-6 border-2 border-green-500/50 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30"
                  style={{ animationDelay: `${groupIndex * 100}ms` }}
                >
                  <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-4 flex items-center gap-2">
                    <span className="text-3xl">🏆</span>
                    GROUP {String.fromCharCode(65 + groupIndex)}
                  </h3>
                  <div className="space-y-3">
                    {group.map((team, teamIndex) => (
                      <div
                        key={teamIndex}
                        className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl p-4 border border-green-500/30 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
                        style={{ animationDelay: `${(groupIndex * 100) + (teamIndex * 50)}ms` }}
                      >
                        <div className="font-bold text-white text-lg">{team.name}</div>
                        <div className="text-xs text-green-300 font-mono mt-1 flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          {team.org}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-5 backdrop-blur-sm">
              <p className="text-green-300 font-semibold flex items-center gap-2 justify-center">
                <CheckCircle size={20} />
                Teams from the same organization are in different groups
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #22c55e);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default CricketTeamGrouper;