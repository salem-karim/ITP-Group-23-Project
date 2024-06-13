var seconds = 1;
var tries = 0;
var prevoiusCardId = 0;
var cards = [];
var flippedCards = 0;
var matchedCardIds = [];
var success = 0;
let time = 1000;
const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "black",
  "#8B4513",
  "white",
  "magenta",
];
let cardColors = [];

// Initialize alert
$(document).ready(function () {
  bootstrap_alert.load(
    "Du hast 120 Sekunden Zeit um das Memory Spiel zu gewinnen!",
  );
});

bootstrap_alert = function () {};
bootstrap_alert.load = function (message) {
  $("#alert_placeholder").html(
    '<div class="alert alert-light"><span>' + message + "</span></div>",
  );
};
bootstrap_alert.win = function (message) {
  $("#alert_placeholder").html(
    '<div class="alert alert-light"><span>' + message + "</span></div>",
  );
};
bootstrap_alert.loss = function (message) {
  $("#alert_placeholder").html(
    '<div class="alert alert-light"><span>' + message + "</span></div>",
  );
};

var counter = setInterval(countTimer, time); // set the counter

function countTimer() {
  seconds++;
  document.getElementById("timer").textContent = seconds;
}

function incrementTries() {
  tries++;
  document.getElementById("tries").textContent = tries;
}

// create cards as divs and add them to the game area and shuffle and display them
function createCards() {
  cardColors = colors.concat(colors); // Duplicate colors for pairs
  shuffleArray(cardColors); // Shuffle colors

  for (var i = 0; i < 16; i++) {
    cards[i] = document.createElement("div");
    cards[i].setAttribute("id", i + 1);
    cards[i].setAttribute("class", "karte");
    cards[i].setAttribute("data-color", cardColors[i]);
    cards[i].style.backgroundColor = "#A9A9A9"; // Initial color for unmatched cards
    cards[i].addEventListener("click", clickCard);
  }
  showCards();
}

// shuffle the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// display the cards in the game area and add a line break after every 4 cards
function showCards() {
  const spielbereich = document.getElementById("spielbereich");
  spielbereich.innerHTML = "";
  for (var i = 0; i < cards.length; i++) {
    spielbereich.appendChild(cards[i]);
    if ((i + 1) % 4 === 0) {
      spielbereich.appendChild(document.createElement("br"));
    }
  }
}

// click event with logic to only flip 2 cards at a time and check if all are matched
function clickCard(event) {
  if (flippedCards < 2) {
    flipCard(event.target.id);
    flippedCards++;
  }

  if (flippedCards === 2) {
    setTimeout(function () {
      resetFlippedCards();
    }, 350);
    if (matchedCardIds.length + 2 === cards.length) {
      clearInterval(counter);
    }
  }
}

// flip the card and check if they match
function flipCard(id) {
  if (matchedCardIds.includes(id)) {
    return;
  }

  var currentCard = document.getElementById(id);
  if (currentCard) {
    try {
      currentCard.style.backgroundColor =
        currentCard.getAttribute("data-color");
    } catch (error) {
      console.error("Error flipping card:", id, error);
    }

    if (prevoiusCardId === 0) {
      currentCard.removeEventListener("click", clickCard);
      prevoiusCardId = id;
    } else {
      incrementTries();
      var previousCard = document.getElementById(prevoiusCardId);
      if (
        previousCard.getAttribute("data-color") ===
        currentCard.getAttribute("data-color")
      ) {
        currentCard.removeEventListener("click", clickCard);
        setTimeout(function () {
          if (currentCard) {
            currentCard.style.backgroundColor = "#696969";
          }
          if (previousCard) {
            previousCard.style.backgroundColor = "#696969";
            success++;
            if (success === 4) {
              youWon();
            }
          }
          matchedCardIds.push(prevoiusCardId, id);
          prevoiusCardId = 0;
        }, 350);
      } else {
        previousCard.addEventListener("click", clickCard);
        currentCard.addEventListener("click", clickCard);
        setTimeout(function () {
          if (currentCard) {
            currentCard.style.backgroundColor = "#A9A9A9";
          }
          if (previousCard) {
            previousCard.style.backgroundColor = "#A9A9A9";
          }
          prevoiusCardId = 0;
        }, 350);
      }
    }

    if (flippedCards === 2) {
      setTimeout(function () {
        resetFlippedCards();
      }, 350);
    }
  } else {
    console.error("Card element not found for ID:", id);
  }
}

function resetFlippedCards() {
  cards.forEach((card) => card.addEventListener("click", clickCard));
  flippedCards = 0;
}

function youWon() {
  if (seconds < 120) {
    bootstrap_alert.win(
      "Glückwunsch! Du hast das Memory Spiel in " +
        tries +
        " Versuchen und " +
        seconds +
        " Sekunden gewonnen!",
    );
    setTimeout(function () {
      window.location.href = "../sites/game.html?fromMemoryGame=true";
    }, 5000);
  } else {
    bootstrap_alert.loss("Du warst etwas zu Langsam!");
    setTimeout(function () {
      window.location.reload();
    }, 5000);
  }
}

// Ensure the createCards function is called after all declarations
createCards();
