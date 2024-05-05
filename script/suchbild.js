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

bootstrap_alert = function() {}
bootstrap_alert.found = function(message) {
    $('#alert_placeholder').html('<div class="alert alert-light"><span>'+message+" Brenneseln: "+goalCounter+" Extras: "+specialCounter+'</span></div>')
}
bootstrap_alert.warning = function(message) {
    $('#alert_placeholder').html('<div class="alert alert-light"><span>'+message+'</span></div>')
}

function logic(element) {
    console.log("test");
    var temp = $(element).attr("src");
    if (temp == "../icons/brenn.png") {
        goalCounter++;
        bootstrap_alert.found('Du hast eine Brennesel gefunden!');
    }
    else if (temp == "../icons/basil.png") {
        bootstrap_alert.found('Das ist Basilikum und keine Brennesel. Bitte halte dein Ziel vor Auge und denk nicht schon wieder an Pizza!');
    }
    else if (temp == "../icons/sword.png") {
        specialCounter ++;
        bootstrap_alert.found('Glückwunsch, du hast das Schwert gefunden!');
    }
    else if (temp == "../icons/shrooms.png") {
        ++poisionCounter;
        if (poisionCounter < 2)
            bootstrap_alert.warning('Du hast einen giftigen Pilz berührt!');
        else{
            bootstrap_alert.warning('Du hast zu viele giftige Pilze berührt und bist gestorben.  Probier es nochmal!');
            setTimeout(function() {
            //hier die Seite neu laden
            location.reload();
            }, 3000);
        }
    }
    if (goalCounter === 5 && specialCounter === 1) {
        bootstrap_alert.warning('Alles gefunden!')
        setTimeout(function() {
            window.location.href = '../sites/game.html?fromSearchGame=true';
        }, 3000);
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
    
    

