exports.run = async (client, message, args) => { 
 const Discord = require('discord.js');
 const user = message.guild.members.random();
  const embed = new Discord.RichEmbed()
  .setTitle("Loteria")
  .setDescription(`O usuário selecionado é: ${user.displayName}`)
  .setColor(client.color)
  message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['giveway', 'sorteio'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Giveway',
    category: '🎉 Diversão',
    description: 'Sorteie um usuário do servidor',
    usage: 'd!sorteio'
};