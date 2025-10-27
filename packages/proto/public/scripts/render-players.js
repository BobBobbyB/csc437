async function renderPlayers() {
    try {
      const response = await fetch('/data/players.json');
      const players = await response.json();
      
      const container = document.getElementById('players-grid');
      if (!container) return;
      
      container.innerHTML = '';
  
      players.forEach(player => {
        const link = document.createElement('a');
        link.href = player.href;
        
        const playerCard = document.createElement('player-card');
        playerCard.setAttribute('name', player.name);
        playerCard.setAttribute('number', player.number);
        playerCard.setAttribute('position', player.position);
        playerCard.setAttribute('team', player.team);
        playerCard.setAttribute('ppg', player.stats.ppg);
        playerCard.setAttribute('rpg', player.stats.rpg);
        playerCard.setAttribute('apg', player.stats.apg);
        
        link.appendChild(playerCard);
        container.appendChild(link);
      });
    } catch (error) {
      console.error('Failed to load players:', error);
      document.getElementById('players-grid').innerHTML = 
        '<p style="color: var(--muted-foreground);">Failed to load players. Please try again.</p>';
    }
}
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPlayers);
} else {
    renderPlayers();
}
  