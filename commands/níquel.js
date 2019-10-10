const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => { 
        var maquina = [
          "│🍋│🍋│🍋│", 
          "│🍅│🍇│🍒│", 
          "│🍉│🍓│🍅│", 
          "│🍋│🍏│🍉│", 
          "│🍏│🍉│🍓│", 
          "│🍐│🍊│🍆│", 
          "│🍇│🍒│🍐│", 
          "│🍊│🍆│🌽│", 
          "│🍋│🍌│🍑│", 
          "│🌽│🍋│🍌│", 
          "│🍆│🌽│🍋│"
        ]
        var niquel = maquina[Math.floor(Math.random() * maquina.length)];

        

             const embed = new Discord.RichEmbed()
             .setTitle("**Caça-Níquel**")
             .setColor(client.color)
             .setAuthor(message.author.username, message.author.avatarURL)
             .addField(niquel, 'ㅤㅤ')
             message.channel.send(message.author, embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['niquel', 'caçaniquel', 'caça-niquel'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'CaçaNíquel',
    category: '🎉 Diversão',
    description: 'Ganhe dinheiro apostando, mas lembre-se, você pode perder tudo!',
    usage: 'd!niquel'
};