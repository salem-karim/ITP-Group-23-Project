bootstrap_alert = function() {}
bootstrap_alert.win = function(message) {
    $('#alert_placeholder').html('<div class="alert alert-light"><span>'+message+'</span></div>')
}
bootstrap_alert.load = function(message) {
  $('#alert_placeholder').html('<div class="alert alert-light"><span>'+message+'</span></div>')
}
$(document).ready(function() {
  bootstrap_alert.load('Gewinne 3 Runden um das Spiel zu gewinnen!');
  console.log('loaded');
});
// Get  to DOM elements

const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");
  userScore = document.getElementById("user_score");
  cpuScore = document.getElementById("cpu_score");

// Loop through each option image element
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "../images/SchereSteinPapier/rock.png";
    result.textContent = "Warte...";

    // Loop through each option image again
    optionImages.forEach((image2, index2) => {
      // If the current index doesn't match the clicked index
      // Remove the "active" class from the other option images
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    // Set a timeout to delay the result calculation
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");
    
      // Get the source of the clicked option image
      let imageSrc = e.target.querySelector("img").src;
      // Set the user image to the clicked option image
      userResult.src = imageSrc;
    
      // Generate a random number between 0 and 2
      let randomNumber = Math.floor(Math.random() * 3);
      // Create an array of CPU image options
      let cpuImages = ["../images/SchereSteinPapier/rock.png", "../images/SchereSteinPapier/paper.png", "../images/SchereSteinPapier/scissors.png"];
      // Set the CPU image to a random option from the array
      cpuResult.src = cpuImages[randomNumber];
    
      // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
      let cpuValue = ["R", "P", "S"][randomNumber];
      // Assign a letter value to the clicked option (based on index)
      let userValue = ["R", "P", "S"][index];
    
      // Create an object with all possible outcomes
      let outcomes = {
        RR: "Unentschieden", 
        RP: "Gegner gewinnt",
        RS: "Du gewinnst",
        PP: "Unentschieden",
        PR: "Du gewinnst",
        PS: "Gegner gewinnt",
        SS: "Unentschieden",
        SR: "Gegner gewinnt",
        SP: "Du gewinnst",
      };
    
      // Look up the outcome value based on user and CPU options
      let outComeValue = outcomes[userValue + cpuValue];
    
      // Display the result
      result.textContent = userValue === cpuValue ? "Unentschieden" : `${outComeValue}!`;
    
      // Increase the score based on the outcome
      if (outComeValue === "Du gewinnst") {
        userScore.textContent = parseInt(userScore.textContent) + 1;
        if (parseInt(userScore.textContent) == 3) {
          bootstrap_alert.win('Du hast gewonnen!');

          setTimeout(function() {
            window.location.href = '../index.html';
          }, 3000);
        }
      }
    }, 2500);
  });
});