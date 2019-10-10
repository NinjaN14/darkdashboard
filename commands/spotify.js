exports.run = async (client, message, args) => { 
  const Discord = require('discord.js');
  
  let user = message.mentions.users.first() || message.author  || client.users.get(args[0]);
  
  if(user.presence.game !== null && user.presence.game.type === 2 && user.presence.game.name === 'Spotify' && user.presence.game.assets !== null) {

     let trackIMG = `https://i.scdn.co/image/${user.presence.game.assets.largeImage.slice(8)}`;
     let trackURL = `https://open.spotify.com/track/${user.presence.game.syncID}`;
     let trackName = user.presence.game.details;
     let trackAuthor = user.presence.game.state;
     let trackAlbum = user.presence.game.assets.largeText;

    const embed = new Discord.RichEmbed()
      .setAuthor('Informações da Música', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
      .setColor(0x1ED760)
      .setThumbnail(trackIMG)
      .addField('Nome da Música', trackName, true)
      .addField('Albúm', trackAlbum, true)
      .addField('Autor', trackAuthor, false)
      .addField('Escute você também', `[\`${trackURL}\`](trackURL)`, false);
   
    message.channel.send(message.author, embed);
  } else {
      message.reply('Este usuário não está disponível e/ou não está ouvindo **Spotify**')
  };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['spotify', 'spotifai', 'ispotifai'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Spotify',
    category: '💈 Utilitários',
    description: 'Mostra as informações da música que usuário está ouvindo no Spotify',
    usage: 'd!spotify / d!spotify @user'
};