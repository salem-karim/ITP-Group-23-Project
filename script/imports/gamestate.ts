export interface GameState {
  textNodeIndex: number;
  playerStats: {
    gold: number;
    health: number;
    strength: number;
    weapon: string;
    shield: string;
    beer: boolean;
    beerMission: boolean;
    memoryMission: boolean;
    ring: boolean;
    ringMission: boolean;
    sword: boolean;
    swordMission: boolean;
  };
}
