const {
	Util
} = require('discord.js');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
module.exports = (client, message) => {

	client.handleVideo = async function handleVideo(video, msg, voiceChannel, playlist = false) {
		const serverQueue = client.musicQueue.get(msg.guild.id);
		console.log(video.title);
		const song = {
			id: video.id,
			title: Util.escapeMarkdown(video.title),
			url: `https://www.youtube.com/watch?v=${video.id}`
		};
		if (!serverQueue) {
			const queueConstruct = {
				textChannel: msg.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true
			};

			client.musicQueue.set(msg.guild.id, queueConstruct);

			queueConstruct.songs.push(song);

			try {
				var connection = await voiceChannel.join();
				queueConstruct.connection = connection;
				play(msg.guild, queueConstruct.songs[0]);
			} catch (error) {
				console.error(`Eu não pude entrar no canal de voz: ${error}`);
				client.musicQueue.delete(msg.guild.id);
				return msg.reply(`Eu não pude entrar no canal de voz: ${error}`);
			}
		} else {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			if (playlist) return undefined;
			else {
           const Embed = new Discord.RichEmbed()
           .setTitle(':notes: Música')
           .setColor(client.color)
           .setDescription(`**${song.title}** foi adicionado à fila de reprodução!`);
      msg.channel.send(Embed);
     };
		}
		return undefined;
	};



	function play(guild, song) {
		const serverQueue = client.musicQueue.get(guild.id);

		if (!song) {
			serverQueue.voiceChannel.leave(120000);
			client.musicQueue.delete(guild.id);
			return;
		}
		console.log(serverQueue.songs);

		const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
			.on('end', reason => {
				if (reason === 'None') console.log('Song ended.');
				else console.log(reason);
				serverQueue.songs.shift();
				play(guild, serverQueue.songs[0]);
			})
			.on('error', error => console.error(error));
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    const Embed = new Discord.RichEmbed()
    .setTitle(':notes: Música')
    .setColor(client.color)
    .setDescription(`Começando a tocar: **${song.title}**`);
		serverQueue.textChannel.send(Embed).then(msg => msg.delete(10000))
	}
};