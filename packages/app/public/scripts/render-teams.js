async function renderTeams() {
    try {
      const response = await fetch('data/teams.json');
      const teams = await response.json();
  
      const container = document.getElementById('teams-grid');
      if (!container) return;
  
      container.innerHTML = '';
  
      teams.forEach(team => {
        const link = document.createElement('a');
        link.href = team.href;
  
        const teamCard = document.createElement('team-card');
        teamCard.setAttribute('name', team.name);
        teamCard.setAttribute('conference', team.conference);
        teamCard.setAttribute('wins', team.wins);
        teamCard.setAttribute('losses', team.losses);
  
        link.appendChild(teamCard);
        container.appendChild(link);
      });
    } catch (error) {
      console.error('Failed to load teams:', error);
      document.getElementById('teams-grid').innerHTML = 
        '<p style="color: var(--muted-foreground);">Failed to load teams. Please try again.</p>';
    }
}
  
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderTeams);
} else {
    renderTeams();
}
  