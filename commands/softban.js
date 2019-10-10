exports.run = async (client, message, args, level) => {
	const guildSettings = client.settings.get(message.guild.id);
	const Discord = require('discord.js');
	const { caseNumber } = require('../modules/caseNumber.js');

	let member = message.mentions.members.first();
	if (!member) return message.reply('Por favor mencione um membro válido deste servidor');
	if (!member.bannable) return message.reply('Eu não posso dar softban neste usuário! Eles têm um cargo maior? Eu tenho permissões de ban?');

	const modlog = message.guild.channels.find('name', guildSettings.CANAL_DE_LOGS);
	const caseNum = await caseNumber(client, modlog);
	const reason = args.splice(1, args.length).join(' ') || `Sem motivo!`;

	await member.ban({ days: 2, reason: `${message.author.username} Suavemente baniu este usuário com razão: ${reason}` }).then(() => {
		message.guild.unban(member);
		message.reply(`${member.user.tag} (${member.user.id}) foi suavemente banido por ${message.author.tag} Motivo: ${reason}`);
		if (!modlog) return console.log('CANAL_DE_LOGS não existe.');
		const embed = new Discord.RichEmbed()
			.setColor('RED')
			.setTitle('User Softbanned')
			.addField(`Usuário`, `${member.user.tag} (${member.user.id})`, true)
			.addField(`Moderador`, `${message.author.tag} (${message.author.id})`, true)
			.addField(`Motivo`, `${reason}`, true)
			.setFooter(`Case ${caseNum}`);
		  modlog.send({ embed })
			.then(() => {
				client.log('log', `${message.guild.name}/#${message.channel.name} (${message.channel.id}): ${member.user.tag} (${member.user.id}) levou softban por ${message.author.tag} (${message.author.id})`, 'CMD');
			})
			.catch((err) => {
				console.log(err);
			});
	})
		.catch(error => message.reply(`Desculpe ${message.author} Eu não poderia dar softban por causa de : ${error}`));

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['softban'],
	permLevel: 2,
  manu: true
};

exports.help = {
	name: 'SoftBan',
	category: '🛃 Moderação',
	description: 'Bane o usuário mencionado, apagua suas mensagens, em seguida, libere-as',
	usage: 'd!softban [@\\user] [reason]'
};