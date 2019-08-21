"use strict";
const clear = require('clear');
const chalk = require('chalk');

const teacups = [
`    )
   °(
   __)__
C\\|     \\
  \\ Tea /
   \\___/`,
`    (
      ) °
   °_(__
C\\|     \\
  \\ Tea /
   \\___/`
];

const LAST_ARG = process.argv[process.argv.length - 1];
if (!Number.isInteger(parseInt(LAST_ARG))) {
    console.log(`
Usage: teatimer [seconds]

Start a timer for your cup of tea 🍵

FLAGS:
    -h, --help      Prints help information
    -v, --version   Prints version information
`);
    process.exit(1);
}
let activeFrame = 0;
const TOTAL_SECONDS = parseInt(LAST_ARG, 10) * 60;
const START_TIME = new Date().getTime();

setInterval(() => {
    activeFrame = (activeFrame >= 1) ? 0 : 1;
    const SECONDS_LEFT = parseInt(TOTAL_SECONDS - (new Date().getTime() - START_TIME) / 1000, 10);
    const TIME_LEFT_COLORED = chalk.underline.bgRed.bold(`${parseInt(SECONDS_LEFT/60)}m ${SECONDS_LEFT%60}s`);
    clear();
    console.log(`${chalk.yellow.bold(teacups[activeFrame])}\n\nYour 🍵 is ready in ${TIME_LEFT_COLORED}`);
}, 1000);