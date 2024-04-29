var goalCounter = 0;
var specialCounter = 0;
var successCriteria = (goalCounter === 5 && specialCounter === 1);
var poisionCounter = 0;

function highlight(element) {
    $(element).addClass("bright");
}

function unhighlight(element) {
    $(element).removeClass("bright");
}

function logic(element) {
    console.log("test");
    var temp = $(element).attr("src");
    if (temp == "brennesel.png") {
        goalCounter++;
        window.alert("Glückwunsch. Du hast eine Brenneseln gefunden.");
    }
    else if (temp == "basilikum.png") {
        window.alert("Das ist Basilikum und keine Brennesel. Bitte halte dein Ziel vor Auge und denk nicht schon wieder an Pizza!");
    }
    else if (temp == "schwert.png") {
        window.alert("Glückwunsch, du hast das Schwert gefunden!");
        specialCounter ++;
    }
    else if (temp == "pilz.png") {
        ++poisionCounter;
        if (poisionCounter < 2)
            window.alert("Du hast einen giftigen Pilz berührt!");
        else{
            window.alert("Du hast zu viele giftige Pilze berührt und bist gestorben.  Probier es nochmal!");
            //hier die Seite neu laden
            location.reload();
        }
    }
    if (goalCounter === 5 && specialCounter === 1) {
        window.alert("Alles gefunden.");
        window.location.href = '../sites/game.html?fromSearchGame=true';
    }
    $(element).remove();
}

function poison(element) {
    console.log("verloren");
}

$(document).ready(function () {
    $(".item").attr("onmouseover", "highlight(this)");
    $(".item").attr("onmouseout", "unhighlight(this)");
    $(".item").attr("onclick", "logic(this)");
});
    
    

