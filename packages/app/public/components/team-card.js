import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class TeamCard extends LitElement {
  static properties = {
    name: { type: String },
    conference: { type: String },
    wins: { type: Number },
    losses: { type: Number },
    // accept array via property OR comma separated string via attribute
    players: {
      attribute: 'players',
      converter: {
        fromAttribute(value) {
          if (!value) return [];
          // allow comma or pipe separated lists
          return value.split(/[,|]/).map(s => s.trim()).filter(Boolean);
        }
      }
    },
    href: { type: String } // make the whole card a link
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

    .card-header { margin-bottom: var(--spacing-sm); }
    .card-title {
      font-size: 1.5rem;
      color: var(--foreground);
      margin-bottom: .25rem;
      font-family: var(--font-display);
    }
    .card-subtitle { color: var(--muted-foreground); font-size: .9rem; }

    .record {
      display: grid;
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
      margin: var(--spacing-sm) 0 var(--spacing-md);
    }
    .stat-value {
      font-family: var(--font-display);
      font-size: 1.75rem;
      color: var(--primary);
      line-height: 1.1;
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--muted-foreground);
      text-transform: uppercase;
    }

    .players-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--muted-foreground);
      margin-bottom: 0.5rem;
    }
    .players {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 0.25rem;
    }
    .players li {
      font-size: 0.9rem;
      color: var(--foreground);
    }
  `;

  render() {
    const name = this.name ?? '';
    const conf = this.conference ?? '';
    const wins = this.wins ?? 0;
    const losses = this.losses ?? 0;
    const players = Array.isArray(this.players) ? this.players : [];

    const content = html`
      <article class="card" part="card">
        <header class="card-header">
          <h3 class="card-title">${name}</h3>
          <p class="card-subtitle">${conf}</p>
        </header>

        <div class="record">
          <div class="stat-value">${wins}-${losses}</div>
          <div class="stat-label">Season Record</div>
        </div>

        ${players.length
          ? html`
              <div class="players-title">Key Players:</div>
              <ul class="players">
                ${players.map(p => html`<li>${p}</li>`)}
              </ul>
            `
          : null}
      </article>
    `;

    return this.href
      ? html`<a class="card-link" href="${this.href}" aria-label="${name}">${content}</a>`
      : content;
  }
}

customElements.define('team-card', TeamCard);
