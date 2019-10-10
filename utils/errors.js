const Discord = require('discord.js');

module.exports.noArgs = (client, message) => {
  let Embed = new Discord.RichEmbed()
      .setColor(client.color)
      .setFooter('Você deve inserir algum texto!');
  message.channel.send(message.author, Embed).then(msg => msg.delete(5000));
}
