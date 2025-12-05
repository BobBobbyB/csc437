async function renderSchedule() {
    try {
      const res = await fetch('./data/games.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const games = await res.json();
  
      const container = document.getElementById('schedule-list');
      if (!container) return;
  
      container.innerHTML = '';
  
      games.forEach(game => {
        const isFinal =
          (game.status || '').toLowerCase() === 'final';
  
        const article = document.createElement('article');
        article.className = 'card';
  
        // header (date + location + status pill)
        article.innerHTML = `
          <header class="game-header">
            <div>
              <div style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.25rem;">
                ${game.date}
              </div>
              <div style="font-size: 0.75rem; color: var(--muted-foreground);">
                ${game.location ?? ''}
              </div>
            </div>
            <span class="game-status ${isFinal ? 'status-final' : 'status-upcoming'}">
              ${game.status}
            </span>
          </header>
  
          <div class="game-matchup">
            <div class="team-info">
              <div class="team-name">${game.awayTeam}</div>
              <div class="team-label">Away</div>
            </div>
  
            ${
              isFinal
                ? `
                <div style="display: flex; gap: 2rem; padding: 0 2rem;">
                  <div class="game-score">${game.awayScore}</div>
                  <div style="font-family: var(--font-display); font-size: 2.5rem; color: var(--muted-foreground);">-</div>
                  <div class="game-score">${game.homeScore}</div>
                </div>
              `
                : `
                <div class="game-vs">VS</div>
              `
            }
  
            <div class="team-info" style="text-align: right;">
              <div class="team-name">${game.homeTeam}</div>
              <div class="team-label">Home</div>
            </div>
          </div>
        `;
  
        // wrap in link if href exists
        if (game.href) {
          const link = document.createElement('a');
          link.href = game.href;
          link.appendChild(article);
          container.appendChild(link);
        } else {
          container.appendChild(article);
        }
      });
    } catch (err) {
      console.error('Failed to load schedule:', err);
      const container = document.getElementById('schedule-list');
      if (container) {
        container.innerHTML =
          '<p style="color: var(--muted-foreground);">Failed to load schedule. Please try again.</p>';
      }
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSchedule);
  } else {
    renderSchedule();
  }
  