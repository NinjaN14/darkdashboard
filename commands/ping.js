const Discord = require('discord.js');

exports.run = (client, message, args, level) => {
  const embed = new Discord.RichEmbed()
  .setTitle('Ping')
  .setColor(client.color)
  .setDescription(`:ping_pong: Meu Ping\ **${Date.now() - message.createdTimestamp}**ms , Discord API Ping **${Math.round(client.ping)}**ms`)
   message.channel.send(message.author, embed);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['ping'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Ping',
	category: '💈 Utilitários',
	description: 'Exibe o tempo de resposta do Bot!',
	usage: 'd!ping'
};