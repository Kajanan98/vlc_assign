const data = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  " ": " ",
};

const encodeToMorse = (message) => {
  let morseCode = "";

  for (let i = 0; i < message.length; i++) {
    morseCode += data[message.charAt(i).toLowerCase()] + " ";
  }

  return morseCode;
};

const encodeToBin = (message) => {
  const morse = encodeToMorse(message);
  let bin = [];
  for (let i = 0; i < morse.length; i++) {
    const code = morse[i];
    if (code == ".") {
      bin.push(1);
    } else if (code == "-") {
      bin.push(1);
      bin.push(1);
    }
    bin.push(0);
  }
  return bin;
};

export { encodeToMorse, encodeToBin };
