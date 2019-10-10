let Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  if (client.config.musicEnabled !== 'true') return message.channel.send('Comandos de música desativados');
  const serverQueue = client.musicQueue.get(message.guild.id);
  
  	if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
      const embed = new Discord.RichEmbed()
      .setDescription('⏸ Pausei a música para você!')
      .setColor(client.color)
		  return message.channel.send(embed);
		}
      const embed = new Discord.RichEmbed()
      .setDescription('Não há nada tocando ou já está pausada.')
      .setColor(client.color)
		  return message.channel.send(embed);
    
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['pause'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Pause',
	category: '🎵 Música',
	description: 'Pausa a música',
	usage: 'd!pause'
};