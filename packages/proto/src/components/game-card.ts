import { LitElement, html, css } from 'lit';

export class GameCard extends LitElement {
  static properties = {
    href: { type: String, reflect: true },
    date: { type: String },
    homeTeam: { type: String },
    awayTeam: { type: String },
    homeScore: { type: Number },
    awayScore: { type: Number },
    status: { type: String },
  } as const;

  href?: string;
  date?: string;
  homeTeam?: string;
  awayTeam?: string;
  homeScore?: number | string;
  awayScore?: number | string;
  status?: string;

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
    .stat-value {
      font-family: var(--font-display);
      font-size: 1.875rem;
      color: var(--primary);
      display: block;
    }
  `;

  render() {
    const card = html`
      <article class="card">
        <header class="card-header">
          <div style="font-size: 0.875rem; color: var(--muted-foreground);">${this.date}</div>
        </header>

        <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
          <span style="font-family: var(--font-display); font-size: 1.125rem;">${this.awayTeam}</span>
          <span class="stat-value">${this.awayScore}</span>
        </div>

        <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
          <span style="font-family: var(--font-display); font-size: 1.125rem;">${this.homeTeam}</span>
          <span class="stat-value">${this.homeScore}</span>
        </div>

        <div style="text-align:center; padding-top:1rem; border-top:1px solid var(--border);">
          <span style="font-size: .875rem; color: var(--muted-foreground);">${this.status}</span>
        </div>
      </article>
    `;

    return this.href ? html`<a href="${this.href}">${card}</a>` : card;
  }
}

customElements.define('game-card', GameCard);
