import { Player } from "./player.js";

interface Option {
  text: string;
  setState?: (player: Player) => void;
  requiredState?: (player: Player) => boolean;
  nextText: number;
}

interface TextNode {
  id: number;
  text: string;
  options: Option[];
}

export const textNodes: TextNode[] = [
  {
    id: 1,
    text: "Du wachst ohne Erinnerung in einem Keller auf und suchst nach hinweisen, was passiert ist.\nDu bemerkst dass dein rechter Arm Schmerzt und Blut verliert. Du brauchst unbdedingt Medizin.\nDu findest auf einem Holzbrett eine Notiz",
    options: [
      {
        text: "Dich weiter umsehen",
        setState: (player: Player) => {
          player.stats["health"] -= 10;
        },
        nextText: 2,
      },
      {
        text: "Notiz lesen",
        nextText: 50,
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
        setState: (player: Player) => {
          if (!player.missions["tuchMission"]) {
            player.stats["health"] -= 20;
          }
        },
        // tür also next ist 5
        nextText: 33,
      },
      {
        text: "Das Holz des Besens anzünden um besseres Licht zu erzeugen",
        requiredState: (player: Player) => !player.missions["tuchMission"],
        nextText: 4,
      },
      {
        text: "Den staubigen Boden mit dem Besen kehren um nach Hinweise zu suchen",
        requiredState: (player: Player) => !player.missions["tuchMission"],
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
    text: "Du findest am staubigen Boden eine Klapptür und ein zerrissenes Kleidungsstück. In diesem war ein gelbes Seidentuch eingewickelt.\nEs fällt dir plötlzlich ein, dass es sich un das Tuch der jageneden Drachenfängerin handelt.\nEs ist eine Skizze einer Burg, in der es zahlreiche Rohstoffe gäbe.\nDu brauchst dringend ein Heilmittel gegen die Wunde an deinem rechten Arm.",
    options: [
      {
        text: "Deinen Arm mit dem Kleidungsstück verbinden",
        requiredState: (player: Player) => !player.missions["tuchMission"],
        setState: (player: Player) => {
          player.missions["tuchMission"] = true;
        },
        nextText: 6,
      },
      {
        text: "Klapptür öffnen, du verlierst immernoch Gesundheit",
        requiredState: (player: Player) =>
          !player.missions["tuchMission"] && player.missions["doorMission"],
        setState: (player: Player) => {
          player.stats["health"] -= 10;
        },
        nextText: 12,
      },
      {
        text: "Klapptür öffnen",
        requiredState: (player: Player) =>
          player.missions["tuchMission"] && player.missions["doorMission"],
        nextText: 12,
      },
      {
        text: "Klapptür öffnen, du verlierst immernoch Gesundheit",
        requiredState: (player: Player) =>
          !player.missions["tuchMission"] && !player.missions["doorMission"],
        nextText: 7,
      },
      {
        text: "Klapptür öffnen",
        requiredState: (player: Player) =>
          player.missions["tuchMission"] && !player.missions["doorMission"],
        nextText: 7,
      },
      {
        text: "Mithilfe einer Hebelwirkung die Tür aufbrechen",
        requiredState: (player: Player) => !player.missions["doorMission"],
        setState: (player: Player) => {
          if (!player.missions["tuchMission"]) {
            player.stats["health"] -= 20;
          }
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
        requiredState: (player: Player) => !player.missions["tuchMission"],
        setState: (player: Player) => {
          player.stats["health"] -= 10;
        },
        nextText: 8,
      },
      {
        text: "Dich weiter umschauen?",
        requiredState: (player: Player) => player.missions["tuchMission"],
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
        setState: (player: Player) => {
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
        setState: (player: Player) => {
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
        setState: (player: Player) => {
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
        requiredState: (player: Player) => !player.missions["tuchMission"],
        setState: (player: Player) => {
          player.stats["health"] -= 10;
        },
        nextText: 2,
      },
      {
        text: "Nachsehen und die Klapptür öffnen",
        requiredState: (player: Player) => player.missions["tuchMission"],
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
    text: "Die Klapprür geht auf. was tun?",
    options: [
      {
        text: "Herunterspringen",
        requiredState: (player: Player) => player.stats["health"] < 50,
        nextText: 14,
      },
      {
        text: "Herunterspringen",
        requiredState: (player: Player) => player.stats["health"] >= 50,
        setState: (player: Player) => {
          player.equipment[0] = "Axt";
          player.stats["gold"] += 3;
        },
        nextText: 16,
      },
      {
        text: "Langsam und leise herunterschleichen",
        requiredState: (player: Player) => player.stats["health"] < 50,
        nextText: 13,
      },
      {
        text: "Langsam und leise herunterschleichen",
        requiredState: (player: Player) => player.stats["health"] >= 50,
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
    text: "Unten findest du: 2 Flaschen (1. H2O2 und 2. H2O), einen wietern Teil der Notiz, eine Axt un 3 Goldstücke.",
    options: [
      {
        text: "H2O trinken und den Rest einstecken",
        setState: (player: Player) => {
          player.stats["health"] += 20;
          player.inventory["H2O2"] = true;
        },
        nextText: 18,
      },
      {
        text: "H2O2 trinken und den Rest einstecken",
        setState: (player: Player) => {
          player.stats["health"] = 0;
        },
        nextText: 17,
      },
      {
        text: "Notiz lesen",
        nextText: 50,
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
    id: 33,
    text: "Die Tür aufbrechen.",
    options: [],
    // Tür aufbrechen
  },
];
