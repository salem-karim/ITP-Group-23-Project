var numberOfHits = 0;

function damage(event) {
    numberOfHits++;
    event.currentTarget.classList.add('clicking'); // Use event.currentTarget to refer to the div
    event.currentTarget.classList.remove('clicking2');
    var audio = document.getElementById('clickSound');
    audio.play();
    if (numberOfHits >= 1) {
        if (numberOfHits >= 3) {
            $("#1").attr("src", "../images/Door/doorMine2.png");
            if (numberOfHits >= 5) {
                $("#1").attr("src", "../images/Door/doorMine3.png");
                if (numberOfHits >= 7) {
                    $("#1").attr("src", "../images/Door/doorMine4.png");
                    if (numberOfHits >= 10) {
                        $("#1").attr("src", "../images/Door/doorMine5.png");
                        console.log("success");
                        alert("Tür erfolgreich aufgebrochen !");
                        window.location.href = '../sites/game.html?fromDoorGame=true';
                    }
                }
            }
        }
    }
}

function change(event) {
    event.currentTarget.classList.remove('clicking'); // Use event.currentTarget to refer to the div
    event.currentTarget.classList.add('clicking2');
}
