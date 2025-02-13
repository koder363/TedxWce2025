import React from 'react';
import Team from './TeamsData.js';
import './Teams.css';

function Teams({ name }) {
  const teamMembers = Team[name] || []; // Ensure it doesn't break if name doesn't exist

  return (
    <div className="main-div">
      <div className='head-text-div'>
        <h1 className='heading-text'>{teamMembers[0]?.teamName}</h1>
      </div>
      <div className="image_section">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img className='team-image' src={member.imageUrl} alt={member.name} />
            <div className="overlay">
              <span className="vertical-text">{member.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
