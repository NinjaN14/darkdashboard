const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');

exports.run = async (client, message, args, level) => {

	let cooldown = 8.64e+7;
	const amount = 250

	let user;

	if (message.mentions.users.first()) {
		user = message.mentions.users.first();
	} else if (args[0]) {
		user = client.users.get(args[0]);
	} else {
		user = message.author;
	}

	const valor = 1;

	let lastDaily = await db.fetch(`lastRep_${user.id}`);

	try {
		db.fetch(`userRep1_${user.id}`).then(bucks => {
			if (bucks == null) {
				db.set(`userRep1_${user.id}`, 0)
			} else if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
				let timeObj = ms(cooldown - (Date.now() - lastDaily))

				let lastRepEmbed = new Discord.RichEmbed()
					.setAuthor(`Reputação`)
					.setColor(client.color)
					.setDescription(`Você já deu **Reputação** para alguém em menos de 24hrs`)
					.setFooter(message.author.tag, message.author.avatarURL)
				message.channel.send(lastRepEmbed)
			} else {
				db.set(`lastRep1_${user.id}`, Date.now());
				db.add(`userRep1_${user.id}`, valor).then(i => {
					var discord = require('discord.js')
					var embed = new Discord.RichEmbed()
						.setTitle('Reputação')
						.setDescription(`Você deu reputação a **${user.username}**`)
						.setColor(client.color)
						.setFooter(message.author.tag, message.author.avatarURL)
					message.channel.send(embed);
				})
			}
		})
	} catch (err) {
		console.log(err)
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['rep'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Rep',
	category: '🎉 Diversão',
	description: 'Dê pontos de reputação a alguém ou a você',
	usage: 'd!rep [@user]'
};