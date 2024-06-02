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
    text: "Welche Klasse möchtest du spielen?",
    options: [
      {
        text: "Barbare",
        nextText: 2,
      },
      {
        text: "Krieger",
        nextText: 2,
      },
      {
        text: "Magier",
        nextText: 2,
      },
      {
        text: "Dieb",
        nextText: 2,
      },
    ],
  },
];
