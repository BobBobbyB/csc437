import { LitElement, html, css } from 'lit';

export class PlayerCard extends LitElement {
  static properties = {
    name: { type: String },
    number: { type: String },
    position: { type: String },
    team: { type: String },
    ppg: { type: Number },
    rpg: { type: Number },
    apg: { type: Number },
    href: { type: String, reflect: true }
  } as const;

  name?: string;
  number?: string;
  position?: string;
  team?: string;
  ppg?: number | string;
  rpg?: number | string;
  apg?: number | string;
  href?: string;

  static styles = css`
    :host { display: block; }
    a { color: inherit; text-decoration: none; display: block; }
    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: var(--spacing-md);
      transition: all .3s ease;
      cursor: pointer;
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
    const card = html`
      <article class="card">
        <header class="card-header">
          <h3 class="card-title">${this.name}</h3>
          <p class="card-subtitle">#${this.number} • ${this.position}</p>
        </header>
        <p class="card-accent">${this.team}</p>
        <div class="stats-grid">
          <div><span class="stat-value">${this.ppg}</span><span class="stat-label">PPG</span></div>
          <div><span class="stat-value">${this.rpg}</span><span class="stat-label">RPG</span></div>
          <div><span class="stat-value">${this.apg}</span><span class="stat-label">APG</span></div>
        </div>
      </article>
    `;

    return this.href ? html`<a href="${this.href}">${card}</a>` : card;
  }
}

customElements.define('player-card', PlayerCard);
