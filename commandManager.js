import fs from 'fs';

let time = 0;
setInterval(() => {
  time = time + 0.001;
}, 1);

async function commands(files) {
  await files.forEach(async (fileName) => {
    const file = await import(`./commands/${fileName}`);
    console.log(`2${file}`);
  });
}

async function getCommands() {
  let files;

  await fs.readdir('./commands', async (err, filesList) => {
    files = filesList;
  });

  setTimeout(() => {
    commands(files);
    console.log(`1${files}`);
  }, 0);
}

getCommands();

export default [];
