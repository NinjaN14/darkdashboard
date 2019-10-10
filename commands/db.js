const Discord = require('discord.js'),
      db = require('quick.db'),
      c = require('currency-formatter');

exports.run = async (client, message, args) => { 
  if (message.author.id != client.config.ownerID) return message.channel.send('Você não tem permissão.');
  
  if (args[0].toLowerCase() === 'add') {
    
    db.add(`${args[1]}`, Math.floor(args[2]));
    const emb4 = new Discord.RichEmbed()
    .setDescription(`**Database modificada!**\nDatabase: **${args[1]}**\nQuantia adicionada: **${args[2]}**`)
    .setColor(client.color)
    message.channel.send(emb4);
  }else if (args[0].toLowerCase() === 'del') {
    
  db.delete(`${args[1]}`);
    const emb3 = new Discord.RichEmbed()
    .setDescription(`**Database modificada!**\nDatabase deletada: **${args[1]}**`)
    .setColor(client.color)
    message.channel.send(emb3);
  }else if (args[0].toLowerCase() === 'sub') {
    
  db.subtract(`${args[1]}`, Math.floor(args[2]));
    const emb2 = new Discord.RichEmbed()
    .setDescription(`**Database modificada!**\nDatabase: **${args[1]}**\nQuantia removida: **${args[2]}**`)
    .setColor(client.color)
    message.channel.send(emb2);
  }else if (args[0].toLowerCase() === 'fetch') {
    
    let a = await db.fetch(args[1]);
    message.channel.send(a);
  }else if (args[0].toLowerCase() === 'set') {
    
  db.set(`${args[1]}`, args[2]);
    const emb1 = new Discord.RichEmbed()
    .setColor(client.color)
    .setDescription(`**Database modificada!**\nDatabase: **${args[1]}**\nO quê foi setado: **${args[2]}**`)
    message.channel.send(emb1);
  }
  
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['db'],
    permLevel: 10,
    manu: false
};

exports.help = {
    name: 'db',
    category: '🔧 Sistema',
    description: 'Adiciona algum item à um membro',
    usage: 'd!db [item]'
};