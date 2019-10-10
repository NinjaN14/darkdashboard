let Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  if (client.config.musicEnabled !== 'true') return message.channel.send('Comandos de música desativados');
  const serverQueue = client.musicQueue.get(message.guild.id);
  
  	if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
      const embed = new Discord.RichEmbed()
      .setDescription('▶ Resumi a música para você!')
      .setColor(client.color)
			return message.channel.send(embed);
		}
      const embed = new Discord.RichEmbed()
      .setDescription('Não há nada tocando.')
      .setColor(client.color)
		  return message.channel.send(embed);
    
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['resume'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Resume',
	category: '🎵 Música',
	description: 'Continua uma música que havia sido pausada',
	usage: 'd!resume'
};