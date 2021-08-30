import express from 'express';
import path from 'path';
import fs from 'fs';
import 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

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

//server
const __dirname = path.resolve();
const isDev = process.env.ISDEV === 'true' ? true : false;
const port = isDev ? props.port : process.env.PORT;
const app = express();

//middleware
import handleRequests from './middleware/handleRequests.js';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(handleRequests);

// making everything in public folder static
if (fs.existsSync('./public'))
  app.use('/public', express.static(path.join(__dirname, 'public')));

//routes
fs.readdir('./routes', (err, files) => {
  //stopping if there are errors
  if (err) return;

  // filtering out none js files
  files = files.filter((file) => file.substring(file.indexOf('.') === '.js'));

  // importing and using files
  files.forEach(async (fileName) => {
    // handling route name
    fileName = fileName.substring(0, fileName.indexOf('.'));
    const file = await import(`./routes/${fileName}.js`);
    const { routeName } = await import(`./routes/${fileName}.js`);
    let routerName;

    if (routeName == null) routerName = `/${fileName}`;
    else routerName = routeName;

    // using file
    app.use(routerName, file.default);
  });
});

//listening
app.listen(port, () =>
  console.log(
    'Started Better Express server on port: '[consoleTxtColor] +
      `${port}`[consoleVarColor]
  )
);
import './bot.js';
