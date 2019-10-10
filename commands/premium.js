const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  const pid = '628224324880302100';
  
  if (message.author.id === pid){
  const embed = new Discord.RichEmbed()
  .addField('Link de convite do Dark Premium','[Aqui](https://discordapp.com/api/oauth2/authorize?client_id=628855255324426299&permissions=470019271&scope=bot)')
  .setColor(client.config.colorPremium)
  message.channel.send(embed)
  } else {
    message.channel.send('**Você não é premium**!')
  }
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['addpremium', 'premium'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Premium',
    category: '🔧 Sistema',
    description: 'Você tem permissão? então adicione o Dark Premium!',
    usage: 'd!premium'
};