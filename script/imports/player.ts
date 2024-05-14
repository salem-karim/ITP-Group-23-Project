interface inventory {
  [key: string]: boolean;
}
interface missions {
  [key: string]: boolean;
}
interface stats {
  [key: string]: number;
}

class Player {
  name: string;
  type: string;
  stats: stats;
  equipment: string[];
  inventory: inventory;
  missions: missions;

  constructor(
    name: string,
    type: string,
    stats: stats,
    equipment: string[],
    inventory: inventory,
    missions: missions,
  ) {
    this.name = name;
    this.type = type;
    this.stats = stats;
    this.equipment = equipment;
    this.inventory = inventory;
    this.missions = missions;
  }
}

export { Player, inventory, missions, stats };
