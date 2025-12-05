import type { Team } from "./model";

// mustang message is [type, payload]
export type Msg =
  | ["teams/load", {}]                       // “please load teams”
  | ["teams/loaded", { teams: Team[] }];    // “here are the teams we loaded”
