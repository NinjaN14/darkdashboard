exports.run = async (client, message, args) => { 
 const req = require('request-promise');
 const { RichEmbed } = require('discord.js');
 const us = args[0]
  if(!us) {message.reply('Eu preciso de um usuário!')}
  if(us) {
   req({
        uri: 'https://api.github.com/users/' + us,
        headers: {
          'User-Agent': 'DiscordBot'
        },
        json: true
      }).then(user => {
        var embed = new RichEmbed()
          .setThumbnail(user.avatar_url)
          .setColor(client.color)
          .setFooter(client.user.username, client.user.avatarURL)
          .addField('Seguidores', user.followers, true)
          .addField('Gists', user.public_gists, true)
          .addField('Repositórios', user.public_repos, true)
          .addField('Seguindo', user.following)
          if(!user.name == null) embed.setTitle(user.name)
          if(!user.html_url == null) embed.setURL(user.html_url)
          if(user.bio != null) embed.setDescription(user.bio)
          if(user.type == 'User')
            (user.company != null) ? 
              embed.addField('Companhia', user.company, true) : embed.addField('Companhia', 'Nenhuma', true);

        message.channel.send(embed);
      })
  }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['github'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'GitHub',
    category: '💈 Utilitários',
    description: 'Obtem informações sobre uma conta do GitHub',
    usage: 'd!github [user]'
};