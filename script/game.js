//Game
class Player {
  constructor(
    name,
    type,
    health,
    strength,
    gold,
    weapon,
    shield,
    beer,
    beerMission,
    memoryMission,
    ring,
    ringMission,
  ) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.strength = strength;
    this.gold = gold;
    this.weapon = weapon;
    this.shield = shield;
    this.beer = beer;
    this.beerMission = beerMission;
    this.memoryMission = memoryMission;
    this.ring = false;
    this.ringMission = false;
  }
}

// Gets needed Elements from HTML File
let textElement = document.getElementById("text");
let optionButtonsElement = document.getElementById("option-buttons");
let goldElement = document.getElementById("gold");
let healthElement = document.getElementById("health");
let strengthElement = document.getElementById("strength");
let weaponElement = document.getElementById("weapon");
let shieldElement = document.getElementById("shield");
let classElement = document.getElementById("class");
//Delcare empty state
let state = {};

//Initialize Player with default values
const player = new Player("Player", "-", 100, 10, 0, "-", "-", false, false, false, false, false);



function startGame() {
  //Show the text, options and update the player stats
  showTextNode(2);
  updatePlayerStats();
}

function updatePlayerStats() {
  //Sets the HTML content to the state values
  goldElement.textContent = player.gold;
  healthElement.textContent = player.health;
  strengthElement.textContent = player.strength;
  classElement.textContent = player.type;
  weaponElement.textContent = player.weapon;
  shieldElement.textContent = player.shield;
}

function showTextNode(textNodeIndex) {
  //get the right text node object from the array with the given index
  const textNode = textNodes[textNodeIndex - 1];
  // Set the HTML content to the text of the text node object
  textElement.innerText = textNode.text;
  //Remove all old Buttons::w

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
  // For each option (Choice) in the object, create a new button with the right text and add an event listener to it
  textNode.options.forEach((option) => {
    //Check if the option should be shown and if so, create the button
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
  if (textNodeIndex === 18) {
    const memoryButton = document.createElement("button");
    memoryButton.innerText = "Memory spielen";
    memoryButton.classList.add("btn");
    memoryButton.addEventListener("click", () => {
      player.gold += 60;
      player.memoryMission = true;
      saveGameState(textNode);
      window.location.href = '../Memory/index.html'; // Der Pfad zur neuen Seite
    });
    optionButtonsElement.appendChild(memoryButton);
  }
  console.log(textNodeIndex);
}
function resetPlayer() {
  player.health = 100;
  player.strength = 10;
  player.gold = 0;
  player.weapon = "-";
  player.shield = "-";
  player.beer = false;
  player.beerMission = false;
  player.type = "-";
  player.memoryMission = false;
  player.ring = false;
  player.ringMission = false;
  updatePlayerStats();
}

function showOption(option) {
  // Check if the option should be shown or not
  return option.requiredState == null || option.requiredState(player);
}

function selectOption(option) {
  // Get the next node id and if it is smaller than 0, restart the game
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    resetPlayer();
    return startGame();
  }
  if (option.setState) {
    option.setState(); // Update player stats
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


// Speichern Sie den Spielzustand, bevor Sie zur Memory-Seite umleiten
function saveGameState(textNode) {
  const gameState = {
    textNodeIndex: textNode,
    playerStats: {
      gold: player.gold,
      health: player.health,
      strength: player.strength,
      class: player.type,
      weapon: player.weapon,
      shield: player.shield,
      beer: player.beer,
      beerMission: player.beerMission,
      memoryMission: player.memoryMission,
      ring: player.ring,
      ringMission: player.ringMission,
    }
  };
  
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGameState() {
  const savedGameState = localStorage.getItem('gameState');
  if (savedGameState) {
    const gameState = JSON.parse(savedGameState);
    // Set the text node to the saved index
    textNodeIndex = gameState.textNodeIndex;
    // Set the player stats to the loaded values
    
    player.gold = gameState.playerStats.gold;
    player.health = gameState.playerStats.health;
    player.strength = gameState.playerStats.strength;
    player.type = gameState.playerStats.class;
    player.weapon = gameState.playerStats.weapon;
    player.shield = gameState.playerStats.shield;
    player.beer = gameState.playerStats.beer;
    player.beerMission = gameState.playerStats.beerMission;
    player.memoryMission = gameState.playerStats.memoryMission;
    player.ring = gameState.playerStats.ring;
    player.ringMission = gameState.playerStats.ringMission;
    // Update the display accordingly
    updatePlayerStats();
    console.log(player);
  }
}



// Object array with all the text nodes
const textNodes = [
  // ID 1 wird nicht benützt
  {
    id: 1,
    text: "Willkommen zu unserem Text Adventure Game!",
    options: [
      {
        text: "Spiel starten",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: "Welche Klasse möchtest du spielen?",
    options: [
      {
        text: "Barbare",
        setState: () => {
          player.type = "Barbare";
          player.weapon = "Großaxt";
          //player.strength += 7;
        },
        nextText: 3,
      },
      {
        text: "Krieger",
        setState: () => {
          player.type = "Krieger";
          player.weapon = "Langschwert";
          player.shield = "Holzschild";
          //player.strength += 5;
        },
        nextText: 3,
      },
      {
        text: "Magier",
        setState: () => {
          player.type = "Magier";
          player.weapon = "Zauberstab";
          player.shield = "Zauberbuch";
          //player.strength += 2;
        },
        nextText: 3,
      },
      {
        text: "Dieb",
        setState: () => {
          player.type = "Dieb";
          player.weapon = "Dolch";
          player.shield = "Kleiner Schild";
          //player.strength += 3;
        },
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: "Du erwachst in einem unbekannten Keller und hast keine Ahnung wo du bist. Du hast Durst. Hast du schonwieder getrunken?",
    options: [
      {
        text: "Sieh dich im Keller nach etwas nützlichen um",
        setState: () => {
          player.gold += 5;
        },
        nextText: 4,
      },
      {
        text: "Trink von einem unbekannten blauen Trank",
        setState: () => {
          player.health = 0;
        },
        nextText: 5,
      },
    ],
  },
  {
    id: 4,
    text: "Nachdem du den Keller durchsucht hast, findest du 5 Goldmünzen. Du siehst eine Tür und hörst Stimmen dahinter. Was willst du tun?",
    options: [
      {
        text: "Stürme lautstart den Raum und fordere die Stimmen heraus",
        setState: () => {
          player.health = 0;
        },
        nextText: 6,
      },
      {
        text: "Warte bis die Stimmen verschwinden und öffne die Tür leise",
        nextText: 7,
      },
    ],
  },
  {
    id: 5,
    text: "Das war offensichtlich kein Wasser. Du stirbst.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text: "Es waren diejenigen, die dich gefangen haben. Sie töten dich.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 7,
    text: "Du kannst dich langsam erinnern, du warst in einer Kneipe und hast dich mit einem alten Mann unterhalten. Er hat dir von einem Schatz in einem Schloss erzählt. Du hast nach dem Kneipen besuch offenbar noch dein Glück versucht und wurdest gefangen genommen. Du bist in einem Schloss.",
    options: [
      {
        text: "Weiter...",
        nextText: 9,
      },
    ],
  },
  {
    id: 8,
    nextText: 9,
  },
  {
    id: 9,
    text: "Du musst erstmal aus dem Schloss entkommen. Du siehst einen Wächter vor dir. Er ist riesig und hat eine Axt. Was willst du tun?",
    options: [
      {
        text: "ABHAUEN",
        setState: () => {
          player.health = 50;
        },
        nextText: 12,
      },
      {
        text: "Einen lächerlichen Faustkampf beginnen",
        setState: () => {
          player.health = 0;
        },
        nextText: 10,
      },
      {
        text: "Ihn bitten dich durchzulassen und ihm 5 Goldmünzen anbieten",
        requiredState: (player) => player.gold >= 5,
        setState: () => {
          player.gold -= 5;
          player.health = 0;
        },
        nextText: 11,
      },
    ],
  },
  {
    id: 10,
    text: "Merkst du selber, oder? Du stirbst.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text: "Der Wächter nimmt das Gold und tötet dich trotzdem. Du bist tot.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 12,
    text: "Du entkommst dem Wächter nur knapp, aber er hat dich verletzt. Du läufst erstmals richtung Stadt.",
    options: [
      {
        text: "Weiter...",
        nextText: 13,
      },
    ],
  },
  {
    id: 13,
    text: "Du siehst ein paar Händler und andere Gestalten. Um im Schloß Rache zu nehmen, brauchst du 100 Gesundheit und 25 Stärke.",
    options: [
      {
        text: "Zum Schmied gehen",
        nextText: 14,
      },
      {
        text: "Zum mysteriösen Mann in der Ecke gehen, der dir zuwinkt",
        nextText: 15,
      },
      {
        text: "Zum Wirt gehen",
        nextText: 16,
      },
      {
        text: "Wieder zurück zum Schloss (benötigt 100 Gesundheit und 25 Stärke)",
        requiredState: (player) =>
        player.health >= 100 && player.strength >= 25 && player.shield == "Eisenschild" && player.weapon == "Fortgeschrittenenschwert", 
        nextText: 17,
      },
      {
        text: "Ab in den Wald",
        requiredState: (player) => 
        player.strength >= 15 && player.ringMission == false && player.ring == false, 
        nextText: 19,
      }
    ],
  },
  {
    id: 14,
    text: "Der Schmied bietet dir ein Anfängerschwert (30 Gold, +5 Stärke), ein Fortgeschrittenenschwert (100 Gold, +10 Stärke) und einen Eisenschild (50 Gold, +10 Gesundheit) an.",
    options: [
      {
        text: "Kein Geld? Verlasse den Schmied",
        nextText: 13,
      },
      {
        text: "Ein Anfängerschwert kaufen (30 Gold)",
        requiredState: (player) => player.gold >= 30 && player.weapon != "Anfängerschwert" && player.weapon != "Fortgeschrittenenschwert",
        setState: () => {
          player.gold -= 30;
          player.weapon = "Anfängerschwert";
          player.strength += 5;
        },
        nextText: 13,
      },
      {
        text: "Ein Fortgeschrittenenschwert kaufen (100 Gold)",
        requiredState: (player) => player.gold >= 100,
        setState: () => {
          player.gold -= 100;
          player.weapon = "Fortgeschrittenenschwert";
          player.strength += 10;
        },
        nextText: 13,
      },
      {
        text: "Einen Eisenschild kaufen (50 Gold)",
        requiredState: (player) => player.gold >= 50 && player.shield != "Eisenschild",
        setState: () => {
          player.gold -= 50;
          player.shield = "Eisenschild";
          
        },
        nextText: 13,
      },
    ],
  },
  {
    id: 15,
    text: "Der Mann bietet dir für jede Mission 50 Gold an.\n1. Er sagt: Ich brauche ein Bier, aber ich kann nicht selbst gehen. Kannst du mir eins holen?\n 2. Außerdem: Ich habe im Wald meinen Ring verloren. Kannst du ihn mir holen? (Zugang zum Wald benötigt 15 Stärke)",
    options: [
      {
        text: "Zurückgehen",
        nextText: 13,
      },
      {
        text: "Bier geben",
        requiredState: (player) => player.beer == true,
        setState: () => {
          player.gold += 50;
          player.beer = false;
          player.beerMission = true;
        },
        nextText: 13,
      },
      {
        text: "Ring geben",
        requiredState: (player) => player.ring == true,
        setState: () => {
          player.gold += 50;
          player.ring = false;
          player.ringMission = true;
        },
        nextText: 13,
      },
    ],
  },
  {
    id: 16,
    text: "Der Wirt sieht sieht freundlich aus und ein Mann sitzt an einem runden Tisch. Du siehst auch eine Tafel mit Preisen. Ein Bier kostet 5 Gold, Essen kostet 5 Gold und gibt dir 10 Gesundheit.",
    options: [
      {
        text: "Verlasse die Kneipe",
        nextText: 13,
      },
      {
        text: "Ein Bier für den Mysteriösen Mann draußen kaufen (5 Gold)",
        requiredState: (player) =>
          player.gold >= 5 &&
          player.beer == false &&
          player.beerMission == false,
        setState: () => {
          player.gold -= 5;
          player.beer = true;
        },
        nextText: 16,
      },
      {
        text: "Etwas essen (5 Gold, + 10 Gesundheit)",
        requiredState: (player) =>
          player.gold >= 5 && player.health <= 90 && player.beerMission == true,
        setState: () => {
          player.gold -= 5;
          player.health += 10;
        },
        nextText: 16,
      },
      {
        text: "Zu dem Mann am runden Tisch gehen",
        requiredState: (player) => player.memoryMission == false,
        nextText: 18,
      },
    ],
  },
  {
    id: 17,
    text: "Zeit für die Rache!",
    nextText: 13,
  },
  {
    id: 18,
    text: "Der Mann bietet dir 60 Gold für eine erfolgreiche Runde Memory an",
    options: [
      {
        text: "Verlasse die Kneipe",
        nextText: 13,
      },
    ],
  },
  {
    id: 19,
    text: "Du gehst in den Wald und siehst eine Höhle. Du hörst ein Geräusch. In der Höhle befindet sich ein kleiner Kobold, der auf dich zukommt.",
    options: [
      {
        text: "In die Höhle gehen und kämpfen!",
        setState: () => {
          player.health -= 10;
        },
        nextText: 20,
      },
      {
        text: "Zurück in die Stadt fliehen!",
        nextText: 13,
      },
    ],
  },
  {
    id: 20,
    text: "Du schlägst den Kobold in die Fluch und er verletzt dich leicht. Du siehst eine Truhe in der Höhle.",
    
    options: [
      {
        text: "Truhe öffnen",
        setState: () => {
          player.gold += 50;
          player.ring = true;
        },
        nextText: 21,
      }
    ],
  },
  {
    id: 21,
    text: "Du findest den verlorene Ring des mysteriösen Mannes. Außerdem findest du 50 Goldmünzen in der Truhe.",
    options: [
      {
        text: "Zurück in die Stadt",
        nextText: 13,
      }
    ],
  },
];


if (window.location.search.includes('fromMemoryGame=true')) {
  loadGameState();
  showTextNode(13);
  updatePlayerStats();
  
} else {
  startGame();
}