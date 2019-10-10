// Code from: https://github.com/iCrawl/Music-Bot
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	if (client.config.musicEnabled !== 'true') return message.channel.send('Comandos de música desativados');
	const serverQueue = client.musicQueue.get(message.guild.id);
    
	if (!message.member.voiceChannel) return message.reply('Você não está em um canal de voz!');
	if (!serverQueue) return message.reply('Não há nada que eu possa fazer para você.');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end('O comando de parada foi usado!');
  message.channel.send('**O comando de parada foi usado**!')
	return undefined;
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['stop'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Stop',
	category: '🎵 Música',
	description: 'Pára a música e limpa a fila',
	usage: 'd!stop'
};