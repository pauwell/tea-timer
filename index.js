"use strict";
const clear = require('clear');
const chalk = require('chalk');
const commander = require('commander');

const teacups = [
chalk`{gray
    ((((
    ((((
     ))))}
  _ .---.
 ( |\`---'|
  \\|     |
  : .___, :
   \`-----'
`,
chalk`{gray
    ((((
    ))))
    ((((}
  _ .---.
 ( |\`---'|
  \\|     |
  : .___, :
   \`-----'
`,
chalk`{gray
    ((((
    ((((
    ((((}
  _ .---.
 ( |\`---'|
  \\|     |
  : .___, :
   \`-----'
`
];

const program = new commander.Command();
program
    .version('0.0.1')
    .description('Start a timer for your cup of tea 🍵')
    .command('teatimer <minutes>')
    .description('Time waiting (in minutes)')
    .parse(process.argv);

if (program.version) {
    const packagejson = require('./package.json');
    console.log(packagejson.version);
}

if (!program.args.length || !Number.isInteger(parseInt(program.args[0]))) {
    program.help();
    process.exit(0);
}

let activeFrame = 0;
const TOTAL_SECONDS = parseInt(LAST_ARG, 10) * 60;
const START_TIME = new Date().getTime();

setInterval(() => {
    activeFrame = (activeFrame >= 2) ? 0 : activeFrame + 1;
    const SECONDS_LEFT = parseInt(TOTAL_SECONDS - (new Date().getTime() - START_TIME) / 1000, 10);
    const TIME_LEFT_COLORED = chalk.underline.bgRed.bold(`${parseInt(SECONDS_LEFT/60)}m ${SECONDS_LEFT%60}s`);
    clear();
    console.log(`${chalk.green.bold(teacups[activeFrame])}\n\nReady in ${TIME_LEFT_COLORED}`);
}, 1000);
