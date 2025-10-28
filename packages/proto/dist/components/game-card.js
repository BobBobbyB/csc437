import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class GameCard extends LitElement {
  static properties = {
    date: { type: String },
    location: { type: String },
    homeTeam: { type: String },
    awayTeam: { type: String },
    homeScore: { type: Number },
    awayScore: { type: Number },
    status: { type: String }, // "final" or "upcoming"
    href: { type: String }
  };

  static styles = css`
    :host { display: block; }
    a.card-link { display: block; color: inherit; text-decoration: none; }

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

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-sm);
    }

    .date {
      font-size: 0.875rem;
      color: var(--muted-foreground);
    }

    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .final { background: var(--muted); color: var(--foreground); }
    .upcoming { background: hsla(25,95%,53%,.2); color: var(--primary); }

    .matchup {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: var(--spacing-sm) 0;
    }
    .team-name {
      font-family: var(--font-display);
      font-size: 1.125rem;
      color: var(--foreground);
    }
    .score {
      font-family: var(--font-display);
      font-size: 2rem;
      color: var(--primary);
    }

    .vs {
      font-family: var(--font-display);
      text-align: center;
      color: var(--muted-foreground);
      font-size: 1rem;
      margin: var(--spacing-sm) 0;
    }

    .location {
      text-align: center;
      font-size: 0.875rem;
      color: var(--muted-foreground);
      border-top: 1px solid var(--border);
      padding-top: var(--spacing-sm);
    }
  `;

  render() {
    const statusClass =
      (this.status || '').toLowerCase() === 'final'
        ? 'status final'
        : 'status upcoming';

    const content = html`
      <article class="card" part="card">
        <header class="card-header">
          <div class="date">${this.date ?? ''}</div>
          ${this.status
            ? html`<span class="${statusClass}">${this.status}</span>`
            : ''}
        </header>

        <div class="matchup">
          <span class="team-name">${this.awayTeam ?? ''}</span>
          <span class="score">${this.awayScore ?? '-'}</span>
        </div>

        <div class="vs">VS</div>

        <div class="matchup">
          <span class="team-name">${this.homeTeam ?? ''}</span>
          <span class="score">${this.homeScore ?? '-'}</span>
        </div>

        ${this.location
          ? html`<div class="location">${this.location}</div>`
          : ''}
      </article>
    `;

    return this.href
      ? html`<a class="card-link" href="${this.href}" aria-label="Game Details">${content}</a>`
      : content;
  }
}

customElements.define('game-card', GameCard);
