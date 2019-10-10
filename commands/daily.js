const db = require('quick.db');
const Discord = require('discord.js');
const ms = require('ms');
const c = require('currency-formatter');

exports.run = async (client, message, args) => {

	let cooldown = 8.64e+7;
	const amount = 250

let bonus;

db.fetch(`userItems_${message.author.id}_bonus`).then(i => {
  if(i >= 1) {
    bonus = true
  } else {
    bonus = false
  }

});

	let valor = 150;

	let lastDaily = await db.fetch(`lastDaily_${message.author.id}`)
	try {
		db.fetch(`userBalance2.0_${message.author.id}`).then(bucks => {
			if (bucks == null) {
				db.set(`userBalance2.0_${message.author.id}`, 50)
			} else if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
				let timeObj = ms(cooldown - (Date.now() - lastDaily))

				let lastDailyEmbed = new Discord.RichEmbed()
					.setAuthor(`Próxima Diária`)
					.setColor(client.color)
					.setDescription(`Você coletou já coletou seu **Daily**, você deve esperar para coletar no dia seguinte.`)
					.setFooter('Requested By ' + message.author.tag, message.author.avatarURL)
				message.channel.send(lastDailyEmbed)
			} else {
				db.set(`lastDaily_${message.author.id}`, Date.now());
				db.add(`userBalance2.0_${message.author.id}`, valor).then(i => {
					var discord = require('discord.js')
					var embed = new Discord.RichEmbed()
						.setTitle('Diária de Hoje')
						.setDescription(`Você coletou sua diária com sucesso! :dollar:**${c.format(valor, { code: 'BRL' })}**`)
						.setColor(client.color)
						.setFooter('Requested By ' + message.author.tag, message.author.avatarURL)
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
	aliases: ['daily', 'diaria', 'diário'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Daily',
	category: '💳 Econômia',
	description: 'Pegue sua diária para acrescentar dinheiro a sua conta',
	usage: 'd!daily'
};