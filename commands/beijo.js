const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	let kiss = [
		"https://media1.tenor.com/images/395b565d26a74bcf6b6fc8cea50df021/tenor.gif",
		"http://cdn.smosh.com/wp-content/uploads/ftpuploads/bloguploads/awkward-kiss-little-girl.gif",
		"https://thumbs.gfycat.com/BasicPeskyGuillemot-max-1mb.gif",
		"https://i.pinimg.com/originals/fe/64/e9/fe64e9e2f16ced383c0cb69e5f71722d.gif",
		"http://25.media.tumblr.com/e7f39c316f0923710c9b12e9583455ba/tumblr_mj7yrrtFaa1s7cfr2o1_500.gif",
		"https://media2.giphy.com/media/TkDX9bkIROf8k/giphy.gif",
		"http://gifimage.net/wp-content/uploads/2017/09/anime-gif-kiss-11.gif",
		"https://i.imgur.com/eisk88U.gif",
		"https://i.pinimg.com/originals/42/c3/85/42c3851fc31dc3434dfe5fa7e3463f1d.gif",
		"https://i.makeagif.com/media/7-05-2015/553Vsb.gif",
		"https://i.gifer.com/2II9.gif",
		"http:/http://gif-finder.com/wp-content/uploads/2015/09/Angry-Birds-Orange-Kiss.gif/a.fod4.com/images/GifGuide/michael_scott/119477_o.gif",
		"http://gif-finder.com/wp-content/uploads/2015/09/Angry-Birds-Orange-Kiss.gif",
		"https://media1.tenor.com/images/a3e63e98f0344a2e9a040ea5df3769b0/tenor.gif",
		"https://media1.tenor.com/images/fb92d0be78a1ea19af0168c0ca29c1bd/tenor.gif?itemid=5615952",

	]
	let hugresult = Math.floor((Math.random() * kiss.length));
	if (!args[0]) {
		const ghembed = new Discord.RichEmbed()
			.setColor(client.color)
			.setTitle(`${message.author.username} beija a si mesmo ...! (esquisito)`)
			.setImage('https://cdn.discordapp.com/attachments/452115003659780096/460369555823525898/kiss.gif')
		message.channel.send({
			embed: ghembed
		}).then(msg => msg.delete(7000))
		return;
	}
	if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
		const hembed = new Discord.RichEmbed()
			.setColor(client.color)
			.setTitle(`${message.author.username} deu um beijinho para ${message.mentions.members.first().user.username}! Que doce!`)
			.setImage(kiss[hugresult])
		message.channel.send({
			embed: hembed
		})
		return;
	}
	const ghembed = new Discord.RichEmbed()
		.setColor(client.color)
		.setTitle(`${message.author.username} beijou-se ...! (esquisito)`)
		.setImage('https://cdn.discordapp.com/attachments/452115003659780096/460369555823525898/kiss.gif')
	message.channel.send({
		embed: ghembed
	})
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['beijo', 'beija', 'beijinho'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Beijo',
	category: '🎉 Diversão',
	description: 'Dá um beijinho em alguém',
	usage: 'd!beijo [@user]'
};