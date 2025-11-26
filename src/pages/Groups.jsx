import React, { useState, useEffect } from 'react';
import { Shuffle, RefreshCw, AlertCircle, Shield, CheckCircle2, Sparkles } from 'lucide-react';
import { organizationsData } from '../data/organizationsData';

const Groups = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [groups, setGroups] = useState(null);
  const [solving, setSolving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const teamsList = [];
    Object.entries(organizationsData).forEach(([orgName, teams]) => {
      teams.forEach((teamName) => {
        teamsList.push({ name: teamName, org: orgName });
      });
    });
    setAllTeams(teamsList);
  }, []);

  const isValidAssignment = (groupsArr, teamIndex, groupIndex, teams) => {
    const team = teams[teamIndex];
    const group = groupsArr[groupIndex];
    return !group.some((existingTeam) => existingTeam.org === team.org);
  };

  const backtrackCSP = (teams, groupsArr, teamIndex) => {
    if (teamIndex === teams.length) return true;

    for (let groupIndex = 0; groupIndex < 4; groupIndex++) {
      if (groupsArr[groupIndex].length >= 5) continue;
      if (!isValidAssignment(groupsArr, teamIndex, groupIndex, teams)) continue;

      groupsArr[groupIndex].push(teams[teamIndex]);
      if (backtrackCSP(teams, groupsArr, teamIndex + 1)) return true;
      groupsArr[groupIndex].pop();
    }

    return false;
  };

  const solveGrouping = () => {
    if (allTeams.length !== 20) {
      setError(`You have ${allTeams.length} teams. Exactly 20 teams are required.`);
      return;
    }

    setSolving(true);
    setError('');

    setTimeout(() => {
      const initialGroups = [[], [], [], []];
      const shuffledTeams = [...allTeams].sort(() => Math.random() - 0.5);

      const success = backtrackCSP(shuffledTeams, initialGroups, 0);
      if (success) {
        setGroups(initialGroups);
        setError('');
      } else {
        setError('Could not create valid groups. Please try again.');
        setGroups(null);
      }

      setSolving(false);
    }, 900);
  };

  const groupColors = [
    { bg: 'from-blue-500 to-blue-600', border: 'border-blue-500/30', text: 'text-blue-400' },
    { bg: 'from-purple-500 to-purple-600', border: 'border-purple-500/30', text: 'text-purple-400' },
    { bg: 'from-orange-500 to-orange-600', border: 'border-orange-500/30', text: 'text-orange-400' },
    { bg: 'from-pink-500 to-pink-600', border: 'border-pink-500/30', text: 'text-pink-400' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-htg-primary font-semibold text-xs uppercase tracking-wider backdrop-blur-sm">
            <Sparkles size={16} />
            Live Draw
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Generate balanced groups{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-htg-primary to-htg-primary-light">
              in one click
            </span>
          </h1>
          <p className="text-xl text-htg-text-muted max-w-3xl mx-auto leading-relaxed">
            The draw respects the constraint: teams from the same organization never share a group. Cleaner layout, faster interaction.
          </p>
        </div>

        {/* Status Card */}
        <div className="glass-panel rounded-3xl p-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wider text-htg-text-muted font-semibold">Status</p>
              <h2 className="text-3xl font-black text-white">
                {groups ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={32} className="text-htg-primary" />
                    Groups Ready
                  </span>
                ) : solving ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw size={32} className="text-htg-primary animate-spin" />
                    Shuffling Teams...
                  </span>
                ) : (
                  'Waiting to Draw'
                )}
              </h2>
              <p className="text-htg-text-muted text-lg">
                Total teams detected:{' '}
                <span className={`font-bold ${allTeams.length === 20 ? 'text-htg-primary' : 'text-white'}`}>
                  {allTeams.length}
                </span>
                {' / '}
                <span className="font-bold text-white">20</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={solveGrouping}
                disabled={solving || allTeams.length !== 20}
                className={`group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 ${solving || allTeams.length !== 20
                    ? 'bg-white/5 text-htg-text-muted cursor-not-allowed border border-white/5'
                    : 'btn-primary-glow bg-htg-primary text-htg-dark-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1'
                  }`}
              >
                {solving ? (
                  <>
                    <RefreshCw size={20} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Shuffle size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                    {groups ? 'Redraw Groups' : 'Start Draw'}
                  </>
                )}
              </button>

              {groups && (
                <div className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-htg-primary/10 border border-htg-primary/20 text-htg-primary text-sm font-semibold">
                  <Shield size={18} />
                  Balanced & Verified
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 animate-fade-in backdrop-blur-sm">
            <AlertCircle size={20} className="flex-shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Groups Display */}
        {groups && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {groups.map((group, groupIndex) => {
              const colorScheme = groupColors[groupIndex];
              const groupLetter = String.fromCharCode(65 + groupIndex);

              return (
                <div
                  key={groupIndex}
                  className={`glass-card rounded-3xl border ${colorScheme.border} overflow-hidden`}
                  style={{ animationDelay: `${groupIndex * 0.1}s` }}
                >
                  {/* Group Header */}
                  <div className={`bg-gradient-to-r ${colorScheme.bg} p-6 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative flex items-center justify-between z-10">
                      <div>
                        <p className="text-white/80 text-xs uppercase tracking-wider font-semibold mb-1">Group</p>
                        <h3 className="text-4xl font-black text-white">{groupLetter}</h3>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
                        <Shield size={20} className="text-white" />
                        <span className="text-white font-bold text-lg">{group.length}/5</span>
                      </div>
                    </div>
                  </div>

                  {/* Teams List */}
                  <div className="p-6 space-y-3">
                    {group.map((team, teamIndex) => (
                      <div
                        key={teamIndex}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-4 hover:bg-white/10 hover:border-white/10 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorScheme.bg} text-white font-bold flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            {teamIndex + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-white text-lg truncate">{team.name}</div>
                            <div className="text-xs font-semibold text-htg-text-muted uppercase tracking-wide truncate">
                              {team.org}
                            </div>
                          </div>
                        </div>
                        <CheckCircle2 size={20} className="text-htg-primary flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!groups && !solving && (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 mb-6 border border-white/10">
              <Shuffle size={48} className="text-htg-text-muted" />
            </div>
            <p className="text-xl text-htg-text-muted font-medium">
              Ready to create balanced groups? Click "Start Draw" above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
