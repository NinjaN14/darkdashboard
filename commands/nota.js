const Discord = require('discord.js');
exports.run = async (client, message, args) => {
	const snekfetch = require('snekfetch');
	if (!args.slice(0).join(' ')) return message.reply('Diga algo para eu anotar!')
	snekfetch.post('https://hastebin.com/documents')
		.send(args.slice(0)
			.join(' '))
		.then(body => {

			const HastebinEmbed = new Discord.RichEmbed()
				.setTitle('Nota Adionada com Sucesso!')
				.setColor(client.color)
				.setAuthor('Hastebin', 'https://pbs.twimg.com/profile_images/1664989409/twitter_400x400.png')
				.setDescription('\nURL: https://hastebin.com/' + body.body.key)
			message.channel.send(HastebinEmbed);
		});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['nota'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Nota',
	category: '💈 Utilitários',
	description: 'Adiona um texto ao site Hastebin e lhe gera um link',
	usage: 'd!nota [texto]'
};