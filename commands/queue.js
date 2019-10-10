exports.run = async (client, message, args, level) => {
const Discord = require('discord.js')
   if (client.config.musicEnabled !== 'true') return message.channel.send('Comandos de música desativados');
   const serverQueue = client.musicQueue.get(message.guild.id);

   if (!serverQueue) return message.channel.send('Não há nada tocando.');
   const embed = new Discord.RichEmbed()
   .setTitle('Lista de Reprodução')
   .setColor(client.color)
   .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
   .setDescription(`**Tocando Agora:** ${serverQueue.songs[0].title}`)
   .setFooter(client.user.username, client.user.avatarURL);
		return message.channel.send(embed);
    
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['queue'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Queue',
	category: '🎵 Música',
	description: 'Verifique o que vai tocar',
	usage: 'd!queue'
};