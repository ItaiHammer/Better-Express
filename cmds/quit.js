import fs from 'fs';
import childProcess from 'child_process';
const { exec } = childProcess;

//files
const props = JSON.parse(fs.readFileSync('./props/default.json'));

//props
const consoleTxtColor =
    props.consoleTxtColor == null || props.consoleTxtColor === ''
        ? 'cyan'
        : props.consoleTxtColor;

export default {
    read: 'quit',
    shortcut: 'q',
    run: () => {
        setTimeout(() => {
            console.log('Quitting...'[consoleTxtColor]);
            exec(`Taskkill /IM node.exe /F`);
        }, 0);
    },
};
