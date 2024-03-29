const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');
const goldElement = document.getElementById('gold');
const healthElement = document.getElementById('health');
const strengthElement = document.getElementById('strength');

let state = {};

function startGame() {
  state = {
    gold: 0,
    health: 100,
    strength: 10
  };
  showTextNode(1);
  updatePlayerStats();
}

function updatePlayerStats() {
  goldElement.textContent = state.gold;
  healthElement.textContent = state.health;
  strengthElement.textContent = state.strength;
}


function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
  updatePlayerStats();
}

const textNodes = [
  {
    id: 1,
    text: 'Willkommen zu unserem Text Adventure Game!',
    options: [
      {
        text: 'Spiel starten',
        setState: { health: 100, strength: 10, gold: 0, sword: false, shield: false },
        nextText: 2
      }
      
    ]
  },
  {
    id: 2,
    text: 'Du erwachst in einem unbekannten Keller und hast keine Ahnung wo du bist. Du hast Durst. Hast du schonwieder getrunken?',
    options: [
      {
        text: 'Sieh dich im Keller nach etwas nützlichen um',
        setState: {  gold: 5, },
        nextText: 3
      },
      {
        text: 'Trink von einem unbekannten blauen Trank',
        setState: { health: 0 },
        nextText: 4
      },
      {
        text: 'Erstmal umsehen und nach einer Tür suchen',
        nextText: 7
      }
    ]
  },
  {
    id: 3,
    text: 'Nachdem du den Keller durchsucht hast, findest du 5 Goldmünzen. Du siehst eine Tür und hörst Stimmen dahinter. Was willst du tun?',
    options: [
      {
        text: 'Stürme lautstart den Raum und fordere die Stimmen heraus',
        setState: { health: 0},
        nextText: 5
      },
      {
        text: 'Warte bis die Stimmen verschwinden und öffne die Tür leise',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Das war offensichtlich kein Wasser. Du stirbst.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Es waren diejenigen, die dich gefangen haben. Sie töten dich.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Du kannst dich langsam erinnern, du warst in einer Kneipe und hast dich mit einem alten Mann unterhalten. Er hat dir von einem Schatz in einem Schloss erzählt. Du hast nach dem Kneipen besuch offenbar noch dein Glück versucht und wurdest gefangen genommen. Du bist in einem Schloss.',
    options: [
      {
        text: 'Weiter...',
        nextText: 8
      }
    ]
  },
  {
    id: 7,
    text: 'Du siehst eine Tür und hörst Stimmen dahinter. Was willst du tun?',
    options: [
      {
        text: 'Stürme lautstart den Raum und fordere die Stimmen heraus',
        setState: { health: 0 },
        nextText: 5
      },
      {
        text: 'Warte bis die Stimmen verschwinden und öffne die Tür leise',
        nextText: 6
      }
    ]
  },
  {
    id: 8,
    text: 'Du musst erstmal aus dem Schloss entkommen. Du siehst einen Wächter vor dir. Er ist riesig und hat eine Axt. Was willst du tun?',
    options: [
      {
        text: 'ABHAUEN',
        setState: { health: 50 },
        nextText: 11
      },
      {
        text: 'Einen lächerlichen Faustkampf beginnen',
        setState: { health: 0 },
        nextText: 9
      },
      {
        text: 'Ihn bitten dich durchzulassen und ihm 5 Goldmünzen anbieten',
        requiredState: (currentState) => currentState.gold >= 5,
        setState: { gold: 0, health: 0 },
        nextText: 10
      }
    ]
  },
  {
    id: 9,
    text: 'Merkst du selber, oder? Du stirbst.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Der Wächter nimmt das Gold und tötet dich trotzdem. Du bist tot.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Du entkommst dem Wächter nur knapp, aber er hat dich verletzt. Du läufst erstmals richtung Stadt.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 12,
    text: 'blabla',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  }
]

startGame()