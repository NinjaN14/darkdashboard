const Discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

exports.run = async (client, message, args) => {
var arg = args.join(" ")
if(!args[0]) return message.reply('Você Tem que descrever o bug.')

    const channelBugEmbed = new Discord.RichEmbed()
    .setTitle('<:BugHunter:629074998585458712> Bug Reportado')
    .setColor(client.color)
    .setDescription('Você acabou de fazer um report de bug para meus administradores!')
    .addField('Descrição do Bug', arg)
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL);
    message.channel.send(channelBugEmbed);
     
    const supportBugEmbed = new Discord.RichEmbed()
    .setTitle('<:BugHunter:629074998585458712> Bug Reportado')
    .setColor(client.color)
    .setDescription(message.author + ' acabou de fazer um report de bug para você!')
    .addField('Descrição do Bug', arg)
    .addField('ID do Autor', message.author.id, true)
    .addField('Tag', message.author.tag, true)
    .addField('Conta criada em', moment.utc(message.author.createdAt).format('LLLL'))
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL);
    client.channels.get('629078958205567006').send(supportBugEmbed)
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['bug', 'ticket'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Bug',
	category: '🔧 Sistema',
	description: 'Envia um report de bug para os administradores do bot.',
	usage: 'd!bug'
};