const db = require('quick.db')
const Discord = require('discord.js');

module.exports = (client, member) => {
	if (member.user.id === client.user.id) return;

 var byeMessage = client.guilds.get(member.guild.id).options.byeMessage;
 let text;
  
 if(byeMessage == null) {
   let tex =  'Adeus **{user}**';
   text = tex.replace('{user}', member.user.username).replace('{guild}', member.guild.name);
 } else {
   text = byeMessage.replace('{user}', member.user.username).replace('{guild}', member.guild.name);;
 }

 var byeChannel = client.guilds.get(member.guild.id).options.byeChannel;
		if (client.channels.get(byeChannel)) {
			member.guild.channels.get(byeChannel).send(text)
		};
};