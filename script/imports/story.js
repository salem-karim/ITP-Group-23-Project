export const textNodes = [
    {
        id: 1,
        text: "Du erwachst in einem unbekannten Keller und hast keine Ahnung wo du bist. Du hast Durst. Hast du schonwieder getrunken?",
        options: [
            {
                text: "Sieh dich im Keller nach etwas nützlichen um",
                setState: (player) => {
                    player.stats["gold"] += 5;
                },
                nextText: 2,
            },
            {
                text: "Trink von einem unbekannten blauen Trank",
                setState: (player) => {
                    player.stats["health"] = 0;
                },
                nextText: 3,
            },
        ],
    },
    {
        id: 2,
        text: "Nachdem du den Keller durchsucht hast, findest du 5 Goldmünzen und einen Hammer. Du siehst eine Tür und hörst Stimmen dahinter. Was willst du tun?",
        options: [
            {
                text: "Stürme lautstart den Raum und fordere die Stimmen heraus",
                setState: (player) => {
                    player.stats["health"] = 0;
                },
                nextText: 4,
            },
            {
                text: "Warte bis die Stimmen verschwinden und öffne die Tür leise",
                nextText: 33,
            },
        ],
    },
    {
        id: 3,
        text: "Das war offensichtlich kein Wasser. Du stirbst.",
        options: [
            {
                text: "Restart",
                nextText: -1,
            },
        ],
    },
    {
        id: 4,
        text: "Es waren diejenigen, die dich gefangen haben. Sie töten dich.",
        options: [
            {
                text: "Restart",
                nextText: -1,
            },
        ],
    },
    {
        id: 5,
        text: "Nachdem du die Tür aufgebrochen hast kannst du dich langsam erinnern, du warst in einer Kneipe und hast dich mit einem alten Mann unterhalten. Er hat dir von einem Schatz in einem Schloss erzählt. Du hast nach dem Kneipen besuch offenbar noch dein Glück versucht und wurdest gefangen genommen. Du bist in einem Schloss.",
        options: [
            {
                text: "Weiter...",
                nextText: 6,
            },
        ],
    },
    {
        id: 6,
        text: "Du musst erstmal aus dem Schloss entkommen. Du siehst einen Wächter vor dir. Er ist riesig und hat eine Axt. Was willst du tun?",
        options: [
            {
                text: "ABHAUEN",
                setState: (player) => {
                    player.stats["health"] = 50;
                },
                nextText: 9,
            },
            {
                text: "Einen lächerlichen Faustkampf beginnen",
                setState: (player) => {
                    player.stats["health"] = 0;
                },
                nextText: 7,
            },
            {
                text: "Ihn bitten dich durchzulassen und ihm 5 Goldmünzen anbieten",
                requiredState: (player) => player.stats["gold"] >= 5,
                setState: (player) => {
                    player.stats["gold"] -= 5;
                    player.stats["health"] = 0;
                },
                nextText: 8,
            },
        ],
    },
    {
        id: 7,
        text: "Merkst du selber, oder? Du stirbst.",
        options: [
            {
                text: "Restart",
                nextText: -1,
            },
        ],
    },
    {
        id: 8,
        text: "Der Wächter nimmt dir das Gold ab tötet dich. Du bist tot.",
        options: [
            {
                text: "Restart",
                nextText: -1,
            },
        ],
    },
    {
        id: 9,
        text: "Du entkommst dem Wächter nur knapp, aber er hat dich verletzt. Du läufst erstmals richtung Stadt.",
        options: [
            {
                text: "Weiter...",
                nextText: 10,
            },
        ],
    },
    {
        id: 10,
        text: "Du siehst ein paar Händler und andere Gestalten. Um im Schloß Rache zu nehmen, brauchst du 100 Gesundheit und 25 Stärke.",
        options: [
            {
                text: "Zum Schmied gehen",
                nextText: 11,
            },
            {
                text: "Zum mysteriösen Mann in der Ecke gehen, der dir zuwinkt",
                requiredState: (player) => player.missions["beerMission"] == false ||
                    player.missions["ringMission"] == false ||
                    player.missions["swordMission"] == false,
                nextText: 12,
            },
            {
                text: "Zum Wirt gehen",
                nextText: 13,
            },
            {
                text: "Wieder zurück zum Schloss (benötigt 100 Gesundheit und 25 Stärke)",
                requiredState: (player) => player.stats["health"] >= 100 &&
                    player.stats["strength"] >= 25 &&
                    player.equipment[1] == "Eisenschild" &&
                    player.equipment[0] == "Fortgeschrittenenschwert",
                nextText: 14,
            },
            {
                text: "Ab in den Wald",
                requiredState: (player) => player.stats["strength"] >= 15 &&
                    (player.inventory["ring"] == false ||
                        player.inventory["sword"] == false),
                nextText: 16,
            },
        ],
    },
    {
        id: 11,
        text: "Der Schmied bietet dir ein Anfängerschwert (30 Gold, +5 Stärke), ein Fortgeschrittenenschwert (100 Gold, +10 Stärke) und einen Eisenschild (50 Gold, +10 Gesundheit) an.",
        options: [
            {
                text: "Kein Geld? Verlasse den Schmied",
                nextText: 10,
            },
            {
                text: "Ein Anfängerschwert kaufen (30 Gold)",
                requiredState: (player) => player.stats["gold"] >= 30 &&
                    player.equipment[0] != "Anfängerschwert" &&
                    player.equipment[0] != "Fortgeschrittenenschwert",
                setState: (player) => {
                    player.stats["gold"] -= 30;
                    player.equipment[0] = "Anfängerschwert";
                    player.stats["strength"] = 15;
                },
                nextText: 10,
            },
            {
                text: "Ein Fortgeschrittenenschwert kaufen (100 Gold)",
                requiredState: (player) => player.stats["gold"] >= 100 &&
                    player.equipment[0] != "Fortgeschrittenenschwert",
                setState: (player) => {
                    player.stats["gold"] -= 100;
                    player.equipment[0] = "Fortgeschrittenenschwert";
                    player.stats["strength"] = 25;
                },
                nextText: 10,
            },
            {
                text: "Einen Eisenschild kaufen (50 Gold)",
                requiredState: (player) => player.stats["gold"] >= 50 && player.equipment[1] != "Eisenschild",
                setState: (player) => {
                    player.stats["gold"] -= 50;
                    player.equipment[1] = "Eisenschild";
                },
                nextText: 10,
            },
        ],
    },
    {
        id: 12,
        text: "Der Mann bietet dir für jede Mission 50 Gold an.\n1. Er sagt: Ich brauche ein Bier, aber ich kann nicht selbst gehen. Kannst du mir eins holen?\n 2. Außerdem: Ich habe im Wald meinen Ring verloren. Kannst du ihn mir holen? (Zugang zum Wald benötigt 15 Stärke)\n3. Zu guter Letzt: Ich habe mein Schwert im nach dem Wald In einem Feld verloren. Kannst du es mir holen?",
        options: [
            {
                text: "Zurückgehen",
                nextText: 10,
            },
            {
                text: "Bier geben",
                requiredState: (player) => player.inventory["beer"] == true &&
                    player.missions["beerMission"] == false,
                setState: (player) => {
                    player.stats["gold"] += 50;
                    player.missions["beerMission"] = true;
                },
                nextText: 10,
            },
            {
                text: "Ring geben",
                requiredState: (player) => player.inventory["ring"] == true &&
                    player.missions["ringMission"] == false,
                setState: (player) => {
                    player.stats["gold"] += 50;
                    player.missions["ringMission"] = true;
                },
                nextText: 10,
            },
            {
                text: "Schwert geben",
                requiredState: (player) => player.inventory["sword"] == true &&
                    player.missions["swordMission"] == false,
                setState: (player) => {
                    player.stats["gold"] += 50;
                    player.missions["swordMission"] = true;
                },
                nextText: 10,
            },
        ],
    },
    {
        id: 13,
        text: "Der Wirt sieht sieht freundlich aus und ein Mann sitzt an einem runden Tisch. Du siehst auch eine Tafel mit Preisen. Ein Bier kostet 5 Gold, Essen kostet 5 Gold und gibt dir 10 Gesundheit.",
        options: [
            {
                text: "Verlasse die Kneipe",
                nextText: 10,
            },
            {
                text: "Ein Bier für den Mysteriösen Mann draußen kaufen (5 Gold)",
                requiredState: (player) => player.stats["gold"] >= 5 &&
                    player.inventory["beer"] == false &&
                    player.missions["beerMission"] == false,
                setState: (player) => {
                    player.stats["gold"] -= 5;
                    player.inventory["beer"] = true;
                },
                nextText: 13,
            },
            {
                text: "Etwas essen (5 Gold, + 10 Gesundheit)",
                requiredState: (player) => player.stats["gold"] >= 5 && player.stats["health"] <= 90 /*&&
                player.beerMission == true*/,
                setState: (player) => {
                    player.stats["gold"] -= 5;
                    player.stats["health"] += 10;
                },
                nextText: 13,
            },
            {
                text: "Zu dem Mann am runden Tisch gehen",
                requiredState: (player) => player.missions["memoryMission"] == false,
                nextText: 15,
            },
        ],
    },
    {
        id: 14,
        text: "Zeit für die Rache! Diesmal bist du besser ausgerüstet. Von weitem siehst du den Wächter, der dich bereits angegriffen hat. Dieses mal greift er dich nicht gleich an. Er sagt, wenn du ihm 3 Fragen beantworten kannst, lässt er dich passieren. Wenn du jedoch eine Frage falsch beantwortest, stribst du.",
        options: [
            {
                text: "Weiter...",
                nextText: 19,
            },
        ],
    },
    {
        id: 15,
        text: "Der Mann bietet dir 60 Gold für eine erfolgreiche Runde Memory an",
        options: [
            {
                text: "Verlasse die Kneipe",
                nextText: 10,
                // Memory spielen
            },
        ],
    },
    {
        id: 16,
        text: "Du gehst in den Wald und siehst eine Höhle. Du hörst ein Geräusch. In der Höhle befindet sich ein kleiner Kobold. Du kannst auch weiter durch den Wald gehen.",
        options: [
            {
                text: "In die Höhle gehen und kämpfen!",
                requiredState: (player) => player.inventory["ring"] == false &&
                    player.missions["ringMission"] == false,
                setState: (player) => {
                    player.stats["health"] -= 10;
                },
                nextText: 17,
            },
            {
                text: "Weiter durch den Wald gehen bis zum Feld",
                requiredState: (player) => player.missions["swordMission"] == false &&
                    player.inventory["sword"] == false,
                nextText: 30,
            },
            {
                text: "Zurück in die Stadt fliehen!",
                nextText: 10,
            },
        ],
    },
    {
        id: 17,
        text: "Du schlägst den Kobold in die Fluch und er verletzt dich leicht. Du verlierst 10 Gesundheitspunkte. Du siehst eine Truhe in der Höhle.",
        options: [
            {
                text: "Truhe öffnen",
                setState: (player) => {
                    player.stats["gold"] += 50;
                    player.inventory["ring"] = true;
                },
                nextText: 18,
            },
        ],
    },
    {
        id: 18,
        text: "Du findest den verlorene Ring des mysteriösen Mannes. Außerdem findest du 50 Goldmünzen in der Truhe.",
        options: [
            {
                text: "Zurück in die Stadt",
                nextText: 10,
            },
        ],
    },
    {
        id: 19,
        text: "Frage 1: Wie viele Goldmünzen hast du am Anfang des Spiels im Keller gefunden?",
        options: [
            {
                text: "5",
                nextText: 20,
            },
            {
                text: "10",
                nextText: 10,
            },
            {
                text: "15",
                nextText: 10,
            },
            {
                text: "25",
                nextText: 10,
            },
        ],
    },
    {
        id: 20,
        text: "Richtig! Frage 2: Was wollte der mysteriöse Mann in der Stadt von dir?",
        options: [
            {
                text: "Ein Bier, eine Halskette und ein Schwert",
                nextText: 10,
            },
            {
                text: "Ein Bier, ein Armband und eine Axt",
                nextText: 10,
            },
            {
                text: "Ein Bier, einen Ring und ein Schwert",
                nextText: 21,
            },
            {
                text: "Ein Bier, eine Uhr und ein Schwert",
                nextText: 10,
            },
        ],
    },
    {
        id: 21,
        text: "Auch richtig! Frage 3: Welche Art von Karten waren es im Memory Spiel?",
        options: [
            {
                text: "Rot Herz ♥",
                nextText: 10,
            },
            {
                text: "Schwarz Pik ♠",
                nextText: 10,
            },
            {
                text: "Rot Karo ♦",
                nextText: 22,
            },
            {
                text: "Schwarz Kreuz ♣",
                nextText: 10,
            },
        ],
    },
    {
        id: 22,
        text: "Glück gehabt! Du hast alle Fragen richtig beantwortet und darfst passieren. Jedoch ist die Tür zum Schloss verschlossen. Der Wächter lacht und sagt: Ich habe dir nicht gesagt, dass ich dir den Schlüssel gebe! Die Tür sieht robust aus. Jedoch bist du ein stark genug, um sie einzuschlagen.",
        options: [
            {
                text: "Die Tür genauer untersuchen",
                nextText: 23,
            },
        ],
    },
    {
        id: 23,
        text: "Du musst 2 mal gegen die Tür schlagen. Pass auf, dass du nicht auf etwas anderes schlägst!",
        options: [
            {
                text: "Gegen den Wächter schlagen",
                nextText: 8,
            },
            {
                text: "Gegen die Wand schlagen",
                nextText: 24,
            },
            {
                text: "Gegen die Tür schlagen",
                nextText: 25,
            },
            {
                text: "Gegen den Boden schlagen",
                nextText: 24,
            },
        ],
    },
    {
        id: 24,
        text: "Du hast verfehlt! Versuch es nochmal.",
        options: [
            {
                text: "Weiter...",
                nextText: 23,
            },
        ],
    },
    {
        id: 25,
        text: "Du hast getroffen! Noch 1 mal!",
        options: [
            {
                text: "Gegen die Wand schlagen",
                nextText: 23,
            },
            {
                text: "Gegen die Tür schlagen",
                nextText: 26,
            },
            {
                text: "Gegen den Wächter schlagen",
                nextText: 8,
            },
            {
                text: "Gegen den Boden schlagen",
                nextText: 23,
            },
        ],
    },
    {
        id: 26,
        text: "Du hast die Tür aufgebrochen! Du betrittst das Schloss und siehst vorne im Gang eine weitere Wache. Er sieht nicht sehr freundlich aus. Er bemerkt dich und fragt was du hier zu suchen hast. Was antwortest du?",
        options: [
            {
                text: "Ich bin hier um Rache zu nehmen!",
                requiredState: (player) => player.stats["strength"] >= 25,
                nextText: 27,
            },
            {
                text: "Ich arbeite hier auch! Ich bin der neue Wächter! (lügen)",
                nextText: 28,
            },
            {
                text: "Ich bin hier um zu stehlen!",
                nextText: 27,
            },
        ],
    },
    {
        id: 27,
        text: "Der Wächter läuft ohne zu zögern auf dich zu und greift dich an. Nach einem glorreichen und langen Kampf besiegst du ihn und gehst weiter in den nächsten Raum.",
        options: [
            {
                text: "Weiter...",
                nextText: 29,
            },
        ],
    },
    {
        id: 28,
        text: "Der Wächter lacht und sagt: Du bist nicht der neue Wächter! Er greift dich an. Nach einem glorreichen und langen Kampf besiegst du ihn und gehst weiter in den nächsten Raum.",
        options: [
            {
                text: "Weiter...",
                nextText: 29,
            },
        ],
    },
    {
        id: 29,
        text: "Hier ist eine weitere verschlossene Tür.",
        options: [],
        // Tür aufbrechen
    },
    {
        id: 30,
        text: "Hier ist also das Feld in dem sich das Schwert befinden soll. Du siehst auch Brennessel, diese sind sehr wertvoll. Sammle alle Brennessel und finde das Schwert!",
        options: [
            {
                text: "Zurückgehen",
                nextText: 16,
                // Schwert finden
            },
        ],
    },
    {
        id: 31,
        text: "Du hast die Tür aufgebrochen! Du befindest dich jetzt im Köngissaal. Du siehst den König auf seinem Thron sitzen. Er sieht dich und fragt was du hier zu suchen hast.",
        options: [
            {
                text: "Ich suche den geheimen Schatz, der sich im Schloss befinden soll!",
                nextText: 32,
            },
        ],
    },
    {
        id: 32,
        text: "Du bist nicht der erste, der den Schatz sucht. Du bekommst den Schatz wenn du mich in einem ehrenhaften Duell in Schere, Stein, Papier besiegst. Du musst 3 mal gegen mich gewinnen!",
        options: [],
        // Schere, Stein, Papier
    },
    {
        id: 33,
        text: "Die Stimmen sind verschwunden aber die Tür ist verschlossen.",
        options: [],
        // Tür aufbrechen
    },
    {
        id: 34,
        text: "Du bist der erste der mich besiegen konnte! Hier ist dein Schatz! Du hast gewonnen!\n\nDanke fürs Spielen, probier auch unsere anderen Storys aus!",
        options: [
            {
                text: "Spiel von neu starten",
                nextText: -1,
            },
        ],
    },
];
