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

//route imports
//!import your routes here
import index from './routes/index.js';
import getPort from './routes/getPort.js';

//routes
//!use your routes here
app.use('/', index);
app.use('/getport', getPort);

//listening
app.listen(port, () =>
  console.log(
    'Started Better Express server on port: '[consoleTxtColor] +
      `${port}`[consoleVarColor]
  )
);
