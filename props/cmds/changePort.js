import fs from 'fs';

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

export default {
    check: (res) => {
        if (res.substring(0, 6) === 'port =') {
            return true;
        }

        return false;
    },
    run: (res) => {
        const newPort = Number(res.substring(res.indexOf('=') + 1));
        const propsFile = JSON.parse(fs.readFileSync('./props/default.json'));
        propsFile.port = newPort;
        fs.writeFileSync('./props/default.json', JSON.stringify(propsFile));
        console.log(
            `Changed Port to: `[consoleTxtColor] + `${newPort}`[consoleVarColor]
        );
    },
};
