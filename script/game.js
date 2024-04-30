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
    sword,
    swordMission
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
    this.ring = ring;
    this.ringMission = ringMission;
    this.sword = sword;
    this.swordMission = swordMission;
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
const player = new Player("Player", "-", 100, 10, 0, "-", "-", false, false, false, false, false, false, false);



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
      window.location.href = '../sites/memory.html'; // Der Pfad zur neuen Seite
    });
    optionButtonsElement.appendChild(memoryButton);
  }
  if (textNodeIndex === 34) { 
    const searchGameButton = document.createElement("button");
    searchGameButton.innerText = "Das Feld genauer untersuchen";
    searchGameButton.classList.add("btn");
    searchGameButton.addEventListener("click", () => {
      player.sword = true;
      saveGameState(textNode);
      window.location.href = '../sites/suchbild.html';
    });
    optionButtonsElement.appendChild(searchGameButton);
  }

  if (textNodeIndex === 37) {
    const doorButton = document.createElement("button");
    doorButton.innerText = "Die Tür aufbrechen";
    doorButton.classList.add("btn");
    doorButton.addEventListener("click", () => {
      saveGameState(textNode);
      window.location.href = '../sites/door.html';
    });
    optionButtonsElement.appendChild(doorButton);
  }
  if (textNodeIndex === 33) {
    const doorButton = document.createElement("button");
    doorButton.innerText = "Die Tür aufbrechen";
    doorButton.classList.add("btn");
    doorButton.addEventListener("click", () => {
      saveGameState(textNode);
      window.location.href = '../sites/door2.html';
    });
    optionButtonsElement.appendChild(doorButton);
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
  player.sword = false;
  player.swordMission = false;
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
      sword: player.sword,
      swordMission: player.swordMission
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
    player.sword = gameState.playerStats.sword;
    player.swordMission = gameState.playerStats.swordMission;
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
    text: "Nachdem du den Keller durchsucht hast, findest du 5 Goldmünzen und einen Hammer. Du siehst eine Tür und hörst Stimmen dahinter. Was willst du tun?",
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
        nextText: 37,
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
    text: "Nachdem du die Tür aufgebrochen hast kannst du dich langsam erinnern, du warst in einer Kneipe und hast dich mit einem alten Mann unterhalten. Er hat dir von einem Schatz in einem Schloss erzählt. Du hast nach dem Kneipen besuch offenbar noch dein Glück versucht und wurdest gefangen genommen. Du bist in einem Schloss.",
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
    text: "Der Wächter nimmt dir das Gold ab tötet dich. Du bist tot.",
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
        requiredState: (player) => player.beerMission == false || player.ringMission == false || player.swordMission == false,
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
        player.strength >= 15 && (player.ring == false || player.sword == false), 
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
          player.strength = 15;
        },
        nextText: 13,
      },
      {
        text: "Ein Fortgeschrittenenschwert kaufen (100 Gold)",
        requiredState: (player) => player.gold >= 100,
        setState: () => {
          player.gold -= 100;
          player.weapon = "Fortgeschrittenenschwert";
          player.strength = 25;
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
    text: "Der Mann bietet dir für jede Mission 50 Gold an.\n1. Er sagt: Ich brauche ein Bier, aber ich kann nicht selbst gehen. Kannst du mir eins holen?\n 2. Außerdem: Ich habe im Wald meinen Ring verloren. Kannst du ihn mir holen? (Zugang zum Wald benötigt 15 Stärke)\n3. Zu guter Letzt: Ich habe mein Schwert im nach dem Wald In einem Feld verloren. Kannst du es mir holen?", 
    options: [
      {
        text: "Zurückgehen",
        nextText: 13,
      },
      {
        text: "Bier geben",
        requiredState: (player) => player.beer == true && player.beerMission == false,
        setState: () => {
          player.gold += 50;
          player.beerMission = true;
        },
        nextText: 13,
      },
      {
        text: "Ring geben",
        requiredState: (player) => player.ring == true && player.ringMission == false,
        setState: () => {
          player.gold += 50;
          player.ringMission = true;
        },
        nextText: 13,
      },
      {
        text: "Schwert geben",
        requiredState: (player) => player.sword == true && player.swordMission == false,
        setState: () => {
          player.gold += 50;
          player.swordMission = true;
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
    text: "Zeit für die Rache! Diesmal bist du besser ausgerüstet. Von weitem siehst du den Wächter, der dich bereits angegriffen hat. Dieses mal greift er dich nicht gleich an. Er sagt, wenn du ihm 3 Fragen beantworten kannst, lässt er dich passieren. Wenn du jedoch eine Frage falsch beantwortest, stribst du.",
      options: [
      {
        text: "Weiter...",
        nextText: 22,
      },
   ],
  },
  {
    id: 18,
    text: "Der Mann bietet dir 60 Gold für eine erfolgreiche Runde Memory an",
    options: [
      {
        text: "Verlasse die Kneipe",
        nextText: 13,
        //Funktionsbutton für Memory wird in selectOption erstellt
      },
    ],
  },
  {
    id: 19,
    text: "Du gehst in den Wald und siehst eine Höhle. Du hörst ein Geräusch. In der Höhle befindet sich ein kleiner Kobold. Du kannst auch weiter durch den Wald gehen.",
    options: [
      {
        text: "In die Höhle gehen und kämpfen!",
        requiredState: (player) => player.ring == false && player.ringMission == false,
        setState: () => {
          player.health -= 10;
        },
        nextText: 20,
      },
      {
        text: "Weiter durch den Wald gehen bis zum Feld",
        requiredState: (player) => player.swordMission == false && player.sword == false,
        nextText: 34
      },
      {
        text: "Zurück in die Stadt fliehen!",
        nextText: 13,
      },
    ],
  },
  {
    id: 20,
    text: "Du schlägst den Kobold in die Fluch und er verletzt dich leicht. Du verlierst 10 Gesundheitspunkte. Du siehst eine Truhe in der Höhle.",
    
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
  {
    id: 22,
    text: "Frage 1: Wie viele Goldmünzen hast du am Anfang des Spiels im Keller gefunden?",
    options: [
      {
        text: "5",
        nextText: 24,
      },
      {
        text: "10",
        nextText: 13,
      },
      {
        text: "15",
        nextText: 13,
      },
      {
        text: "25",
        nextText: 13,
      }
    ],
  },
  {
    id: 23,
    text: "Falsch! Du stirbst.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 24,
    text: "Richtig! Frage 2: Was wollte der mysteriöse Mann in der Stadt von dir?",
    options: [
      {
        text: "Ein Bier, eine Halskette und ein Schwert",
        nextText: 13,
      },
      {
        text: "Ein Bier, ein Armband und eine Axt",
        nextText: 13,
      },
      {
        text: "Ein Bier, einen Ring und ein Schwert",
        nextText: 25,
      },
      {
        text: "Ein Bier, eine Uhr und ein Schwert",
        nextText: 13,
      }
    ],
  },
  {
    id: 25,
    text: "Auch richtig! Frage 3: Welche Art von Karten waren es im Memory Spiel?",
    options: [
      {
        text: "Rot Herz ♥",
        nextText: 13,
      },
      {
        text: "Schwarz Pik ♠",
        nextText: 13,
      },
      {
        text: "Rot Karo ♦",
        nextText: 26,
      },
      {
        text: "Schwarz Kreuz ♣",
        nextText: 13,
      }
    ],
  },
  {
    id: 26,
    text: "Glück gehabt! Du hast alle Fragen richtig beantwortet und darfst passieren. Jedoch ist die Tür zum Schloss verschlossen. Der Wächter lacht und sagt: Ich habe dir nicht gesagt, dass ich dir den Schlüssel gebe! Die Tür sieht robust aus. Jedoch bist du ein stark genug, um sie einzuschlagen.",
    options: [
      {
        text: "Die Tür genauer untersuchen",
        nextText: 27,
      }
    ],
  },
  {
    id: 27,
    text: "Du musst 2 mal gegen die Tür schlagen. Pass auf, dass du nicht auf etwas anderes schlägst!",
    options: [
      {
        text: "Gegen den Wächter schlagen",
        nextText: 11,
      },
      {
        text: "Gegen die Wand schlagen",
        nextText: 28,
      },
      {
        text: "Gegen die Tür schlagen",
        nextText: 29,
      },
      {
        text: "Gegen den Boden schlagen",
        nextText: 28,
      }
    ],
  },
  {
    id: 28,
    text: "Du hast verfehlt! Versuch es nochmal.",
    options: [
      {
        text: "Weiter...",
        nextText: 27,
      }
    ]
  },
  {
    id: 29,
    text: "Du hast getroffen! Noch 1 mal!",
    options: [
      {
        text: "Gegen die Wand schlagen",
        nextText: 27,
      },
      {
        text: "Gegen die Tür schlagen",
        nextText: 30,
      },
      {
        text: "Gegen den Wächter schlagen",
        nextText: 11,
      },
      {
        text: "Gegen den Boden schlagen",
        nextText: 27,
      }
    ],
  },
  {
    id: 30,
    text: "Du hast die Tür aufgebrochen! Du betrittst das Schloss und siehst vorne im Gang eine weitere Wache. Er sieht nicht sehr freundlich aus. Er bemerkt dich und fragt was du hier zu suchen hast. Was antwortest du?",
    options: [
      {
        text: "Ich bin hier um Rache zu nehmen!",
        requiredState: (player) => player.strength >= 25,
        nextText: 31,
      },
      {
        text: "Ich arbeite hier auch! Ich bin der neue Wächter! (lügen)",
        nextText: 32,
      },
      {
        text: "Ich bin hier um zu stehlen!",
        nextText: 31,
      },
    ],
  },
  {
    id: 31,
    text: "Der Wächter läuft ohne zu zögern auf dich zu und greift dich an. Nach einem glorreichen und langen Kampf besiegst du ihn und gehst weiter in den nächsten Raum.",
    options: [
      {
        text: "Weiter...",
        nextText: 33,
      }
    ],
  },
  {
    id: 32,
    text: "Der Wächter lacht und sagt: Du bist nicht der neue Wächter! Er greift dich an. Nach einem glorreichen und langen Kampf besiegst du ihn und gehst weiter in den nächsten Raum.",
    options: [
      {
        text: "Weiter...",
        nextText: 33,
      }
    ],
  },
  {
    id: 33,
    text: "Hier ist eine weitere verschlossene Tür.",
    options: [
    ],
  },
  {
    id: 34,
    text: "Hier ist also das Feld in dem sich das Schwert befinden soll. Du siehst auch Brennessel, diese sind sehr wertvoll. Sammle alle Brennessel und finde das Schwert!",
    options: [
      {
        text: "Zurückgehen",
        nextText: 19,
      }
    ],
  },
  {
    id: 35,
    text: "Du hast die Tür aufgebrochen!",
    options: [
      {
        text: "To be continued...",
        nextText: 36,
      }
    ],
  },
  {
    id: 36,
  },
  {
    id: 37,
    text: "Die Stimmen sind verschwunden aber die Tür ist verschlossen.",
    options: [

    ],
  }
];


if (window.location.search.includes('fromMemoryGame=true')) {
  loadGameState();
  showTextNode(13);
  updatePlayerStats();
  
} else if (window.location.search.includes('fromSearchGame=true')){
  loadGameState();
  showTextNode(13);
  updatePlayerStats();

} else if (window.location.search.includes('fromDoorGame=true')) {
  loadGameState();
  showTextNode(7);
  updatePlayerStats();

} else if (window.location.search.includes('fromDoorGame2=true')) {
  loadGameState();
  showTextNode(35);
  updatePlayerStats();

} else {
  startGame();
}