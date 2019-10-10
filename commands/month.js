const db = require('quick.db');
const Discord = require('discord.js');
const ms = require('ms');
const c = require('currency-formatter');

exports.run = async (client, message, args) => { 


	let cooldown = 2.628e+9;

	let valor;

	if (message.author) {
		valor = 1750;
	}

	let lastMonth = await db.fetch(`lastMonth_${message.author.id}`)
	try {
		db.fetch(`userBalance2.0_${message.author.id}`).then(bucks => {
			if (bucks == null) {
				db.set(`userBalance2.0_${message.author.id}`, 50)
			} else if (lastMonth !== null && cooldown - (Date.now() - lastMonth) > 0) {
				let timeObj = ms(cooldown - (Date.now() - lastMonth))

				let lastDailyEmbed = new Discord.RichEmbed()
					.setAuthor(`Salário Mensal`)
					.setColor(client.color)
					.setDescription(`Você coletou já coletou seu **Salário Mensal**, você deve esperar para coletar no mês seguinte`)
					.setFooter('Requested By ' + message.author.tag, message.author.avatarURL)
				message.channel.send(lastDailyEmbed)
			} else {
				db.set(`lastMonth_${message.author.id}`, Date.now());
				db.add(`userBalance2.0_${message.author.id}`, valor).then(i => {
					var discord = require('discord.js')
					var embed = new Discord.RichEmbed()
						.setTitle('Salário Mensal')
						.setDescription(`Você coletou seu salário mensal! :dollar:**${c.format(valor, { code: 'BRL' })}**`)
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
    aliases: ['month', 'mensal', 'salario'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Month',
    category: '💳 Econômia',
    description: 'Recebe uma quantia em dinheiro por mês',
    usage: 'd!month'
};