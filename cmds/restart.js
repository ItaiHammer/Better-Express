import fs from 'fs';
import nodemon from 'nodemon';

//files
const props = JSON.parse(fs.readFileSync('./props/default.json'));

//props
const consoleTxtColor =
    props.consoleTxtColor == null || props.consoleTxtColor === ''
        ? 'cyan'
        : props.consoleTxtColor;

export default {
    read: 'restart',
    shortcut: 'r',
    run: () => {
        console.log('Restarting...'[consoleTxtColor]);
        nodemon.emit('restart');
    },
};
