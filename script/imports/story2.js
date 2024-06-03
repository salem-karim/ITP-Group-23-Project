export const textNodes2 = [
    {
        id: 1,
        text: "Du wachst ohne Erinnerung in einem Keller auf und suchst nach hinweisen, was passiert ist.Du bemerkst dass dein rechter Arm Schmerzt und Blut verliert. Du brauchst unbdedingt Medizin.Du findest auf einem Holzbrett eine Notiz",
        options: [
            {
                text: "Dich weiter umsehen",
                setState: (player) => {
                    player.stats["health"] -= 10;
                },
                nextText: 2,
            },
        ],
    },
    {
        id: 2,
        text: "Unter einem tropfenden Wasserhahn findest du einen vermoderten Besen und einen rostigen Eimer, du verlierst Gesundheit",
        options: [
            {
                text: "Mithilfe des Besens und dem Eimer aus dem schmalen Fenster klettern",
                nextText: 3,
            },
            {
                text: "Mithilfe einer Hebelwirkung die Tür aufbrechen",
                requiredState: (player) => !player.missions["memoryMission"],
                setState: (player) => {
                    if (!player.missions["tuchMission"]) {
                        player.stats["health"] -= 20;
                    }
                    player.missions["memoryMission"] = true;
                },
                // tür also next ist 5
                nextText: 33,
            },
            {
                text: "Das Holz des Besens anzünden um besseres Licht zu erzeugen",
                requiredState: (player) => !player.missions["tuchMission"],
                nextText: 4,
            },
            {
                text: "Den staubigen Boden mit dem Besen kehren um nach Hinweise zu suchen",
                requiredState: (player) => !player.missions["tuchMission"],
                nextText: 4,
            },
        ],
    },
    {
        id: 3,
        text: "Du fällst aus dem Fenster und stirbst",
        options: [
            {
                text: "Restart",
                nextText: -1,
            },
        ],
    },
    {
        id: 4,
        text: "Du findest am staubigen Boden eine Klapptür und ein zerrissenes Kleidungsstück. In diesem war ein gelbes Seidentuch eingewickelt.Es fällt dir plötlzlich ein, dass es sich un das Tuch der jageneden Drachenfängerin handelt.Es ist eine Skizze einer Burg, in der es zahlreiche Rohstoffe gäbe.Du brauchst dringend ein Heilmittel gegen die Wunde an deinem rechten Arm.",
        options: [
            {
                text: "Deinen Arm mit dem Kleidungsstück verbinden",
                requiredState: (player) => !player.missions["tuchMission"],
                setState: (player) => {
                    player.missions["tuchMission"] = true;
                },
                nextText: 6,
            },
            {
                text: "Klapptür öffnen, du verlierst immernoch Gesundheit",
                requiredState: (player) => !player.missions["tuchMission"] && player.missions["memoryMission"],
                setState: (player) => {
                    player.stats["health"] -= 10;
                },
                nextText: 12,
            },
            {
                text: "Klapptür öffnen",
                requiredState: (player) => player.missions["tuchMission"] && player.missions["memoryMission"],
                nextText: 12,
            },
            {
                text: "Klapptür öffnen, du verlierst immernoch Gesundheit",
                requiredState: (player) => !player.missions["tuchMission"] && !player.missions["memoryMission"],
                nextText: 7,
            },
            {
                text: "Klapptür öffnen",
                requiredState: (player) => player.missions["tuchMission"] && !player.missions["memoryMission"],
                nextText: 7,
            },
            {
                text: "Mithilfe einer Hebelwirkung die Tür aufbrechen",
                requiredState: (player) => !player.missions["memoryMission"],
                setState: (player) => {
                    if (!player.missions["tuchMission"]) {
                        player.stats["health"] -= 20;
                    }
                    player.missions["memoryMission"] = true;
                },
                nextText: 33,
            },
        ],
    },
    {
        id: 5,
        text: "Du hast die Tür aufgebrochen, hinter ihr befindet sich ein Raum.",
        options: [
            {
                text: "Dich weiter umschauen? Du verlierst immernoch Gesundheit",
                requiredState: (player) => !player.missions["tuchMission"],
                setState: (player) => {
                    player.stats["health"] -= 10;
                },
                nextText: 8,
            },
            {
                text: "Dich weiter umschauen?",
                requiredState: (player) => player.missions["tuchMission"],
                nextText: 8,
            },
        ],
    },
    {
        id: 6,
        text: "Du hast dein Arm mit dem Kleidungsstück verbunden, du verliertst keine Gesundheit mehr",
        options: [
            {
                text: "Weiter...",
                nextText: 4,
            },
        ],
    },
    {
        id: 7,
        text: "Die Klapptür ist verschlossen.",
        options: [
            {
                text: "Zurück",
                setState: (player) => {
                    if (!player.missions["tuchMission"]) {
                        player.stats["health"] -= 10;
                    }
                },
                nextText: 4,
            },
        ],
    },
    {
        id: 8,
        text: "Im Raum findest du an der Wand eine Strombox mit farbigen abgerissenen Stromkabeln was tun?",
        options: [
            {
                text: "Die Kabel mit den gleichen verbinden",
                // Memory next ist 10
                nextText: 15,
            },
            {
                text: "Die Stromkabel auf die Wunde zu halten um vielleicht die Wunde zu schließen",
                setState: (player) => {
                    player.stats["health"] = 0;
                },
                nextText: 9,
            },
            {
                text: "Sie versuchen zufällig zu verbinden",
                nextText: 11,
            },
            {
                text: "Die Kabel auf die Zunge geben, un zu schauen ob sie Strom führen",
                setState: (player) => {
                    player.stats["health"] = 0;
                },
                nextText: 9,
            },
        ],
    },
    {
        id: 9,
        text: "Die Kabel fließen Hochspannungsstron, du stirbst",
        options: [
            {
                text: "Restart",
                nextText: -1,
            },
        ],
    },
    {
        id: 10,
        text: "Du hast die Kabel verbunden, du hörst ein Geräusch im Raum daneben.",
        options: [
            {
                text: "Nachsehen, du verlierst immernoch Gesundheit",
                requiredState: (player) => !player.missions["tuchMission"],
                setState: (player) => {
                    player.stats["health"] -= 10;
                },
                nextText: 2,
            },
            {
                text: "Nachsehen und die Klapptür öffnen",
                requiredState: (player) => player.missions["tuchMission"],
                nextText: 12,
            },
        ],
    },
    {
        id: 11,
        text: "Du hast die Kabel zufällig verbunden und es passiert nichts",
        options: [
            {
                text: "Zurück zum Raum",
                nextText: 8,
            },
        ],
    },
    {
        id: 12,
        text: "Die Klapptür geht auf. was tun?",
        options: [
            {
                text: "Herunterspringen",
                requiredState: (player) => player.stats["health"] < 50,
                nextText: 14,
            },
            {
                text: "Herunterspringen",
                requiredState: (player) => player.stats["health"] >= 50,
                setState: (player) => {
                    player.equipment[0] = "Axt";
                    player.stats["gold"] += 3;
                },
                nextText: 16,
            },
            {
                text: "Langsam und leise herunterschleichen",
                requiredState: (player) => player.stats["health"] < 50,
                nextText: 13,
            },
            {
                text: "Langsam und leise herunterschleichen",
                requiredState: (player) => player.stats["health"] >= 50,
                setState: (player) => {
                    player.equipment[0] = "Axt";
                    player.stats["gold"] += 3;
                },
                nextText: 16,
            },
        ],
    },
    {
        id: 13,
        text: "Du hast zu lange gebraucht und bist gestorben",
        options: [
            {
                text: "Restart",
                nextText: -1,
            },
        ],
    },
    {
        id: 14,
        text: "Du bist gestorben, der Fall war zu hoch",
        options: [
            {
                text: "Restart",
                nextText: -1,
            },
        ],
    },
    {
        id: 15,
        text: "Mit den Kabeln Memory spielen um sie zu verbinden.",
        options: [],
        // Memory spielen
    },
    {
        id: 16,
        text: "Du bemerkst das du in einem Dachboden warst.Unten findest du: 2 Flaschen (1. H2O2 und 2. H2O), einen wietern Teil der Notiz, eine Axt un 3 Goldstücke.",
        options: [
            {
                text: "H2O trinken und den Rest einstecken",
                setState: (player) => {
                    player.stats["health"] += 10;
                },
                nextText: 18,
            },
            {
                text: "H2O2 trinken und den Rest einstecken",
                setState: (player) => {
                    player.stats["health"] = 0;
                },
                nextText: 17,
            },
        ],
    },
    {
        id: 17,
        text: "Du bist gestorben, H2O2 ist giftig",
        options: [
            {
                text: "Restart",
                nextText: -1,
            },
        ],
    },
    {
        id: 18,
        text: "Du hast das H2O getrunken und fühlst dich besser",
        options: [
            {
                text: "Weiter zur Burg",
                nextText: 19,
            },
        ],
    },
    {
        id: 19,
        text: "Du bist an der Burg angekommen, du siehst einen Graben rund um die Pechschwarze Burg,der mit Wasser befüllt ist und vin Alligatoren bewacht wird.Die Brücke, welche zum Haupttor führt wird von 3 Riesen bewacht. was tun?",
        options: [
            {
                text: "Die Flasche H2O2 aus dem Rucksack nehmen und Trinken, um Kraft zu tanken",
                setState: (player) => {
                    player.stats["health"] = 0;
                },
                nextText: 17,
            },
            {
                text: "In den Graben springen und mit der Axt die Alligatoren bekämpfen",
                setState: (player) => {
                    player.stats["health"] = 0;
                },
                nextText: 20,
            },
            {
                text: "Die Wächter höflich um Einlass bitten",
                setState: (player) => {
                    player.stats["health"] = 0;
                },
                nextText: 22,
            },
            {
                text: "nach einem anderen Eingang suchen",
                setState: (player) => {
                    player.stats["gold"] += 7;
                },
                nextText: 21,
            },
        ],
    },
    {
        id: 20,
        text: "Merkst du selber, die Alligatoren sind zu stark und du stirbst",
        options: [
            {
                text: "Restart",
                nextText: -1,
            },
        ],
    },
    {
        id: 21,
        text: "Bei der Suche findest du eine Kiste mit 7 Goldstücken und einem Haifischzahn. Du steckst Gegenstände ein. Dabei wirst du von einem Zwerg erwischt. Er bittet dich um Hilfe: Der Zwerg erzählt, dass er nicht bei Next Zwergenmodel mitmachen könnte weil er zu dunkle Haare hat. „Wenn du mir nicht hilfst, um bei Next Zwergenmodel mitzumachen, verrate ich dem Wächter, dass du Gold stiehlst“, sagt er. Was machst du?",
        options: [
            {
                text: "Die Flasche H2O2 auf den Kopf des Zwergen schütten",
                nextText: 23,
            },
            {
                text: "Dem Zwerg gegen das Schienbein treten und weglaufen",
                nextText: 22,
            },
        ],
    },
    {
        id: 22,
        text: "Der Wächter sieht dich und wirft dich zurück in den Keller",
        options: [
            {
                text: "Restart",
                nextText: -1,
            },
        ],
    },
    {
        id: 23,
        text: "Das H2O2 bleicht die Haare des Zwerges und er erstrahlt in einem wunderschönen Blond.Voller Freude gibt er dir Medizin (endlich kannst du wieder scharf sehen) und ein Seil. Er meint, dass man damit am leichtesten in die Burg gelangt.",
        options: [
            {
                text: "Weiter...",
                nextText: 24,
            },
        ],
    },
    {
        id: 24,
        text: "Du bist nun endlich verarztet und kannst dich auf den Weg ins gemütliche Bettchen machen.Beim nach Hause gehen findest du einen Zettel auf dem Boden.\nDu hebst ihn auf und merkst, dass es sich um den fehlenden Teil der Notiz vom Dachboden handelt.",
        options: [
            {
                text: "Weiter...",
                nextText: 25,
            },
        ],
    },
    {
        id: 25,
        text: "Finde einen Weg in die Burg",
        options: [
            {
                text: "Mit dem Seil des Zwerges durch eine Dachluke Klettern",
                nextText: 26,
            },
            {
                text: "mit der Axt einen Baum fällen und daraus einen Stabhochsprungstab Schnitzen um über die 17 Meter hohen Wände zu Springen",
                nextText: 22,
            },
            {
                text: "Mit der Axt den Haupteingang aufbrechen",
                nextText: 22,
            },
            {
                text: "Durch das Wasser des Burggrabens schwimmen",
                nextText: 20,
            },
        ],
    },
    {
        id: 26,
        text: "Vor dir ist ein Haufen Goldstücke und weit und breit keine Bewacher. Was machst du? Denk daran, dass jedes Goldstück im Rucksack die Flucht erschwert",
        options: [
            {
                text: "Du nimmst genau 35 Goldstücke",
                setState: (player) => {
                    player.stats["gold"] += 35;
                },
                nextText: 27,
            },
            {
                text: "Du nimmst genau 100 Goldstücke",
                setState: (player) => {
                    player.stats["gold"] += 100;
                },
                nextText: 28,
            },
            {
                text: "Du nimmst den ganzen Haufen mit",
                setState: (player) => {
                    player.stats["gold"] += 250;
                },
                nextText: 28,
            },
            {
                text: "Du nimmst genau 1 Goldstücke",
                setState: (player) => {
                    player.stats["gold"] += 1;
                },
                nextText: 30,
            },
        ],
    },
    {
        id: 27,
        text: "Du hast 35 Goldstücke genommen und bist entkommen, was nun?",
        options: [
            {
                text: "Das Gold zum Vermieter deines Besten Freundes bringen",
                nextText: 34,
            },
            {
                text: "Mit dem Gold abhauen und bezahle für deinen Urlaub",
                nextText: 31,
            },
        ],
    },
    {
        id: 28,
        text: "Du hast zu viel Gold genommen und dir ist Gold aus der Tasche gefallen, ein Wächter hat dich gesehen und umgebracht",
        options: [
            {
                text: "Restart",
                nextText: -1,
            },
        ],
    },
    {
        id: 29,
        text: "Dummy",
        options: [
            {
                text: "Spiel von neu starten",
                nextText: -1,
            },
        ],
    },
    {
        id: 30,
        text: "Du hast 1 Goldstück genommen und bist entkommen, was nun?",
        options: [
            {
                text: "Das Gold zum Vermieter deines Besten Freundes bringen",
                nextText: 32,
            },
        ],
    },
    {
        id: 31,
        text: "Du hast das Land geflohen und chillst jetzt am Strand!\n\nDanke fürs Spielen, probier auch unsere anderen Storys aus!",
        options: [
            {
                text: "Spiel von neu starten",
                nextText: -1,
            },
        ],
    },
    {
        id: 32,
        text: "Du hast das Gold zum Vermieter deines Besten Freundes gebracht, er lacht dich ausEr sagt aber wenn du ihn in Schere Stein Papier besiegen könntest befreit er deinen Freund",
        options: [],
        // Schere, Stein, Papier
    },
    {
        id: 33,
        text: "Die Tür aufbrechen.",
        options: [],
        // Tür aufbrechen
    },
    {
        id: 34,
        text: "Der Vermieter deines Besten Freundes befreit deinen Freund!\n\nDanke fürs Spielen, probier auch unsere anderen Storys aus!",
        options: [
            {
                text: "Spiel von neu starten",
                nextText: -1,
            },
        ],
    },
];
