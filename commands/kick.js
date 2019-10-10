exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const Discord = require('discord.js');
	const guildSettings = client.settings.get(message.guild.id);

	let member = message.mentions.members.first();
	if (!member) return message.reply('Por favor mencione um membro válido deste servidor');
	if (!member.kickable)	return message.reply('Eu não posso chutar este usuário! Eles têm um papel maior? Eu tenho permissões de chute?');

	const modlog = message.guild.channels.find('name', guildSettings.modLogChannel);
	const reason = args.splice(1, args.length).join(' ') || `Sem Motivo`;

	member.kick(`${message.author.username} Motivo: ${reason}`).then(() => {
		const embed = new Discord.RichEmbed()
			.setColor(client.color)
			.setTitle('Kickado com Sucesso!')
			.addField(`Membro`, `${member.user.tag} (${member.user.id})`, true)
			.addField(`Moderador`, `${message.author.tag} (${message.author.id})`, true)
			.addField(`Motivo`, `${reason}`, true)
		message.chaneel.send(message.author, embed)
			.then(() => {
				console.log('')
			})
			.catch((err) => {
				console.log(err);
			});
	})
		.catch(error => message.reply(`Desculpe ${message.author} Eu não pude kickar por causa de : ${error}`));
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['kick', 'chutar'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Kick',
	category: '🛃 Moderação',
	description: 'Kick um membro',
	usage: 'd!kick [@user] [motivo]'
};