#! /usr/bin/env node
"use strict";

const clear = require('clear');
const chalk = require('chalk');
const commander = require('commander');
const notifier = require('node-notifier');

const project = require('./package.json');
const teaCups = require('./ascii-cup');

const teaTimer = new commander.Command();
teaTimer
    .usage('<minutes>')
    .description(`
    tea-timer (${project.version})
    Start a timer for your cup of tea 🍵
    `)
    .parse(process.argv);

const LAST_ARG = process.argv[process.argv.length - 1];
if (!LAST_ARG || !Number.isInteger(parseInt(LAST_ARG))) {
    teaTimer.help();
    process.exit(0);
}

let activeFrame = 0;
const TOTAL_SECONDS = parseInt(LAST_ARG, 10) * 60;
const START_TIME = new Date().getTime();

/**
 * Show terminal output
 */
const updateTeacup = setInterval(() => {
    activeFrame = (activeFrame >= 2) ? 0 : activeFrame + 1;

    const SECONDS_LEFT = parseInt(TOTAL_SECONDS - (new Date().getTime() - START_TIME) / 1000, 10);
    const TIME_LEFT_STRING = `${parseInt(SECONDS_LEFT/60)}m ${SECONDS_LEFT%60}s`
    const TIME_LEFT_COLORED = chalk.underline.bgRed.bold(TIME_LEFT_STRING);

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
        process.stdout.write('\x1b]2;' + project.name + ' ' + TIME_LEFT_STRING + '\x1b\x5c');
        console.log(`${chalk.green.bold(teaCups[activeFrame])}\n\nReady in ${TIME_LEFT_COLORED}`);
    }
}, 1000);
