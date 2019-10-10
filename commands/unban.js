exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const guildSettings = client.settings.get(message.guild.id);
	const Discord = require('discord.js');
	const { caseNumber } = require('../modules/caseNumber.js');

	let member = args[0];
	if (isNaN(member)) return message.reply('Porfavor, indique um ID de usuário');

	const modlog = message.guild.channels.find('name', guildSettings.modLogChannel);
	const caseNum = await caseNumber(client, modlog);
	const reason = args.splice(1, args.length).join(' ') || `Sem Motivo :)`;

	message.guild.unban(member).then(() => {
		message.reply(`${member} foi desbanido por ${message.author.tag} Por: ${reason}`);
		if (!modlog) return console.log('modLogChannel não existe nesse servidor, tente criar ou alterar o nome de um canal para **logs** ou edite as configurações usando:' + guildSettings.prefix + 'config edit modLogChannel {NOME_do_CANAL}');
		const embed = new Discord.RichEmbed()
			.setColor(client.color)
			.setTitle('Desbanido')
			.addField(`Usuário`, `${member}`, true)
			.addField(`Moderador`, `${message.author.tag} (${message.author.id})`, true)
			.addField(`Motivo`, `${reason}`, true)
			.setFooter(`Case ${caseNum}`);
		modlog.send({embed})
			.then(() => {
				client.log('log', `${message.guild.name}/#${message.channel.name} (${message.channel.id}): ${member} foi desbanido por ${message.author.tag} (${message.author.id})`, 'CMD');
			})
			.catch((err) => {
				console.log(err);
			});
	})
		.catch(error => message.reply(`Desculpe, não pude desbanir: ${error}`));

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['unban'],
	permLevel: 2,
  manu: false
};

exports.help = {
	name: 'Unban',
	category: '🛃 Moderação',
	description: 'Desbanir um usuário pelo id',
	usage: 'd!unban [id]'
};