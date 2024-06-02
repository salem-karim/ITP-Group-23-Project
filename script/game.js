import { Player, } from "../script/imports/player.js";
import { textNodes } from "../script/imports/story.js";
var name = "Player"; // should propmt Player to enter name
var stats = {
    health: 100,
    strength: 10,
    gold: 0,
    //mana: 0, // maybe add mana later
};
var inventory = {
    beer: false,
    ring: false,
    sword: false,
};
var missions = {
    beerMission: false,
    memoryMission: false,
    ringMission: false,
    swordMission: false,
};
var equipment = ["-", "-"];
var player = new Player(name, stats, equipment, inventory, missions);
let textElement = document.getElementById("text");
let optionButtonsElement = document.getElementById("option-buttons");
let goldElement = document.getElementById("gold");
let healthElement = document.getElementById("health");
let strengthElement = document.getElementById("strength");
let weaponElement = document.getElementById("weapon");
let shieldElement = document.getElementById("shield");
//Delcare empty state
let state = {};
const story = textNodes;
let NodeIndex = 1;
function startGame(Index) {
    //Show the text, options and update the player stats
    showTextNode(Index);
    updatePlayerStats();
}
function updatePlayerStats() {
    //Sets the HTML content to the state values
    goldElement.textContent = player.stats["gold"].toString();
    healthElement.textContent = player.stats["health"].toString();
    strengthElement.textContent = player.stats["strength"].toString();
    weaponElement.textContent = player.equipment[0];
    shieldElement.textContent = player.equipment[1];
}
function resetPlayer() {
    player.stats["health"] = 100;
    player.stats["strength"] = 10;
    player.stats["gold"] = 0;
    player.equipment[0] = "-";
    player.equipment[1] = "-";
    player.inventory["beer"] = false;
    player.missions["beerMission"] = false;
    player.missions["memoryMission"] = false;
    player.inventory["ring"] = false;
    player.missions["ringMission"] = false;
    player.inventory["sword"] = false;
    player.missions["swordMission"] = false;
    updatePlayerStats();
}
function showTextNode(textNodeIndex) {
    //get the right text node object from the array with the given index
    const textNode = story[textNodeIndex - 1];
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
    if (textNodeIndex === 15) {
        const memoryButton = document.createElement("button");
        memoryButton.innerText = "Memory spielen";
        memoryButton.classList.add("btn");
        memoryButton.addEventListener("click", () => {
            player.stats["gold"] += 60;
            player.missions["memoryMission"] = true;
            saveGameState(textNodeIndex);
            window.location.href = "../sites/memory.html"; // Der Pfad zur neuen Seite
        });
        optionButtonsElement.appendChild(memoryButton);
    }
    if (textNodeIndex === 30) {
        const searchGameButton = document.createElement("button");
        searchGameButton.innerText = "Das Feld genauer untersuchen";
        searchGameButton.classList.add("btn");
        searchGameButton.addEventListener("click", () => {
            player.inventory["sword"] = true;
            saveGameState(textNodeIndex);
            window.location.href = "../sites/suchbild.html";
        });
        optionButtonsElement.appendChild(searchGameButton);
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
    console.log(textNodeIndex);
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
function saveGameState(textNodeIndex) {
    const gameState = {
        textNodeIndex: textNodeIndex,
        playerStats: {
            gold: player.stats["gold"],
            health: player.stats["health"],
            strength: player.stats["strength"],
            weapon: player.equipment[0],
            shield: player.equipment[1],
            beer: player.inventory["beer"],
            beerMission: player.missions["beerMission"],
            memoryMission: player.missions["memoryMission"],
            ring: player.inventory["ring"],
            ringMission: player.missions["ringMission"],
            sword: player.inventory["sword"],
            swordMission: player.missions["swordMission"],
        },
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
}
function loadGameState() {
    const savedGameState = localStorage.getItem("gameState");
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        // Set the text node to the saved index
        NodeIndex = gameState.textNodeIndex;
        // Set the player stats to the loaded values
        player.stats["gold"] = gameState.playerStats.gold;
        player.stats["health"] = gameState.playerStats.health;
        player.stats["strength"] = gameState.playerStats.strength;
        player.equipment[0] = gameState.playerStats.weapon;
        player.equipment[1] = gameState.playerStats.shield;
        player.inventory["beer"] = gameState.playerStats.beer;
        player.missions["beerMission"] = gameState.playerStats.beerMission;
        player.missions["memoryMission"] = gameState.playerStats.memoryMission;
        player.inventory["ring"] = gameState.playerStats.ring;
        player.missions["ringMission"] = gameState.playerStats.ringMission;
        player.inventory["sword"] = gameState.playerStats.sword;
        player.missions["swordMission"] = gameState.playerStats.swordMission;
        // Update the display accordingly
        updatePlayerStats();
        console.log(player);
    }
}
if (window.location.search.includes("fromMemoryGame=true")) {
    loadGameState();
    showTextNode(10);
    updatePlayerStats();
}
else if (window.location.search.includes("fromSearchGame=true")) {
    loadGameState();
    showTextNode(10);
    updatePlayerStats();
}
else if (window.location.search.includes("fromDoorGame=true")) {
    loadGameState();
    showTextNode(5);
    updatePlayerStats();
}
else if (window.location.search.includes("fromDoorGame2=true")) {
    loadGameState();
    showTextNode(31);
    updatePlayerStats();
}
else if (window.location.search.includes("fromSSP=true")) {
    loadGameState();
    showTextNode(34);
    updatePlayerStats();
}
else {
    startGame(NodeIndex);
}
