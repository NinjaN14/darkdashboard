const Discord = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

    let user;

    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
  
	const scoreLevel = client.points.get(`${message.guild.id}-${user.id}`).level || 0;
	let embed = new Discord.RichEmbed()
	.setColor(client.color)
	.setAuthor(user.username + ' está no nível ' + scoreLevel)
	.setFooter(client.user.username, client.user.avatarURL)
    !scoreLevel ? message.channel.send('Você não possui nível') : message.channel.send(embed);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['level', 'nível'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Level',
	category: '🎉 Diversão',
	description: 'Bem, vamos ver quantos níveis você tem!',
	usage: 'd!level [@user]'
};