import client from '../bot.js';

export default function (guildID) {
  let foundGuild = null;

  client.guilds.cache.forEach((guild) => {
    if (guild.id === guildID) foundGuild = guild;
  });

  return foundGuild;
}
