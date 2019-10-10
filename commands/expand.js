const Bypasser = require('node-bypasser');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	if (!args[0]) return message.reply('URL curto para expandir não determinado');
	var w = new Bypasser(args[0]);
	w.decrypt(function(err, result) {
		if (err) {
			console.log(err);
			message.channel.send('Ocorreu um erro ao expandir o URL');
			return;
		}
    const Discord = require('discord.js');
    const Embed = new Discord.RichEmbed()
    .setTitle('Expanção')
    .setColor(client.color)
    .setDescription(`URL Curto: ${args[0]} \n URL Original: ${result}`)
    .setFooter(message.author.username, message.author.avatarURL);
		message.channel.send(Embed);
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['expand', 'expandir'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Expand',
	category: '💈 Utilitários',
	description: 'Obtenha o URL longo que um URL curto redireciona',
	usage: 'd!expand [URL curto]'
};