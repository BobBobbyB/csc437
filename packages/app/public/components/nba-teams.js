import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import './team-card.js';

class NbaTeams extends LitElement {
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

  teams = [];
  loading = true;
  error = false;

  connectedCallback() {
    super.connectedCallback();
    this.loadTeams();
  }

  async loadTeams() {
    try {
      const res = await fetch(this.src ?? './data/teams.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.teams = await res.json();
    } catch (e) {
      console.error('Failed to load teams:', e);
      this.error = true;
    } finally {
      this.loading = false;
      this.requestUpdate();
    }
  }

  render() {
    if (this.loading) return html`<p class="loading">Loading teams...</p>`;
    if (this.error) return html`<p class="error">Failed to load teams. Please try again.</p>`;

    return html`
      <div class="grid">
        ${this.teams.map(
          t => html`
            <team-card
              href=${t.href}
              name=${t.name}
              conference=${t.conference}
              wins=${t.wins}
              losses=${t.losses}
              players=${t.players.join(', ')}
            ></team-card>
          `
        )}
      </div>
    `;
  }
}

customElements.define('nba-teams', NbaTeams);
