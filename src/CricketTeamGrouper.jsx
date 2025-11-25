import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Shuffle, Sparkles } from 'lucide-react';
import { organizationsData } from './data/organizationsData';

const CricketTeamGrouper = () => {
  const [organizations, setOrganizations] = useState({});
  const [allTeams, setAllTeams] = useState([]); // all teams from data
  const [groups, setGroups] = useState(null);
  const [error, setError] = useState('');
  const [solving, setSolving] = useState(false);

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

  const teamCountIsValid = allTeams.length === 20;

  const solveGrouping = () => {
    if (!teamCountIsValid) {
      setError(`You have ${allTeams.length} teams. Exactly 20 teams are required for grouping.`);
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
        setError('Could not create valid groups with these organizations. Please try again.');
        setGroups(null);
      }
      
      setSolving(false);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10 text-base-content">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="hero bg-base-100 border border-base-300 rounded-3xl shadow-sm">
          <div className="hero-content flex-col text-center gap-4">
            <div className="badge badge-secondary gap-2 tracking-[0.3em] uppercase text-xs">
              <Sparkles size={14} />
              Group Stage Draw
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-primary">
              🏏 CSE Hit The Grounds 2025
            </h1>
          </div>
        </section>

        {!groups && (
          <div className="card bg-base-100 border border-base-300 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="card-body space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="card-title">Participating Teams</h2>
              </div>

              {error && (
                <div className="alert alert-error">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(organizations).map(([orgName, org]) => (
                  <div key={org.id} className="card bg-base-200 border border-base-300 shadow-sm">
                    <div className="card-body gap-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{orgName}</h3>
                        <div className="badge badge-outline badge-secondary">
                          {org.teams.length} teams
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {org.teams.map((teamName) => (
                          <div key={teamName} className="card bg-base-100 border border-primary">
                            <div className="card-body p-3">
                              {teamName}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {teamCountIsValid ? (
                <button
                  onClick={solveGrouping}
                  disabled={solving}
                  className={`btn btn-primary btn-lg w-full ${solving ? 'loading' : ''}`}
                >
                  {!solving && <Shuffle size={20} />}
                  {solving ? 'Drawing groups...' : 'Draw groups'}
                </button>
              ) : (
                <div className="alert alert-warning">
                  <AlertCircle size={20} />
                  <span>You have {allTeams.length} teams. Exactly 20 teams are required.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {groups && (
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body space-y-6">
              <div className="alert alert-success justify-center">
                <CheckCircle size={24} />
                <span>Groups created successfully</span>
              </div>

              <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                {groups.map((group, groupIndex) => (
                  <div key={groupIndex} className="card bg-base-200 border border-primary/20 shadow-sm">
                    <div className="card-body gap-2">
                      <h3 className="card-title text-primary">
                        Group {String.fromCharCode(65 + groupIndex)}
                      </h3>
                      <div className="space-y-3">
                        {group.map((team, teamIndex) => (
                          <div key={teamIndex} className="rounded-xl border border-base-300 bg-base-100 p-3 shadow-sm">
                            <div className="font-semibold">{team.name}</div>
                            <div className="badge badge-outline badge-secondary mt-2">
                              {team.org}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="alert alert-info justify-center">
                <CheckCircle size={18} />
                <span>Teams from the same organization never share a group.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CricketTeamGrouper;