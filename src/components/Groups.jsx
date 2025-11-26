import React, { useState, useEffect } from 'react';
import { Shuffle, CheckCircle, AlertCircle } from 'lucide-react';
import { organizationsData } from '../data/organizationsData';

const Groups = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [groups, setGroups] = useState(null);
  const [solving, setSolving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const teamsList = [];
    Object.entries(organizationsData).forEach(([orgName, teams]) => {
      teams.forEach(teamName => {
        teamsList.push({
          name: teamName,
          org: orgName,
        });
      });
    });
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
    }, 100);
  };

  return (
    <section id="groups" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-htg-navy mb-4">
            Group Draw
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate balanced groups ensuring no teams from the same organization are grouped together
          </p>
        </div>

        {/* Draw Button */}
        {!groups && (
          <div className="max-w-md mx-auto mb-12">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
            
            <button
              onClick={solveGrouping}
              disabled={solving || allTeams.length !== 20}
              className={`w-full py-5 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                solving || allTeams.length !== 20
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-hero text-white hover:shadow-2xl hover:scale-105'
              }`}
            >
              {solving ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Drawing Groups...
                </>
              ) : (
                <>
                  <Shuffle size={24} />
                  Draw Groups
                </>
              )}
            </button>
          </div>
        )}

        {/* Groups Display */}
        {groups && (
          <div className="space-y-8">
            {/* Success Message */}
            <div className="max-w-md mx-auto p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-center gap-3 text-green-700 font-semibold">
              <CheckCircle size={20} />
              <span>Groups created successfully!</span>
            </div>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groups.map((group, groupIndex) => (
                <div 
                  key={groupIndex}
                  className="bg-gradient-to-br from-htg-navy to-htg-teal rounded-2xl p-8 shadow-xl"
                >
                  <h3 className="text-3xl font-bold text-white mb-6 pb-4 border-b border-white/20">
                    Group {String.fromCharCode(65 + groupIndex)}
                  </h3>
                  
                  <div className="space-y-3">
                    {group.map((team, teamIndex) => (
                      <div 
                        key={teamIndex}
                        className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                      >
                        <div className="font-bold text-htg-navy text-lg mb-1">
                          {team.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {team.org}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Redraw Button */}
            <div className="text-center pt-8">
              <button
                onClick={solveGrouping}
                disabled={solving}
                className="px-8 py-4 bg-htg-green text-white font-bold rounded-xl hover:bg-htg-teal transition-colors duration-300 flex items-center gap-3 mx-auto"
              >
                <Shuffle size={20} />
                Redraw Groups
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Groups;
