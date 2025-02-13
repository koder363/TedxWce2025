import React from 'react'
import TEAMS from './Teams'
import './OurTeam.css'
function OurTeam() {
  return (
    <div className='team-section' id='teams'>
      <h1 id='heading'>Meet Our Team</h1>
        <TEAMS name='core_team' />
        <TEAMS name='event-team'/>
        <TEAMS name='curator-team'/>
        <TEAMS name='web-team'/>
        <TEAMS name='finance-team'/>
        <TEAMS name='designers-team'/>
        <TEAMS name='media-team'/>
        <TEAMS name='cordinator-team'/>
    </div>
  )
}

export default OurTeam