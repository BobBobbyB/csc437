import { View } from "@calpoly/mustang";
import { html } from "lit";

import type { Model } from "../model";
import type { Msg } from "../messages";

// register the existing Lit team card
import "/components/team-card.js";

export class TeamsViewElement extends View<Model, Msg> {
  constructor() {
    super("nba:model"); // matches <mu-store provides="nba:model">
  }

  connectedCallback() {
    super.connectedCallback();
    // ask store to load teams when this view appears
    this.dispatchMessage(["teams/load", {}]);
  }

  render() {
    const teams = this.model.teams ?? [];

    return html`
        <header>
            <h1>TEAMS</h1>
            <p style="color: var(--muted-foreground); font-size: 1.125rem;">
                Browse NBA teams and their rosters
            </p>
        </header>

        <section class="grid grid-3">
            ${teams.length === 0
            ? html`<p style="color: var(--muted-foreground);">
                        Loading teams...
                    </p>`
            : teams.map(
            (t) => html`
                <team-card
                  .name=${t.name}
                  .conference=${t.conference ?? ""}
                  .wins=${t.wins ?? 0}
                  .losses=${t.losses ?? 0}
                  .players=${t.players ?? []}
                  .href=${t.href ?? ""}
                ></team-card>
              `
            )}
        </section>
    `;
  }
}
