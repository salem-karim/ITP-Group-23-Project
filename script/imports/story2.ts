import { Player } from "./player.js";

interface Option {
  text: string;
  setState?: (player: Player) => void;
  requiredState?: (player: Player) => boolean;
  nextText: number;
}

interface TextNode {
  id: number;
  text?: string;
  options: Option[];
}

export const textNodes: TextNode[] = [
  {
    id: 1,
    text: "Du wachst ohne Erinnerung in einem Keller auf und suchst nach hinweisen, was passiert ist.\nDu bemerkst dass dein rechter Arm Schmerzt und Blut verliert. Du brauchst unbdedingt Medizin.\nDu findest auf einem Holzbrett eine Notiz",
    options: [
      {
        text: "Dich weiter umsehen",
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
    text: "Unter einem tropfenden Wasserhahn findest du einen vermoderten Besen und einen rostigen Eimer",
    options: [
      {
        text: "Mithilfe des Besens und dem Eimer aus dem schmalen Fenster klettern",
        nextText: 3,
      },
      {
        text: "Mithilfe einer Hebelwirkung die Tür aufbrechen",
        setState: (player: Player) => {
          if (!player.inventory["yellowScarf"]) {
            player.stats.health -= 10;
          }
        },
        nextText: 33,
      },
      {
        text: "Das Holz des Besens anzünden um besseres Licht zu erzeugen",
        requiredState: (player: Player) => !player.inventory["yellowScarf"],
        nextText: 5,
      },
      {
        text: "Den staubigen Boden mit dem Besen kehren um nach Hinweise zu suchen",
        requiredState: (player: Player) => !player.inventory["yellowScarf"],
        nextText: 5,
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
    text: "Du hast die Tür aufgebrochen, hinter ihr befindet sich ein Raum.",
    options: [
      {
        text: "Dich weiter umschauen? Du verlierst immernoch Gesundheit",
        requiredState: (player: Player) => !player.inventory["yellowScarf"],
        nextText: 5,
      },
      {
        text: "Dich weiter umschauen?",
        requiredState: (player: Player) => player.inventory["yellowScarf"],
        nextText: 5,
      },
    ],
  },
  {
    id: 5,
    text: "Du findest am Boden eine Klapptür und ein zerrissenes Kleidungsstück. In diesem war ein gelbes Seidentuch eingewickelt.\nEs fällt dir plötlzlich ein, dass es sich un das Tuch der jageneden Drachenfängerin handelt.\nEs ist eine Skizze einer Burg, in der es zahlreiche Rohstoffe gäbe.\nDu brauchst dringend ein Heilmittel gegen die Wunde an deinem rechten Arm.",
    options: [
      {
        text: "Deinen Arm mit dem Kleidungsstück verbinden",
        requiredState: (player: Player) => !player.inventory["yellowScarf"],
        setState: (player: Player) => {
          player.inventory["yellowScarf"] = true;
        },
        nextText: 5,
      },
      {
        text: "Klapptür öffnen",
        nextText: 7,
      },
      {
        text: "Zurück",
        nextText: 2,
      },
      {
        text: "Mithilfe einer Hebelwirkung die Tür aufbrechen",
        setState: (player: Player) => {
          if (!player.inventory["yellowScarf"]) {
            player.stats.health -= 10;
          }
        },
        nextText: 33,
      },
    ],
  },
  {
    id: 6,
    text: "Du hast dein Arm mit dem Kleidungsstück verbunden, du verliertst keine Gesundheit mehr",
    options: [
      {
        text: "Weiter...",
        nextText: 5,
      },
    ],
  },
  {
    id: 7,
    text: "Die Klapptür ist verschlossen, du verlierst immernoch Gesundheit",
    options: [
      {
        text: "Zurück",
        setState: (player: Player) => {
          player.stats.health -= 10;
        },
        nextText: 5,
      },
    ],
  },
  // {
  //   id: 5,
  //   text: "Du hast die Tür aufgebrochen, aber verlierst 20 Gesundheit.",
  //   options: [
  //     {
  //       text: "Weiter...",
  //       setState: (player: Player) => {
  //         player.stats.health -= 20;
  //       },
  //       nextText: 7,
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   text: "Am Boden findet er ein zerrissenes Kleidungsstück. Eingewickelt in diesem Befindet sich ein gelbes Seidentuch. Und plötzlich fällt ihm wieder ein Erinnerungsfetzen letzter Nacht ein. Es handelt sich um das Tuch der jagenden Drachenfängerin. Sie hatte eine Skizze zu einer Burg angefertigt, in der es zahlreiche Rohstoffe gäbe. Wozu er diese Info benötigen wurde, ist noch unklar aber für die Heilung der Wunde wäre Medizin dringend notwendig.",
  //   options: [],
  // },
  {
    id: 33,
    text: "Die Tür aufbrechen.",
    options: [],
    // Tür aufbrechen
  },
];
