exports.run = async (client, message, args, level) => {
	if (client.config.musicEnabled !== 'true') return message.channel.send('Comandos de música desativados');
	const serverQueue = client.musicQueue.get(message.guild.id);

	if (!message.member.voiceChannel) return message.channel.send('Você não está em um canal de voz!');
	if (!serverQueue) return message.channel.send('Não há nada jogando que eu possa pular para você.');
	console.log(serverQueue);
	serverQueue.connection.dispatcher.end('O comando Skip foi usado!');
	console.log(serverQueue);
	return undefined;

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['skip'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Skip',
	category: '🎵 Música',
	description: 'Passa uma música em andamento',
	usage: 'd!skip'
};