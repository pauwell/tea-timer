#! /usr/bin/env node
"use strict";

const clear = require('clear');
const chalk = require('chalk');
const commander = require('commander');
const notifier = require('node-notifier');
const project = require('./package.json');
const teacups = require('./ascii-cup');

const teaTimer = new commander.Command();
teaTimer
    .usage('<minutes>')
    .description(`
    tea-timer (${project.version})
    Start a timer for your cup of tea 🍵
    `)
    .parse(process.argv);

const minutes = process.argv[process.argv.length - 1];
if (!minutes || !Number.isInteger(parseInt(minutes))) {
    teaTimer.help();
    process.exit(0);
}

let activeFrame = 0;
const TOTAL_SECONDS = parseInt(minutes, 10) * 60;
const START_TIME = new Date().getTime();

const updateTeacup = setInterval(() => {
    activeFrame = (activeFrame >= 2) ? 0 : activeFrame + 1;

    const SECONDS_LEFT = parseInt(TOTAL_SECONDS - (new Date().getTime() - START_TIME) / 1000, 10);
    const TIME_LEFT_COLORED = chalk.underline.bgRed.bold(`${parseInt(SECONDS_LEFT/60)}m ${SECONDS_LEFT%60}s`);

    clear();

    if (SECONDS_LEFT <= 0) {
        console.log(chalk.bgMagenta.bold('TEA TIME <3'));
        notifier.notify({
            title: 'Tea time!',
            message: 'Sir, your tea is ready!',
            sound: true
          });
        clearInterval(updateTeacup);
    } else {
        console.log(`${chalk.green.bold(teacups[activeFrame])}\n\nReady in ${TIME_LEFT_COLORED}`);
    }
}, 1000);
