exports.run = async (client, message, args) => { 
 const Discord = require('discord.js');

 const Embed = new Discord.RichEmbed()
 .setTitle('Databases de Armazenamento')
 .setColor(client.color)
 .addField('Conta do Usuário', '```userBalance2.0_${user.id}```')
 .addField('Itens Comprados', '```userItems_${user.id}``` **(Sim! Um erro de ortográfia)**')
 .addField('Background do Usuário', '```userBackground_${user.id}```')
 .addField('Opções do Servidor', '```guildSettings_${guild.id}_```')
 message.channel.send(message.author, Embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['database', 'armazenamento'],
    permLevel: 10,
    manu: false
};

exports.help = {
    name: 'Database',
    category: '🔧 Sistema',
    description: 'Mostra todos os database e seus códigos',
    usage: 'd!database'
};