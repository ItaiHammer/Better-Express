# Better Express

Better Express is an NPM module for creating a custom environment with extra features for Express development.

## Installation

Use npx to install Better Express.

```bash
npx better-express app-name
```

## Usage

Once you installed the template project you can start up the express server using the following command:

```bash
npm start
```

## Nodemon

Better Express uses an NPM module called [Nodemon](https://nodemon.io/) for restarting the server on save([Documentation](https://github.com/remy/nodemon#nodemon)).

If you have a file that you don't want nodemon to restart when it saves you can add its path to the ignore array on the `nodemon.json` file.

## About Props

You can customize your Better Express experiance by changing the props! (the props are basically like settings)
In the main directory, you can find a props folder, if you open the file called `defualt.json` you can see all of the properties for the application.<br>
<img src="./bin\img\Props Capture.JPG" ><br>

## Props

Here is a list of all of the props and what they do.
In parentheses after each prop is its type, and after that in italics you can see if it is required or not. (_Required_ means you can't leave it blank or as an empty string because it has no default value)

- **Port** (Int) _Required_ **-** This is the port the Better Express application is going use.

- **logRequests** (Bool) _Required_ **-** This lets the application to notify you when you get a request.

- **logEvents** (Bool) _Required_ **-** This notfies you when events get triggered (like crash, restart, exit etc).

- **logRestartCause** (Bool) _Required_ **-** This notfies you when more information about a restart event.

- **consoleTxtColor** (String) _Not Required_ **-** This is the color of normal text from Better Express in the console.
  Default value:

  ```json
  "cyan"
  ```

- **consoleVarColor** (String) _Not Required_ **-** This is the color of variables from Better Express in the console.

  Default value:

  ```json
  "green"
  ```

- **consoleAlertColor** (String) _Not Required_ **-** This is the color of alerts from Better Express in the console.

  Default value:

  ```json
  "white"
  ```

- **consoleErrorColor** (String) _Not Required_ **-** This is the color of error messages from Better Express in the console.

  Default value:

  ```json
  "red"
  ```

## License

[MIT](https://choosealicense.com/licenses/mit/)
