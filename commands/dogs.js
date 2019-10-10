const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
     const rps = require('random-puppy');
     const img = await rps()
     const embed = new Discord.RichEmbed()
     .setTitle('Dogs')
     .setColor(client.color)
     .setImage(img)
     message.channel.send(embed)
  };

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['dogs', 'cachorrinho', 'cachorrinhos'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Cachorrinho',
	category: '🎉 Diversão',
	description: 'Mostra um cachorrinho',
	usage: 'd!dogs'
};