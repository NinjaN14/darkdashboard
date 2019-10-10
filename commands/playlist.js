const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const embed = new Discord.RichEmbed()
    
    .setTitle('Lista de playlists')
    .addField('Playlist de Funk','[Clique Aqui Ou Copie](https://www.youtube.com/watch?v=CLXfWGmYcnY)')
    .addField('Playlist de Trap','[Clique Aqui Ou Copie](https://www.youtube.com/watch?v=_1radqJiUuA)')
    .addField('Playlist de Internacional','[Clique Aqui Ou Copie](https://www.youtube.com/watch?v=Djac2kCaXWg)')
    .addField('Playlist de Eletronica','[Clique Aqui Ou Copie](https://www.youtube.com/watch?v=5Kjy1Vz32Vc)')
    .addField('Playlist de Blega Funk','[Clique Aqui Ou Copie](https://www.youtube.com/watch?v=ESKLLp_dZ_s)')
    .setTimestamp()
    .setColor(client.color)
    
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['playlist'],
    permLevel: 0,
};

exports.help = {
    name: 'Playlist',
    category: '🎵 Música',
    description: 'Mostra uma playlist de música do Youtube feita por Eleven',
    usage: 'd!playlist'
};