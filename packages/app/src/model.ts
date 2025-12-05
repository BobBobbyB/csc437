export interface Team {
    id: string;
    name: string;
    conference?: string;
    wins?: number;
    losses?: number;
    players?: string[];
    href?: string;
  }
  
  export interface Model {
    teams?: Team[];
  }
  
  export const init: Model = {};
  