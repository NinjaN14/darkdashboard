// This event executes when a new guild (server) is left.

module.exports = (client, guild) => {
	client.log('[LOG]', `Saí de ${guild.name} (${guild.id})`, 'GUILD');
  let db = require('quick.db');

  db.set(`guildSettings_${guild.id}_welcomeChannel`, undefined).then(welcomeChannel => {
  db.set(`guildSettings_${guild.id}_byeChannel`, undefined).then(byeChannel => {
  db.set(`guildSettings_${guild.id}_welcomeMessage`, undefined).then(welcomeMessage => {
  db.set(`guildSettings_${guild.id}_byeMessage`, undefined).then(byeMessage => {
  db.set(`guildSettings_${guild.id}_welcomeAutoRole`, undefined).then(welcomeAutoRole => {
  db.set(`guildSettings_${guild.id}_showInServersList`, undefined).then(showInServersList => {
    
  const guildSettings = {
   welcomeChannel: welcomeChannel,
   byeChannel: byeChannel,
   welcomeMessage: welcomeMessage,
   byeMessage: byeMessage,
   welcomeAutoRole: welcomeAutoRole,
  };

  client.guilds.get(guild.id).options =  guildSettings;

  });
  });
  });
  });
  });
  });
};