import type { Model, Team } from "./model";
import type { Msg } from "./messages";
import type { ThenUpdate, Auth } from "@calpoly/mustang";

export default function update(
  message: Msg,
  model: Model,
  _user: Auth.User
): Model | ThenUpdate<Model, Msg> {
        const [type, payload] = message;

switch (type) {
    case "teams/load": {
      // already loaded? don't refetch
      if (model.teams) return model;

    return [
        model,
        fetch("/data/teams.json")
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          })
          .then((teams: Team[]) => ["teams/loaded", { teams }])
        ];
    }

    case "teams/loaded": {
      const { teams } = payload as { teams: Team[] };

    return {
        ...model,
        teams
    };
}

    default:
        return model;
    }
}
