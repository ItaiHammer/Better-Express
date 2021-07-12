import 'colors';
import fs from 'fs';

//files
const props = JSON.parse(fs.readFileSync('./props/default.json'));

//props
const logRequests = props.logRequests;
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

export default function (req, res, next) {
  if (logRequests) {
    const before = Date.now();
    const url = req.url;

    res.on('finish', () => {
      const after = Date.now();
      const status = res.statusCode;
      const time = after - before;

      console.log(
        `${req.method} ${url} `[consoleAlertColor] +
          `${status} `[status >= 400 && status <= 598 ? 'red' : 'green'] +
          `${time}ms `[consoleAlertColor]
      );
    });
  }

  next();
}
