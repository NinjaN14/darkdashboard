const Discord = require('discord.js');
const db = require('quick.db');
module.exports.run = async (client, message, args) => {
 
  db.startsWith(`level_${message.guild.id}`, { sort:'.data' }).then(resp => {
    resp.length = 10;
    
  let rsp = '';
    for (var i in resp) {
      rsp += `[${parseInt(i)+1}] ${client.users.get(resp[i].ID.split('_')[2]).tag} = **${resp[i].data}**\n`;   
    }
if (rsp === '') rsp = 'Rank\n\nParece quê todo mundo é nível 0 :/';
    
    let embed = new Discord.RichEmbed()
    .setAuthor(`Os tops do servidor ${message.guild.name}`)
    .setColor('BLUE')
    .setDescription(`Confira a lista abaixo:\n\n${rsp}`)
    .setFooter(`Comando executado por ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp();
 
    message.channel.send(embed);
  });
  
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['toplevel'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Sugestão',
    category: '💈 Utilitários',
    description: 'Veja os tops do server.',
    usage: 'd!toplevel'
};