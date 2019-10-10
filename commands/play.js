exports.run = async (client, message, args, level) => {
  message.delete(10000);
	if (client.config.musicEnabled !== 'true') return message.channel.send('Comandos de música desativados');
	const searchString = args.join(' ');
	const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = client.musicQueue.get(message.guild.id);

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('Me desculpe, mas você precisa estar em um canal de voz para tocar música!');
	if (!searchString) return message.channel.send('Eu preciso saber o que tocar, dê d!play <nome da música / URL>');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT')) {
		return message.channel.send('Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!');
	}
	if (!permissions.has('SPEAK')) {
		return message.channel.send('Eu não posso falar neste canal de voz, verifique se eu tenho as permissões adequadas!');
	}

	if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
		const playlist = await client.YouTube.getPlaylist(url);
		const videos = await playlist.getVideos();
		for (const video of Object.values(videos)) {
			const video2 = await client.YouTube.getVideoByID(video.id);
			await client.handleVideo(video2, message, voiceChannel, true);
		}
		return message.channel.send(`✅ Playlist: **${playlist.title}** foi adicionada à lista de reprodução.`);
	} else {
		try {
			var video = await client.YouTube.getVideo(url);
		} catch (error) {
			try {
				var videos = await client.YouTube.searchVideos(searchString);
				var video = await client.YouTube.getVideoByID(videos[0].id);
			} catch (err) {
				console.error(err);
				return message.channel.send('🆘 Não consegui obter nenhum resultado de pesquisa.');
			}
		}
		return client.handleVideo(video, message, voiceChannel);
	}
};

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const queue = new Map()
	const serverQueue = queue.get(msg.guild.id);
	const song = {
		id: video.id,
		title: (video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
}



exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['play'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Play',
	category: '🎵 Música',
	description: 'Toque uma música do Youtube',
	usage: 'd!play [nome da música/URL]'
};