const Discord = require('discord.js');
const m = require('moment');
const currencyFormatter = require('currency-formatter');
const fetchVideoInfo = require('youtube-info');

exports.run = async (client, message, args) => {
    if (client.config.musicEnabled !== 'true') return message.channel.send('Comandos de música desativados');
    const serverQueue = client.musicQueue.get(message.guild.id);
    if (!serverQueue) return message.channel.send('Não há nada tocando.');
    const ytdl = require('ytdl-core');
    const id = serverQueue.songs[0].id; 
    ytdl.getInfo(id, (err, info) => {
     fetchVideoInfo(id, function (err, videoInfo) {
    let embed = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle('Tocando Agora')
        .setURL(info.video_url)
        .setDescription(serverQueue.songs[0].title)
        .addField(':movie_camera: Visualizações', `**${videoInfo.views}**`, true)
        .addField(':calendar: Publicado em', `**${videoInfo.datePublished}**`, true)
        .addField(':thumbsup: Gostei', `**${videoInfo.likeCount}**`, true)
        .addField(':thumbsdown: Não Gostei', `**${videoInfo.dislikeCount}**`, true)
        .setImage(videoInfo.thumbnailUrl)
        .setFooter(info.author.name, info.author.avatar)
    return message.channel.send(embed)
    });
   });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['nowplaying', 'np'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'NowPlaying',
    category: '🎵 Música',
    description: 'Verifique qual música está tocando',
    usage: 'd!np'
};