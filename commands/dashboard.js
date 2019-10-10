const Discord = require('discord.js')
exports.run = async (client, message, args, level) => {
  const embe = new Discord.RichEmbed()
  .addField('Dashboard','https://darkdashboard.glitch.me/me',true)
  .addField('Perfil','https://darkdashboard.glitch.me/user/473491713684668416',true)
  .addField('Guild Manager','https://darkdashboard.glitch.me/manage/' + message.guild.id)
  .addField('Pagina Inicial','https://darkdashboard.glitch.me/')
  .addField('Login','https://darkdashboard.glitch.me/login',true)
  .addField('Admin','https://darkdashboard.glitch.me/admin',true)
  .setColor(client.color)
  
  message.channel.send(embe)
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['webdashboard'],
	permLevel: 10,
  manu: false
};

exports.help = {
	name: 'dashboard',
	category: '🔧 Sistema',
	description: 'Indisponivel',
	usage: 'Indisponivel'
};