const Discord = require('discord.js');

exports.run = async (client, message, args) => { 

if (args[0] == null) { return message.reply(":x: **Mencione 2 usuários!**" ) }
    var ShipPerecent = Math.floor(Math.random() * 100)
    if(message.mentions.users.array()[0]) {
        var user = message.mentions.users.array()[0]["username"];
        if (message.mentions.users.array()[1]) {
        var user1 = message.mentions.users.array()[1]["username"];
        var leng = user.length
        var leng1 = user1.length
        if(user && user1) {
        var take = user.substring(0,leng * 0.5)
        var take1 = user1.substring(leng1 * 0.5, leng1)
        var shipname = (take + take1)
        var embed = new Discord.RichEmbed()
        .setTitle('**:couple:  SHIP :couple: **')
        .setColor(client.color)
        .addField(`${user} + ${user1} =`, `**${shipname.toUpperCase()}**`)
        .addField(`:fingers_crossed: **CHANCE DO CASAL** :fingers_crossed:`, `${ShipPerecent}%`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp()
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Emoji_u2764.svg/2000px-Emoji_u2764.svg.png')
          message.channel.send({embed});
        } else {
          message.reply(":x: **Mencione 2 usuários diferentes!**")
        }
        } else {
          message.reply(":x: **Mencione 2 usuários diferentes!**")
        }
        }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ship', 'shippar', 'shipar'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Ship',
    category: '🎉 Diversão',
    description: 'Shipa duas pessoas',
    usage: 'd!ship [@user] [@user2]'
};