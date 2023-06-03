import config from "./config.js";

const regex1 = new RegExp(".{1," + config.bitsPerColour.toString() + "}", "g");

const encodeToBin = (message) => {
  // Convert the message to binary data
  const binaryData = encodeURIComponent(message)
    .split("")
    .map((char) => {
      return char.charCodeAt(0).toString(2).padStart(8, "0");
    })
    .join("");
  return binaryData;
};

const getColour = (binary) => {
  const intVal = parseInt(binary, 2);
  const base3Str = intVal.toString(config.noOfColourSeq).padStart(3, "0");
  let colour = "#";
  for (let i = 0; i < base3Str.length; i++) {
    colour += config.rgbValues[parseInt(base3Str[i])];
  }
  return colour;
};

export const textToColor = (message) => {
  const binaryData = encodeToBin(message);
  const binaryGroups = binaryData.match(regex1).map((group) => {
    return group.padEnd(3, "0");
  });

  const colorSequence = binaryGroups.map((binary) => getColour(binary));
  return colorSequence;
};

const packWithNumber = (number, data) => {
  const numberSequence = textToColor(number);
  const dataSequence = textToColor(data);
  return [
    getColour("10000"),
    ...numberSequence,
    getColour("10001"),
    ...dataSequence,
  ];
};

export const encode = (message) => {
  const colorSequence = message
    .split(" ")
    .map((word, index) => packWithNumber(index, word));
  return colorSequence.flat();
};
