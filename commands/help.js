const Discord = require('discord.js');

exports.run = (client, message, args, level) => {
	var time = Date.now();

	if (!args[0]) {
		const myCommands = client.commands.filter(c => c.conf.permLevel <= level);
		const commandNames = myCommands.keyArray();
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
		let currentCategory = '';
		var embeds = [];
		embeds[0] = new Discord.RichEmbed();
		embeds[0].setTitle('Lista de Comandos \n (Use d!ajuda [nome do comando] para detalhes)');
		embeds[0].setAuthor(client.user.username, client.user.avatarURL || client.user.defaultAvatarURL);
		const sorted = myCommands.sort((p, c) => p.help.category > c.help.category ? 1 : -1);
		var i = 0;
		var eN = 0;
		sorted.forEach(c => {
			i++;
			if (i % 18 === 0) {
				eN++;
				embeds[eN] = new Discord.RichEmbed();
			}
			const cat = c.help.category.toProperCase();
			if (currentCategory !== cat) {
				embeds[eN].addField('============', `**${cat}**`);
				currentCategory = cat;
			}
			embeds[eN].addField(`${c.help.name}${' '.repeat(longest - c.help.name.length)}`, c.help.description);
		});
		if (message.channel.type === 'dm') {
			var eNumber = 0;
			embeds.forEach((e) => {
				eNumber++;
				e.setColor(client.color);
				if (eNumber === embeds.length) {
					e.setFooter(`Ping: ${Date.now() - time}ms`);
				}
				message.author.send({
					embed: e
				}).catch((err) => {
					console.error(err);
				});
			});
		} else {
			embeds.forEach((e) => {
				e.setColor(client.color);
				e.setFooter(`Ping: ${Date.now() - time}`);
				message.author.send({
					embed: e
				}).catch((err) => {
					console.error(err);
				});
			});
			const ars = new Discord.RichEmbed().setTitle('Eu enviei os meus comandos para o seu **DM**!').setColor(client.color);
      message.channel.send(ars).then(msg => msg.react('📌'));
		}

	} else {
		let command = args[0];
		if (client.commands.has(command) || client.aliases.has(command)) {
			command = client.commands.get(command) || client.commands.get(client.aliases.get(command));
			var aliases;
			if (command.conf.aliases.length === 0) {
				aliases = 'Nenhuma';
			} else {
				aliases = command.conf.aliases;
			}

			var hEmbed = new Discord.RichEmbed()
				.setTitle(`Ajuda do Comando: ${command.help.name}`)
				.setColor(client.color)
				.addField('Descrição', command.help.description)
				.addField('Categoria', command.help.category)
				.addField('Uso', command.help.usage)
				.addField('Variáveis', aliases)
				.addField('Permissões', command.conf.permLevel)
				.setFooter(`Ping: ${Date.now() - time}ms`);

			if (message.channel.type === 'dm') {
				message.author.send({
					embed: hEmbed
				});
			} else {
				message.author.send({
					embed: hEmbed
				});
				message.react('📌');
			}
		} else {
			return message.reply('Comando não encontrado!');
		}
	}
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['h', 'halp', 'help', 'ajuda'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Help',
	category: '🔧 Sistema',
	description: 'Exibe todos os comandos disponíveis para o seu nível de permissão.',
	usage: 'd!help / d!help [comando]'
};