import React from 'react';
import { Trophy, Users, Award } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Trophy,
      title: '20 Teams',
      description: 'Top cricket teams competing for glory'
    },
    {
      icon: Users,
      title: '4 Groups',
      description: 'Balanced groups for fair competition'
    },
    {
      icon: Award,
      title: 'Premier Event',
      description: 'The biggest cricket tournament of the year'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-htg-navy mb-4">
            About HTG 2025
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            CSE Hit The Grounds brings together corporate cricket teams for an exciting tournament featuring world-class competition and sportsmanship.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-htg-cream to-white p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-300 border border-htg-aqua/20 hover:border-htg-green"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-hero rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-htg-navy mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tournament Info */}
        <div className="bg-gradient-dark rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Tournament Format</h3>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            20 participating teams will be divided into 4 balanced groups. Each group contains 5 teams, 
            with the unique constraint that no two teams from the same organization appear in the same group, 
            ensuring fair and competitive matches throughout the tournament.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
