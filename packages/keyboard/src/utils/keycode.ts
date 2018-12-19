export function keyByName(keyName: string) {
  keyName = keyName.toUpperCase()
  const key = keyMap.find(({ aliases }) => aliases.includes(keyName))
  if (!key) return null

  return key
}

export function keyByCode(keyCode: number) {
  const key = keyMap.find(({ code }) => code === keyCode)
  if (!key) return null

  return key
}

const keyMap = [
  {
    aliases: ['BACKSPACE'],
    code: 8,
  },
  {
    aliases: ['TAB'],
    code: 9,
  },
  {
    aliases: ['ENTER'],
    code: 13,
  },
  {
    aliases: ['SHIFT'],
    code: 16,
  },
  {
    aliases: ['CONTROL', 'CTRL'],
    code: 17,
  },
  {
    aliases: ['ALT'],
    code: 18,
  },
  {
    aliases: ['PAUSE'],
    code: 19,
  },
  {
    aliases: ['CAPSLOCK', 'CAPS'],
    code: 20,
  },
  {
    aliases: ['ESCAPE', 'ESC'],
    code: 27,
  },
  {
    aliases: ['SPACE'],
    code: 32,
  },
  {
    aliases: ['PAGEUP'],
    code: 33,
  },
  {
    aliases: ['PAGEDOWN'],
    code: 34,
  },
  {
    aliases: ['END'],
    code: 35,
  },
  {
    aliases: ['HOME'],
    code: 36,
  },
  {
    aliases: ['LEFT'],
    code: 37,
  },
  {
    aliases: ['UP'],
    code: 38,
  },
  {
    aliases: ['RIGHT'],
    code: 39,
  },
  {
    aliases: ['DOWN'],
    code: 40,
  },
  {
    aliases: ['INSERT'],
    code: 45,
  },
  {
    aliases: ['DELETE', 'DEL'],
    code: 46,
  },
  {
    aliases: ['0'],
    code: 48,
  },
  {
    aliases: ['1'],
    code: 49,
  },
  {
    aliases: ['2'],
    code: 50,
  },
  {
    aliases: ['3'],
    code: 51,
  },
  {
    aliases: ['4'],
    code: 52,
  },
  {
    aliases: ['5'],
    code: 53,
  },
  {
    aliases: ['6'],
    code: 54,
  },
  {
    aliases: ['7'],
    code: 55,
  },
  {
    aliases: ['8'],
    code: 56,
  },
  {
    aliases: ['9'],
    code: 57,
  },
  {
    aliases: ['A'],
    code: 65,
  },
  {
    aliases: ['B'],
    code: 66,
  },
  {
    aliases: ['C'],
    code: 67,
  },
  {
    aliases: ['D'],
    code: 68,
  },
  {
    aliases: ['E'],
    code: 69,
  },
  {
    aliases: ['F'],
    code: 70,
  },
  {
    aliases: ['G'],
    code: 71,
  },
  {
    aliases: ['H'],
    code: 72,
  },
  {
    aliases: ['I'],
    code: 73,
  },
  {
    aliases: ['J'],
    code: 74,
  },
  {
    aliases: ['K'],
    code: 75,
  },
  {
    aliases: ['L'],
    code: 76,
  },
  {
    aliases: ['M'],
    code: 77,
  },
  {
    aliases: ['N'],
    code: 78,
  },
  {
    aliases: ['O'],
    code: 79,
  },
  {
    aliases: ['P'],
    code: 80,
  },
  {
    aliases: ['Q'],
    code: 81,
  },
  {
    aliases: ['R'],
    code: 82,
  },
  {
    aliases: ['S'],
    code: 83,
  },
  {
    aliases: ['T'],
    code: 84,
  },
  {
    aliases: ['U'],
    code: 85,
  },
  {
    aliases: ['V'],
    code: 86,
  },
  {
    aliases: ['W'],
    code: 87,
  },
  {
    aliases: ['X'],
    code: 88,
  },
  {
    aliases: ['Y'],
    code: 89,
  },
  {
    aliases: ['Z'],
    code: 90,
  },
  {
    aliases: ['GUI', 'WIN'],
    code: 91,
  },
  {
    aliases: ['CONTEXTMENU'],
    code: 93,
  },
  {
    aliases: ['NUMPAD0'],
    code: 96,
  },
  {
    aliases: ['NUMPAD1'],
    code: 97,
  },
  {
    aliases: ['NUMPAD2'],
    code: 98,
  },
  {
    aliases: ['NUMPAD3'],
    code: 99,
  },
  {
    aliases: ['NUMPAD4'],
    code: 100,
  },
  {
    aliases: ['NUMPAD5'],
    code: 101,
  },
  {
    aliases: ['NUMPAD6'],
    code: 102,
  },
  {
    aliases: ['NUMPAD7'],
    code: 103,
  },
  {
    aliases: ['NUMPAD8'],
    code: 104,
  },
  {
    aliases: ['NUMPAD9'],
    code: 105,
  },
  {
    aliases: ['MULTIPLY'],
    code: 106,
  },
  {
    aliases: ['ADD'],
    code: 107,
  },
  {
    aliases: ['SUBTRACT'],
    code: 109,
  },
  {
    aliases: ['DECIMAL'],
    code: 110,
  },
  {
    aliases: ['DIVIDE'],
    code: 111,
  },
  {
    aliases: ['F1'],
    code: 112,
  },
  {
    aliases: ['F2'],
    code: 113,
  },
  {
    aliases: ['F3'],
    code: 114,
  },
  {
    aliases: ['F4'],
    code: 115,
  },
  {
    aliases: ['F5'],
    code: 116,
  },
  {
    aliases: ['F6'],
    code: 117,
  },
  {
    aliases: ['F7'],
    code: 118,
  },
  {
    aliases: ['F8'],
    code: 119,
  },
  {
    aliases: ['F9'],
    code: 120,
  },
  {
    aliases: ['F10'],
    code: 121,
  },
  {
    aliases: ['F11'],
    code: 122,
  },
  {
    aliases: ['F12'],
    code: 123,
  },
  {
    aliases: ['NUMLOCK'],
    code: 144,
  },
  {
    aliases: ['SCROLLLOCK'],
    code: 145,
  },
  {
    aliases: [';'],
    code: 186,
  },
  {
    aliases: ['='],
    code: 187,
  },
  {
    aliases: [','],
    code: 188,
  },
  {
    aliases: ['-'],
    code: 189,
  },
  {
    aliases: ['.'],
    code: 190,
  },
  {
    aliases: ['/'],
    code: 191,
  },
  {
    aliases: ['`'],
    code: 192,
  },
  {
    aliases: ['['],
    code: 219,
  },
  {
    aliases: ['\\'],
    code: 220,
  },
  {
    aliases: [']'],
    code: 221,
  },
  {
    aliases: ["'"],
    code: 222,
  },
]
