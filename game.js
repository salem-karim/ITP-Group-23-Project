class Player {
  constructor(name, health, strength, gold) {
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.gold = gold;
    this.sword = false;
    this.shield = false;
  }
}

// Gets needed Elements from HTML File
const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");
const goldElement = document.getElementById("gold");
const healthElement = document.getElementById("health");
const strengthElement = document.getElementById("strength");
//Delcare empty state
let state = {};
//Initialize Player with default values
const player = new Player("Player", 100, 10, 0);

function resetPlayer() {
  player.health = 100;
  player.strength = 10;
  player.gold = 0;
  player.sword = false;
  player.shield = false;
}

function startGame() {
  resetPlayer();
  //Show the text, options and update the player stats
  showTextNode(1);
  updatePlayerStats();
}

function updatePlayerStats() {
  //Sets the HTML content to the state values
  goldElement.textContent = player.gold;
  healthElement.textContent = player.health;
  strengthElement.textContent = player.strength;
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
}

function showOption(option) {
  // Check if the option should be shown or not
  return option.requiredState == null || option.requiredState(player);
}

function selectOption(option) {
  // Get the next node id and if it is smaller than 0, restart the game
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  if (option.setState) {
    option.setState(); // Update player stats
  }
  // Set the state to the new state and show the next text node and update the player stats
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
  updatePlayerStats();
}
// Object array with all the text nodes
const textNodes = [
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
    text: "Du erwachst in einem unbekannten Keller und hast keine Ahnung wo du bist. Du hast Durst. Hast du schonwieder getrunken?",
    options: [
      {
        text: "Sieh dich im Keller nach etwas nützlichen um",
        setState: () => {
          player.gold += 5;
        },
        nextText: 3,
      },
      {
        text: "Trink von einem unbekannten blauen Trank",
        setState: () => {
          player.health = 0;
        },
        nextText: 4,
      },
      {
        text: "Erstmal umsehen und nach einer Tür suchen",
        nextText: 7,
      },
    ],
  },
  {
    id: 3,
    text: "Nachdem du den Keller durchsucht hast, findest du 5 Goldmünzen. Du siehst eine Tür und hörst Stimmen dahinter. Was willst du tun?",
    options: [
      {
        text: "Stürme lautstart den Raum und fordere die Stimmen heraus",
        setState: () => {
          player.health = 0;
        },
        nextText: 5,
      },
      {
        text: "Warte bis die Stimmen verschwinden und öffne die Tür leise",
        nextText: 6,
      },
    ],
  },
  {
    id: 4,
    text: "Das war offensichtlich kein Wasser. Du stirbst.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text: "Es waren diejenigen, die dich gefangen haben. Sie töten dich.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text: "Du kannst dich langsam erinnern, du warst in einer Kneipe und hast dich mit einem alten Mann unterhalten. Er hat dir von einem Schatz in einem Schloss erzählt. Du hast nach dem Kneipen besuch offenbar noch dein Glück versucht und wurdest gefangen genommen. Du bist in einem Schloss.",
    options: [
      {
        text: "Weiter...",
        nextText: 8,
      },
    ],
  },
  {
    id: 7,
    text: "Du siehst eine Tür und hörst Stimmen dahinter. Was willst du tun?",
    options: [
      {
        text: "Stürme lautstart den Raum und fordere die Stimmen heraus",
        setState: () => {
          player.health = 0;
        },
        nextText: 5,
      },
      {
        text: "Warte bis die Stimmen verschwinden und öffne die Tür leise",
        nextText: 6,
      },
    ],
  },
  {
    id: 8,
    text: "Du musst erstmal aus dem Schloss entkommen. Du siehst einen Wächter vor dir. Er ist riesig und hat eine Axt. Was willst du tun?",
    options: [
      {
        text: "ABHAUEN",
        setState: () => {
          player.health = 50;
        },
        nextText: 11,
      },
      {
        text: "Einen lächerlichen Faustkampf beginnen",
        setState: () => {
          player.health = 0;
        },
        nextText: 9,
      },
      {
        text: "Ihn bitten dich durchzulassen und ihm 5 Goldmünzen anbieten",
        requiredState: (player) => player.gold >= 5,
        setState: () => {
          player.gold -= 5;
          player.health = 0;
        },
        nextText: 10,
      },
    ],
  },
  {
    id: 9,
    text: "Merkst du selber, oder? Du stirbst.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    text: "Der Wächter nimmt das Gold und tötet dich trotzdem. Du bist tot.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text: "Du entkommst dem Wächter nur knapp, aber er hat dich verletzt. Du läufst erstmals richtung Stadt.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 12,
    text: "blabla",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
];

startGame();
