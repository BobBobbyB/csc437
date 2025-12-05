// public/components/player-compare.js
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

class PlayerCompare extends LitElement {
  static properties = {
    players: { type: Array },
    leftId: { type: String },
    rightId: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      margin-bottom: var(--spacing-xl);
    }

    .compare-card {
      background: linear-gradient(135deg, var(--court-blue), var(--card-bg));
      border-radius: var(--radius);
      border: 1px solid var(--border);
      padding: var(--spacing-md);
      box-shadow: 0 0 20px hsla(25,95%,53%,0.18);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .compare-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 35px hsla(25,95%,53%,0.35);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-md);
      gap: var(--spacing-md);
      flex-wrap: wrap;
    }

    .title {
      font-family: var(--font-display);
      letter-spacing: 0.08em;
      font-size: 1.25rem;
      color: var(--primary);
    }

    .selectors {
      display: flex;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
    }

    label {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: var(--muted-foreground);
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    select {
      background: var(--card-bg);
      color: var(--foreground);
      border-radius: var(--radius);
      padding: 0.4rem 0.6rem;
      border: 1px solid var(--border);
      font-size: 0.875rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr 1.2fr;
      gap: var(--spacing-sm);
      align-items: stretch;
    }

    .player-col {
      background: rgba(0, 0, 0, 0.15);
      border-radius: var(--radius);
      padding: var(--spacing-sm);
    }

    .player-name {
      font-family: var(--font-display);
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
    }

    .player-team {
      font-size: 0.75rem;
      color: var(--muted-foreground);
      margin-bottom: 0.5rem;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      padding: 0.15rem 0;
    }

    .stat-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: var(--muted-foreground);
    }

    .stat-value {
      font-family: var(--font-display);
    }

    .center-col {
      text-align: center;
      font-size: 0.75rem;
      color: var(--muted-foreground);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
    }

    .pill {
      display: inline-block;
      padding: 0.15rem 0.55rem;
      border-radius: 999px;
      font-size: 0.7rem;
      text-transform: uppercase;
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.35);
    }

    .better {
      color: var(--primary);
    }
    .worse {
      opacity: 0.65;
    }
    .equal {
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      .center-col {
        order: -1;
        flex-direction: row;
        justify-content: center;
      }
    }
  `;

  constructor() {
    super();
    /** @type {Array<any>} */
    this.players = [];
    this.leftId = '';
    this.rightId = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadPlayers();
  }

  async loadPlayers() {
    try {
      const res = await fetch('./data/players.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.players = await res.json();
      if (this.players.length >= 2) {
        this.leftId = this.players[0].id;
        this.rightId = this.players[1].id;
      }
    } catch (err) {
      console.error('Failed to load players for comparison:', err);
    }
  }

  getPlayer(id) {
    return this.players.find(p => p.id === id);
  }

  handleLeftChange(e) {
    this.leftId = e.target.value;
  }

  handleRightChange(e) {
    this.rightId = e.target.value;
  }

  compareStat(leftVal, rightVal) {
    if (leftVal == null || rightVal == null) return { left: 'equal', right: 'equal' };
    if (leftVal > rightVal) return { left: 'better', right: 'worse' };
    if (rightVal > leftVal) return { left: 'worse', right: 'better' };
    return { left: 'equal', right: 'equal' };
  }

  render() {
    if (!this.players.length) {
      return html`
        <div class="compare-card">
          <div class="header">
            <div class="title">PLAYER COMPARISON</div>
          </div>
          <p style="color: var(--muted-foreground); font-size: 0.9rem;">
            Loading players...
          </p>
        </div>
      `;
    }

    const left = this.getPlayer(this.leftId) ?? this.players[0];
    const right = this.getPlayer(this.rightId) ?? this.players[1];

    const statsLeft = left?.stats ?? {};
    const statsRight = right?.stats ?? {};

    const ppgCmp = this.compareStat(statsLeft.ppg, statsRight.ppg);
    const rpgCmp = this.compareStat(statsLeft.rpg, statsRight.rpg);
    const apgCmp = this.compareStat(statsLeft.apg, statsRight.apg);

    return html`
      <div class="compare-card">
        <div class="header">
          <div>
            <div class="title">PLAYER COMPARISON</div>
            <p style="font-size: 0.85rem; color: var(--muted-foreground);">
              Choose two players to compare their key season stats.
            </p>
          </div>
          <div class="selectors">
            <label>
              Player A
              <select @change=${this.handleLeftChange}>
                ${this.players.map(
                  p => html`<option value=${p.id} ?selected=${p.id === left.id}>${p.name}</option>`
                )}
              </select>
            </label>
            <label>
              Player B
              <select @change=${this.handleRightChange}>
                ${this.players.map(
                  p => html`<option value=${p.id} ?selected=${p.id === right.id}>${p.name}</option>`
                )}
              </select>
            </label>
          </div>
        </div>

        <div class="stats-grid">
          <!-- Left player -->
          <div class="player-col">
            <div class="player-name">${left.name}</div>
            <div class="player-team">${left.team}</div>

            <div class="stat-row ${ppgCmp.left}">
              <span class="stat-label">PPG</span>
              <span class="stat-value">${statsLeft.ppg}</span>
            </div>
            <div class="stat-row ${rpgCmp.left}">
              <span class="stat-label">RPG</span>
              <span class="stat-value">${statsLeft.rpg}</span>
            </div>
            <div class="stat-row ${apgCmp.left}">
              <span class="stat-label">APG</span>
              <span class="stat-value">${statsLeft.apg}</span>
            </div>
          </div>

          <!-- Center labels -->
          <div class="center-col">
            <span class="pill">Higher stat is highlighted</span>
            <span style="font-size: 0.7rem;">PPG · RPG · APG</span>
          </div>

          <!-- Right player -->
          <div class="player-col">
            <div class="player-name" style="text-align:right;">${right.name}</div>
            <div class="player-team" style="text-align:right;">${right.team}</div>

            <div class="stat-row ${ppgCmp.right}">
              <span class="stat-value">${statsRight.ppg}</span>
              <span class="stat-label">PPG</span>
            </div>
            <div class="stat-row ${rpgCmp.right}">
              <span class="stat-value">${statsRight.rpg}</span>
              <span class="stat-label">RPG</span>
            </div>
            <div class="stat-row ${apgCmp.right}">
              <span class="stat-value">${statsRight.apg}</span>
              <span class="stat-label">APG</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('player-compare', PlayerCompare);
