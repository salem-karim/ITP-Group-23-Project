var input = alert("Du hast 2 Minuten Zeit um das Memory zu lösen. Viel Spaß!");
var seconds = 1;
var tries = 0;
var prevoiusCardId = 0;
var cards = [];
createCards();
var flippedCards = 0;
var matchedCardIds = [];
var success = 0;


var counter = setInterval(countTimer, 1000); // set the counter

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
  for (var i = 0; i < 16; i++) {
    cards[i] = document.createElement("div");
    cards[i].setAttribute("id", i + 1);
    cards[i].setAttribute("class", "karte");
    cards[i].addEventListener("click", clickCard);
  }
  shuffleCards();
  showCards();
}
// shuffle the cards array
function shuffleCards() {
  for (var i = 0; i < cards.length; i++) {
    const random = Math.floor(Math.random() * cards.length);
    var temp = cards[i];
    cards[i] = cards[random];
    cards[random] = temp;
  }
}
// display the cards in the game area and add a line break after every 4 cards
function showCards() {
  for (var i = 0; i < cards.length; i++) {
    document.getElementById("spielbereich").appendChild(cards[i]);
    if ((i + 1) % 4 === 0) {
      document
        .getElementById("spielbereich")
        .appendChild(document.createElement("br"));
    }
  }
}
// click event with logic to only flip 2 cards at a time and check if all are amtched
function clickCard(event) {
  if (flippedCards < 2) {
    flipCard(event.target.id);
    flippedCards++;
  }

  if (flippedCards === 2) {
    setTimeout(function() {
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
  // if card is not null flip it and check if it matches the previous card
  if (currentCard) {
    // try flipping the card and catch any errors
    try {
      currentCard.style.backgroundImage = "url('pics/card" + id + ".png')";
    } catch (error) {
      console.error("Error flipping card:", id, error);
    }
    // First card remove listener for clicked card and set previous card id to the current card id
    if (prevoiusCardId === 0) {
      currentCard.removeEventListener("click", clickCard);
      prevoiusCardId = id;
    } else {
      // Second card check if it matches the previous card
      incrementTries();
      if (parseInt(prevoiusCardId) + parseInt(id) === 17) {
        // removes event listeners for matched cards and adds them to the matched card array
        document
          .getElementById(prevoiusCardId)
          .removeEventListener("click", clickCard);
        currentCard.removeEventListener("click", clickCard);
        setTimeout(function() {
          if (currentCard) {
            currentCard.style.backgroundImage = "url('pics/memoryBgI.png')";
          }
          if (document.getElementById(prevoiusCardId)) {
            document.getElementById(prevoiusCardId).style.backgroundImage =
              "url('pics/memoryBgI.png')";
              success++;
              console.log(success);
              //Testzwecke
              if (success === 2){ 
                youWon();
              }
          }
          matchedCardIds.push(prevoiusCardId, id);
          prevoiusCardId = 0;
        }, 350);
      } else {
        // if cards do not match add event listeners back to the cards and flip them back
        document
          .getElementById(prevoiusCardId)
          .addEventListener("click", clickCard);
        currentCard.addEventListener("click", clickCard);
        setTimeout(function() {
          if (currentCard) {
            currentCard.style.backgroundImage = "url('pics/memoryBg.png')";
          }
          if (document.getElementById(prevoiusCardId)) {
            document.getElementById(prevoiusCardId).style.backgroundImage =
              "url('pics/memoryBg.png')";
          }
          prevoiusCardId = 0;
        }, 350);
      }
    }
    // if 2 cards are flipped reset the flipped cards counter and add event listeners back to the cards
    if (flippedCards === 2) {
      setTimeout(function() {
        resetFlippedCards();
      }, 350);
    }
  } else {
    // if card is null log an error
    console.error("Card element not found for ID:", id);
  }
}

function resetFlippedCards() {
  cards.forEach((card) => card.addEventListener("click", clickCard));
  flippedCards = 0;
}

function youWon(){
  if (seconds < 120){
  alert("Herzlichen Glückwunsch! Du hast das Memory in " + tries + " Versuchen und " + seconds + " Sekunden gelöst! Du erhälst 60 Gold!");
  window.location.href = '../sites/game.html?fromMemoryGame=true';
  } else {
    alert("Du warst etwas zu Langsam! Noch einmal versuchen?");
    window.location.reload();
}
}
