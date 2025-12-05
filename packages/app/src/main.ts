import { mount, route } from "mustang";

// Register Lit components (just importing defines custom elements)
import "/components/game-card.js";
import "/components/nba-games.js";

import "/components/player-card.js";
import "/components/nba-players.js";
import "/components/player-compare.js";

import "/components/team-card.js";
import "/components/nba-teams.js";

// --- Mount the SPA shell ---
mount("#app", () => `
  <h1>NBA Domain SPA</h1>

  <nav>
    <a href="#/players">Players</a>
    <a href="#/teams">Teams</a>
    <a href="#/games">Games</a>
  </nav>

  <div id="view"></div>
`);

// --- Route Definitions ---
route("#/players", () => {
  document.querySelector("#view")!.innerHTML = `
    <nba-players src="/data/players.json"></nba-players>
  `;
});

route("#/teams", () => {
  document.querySelector("#view")!.innerHTML = `
    <nba-teams src="/data/teams.json"></nba-teams>
  `;
});

route("#/games", () => {
  document.querySelector("#view")!.innerHTML = `
    <nba-games src="/data/games.json"></nba-games>
  `;
});

// Default Route
route("", () => {
  document.querySelector("#view")!.innerHTML = `
    <p>Select a section from the menu.</p>
  `;
});

