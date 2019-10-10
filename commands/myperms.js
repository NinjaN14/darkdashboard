exports.run = async (client, message, args) => {
    let Discord = require("discord.js")
    let string = '```md\n';
    let user = message.mentions.members.first() || message.member;
    message.channel.permissionsFor(user).toArray().map(p => string += `+ ${p.charAt(0) + p.toLowerCase().replace(/_/g, ' ').slice(1).replace(`vad`, `VAD`)}\n`)
    let finalStr = string + "```"
    let embed = new Discord.RichEmbed()
       .setTitle(`Permissions for ${user.user.tag}`)
       .setDescription(finalStr)
       .setColor(client.color)
    message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['myperms', 'perms', 'myguildperms'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'MyPerms',
    category: '💈 Utilitários',
    description: 'Mostra suas permissões dentro do servidor',
    usage: 'd!myperms'
};