import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import './game-card.js';

class NbaGames extends LitElement {
  static properties = { src: { type: String } };

  static styles = css`
    :host { display: block; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--spacing-md);
    }
    .loading, .error {
      color: var(--muted-foreground);
      text-align: center;
      font-size: 1rem;
      padding: 1rem;
    }
  `;

  games = [];
  loading = true;
  error = false;

  connectedCallback() {
    super.connectedCallback();
    this.loadGames();
  }

  async loadGames() {
    try {
      const res = await fetch(this.src ?? './data/games.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.games = await res.json();
    } catch (e) {
      console.error('Failed to load games:', e);
      this.error = true;
    } finally {
      this.loading = false;
      this.requestUpdate();
    }
  }

  render() {
    if (this.loading) return html`<p class="loading">Loading games...</p>`;
    if (this.error) return html`<p class="error">Failed to load games. Please try again.</p>`;

    return html`
      <div class="grid">
        ${this.games.map(
          g => html`
            <game-card
              href=${g.href}
              date=${g.date}
              location=${g.location ?? ''}
              homeTeam=${g.homeTeam}
              awayTeam=${g.awayTeam}
              homeScore=${g.homeScore}
              awayScore=${g.awayScore}
              status=${g.status}
            ></game-card>
          `
        )}
      </div>
    `;
  }
}

customElements.define('nba-games', NbaGames);
