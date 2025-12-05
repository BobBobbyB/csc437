import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import './player-card.js';

class NbaPlayers extends LitElement {
  static properties = {
    src: { type: String }
  };

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

  players = [];
  loading = true;
  error = false;

  connectedCallback() {
    super.connectedCallback();
    this.loadPlayers();
  }

  async loadPlayers() {
    try {
      const res = await fetch(this.src ?? './data/players.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.players = await res.json();
    } catch (e) {
      console.error('Failed to load players:', e);
      this.error = true;
    } finally {
      this.loading = false;
      this.requestUpdate();
    }
  }

  render() {
    if (this.loading) {
      return html`<p class="loading">Loading players...</p>`;
    }
    if (this.error) {
      return html`<p class="error">Failed to load players. Please try again.</p>`;
    }

    return html`
      <div class="grid">
        ${this.players.map(
          p => html`
            <player-card
              href=${p.href}
              name=${p.name}
              number=${p.number}
              position=${p.position}
              team=${p.team}
              ppg=${p.stats.ppg}
              rpg=${p.stats.rpg}
              apg=${p.stats.apg}
            ></player-card>
          `
        )}
      </div>
    `;
  }
}

customElements.define('nba-players', NbaPlayers);
