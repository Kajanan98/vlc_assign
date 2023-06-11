const unitTime=1000
const tolerance= 125


const morseToAlphabetMap = {
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    "-----": "0",
    ".-.-.-": ".",
    "--..--": ",",
    "..--..": "?",
    ".----.": "'",
    "-.-.--": "!",
    "-..-.": "/",
    "-.--.": "(",
    "-.--.-": ")",
    ".-...": "&",
    "---...": ":",
    "-.-.-.": ";",
    "-...-": "=",
    ".-.-.": "+",
    "-....-": "-",
    "..--.-": "_",
    ".-..-.": '"',
    "...-..-": "$",
    ".--.-.": "@",
    " " : " ",
};

const removeZeros=(receivedData)=>{
    const signals = [...receivedData]

    while(signals.length >0 && signals[0][0]==0){
        signals.shift()
    }
    while(signals.length >0 && signals[signals.length-1][0]==0){
        signals.pop()
    }
    return signals
}

const getBinData = (signals) => {
  const signalsWithTime = signals.map((signal) => [
    signal[0],
    signal[1] - signals[0][1],
  ]);

  const groups = [];
  const groupsWithTolerance = [];
  for (
    let i = 0;
    i <= Math.round(signalsWithTime[signalsWithTime.length - 1][1] / 1000);
    i++
  ) {
    groups.push([]);
    groupsWithTolerance.push([]);
  }

  for (let i = 0; i < signalsWithTime.length; i++) {
    const frameTime = signalsWithTime[i][1];
    const groupIndex = Math.floor(frameTime / 1000);
    groupsWithTolerance[groupIndex].push(signalsWithTime[i][0]);
    groups[groupIndex].push(signalsWithTime[i][0]);
    // console.log(groupIndex ,frameTime )

    if (groupIndex * unitTime + tolerance > frameTime && groupIndex > 0) {
      groupsWithTolerance[groupIndex - 1].push(signalsWithTime[i][0]);
      // console.log(groupIndex - 1,frameTime, "-" )
    }

    if (
      (groupIndex + 1) * unitTime - tolerance < frameTime &&
      groupIndex + 1 < signalsWithTime.length
    ) {
      groupsWithTolerance[groupIndex + 1].push(signalsWithTime[i][0]);
      // console.log(groupIndex + 1,frameTime, "+" )
    }
  }
  console.log(signalsWithTime);
  console.log(groupsWithTolerance);

  const binData = [];
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    const groupWT = groupsWithTolerance[i];
    if (
      group.length > 1 &&
      group.reduce((a, b) => a + b) / group.length == 0.5
    ) {
      binData.push(
        Math.round(
          groupWT.length > 1
            ? groupWT.reduce((a, b) => a + b) / groupWT.length
            : 0
        )
      );
    } else {
      binData.push(
        Math.round(
          group.length > 1 ? group.reduce((a, b) => a + b) / group.length : 0
        )
      );
    }
  }

  return binData;
};

const decodeToBin = (receivedData) => {
  try {
    const signals = removeZeros(receivedData);
    const binData = getBinData(signals);

    console.log(binData.join(" "));
    return binData;
  } catch (error) {
    console.log("Error in decode to bin");
    console.log(error);
    return [];
  }
};

const decodeBinToMessage = (binData) => {
  while (binData.length > 0 && binData[binData.length - 1][0] == 0) {
    binData.pop();
  }
  let decoded_string = "";

  let j = 0;
  const length = binData.length;

  while (j < length) {
    if (binData[j] == 1) {
      if (j + 1 == length || binData[j + 1] == 0) {
        decoded_string += ".";
        j += 1;
      } else {
        decoded_string += "-";
        j += 2;
      }
    } else if (j + 1 < length && binData[j + 1] == 0) {
      if (j + 2 == length || binData[j + 2] == 1) {
        decoded_string += " ";
        j += 2;
      } else {
        decoded_string += "  ";
        j += 4;
      }
    } else {
      j++;
    }
  }

  const decodeMessage = (morseCode) => {
    let words = morseCode.split("  ");
    let message = "";
    for (let j = 0; j < words.length; j++) {
      let codes = words[j].split(" ");
      for (let i = 0; i < codes.length; i++) {
        if (morseToAlphabetMap[codes[i]] === undefined) {
          message += "_";
        } else {
          message += morseToAlphabetMap[codes[i]];
        }
      }
      message += " ";
    }
    return message;
  };

  const message = decodeMessage(decoded_string);

  console.log("decoded string : ", decoded_string);
  console.log("message : ", message);

  return message;
};

export { decodeToBin, decodeBinToMessage };