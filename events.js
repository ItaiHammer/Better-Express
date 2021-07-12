import 'colors';
import nodemon from 'nodemon';
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

nodemon({ script: './app.js' })
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
