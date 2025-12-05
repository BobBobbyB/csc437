import { html } from "lit";
import {
  Auth,
  History,
  Switch,
  Store,
  define
} from "@calpoly/mustang";

import type { Model } from "./model";
import type { Msg } from "./messages";
import { init } from "./model";
import update from "./update";

import { TeamsViewElement } from "./views/teams-view";

// ---- routes for <mu-switch> ----
const routes: Switch.Route[] = [
  {
    path: "/teams",
    view: () => html`<teams-view></teams-view>`
  },
  {
    path: "/",
    view: () => html`
      <section class="hero" aria-labelledby="home-title">
        <img src="/assets/basketball.svg" alt="" width="96" height="96" decoding="async" />
        <h1 id="home-title">NBA DOMAIN</h1>
        <p>
          Explore NBA teams in a single-page app powered by Mustang.
        </p>
        <div class="hero-buttons">
          <a href="/teams" class="btn btn-primary">VIEW TEAMS</a>
        </div>
      </section>
    `
  }
];

// ----  mstang providers + view ----
define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,

  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "nba:history", "nba:auth");
    }
  },

  "mu-store": class AppStore
    extends Store.Provider<Model, Msg>
  {
    constructor() {
      super(update, init, "nba:auth");
    }
  },

  // MVU Teams view
  "teams-view": TeamsViewElement
});
