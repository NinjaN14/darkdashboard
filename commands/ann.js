const Discord = require('discord.js')
exports.run = async (client, message, args, level) => {
	message.delete(5000)
	if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.reply('Você não tem permissão para isso!')
	var texto = args.join(' ');
	if (!texto) return message.reply('Diga um texto seu bobinho!').then(msg => msg.delete(5000))

	let annEmbed = new Discord.RichEmbed()
		.setTitle('Anúncio')
		.setAuthor(client.user.username, client.user.displayAvatarURL)
		.setColor(client.color)
		.setDescription(texto)
		.setFooter(`Anúnciado por ${message.author.tag}`);

	message.reply(
		`Você que quer fazer este anúncio, você mencionará cerca de ${message.guild.memberCount} pessoas. Diga **Sim** para Confirmar ou **Cancelar** para Cancelar seu anúncio.`
	).then(msg => msg.delete(5000))
	message.channel.awaitMessages(response => response.content === 'Sim', {
		max: 1,
		time: 10000,
		errors: ['time'],
	}).then((collected) => {
		message.channel.send('@here')
		message.channel.send(annEmbed)
	});

	message.channel.awaitMessages(response => response.content === 'Cancelar', {
		max: 1,
		time: 10000,
		errors: ['time'],
	}).then((collected) => {
		message.channel.send(':x: Cancelado com Sucesso')
	});

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['anúncio', 'ann'],
	permLevel: 4,
  manu: false
};

exports.help = {
	name: 'Anúncio',
	category: '🛃 Moderação',
	description: 'Faz um anúncio aos meembros daquele canal',
	usage: 'd!ann [texto]'
};