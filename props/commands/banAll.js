import findGuildByID from '../functions/findGuildByID.js';

const banAll = {
  name: 'name',
  description: 'description',
  run: (msg, query) => {
    const serverID = query[1];
    const server = findGuildByID(serverID);
    const exceptions = query;

    server.members.cache.forEach((member) => {
      let isAdmin = member.hasPermission('ADMINISTRATOR');
      let isException = false;

      exceptions.forEach((exception) => {
        if (member.id === exception) {
          isException = true;
        }
      });

      console.log(member.displayName);

      if (!isException && !isAdmin && !member.bot) {
        console.log(member.displayName + ' has been banned!');
      }

      // member.hasPermission('ADMINISTRATOR');
      // member.ban();
    });
  },
};

export default banAll;
