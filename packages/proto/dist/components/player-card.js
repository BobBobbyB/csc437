import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class PlayerCard extends LitElement {
  static properties = {
    name: { type: String },
    number: { type: String },
    position: { type: String },
    team: { type: String },
    ppg: { type: Number },
    rpg: { type: Number },
    apg: { type: Number },
    href: { type: String } // make the whole card linkable
  };

  static styles = css`
    :host { display: block; }
    a.card-link {
      display: block;
      color: inherit;
      text-decoration: none;
    }

    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: var(--spacing-md);
      transition: all .3s ease;
    }
    .card:hover {
      border-color: var(--primary);
      box-shadow: 0 0 30px hsla(25,95%,53%,.3);
    }
    .card-header { margin-bottom: var(--spacing-sm); }
    .card-title {
      font-size: 1.5rem;
      color: var(--foreground);
      margin-bottom: .25rem;
      font-family: var(--font-display);
    }
    .card-subtitle { color: var(--muted-foreground); font-size: .9rem; }
    .card-accent { color: var(--primary); margin-bottom: var(--spacing-sm); }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-sm);
      text-align: center;
    }
    .stat-value {
      font-family: var(--font-display);
      font-size: 1.5rem;
      color: var(--primary);
      display: block;
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--muted-foreground);
      text-transform: uppercase;
    }
  `;

  render() {
    const name   = this.name ?? '';
    const number = this.number ?? '';
    const pos    = this.position ?? '';
    const team   = this.team ?? '';
    const ppg    = this.ppg ?? '-';
    const rpg    = this.rpg ?? '-';
    const apg    = this.apg ?? '-';

    const content = html`
      <article class="card" part="card">
        <header class="card-header">
          <h3 class="card-title">${name}</h3>
          <p class="card-subtitle">#${number} • ${pos}</p>
        </header>
        <p class="card-accent">${team}</p>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">${ppg}</span>
            <span class="stat-label">PPG</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${rpg}</span>
            <span class="stat-label">RPG</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${apg}</span>
            <span class="stat-label">APG</span>
          </div>
        </div>
      </article>
    `;

    // if href is provided, wrap the card to make the whole thing clickable
    return this.href
      ? html`<a class="card-link" href="${this.href}" aria-label="${name}">${content}</a>`
      : content;
  }
}

customElements.define('player-card', PlayerCard);
