const Discord = require('discord.js');
const shorten = require('isgd');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  if (!args[0]) return message.reply('Uso correto: **d!short [URL] [titulo]**');

  if (!args[1]) {
   
    shorten.shorten(args[0], function(res) {
      if (res.startsWith('Error:')) return message.reply('**Este URL não é válido**');
     
      message.channel.send(`**<${res}>**`);
   
    })
  } else {
    shorten.custom(args[0], args[1], function(res) { 
      if (res.startsWith('Error:')) return message.reply(`**${res}**`);
     
      message.channel.send(`**<${res}>**`);
    })
   
  }


};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['encurtar', 'short'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Short',
	category: '💈 Utilitários',
	description: 'Encurtar um URL',
	usage: 'd!short [link] [titulo]'
};