/**
 * @typedef {Object} optionTypes
 * @property {boolean} underline
 * @property {boolean} bold
 */

/**
 * @typedef {Object} ezOptions
 * @property {string} red
 * @property {string} green
 * @property {string} blue
 * @property {string} yellow
 * @property {string} magenta
 * @property {string} cyan
 * @property {string} white
 * @property {Object} background
 * @property {string} background.red
 * @property {string} background.green
 * @property {string} background.blue
 * @property {string} background.yellow
 * @property {string} background.magenta
 * @property {string} background.cyan
 * @property {string} background.white
 */

/**
 * @type {optionTypes}
 */
const options = {
  underline: false,
  bold: false,
};

const allColors = [
  "black/30",
  "red/31",
  "green/32",
  "yellow/33",
  "blue/34",
  "magenta/35",
  "cyan/36",
  "white/37",
];

const backgroundColors = [
  "black/40",
  "red/41",
  "green/42",
  "yellow/43",
  "blue/44",
  "magenta/45",
  "cyan/46",
  "white/47",
];

/**
 *
 * @param {string} message
 * @param {optionTypes} options
 * @returns
 */
const getModifiedText = (message, option, col) => color(col, message, option);

/**
 *
 * @param {*} array
 * @returns {Object}
 */
const _constructObject = (array) =>
  array.reduce(
    (a, v) => ({
      ...a,
      [v.split("/")[0]]: (message, option) =>
        getModifiedText(message, option, v.split("/")[1]),
    }),
    {}
  );

const colors = _constructObject(allColors);
const bgColor = _constructObject(backgroundColors);

/**
 * @type {ezOptions}
 */
const ez = {
  ...{ ...colors },
  background: {
    ...{ ...bgColor },
  },
};

/**
 *
 * @param {*} color
 * @param {*} text
 * @param {optionTypes} option
 * @returns {string}
 */
const color = (color, text = "", option = options) => {
  return `\x1b[${option?.underline ? 4 + ";" : 0}${
    option?.bold ? 1 + ";" : 0
  }${color}m${text}\x1b[0m`;
};

module.exports = ez;
