import { LitElement, html, css } from 'lit';

export class TeamCard extends LitElement {
  static properties = {
    href: { type: String, reflect: true },
    name: { type: String },
    conference: { type: String },
    wins: { type: Number },
    losses: { type: Number },
    players: { type: String },
  } as const;

  href?: string;
  name?: string;
  conference?: string;
  wins?: number | string;
  losses?: number | string;
  players?: string;

  static styles = css`
    :host { display: block; }
    a { color: inherit; text-decoration: none; display: block; }
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
    const content = html`
      <article class="card">
        <header class="card-header">
          <h3 class="card-title">${this.name}</h3>
          <p class="card-subtitle">${this.conference}</p>
        </header>
        <div style="margin-bottom: 1rem;">
          <div class="stat-value">${this.wins}-${this.losses}</div>
          <div class="stat-label">Season Record</div>
        </div>
        <div>
          <div style="font-size: 0.875rem; font-weight: 600; color: var(--muted-foreground); margin-bottom: 0.5rem;">
            Key Players:
          </div>
          <ul style="list-style: none; padding: 0;">
            ${(this.players ?? '')
              .split(/[|,]/)
              .map(p => p.trim())
              .filter(Boolean)
              .map(p => html`<li style="font-size: 0.9rem;">${p}</li>`)}
          </ul>
        </div>
      </article>
    `;
    return this.href ? html`<a href="${this.href}">${content}</a>` : content;
  }
}
customElements.define('team-card', TeamCard);
