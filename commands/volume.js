const Discord = require('discord.js')
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const serverQueue = client.musicQueue.get(message.guild.id);

if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('Você não tem permissão para isso!')

if(args[0] > 10) {
  message.reply('Você não pode utilizar mais de **10** volumes, pois isso pode prejudicar a qualidade de audio!')

}

if (!message.member.voiceChannel) return message.channel.send('Você não está em um canal de voz.');
		if (!serverQueue) return message.channel.send('Não está tocando nada aqui');
		if (!args[0]) return message.channel.send(`O volume atual é: **${serverQueue.volume}**`);
		serverQueue.volume = args[0];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(`Eu setei o volume para: **${args[0]}**`);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['volume'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Volume',
	category: '🎵 Música',
	description: 'Altera o voulme da múscia do bot',
	usage: 'd!volume [número de 1 a 10]'
};