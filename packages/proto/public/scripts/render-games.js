async function renderGames() {
    try {
      const response = await fetch('./data/games.json');
      const games = await response.json();
      
      const container = document.getElementById('games-grid');
      if (!container) return;
  
      container.innerHTML = '';
  
      games.forEach(game => {
        const link = document.createElement('a');
        link.href = game.href;
  
        const gameCard = document.createElement('game-card');
        gameCard.setAttribute('date', game.date);
        gameCard.setAttribute('homeTeam', game.homeTeam);
        gameCard.setAttribute('awayTeam', game.awayTeam);
        gameCard.setAttribute('homeScore', game.homeScore);
        gameCard.setAttribute('awayScore', game.awayScore);
        gameCard.setAttribute('status', game.status);
  
        link.appendChild(gameCard);
        container.appendChild(link);
      });
    } catch (error) {
      console.error('Failed to load games:', error);
      document.getElementById('games-grid').innerHTML = 
        '<p style="color: var(--muted-foreground);">Failed to load games. Please try again.</p>';
    }
}
  
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderGames);
} else {
    renderGames();
}
  