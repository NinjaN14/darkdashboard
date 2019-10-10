const Discord = require('discord.js')


exports.run = async (client, message, args, level) => {
  
  if(!args[0]) {

  const buyEmb = new Discord.RichEmbed()
  .setColor(client.color)
  .setTitle(`:candy: ${message.author.username} pegou um doce! :candy:`)
  .setImage('https://data.whicdn.com/images/29808733/original.gif')
  message.channel.send({embed: buyEmb})
  return;
  }
  
  if(!message.mentions.members.first().user.username === message.isMentioned(message.author) ) {

  const candyEmb = new Discord.RichEmbed()
  .setColor(client.color)
  .setTitle(`:candy: ${message.author.username} deu um doce para ${message.mentions.members.first().user.username}! :candy:`)
  .setImage('https://78.media.tumblr.com/427ed12ad003c4dae17f31a198396656/tumblr_nxxqz5SRlY1uf9lmco1_500.gif')
  message.channel.send({embed: candyEmb})
  return;
  }
  const buyEmb = new Discord.RichEmbed()
  .setColor(client.color)
  .setTitle(`:candy: ${message.author.username} pegou um doce! :candy:`)
  .setImage('https://data.whicdn.com/images/29808733/original.gif')
  message.channel.send({embed: buyEmb})

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['givecandy', 'candy', 'doces'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'GiveCandy',
	category: '🎉 Diversão',
	description: 'Dá para alguém um doce',
	usage: 'd!candy [@amigo]'
};