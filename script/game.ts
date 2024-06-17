import {
  Player,
  stats,
  inventory,
  missions,
} from "../script/imports/player.js";
import { textNodes } from "../script/imports/story.js";
import { textNodes2 } from "../script/imports/story2.js";

let name: string = "Player"; // This should prompt the player to enter a name

let stats: stats = {
  health: 100,
  strength: 10,
  gold: 0,
};

let inventory: inventory = {
  beer: false,
  ring: false,
  sword: false,
};

let missions: missions = {
  beerMission: false,
  memoryMission: false,
  ringMission: false,
  swordMission: false,
  tuchMission: false,
};

let equipment: string[] = ["-", "-"];

let player: Player = new Player(name, stats, equipment, inventory, missions);

let textElement = document.getElementById("text")!;
let optionButtonsElement = document.getElementById("option-buttons")!;
let goldElement = document.getElementById("gold")!;
let healthElement = document.getElementById("health")!;
let strengthElement = document.getElementById("strength")!;
let weaponElement = document.getElementById("weapon")!;
let shieldElement = document.getElementById("shield")!;

// Declare empty state
let state = {};
let NodeIndex = 1;
var whichStory: number;
var story: any;

function setStory() {
  // Load the object array for the selected story
  if (whichStory === 1) {
    story = textNodes;
  } else if (whichStory === 2) {
    story = textNodes2;
  }
}

function startGame(Index: number) {
  // Determine which story to load based on URL parameters
  if (window.location.search.includes("story=Story1")) {
    whichStory = 1;
  } else if (window.location.search.includes("story=Story2")) {
    whichStory = 2;
  }
  // Load the correct story
  setStory();
  // Show the text, options, and update the player stats
  showTextNode(Index);
  updatePlayerStats();
}

function updatePlayerStats() {
  // Set the HTML content to the state values
  goldElement.textContent = player.stats.gold.toString();
  healthElement.textContent = player.stats.health.toString();
  strengthElement.textContent = player.stats.strength.toString();
  weaponElement.textContent = player.equipment[0];
  shieldElement.textContent = player.equipment[1];
}

function resetPlayer() {
  player.stats.health = 100;
  player.stats.strength = 10;
  player.stats.gold = 0;
  player.equipment[0] = "-";
  player.equipment[1] = "-";
  player.missions.beerMission = false;
  player.missions.memoryMission = false;
  player.missions.ringMission = false;
  player.missions.swordMission = false;
  player.missions.tuchMission = false;
  player.inventory.beer = false;
  player.inventory.ring = false;
  player.inventory.sword = false;
  updatePlayerStats();
}

function showTextNode(textNodeIndex: number) {
  // Get the right text node object from the array with the given index
  const textNode = story[textNodeIndex - 1];
  // Set the HTML content to the text of the text node object
  textElement.innerText = textNode.text!;
  // Remove all old buttons
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
  // For each option (Choice) in the object, create a new button with the right text and add an event listener to it
  textNode.options.forEach((option: any) => {
    // Check if the option should be shown and if so, create the button
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });

  // Special cases for buttons to navigate to minigames
  addSpecialButtons(textNodeIndex); // Changed: Added function call to add special buttons for minigames
}

function addSpecialButtons(textNodeIndex: number) {
  if (textNodeIndex === 15) {
    const memoryButton = document.createElement("button");
    memoryButton.innerText = "Memory spielen";
    memoryButton.classList.add("btn");
    memoryButton.addEventListener("click", () => {
      player.missions.memoryMission = true;
      if (whichStory === 1) {
        player.stats.gold += 60;
        saveGameState(textNodeIndex);
        window.location.href = "../sites/memory.html";
      } else if (whichStory === 2) {
        saveGameState(textNodeIndex);
        window.location.href = "../sites/memory2.html";
      }
    });
    optionButtonsElement.appendChild(memoryButton);
  }

  if (textNodeIndex === 33) {
    const doorButton = document.createElement("button");
    doorButton.innerText = "Die Tür aufbrechen";
    doorButton.classList.add("btn");
    doorButton.addEventListener("click", () => {
      saveGameState(textNodeIndex);
      window.location.href = "../sites/door.html";
    });
    optionButtonsElement.appendChild(doorButton);
  }

  if (textNodeIndex === 32) {
    const doorButton = document.createElement("button");
    doorButton.innerText = "Spiel beginnen";
    doorButton.classList.add("btn");
    doorButton.addEventListener("click", () => {
      saveGameState(textNodeIndex);
      window.location.href = "../sites/SchereSteinPapier.html";
    });
    optionButtonsElement.appendChild(doorButton);
  }

  if (textNodeIndex === 34) {
    const doorButton = document.createElement("button");
    doorButton.innerText = "Zurück ins Hauptmenü";
    doorButton.classList.add("btn");
    doorButton.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
    optionButtonsElement.appendChild(doorButton);
  }

  if (whichStory === 1) {
    if (textNodeIndex === 29) {
      const doorButton = document.createElement("button");
      doorButton.innerText = "Die Tür aufbrechen";
      doorButton.classList.add("btn");
      doorButton.addEventListener("click", () => {
        saveGameState(textNodeIndex);
        window.location.href = "../sites/door2.html";
      });
      optionButtonsElement.appendChild(doorButton);
    }

    if (textNodeIndex === 30) {
      const searchGameButton = document.createElement("button");
      searchGameButton.innerText = "Das Feld genauer untersuchen";
      searchGameButton.classList.add("btn");
      searchGameButton.addEventListener("click", () => {
        player.inventory.sword = true;
        saveGameState(textNodeIndex);
        window.location.href = "../sites/suchbild.html";
      });
      optionButtonsElement.appendChild(searchGameButton);
    }
  } else if (whichStory === 2) {
    if (textNodeIndex === 31) {
      const doorButton = document.createElement("button");
      doorButton.innerText = "Zurück ins Hauptmenü";
      doorButton.classList.add("btn");
      doorButton.addEventListener("click", () => {
        window.location.href = "../index.html";
      });
      optionButtonsElement.appendChild(doorButton);
    }
    if (textNodeIndex === 1 || textNodeIndex === 16 || textNodeIndex === 24) {
      const messageButton = document.createElement("button");
      messageButton.innerText = "Notiz lesen";
      messageButton.classList.add("btn");
      messageButton.addEventListener("click", () => {
        let message =
          "Vergiss nicht mein … *zerrissener Teil* Go… und denk immer daran vorsichtig zu sein";
        let bootstrapAlert = document.getElementById("alert_placeholder")!;
        if (textNodeIndex === 24) {
          message =
            "Vergiss nicht mein Freund, dass ich stark wie ein Grizzlybär bin. Du brauchst also keine Angst haben, dass mir während meiner Mission etwas zustößt. Aber für den Fall der Fälle, dass ich nicht zurückkehre, denk bitte daran: Bringe 45 Goldstücke an meinen Vermieter. Er ist hinter mir her, da ich den Zins nicht überwiesen habe und vermutlich der Grund, warum ich entführt wurde. Und denk immer daran vorsichtig zu sein. LG, dein bester Freund Siegbert.";
        }
        bootstrapAlert.innerHTML =
          '<div class="alert alert-light"><span>' + message + "</span></div>";
      });
      optionButtonsElement.appendChild(messageButton);
    }
  }
}

function showOption(option: any) {
  // Check if the option should be shown or not
  return option.requiredState == null || option.requiredState(player);
}

function selectOption(option: any) {
  // Get the next node id and if it is smaller than 0, restart the game
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    resetPlayer();
    return startGame(1);
  }
  if (option.setState) {
    option.setState(player); // Update player stats
  }
  // Set the state to the new state and show the next text node and update the player stats
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
  updatePlayerStats();
  debugLogs();
}

function debugLogs() {
  console.log("Player: ", player);
  console.log("State: ", state);
}

// Changed: Function to save the game state to localStorage
function saveGameState(textNodeIndex: number) {
  const gameState = {
    textNodeIndex: textNodeIndex,
    whichStory: whichStory,
    playerStats: {
      gold: player.stats.gold,
      health: player.stats.health,
      strength: player.stats.strength,
      weapon: player.equipment[0],
      shield: player.equipment[1],
      beer: player.inventory.beer,
      beerMission: player.missions.beerMission,
      ring: player.inventory.ring,
      ringMission: player.missions.ringMission,
      sword: player.inventory.sword,
      swordMission: player.missions.swordMission,
      memoryMission: player.missions.memoryMission,
      tuchMission: player.missions.tuchMission,
    },
  };

  localStorage.setItem("gameState", JSON.stringify(gameState));
}

// Changed: Function to load the game state from localStorage
function loadGameState() {
  const savedGameState = localStorage.getItem("gameState");
  if (savedGameState) {
    let gameState = JSON.parse(savedGameState);
    // Set the text node to the saved index
    NodeIndex = gameState.textNodeIndex;
    whichStory = gameState.whichStory;
    // Set the player stats to the loaded values
    player.stats.gold = gameState.playerStats.gold;
    player.stats.health = gameState.playerStats.health;
    player.stats.strength = gameState.playerStats.strength;
    player.equipment[0] = gameState.playerStats.weapon;
    player.equipment[1] = gameState.playerStats.shield;
    player.inventory.beer = gameState.playerStats.beer;
    player.missions.beerMission = gameState.playerStats.beerMission;
    player.missions.memoryMission = gameState.playerStats.memoryMission;
    player.inventory.ring = gameState.playerStats.ring;
    player.missions.ringMission = gameState.playerStats.ringMission;
    player.inventory.sword = gameState.playerStats.sword;
    player.missions.swordMission = gameState.playerStats.swordMission;
    player.missions.tuchMission = gameState.playerStats.tuchMission;
    // Update the display accordingly
    updatePlayerStats();
    console.log(player);
  }
  setStory();
}

// Changed: Handling returning from minigames with updated states
if (window.location.search.includes("fromMemoryGame=true")) {
  loadGameState();
  showTextNode(10);
  updatePlayerStats();
} else if (window.location.search.includes("fromSearchGame=true")) {
  loadGameState();
  showTextNode(10);
  updatePlayerStats();
} else if (window.location.search.includes("fromDoorGame=true")) {
  loadGameState();
  showTextNode(5);
  updatePlayerStats();
} else if (window.location.search.includes("fromDoorGame2=true")) {
  loadGameState();
  showTextNode(31);
  updatePlayerStats();
} else if (window.location.search.includes("fromSSP=true")) {
  loadGameState();
  showTextNode(34);
  updatePlayerStats();
} else {
  startGame(NodeIndex);
}
