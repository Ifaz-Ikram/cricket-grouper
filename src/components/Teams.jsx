import React from 'react';
import { organizationsData } from '../data/organizationsData';

const Teams = () => {
  return (
    <section id="teams" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-htg-navy mb-4">
            Participating Teams
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the organizations and teams competing in HTG 2025
          </p>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(organizationsData).map(([orgName, teams], index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-htg-green"
            >
              {/* Organization Header */}
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-htg-navy flex-1 pr-4">
                  {orgName}
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-hero text-white text-sm font-semibold">
                  {teams.length} {teams.length === 1 ? 'Team' : 'Teams'}
                </span>
              </div>

              {/* Teams List */}
              <div className="space-y-2">
                {teams.map((teamName, teamIndex) => (
                  <div 
                    key={teamIndex}
                    className="flex items-center gap-3 p-3 rounded-lg bg-htg-cream/30 hover:bg-htg-cream transition-colors duration-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-htg-green"></div>
                    <span className="text-htg-navy font-medium">{teamName}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Total Count */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-teal rounded-2xl px-8 py-4 text-white">
            <span className="text-4xl font-bold">20</span>
            <span className="ml-3 text-xl">Total Teams Competing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teams;
