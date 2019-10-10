module.exports = (client, guild) => {
	wait(1000); // eslint-disable-line no-undef
	client.log('[LOG]', `Entrei em ${guild.name} (${guild.id})`, 'GUILD');
  let db = require('quick.db');
  
  db.fetch(`guildSettings_${guild.id}_welcomeChannel`).then(welcomeChannel => {
  db.fetch(`guildSettings_${guild.id}_byeChannel`).then(byeChannel => {
  db.fetch(`guildSettings_${guild.id}_welcomeMessage`).then(welcomeMessage => {
  db.fetch(`guildSettings_${guild.id}_byeMessage`).then(byeMessage => {
  db.fetch(`guildSettings_${guild.id}_welcomeAutoRole`).then(welcomeAutoRole => {
  db.fetch(`guildSettings_${guild.id}_showInServersList`).then(showInServersList => {
    
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