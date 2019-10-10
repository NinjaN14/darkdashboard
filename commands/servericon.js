exports.run = async (client, message, args) => {
const Discord = require('discord.js')
const EM = new Discord.RichEmbed()
      .setTitle('Server Icon')
      .setColor(client.color)
      .setDescription(`Caso queira baixar esta imagem **[Clique Aqui](${message.guild.iconURL})**`)
      .setImage(`${message.guild.iconURL}?size=512`); 

message.channel.send(message.author, EM)

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['servericon'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'ServerIcon',
    category: '💈 Utilitários',
    description: 'Icone do Servidor',
    usage: 'd!servericon'
};