const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
	const moment = require('moment')
	moment.locale('pt-br')
	const msg = message;
	var time = Date.now();
	if (!message.guild.available) return;
	moment.locale('pt-br');

	let guild;

	if (args[0]) {
		guild = client.guilds.get(args[0]);
	} else {
		guild = message.guild;
	}

	let serverRegion = {
		'amsterdam': ':flag_nl: Amsterdã',
		'brazil': ':flag_br: Brasil',
		'eu-central': ':flag_eu: Europa Central',
		'eu-west': ':flag_eu: Europa Ocidental',
		'frankfurt': ':flag_de: Frankfurt',
		'hongkong': ':flag_hk: Hong Kong',
		'japan': ':flag_jp: Japão',
		'london': ':flag_gb: Londres',
		'russia': ':flag_ru: Russia',
		'singapore': ':flag_sg: Singapura',
		'sydney': ':flag_au: Sydney',
		'us-central': ':flag_us: EUA Central',
		'us-east': ':flag_us: EUA Oriental',
		'us-west': ':flag_us: EUA Ocidental',
		'us-south': ':flag_us: EUA Sul',
	}[guild.region];

	const invite = await msg.channel.createInvite({
		maxAge: 0
	});

   const emojiList = guild.emojis.map(e => e).join('');

	const embed = new Discord.RichEmbed()
		.setTitle(`ㅤ`)
		.setAuthor(`${guild.name}`, '')
		.setColor(client.color)
		.setThumbnail(`${guild.iconURL}?size=512`)
		.addField(`ID do Servidor`, `${guild.id}`, true)
		.addField(`:crown: Dono`, `${guild.owner}`, true)
		.addField(":calendar: Criado em:", `${moment.utc(guild.createdAt).format('LLLL').replace('January', 'Janeiro').replace('February', 'Fevereiro').replace('March', 'Março').replace('April', 'Abril').replace('May', 'Maio').replace('June', 'Junho').replace('July', 'Julho').replace('August', 'Agosto').replace('September', 'Setembro').replace('October', 'Outubro').replace('November', 'Novembro').replace('December', 'Dezembro').replace('Sunday', 'Domingo').replace('Monday', 'Segunda-Feira').replace('Tuesday', 'Terça-Feira').replace('Wednesday', 'Quarta-Feira').replace('Thursday', 'Quinta-Feira').replace('Friday', 'Sexta-Feira').replace('Saturday', 'Sábado')}`, true)
		.addField(":star2: Entrei em:", moment.utc(client.user.joinedAt).format('LLLL').replace('January', 'Janeiro').replace('February', 'Fevereiro').replace('March', 'Março').replace('April', 'Abril').replace('May', 'Maio').replace('June', 'Junho').replace('July', 'Julho').replace('August', 'Agosto').replace('September', 'Setembro').replace('October', 'Outubro').replace('November', 'Novembro').replace('December', 'Dezembro').replace('Sunday', 'Domingo').replace('Monday', 'Segunda-Feira').replace('Tuesday', 'Terça-Feira').replace('Wednesday', 'Quarta-Feira').replace('Thursday', 'Quinta-Feira').replace('Friday', 'Sexta-Feira').replace('Saturday', 'Sábado'), true)
		.addField(`Membros: (${guild.memberCount})`,
			`:busts_in_silhouette: Pessoas: ${guild.members.filter(member => !member.user.bot).size} | <:bot:454695663742222348> Bots: ${guild.members.filter(member => member.user.bot).size} \n<:online:454695663549022220> **${guild.members.filter(o => o.presence.status === 'online').size}** Online <:idle:454695663532507157> **${guild.members.filter(i => i.presence.status === 'idle').size}** Ausente <:donotdisturb:454695663352152076> **${guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** Ocupado <:offline:454695663582576642> **${guild.members.filter(off => off.presence.status === 'offline').size}** Offline`
		)
		.addField(':map: Região', `${serverRegion}`)
		.addField(':incoming_envelope: Convite:', `[Entrar](${invite})`)
		.addField(':desktop: Página:', `[Acessar](https://ryoujii.glitch.me/guild/${guild.id})`)
    .setFooter(message.author.tag, message.author.displayAvatarURL)
	msg.channel.send({
		embed
	});

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['serverinfo', 'guildinfo'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'ServerInfo',
	category: '💈 Utilitários',
	description: 'Irá dar-lhe informações sobre este servidor',
	usage: 'd!serverinfo'
};