fetch("../utilities/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function navigateToGame() {
  var select = document.getElementById("storySelect");
  var selectedValue = select ? select.value : "";
  if (!select || selectedValue === "Select Story") {
    window.location.href = "sites/game.html?story=Story1";
  } else {
    window.location.href = "sites/game.html?story=" + selectedValue;
  }
}

