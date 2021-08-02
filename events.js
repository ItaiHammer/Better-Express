import 'colors';
import nodemon from 'nodemon';
import fs from 'fs';
import dotEnv from 'dotEnv';
dotEnv.config();
import childProcess from 'child_process';
const { exec } = childProcess;
import input from 'input';

//files
const props = JSON.parse(fs.readFileSync('./props/default.json'));

//props
const consoleTxtColor =
    props.consoleTxtColor == null || props.consoleTxtColor === ''
        ? 'cyan'
        : props.consoleTxtColor;
const consoleVarColor =
    props.consoleVarColor == null || props.consoleVarColor === ''
        ? 'green'
        : props.consoleVarColor;
const consoleAlertColor =
    props.consoleAlertColor == null || props.consoleAlertColor === ''
        ? 'white'
        : props.consoleAlertColor;
const consoleErrorColor =
    props.consoleErrorColor == null || props.consoleErrorColor === ''
        ? 'red'
        : props.consoleErrorColor;
const logEvents = props.logEvents == null ? true : props.logEvents;
const logRestartCause =
    props.logRestartCause == null ? true : props.logRestartCause;
const openTabOnStart =
    props.openTabOnStart == null ? true : props.openTabOnStart;
const isDev = process.env.ISDEV === 'true' ? true : false;
const port = isDev ? props.port : process.env.PORT;

// commands
const commandList = [
    {
        read: 'restart',
        shortcut: 'r',
        run: () => {
            console.log('Restarting...'[consoleTxtColor]);
            nodemon.emit('restart');
        },
    },
    {
        read: 'quit',
        shortcut: 'q',
        run: () => {
            console.log('Quitting...'[consoleTxtColor]);
            nodemon.emit('quit');
        },
    },
    {
        check: (res) => {
            if (res.substring(0, 6) === 'port =') {
                return true;
            }

            return false;
        },
        run: (res) => {
            const newPort = Number(res.substring(res.indexOf('=') + 1));
            const propsFile = JSON.parse(
                fs.readFileSync('./props/default.json')
            );
            propsFile.port = newPort;
            fs.writeFileSync('./props/default.json', JSON.stringify(propsFile));
            console.log(
                `Changed Port to: `[consoleTxtColor] +
                    `${newPort}`[consoleVarColor]
            );
            setTimeout(() => {
                nodemon.emit('restart');
            }, 0);
        },
    },
];

async function commands() {
    // commands input
    const res = await input.text('-');

    // checking for all of the commands
    commandList.forEach((command) => {
        if (res === command.read || res === command.shortcut) {
            command.run(res);
        }
        if (command.check != null) {
            if (command.check(res)) command.run(res);
        }
    });

    // checking for more commands
    commands();
}

nodemon({ script: './app.js' })
    .on('start', () => {
        // checking for commands
        commands();
    })
    .on('crash', () => {
        if (logEvents)
            console.log(`Better Express server has crashed`[consoleErrorColor]);
    })
    .on('quit', () => {
        nodemon.emit('quit');
        if (logEvents) console.log(`App has quit`[consoleErrorColor]);
    })
    .on('restart', (files) => {
        if (logEvents === true)
            console.log(`Restarting Better Express Server`[consoleTxtColor]);

        if (logRestartCause)
            console.log(`Server restarted due to: ${files}`[consoleAlertColor]);
    });

if (openTabOnStart) {
    exec(`start chrome http://localhost:${port}`, (err) => {
        if (err) {
            console.error(err);
        }
    });
}
