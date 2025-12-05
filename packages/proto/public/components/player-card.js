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
    href: { type: String },

    // internal animated display values
    _ppgDisplay: { state: true },
    _rpgDisplay: { state: true },
    _apgDisplay: { state: true }
  };

  static styles = css`
    :host {
      display: block;
    }

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
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top left,
        hsla(25,95%,53%,0.25),
        transparent 55%);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .card:hover::before {
      opacity: 1;
    }

    .card:hover {
      border-color: var(--primary);
      box-shadow: 0 0 30px hsla(25,95%,53%,0.35);
      transform: translateY(-4px) scale(1.02);
      background: linear-gradient(135deg, var(--court-blue), var(--card-bg));
    }

    .card-header {
      margin-bottom: var(--spacing-sm);
    }

    .card-title {
      font-size: 1.5rem;
      color: var(--foreground);
      margin-bottom: 0.25rem;
      font-family: var(--font-display);
      letter-spacing: 0.04em;
    }

    .card-subtitle {
      color: var(--muted-foreground);
      font-size: 0.9rem;
    }

    .card-accent {
      color: var(--primary);
      margin-bottom: var(--spacing-sm);
      font-weight: 500;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-sm);
      text-align: center;
    }

    .stat-item {
      padding: 0.25rem 0;
    }

    .stat-value {
      font-family: var(--font-display);
      font-size: 1.6rem;
      color: var(--primary);
      display: block;
      transition: transform 0.2s ease;
    }

    .card:hover .stat-value {
      transform: translateY(-2px);
    }

    .stat-label {
      font-size: 0.75rem;
      color: var(--muted-foreground);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
  `;

  constructor() {
    super();
    this.name = '';
    this.number = '';
    this.position = '';
    this.team = '';
    this.ppg = undefined;
    this.rpg = undefined;
    this.apg = undefined;
    this.href = undefined;

    this._ppgDisplay = null;
    this._rpgDisplay = null;
    this._apgDisplay = null;
  }

  firstUpdated() {
    // run count up animation once when the card first appears
    this.animateStat('ppg', '_ppgDisplay');
    this.animateStat('rpg', '_rpgDisplay');
    this.animateStat('apg', '_apgDisplay');
  }

  animateStat(propName, displayPropName) {
    const target = Number(this[propName]);
    if (!Number.isFinite(target)) return;

    const duration = 600; // ms
    const start = performance.now();

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // ease out
      const eased = 1 - Math.pow(1 - t, 3);
      this[displayPropName] = target * eased;
      this.requestUpdate();
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        this[displayPropName] = target;
        this.requestUpdate();
      }
    };

    requestAnimationFrame(step);
  }

  formatStat(displayValue, fallback) {
    if (displayValue == null && fallback == null) return '-';
    const value = displayValue != null ? displayValue : fallback;
    // show 1 decimal place for nicer look
    return Number(value).toFixed(1);
  }

  render() {
    const name   = this.name ?? '';
    const number = this.number ?? '';
    const pos    = this.position ?? '';
    const team   = this.team ?? '';

    const ppg = this.formatStat(this._ppgDisplay, this.ppg);
    const rpg = this.formatStat(this._rpgDisplay, this.rpg);
    const apg = this.formatStat(this._apgDisplay, this.apg);

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

    return this.href
      ? html`<a class="card-link" href="${this.href}" aria-label="${name}">${content}</a>`
      : content;
  }
}

customElements.define('player-card', PlayerCard);
