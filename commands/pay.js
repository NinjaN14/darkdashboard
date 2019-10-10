const Discord = require('discord.js'),
	db = require('quick.db');

exports.run = async (client, message, args, level) => {

	let pagar = args[0]

	if (!pagar) return message.reply('Diga um valor em dinheiro para pagar a alguém, (Lembrando que você deve ter o dinheiro para dar a outra pessoa)')

	let user;

	if (message.mentions.users.first()) {
		user = message.mentions.users.first();
	};

  if(user == message.author) {
    message.reply('Você não pode pagar uma conta a si mesmo')
  } else {

	if (!args[1]) return message.reply('Não consegui obter um usuário para depositar R$' + pagar);

	db.fetch(`userBalance2.0_${message.author.id}`).then(bucks => {

  	if (bucks == null) {
				db.set(`userBalance2.0_${message.author.id}`, 50)
			}

		if (!bucks >= pagar) {

			message.reply('Você não tem dinheiro o suficiente');

		} else if (bucks >= pagar) {
			db.fetch(`userBalance2.0_${user.id}`).then(banco => {
      if(banco == null) {db.set(`userBalance2.0_${user.id}`, 50)};
				const valor = parseInt(banco) + parseInt(pagar);
				db.set(`userBalance2.0_${user.id}`, valor).then(i => {
					var discord = require('discord.js')
					var embed = new Discord.RichEmbed()
						.setTitle('<:certoRYOUJI:629080363519442964> Pagamento Concluído!')
						.setDescription(`Você efetuou um pagamento com sucesso! :dollar: **R$${pagar}**`)
						.setColor(client.color)
						.setFooter('Pago por ' + message.author.tag, message.author.avatarURL)
					message.channel.send(embed);
				});
			});

			db.fetch(`userBalance2.0_${message.author.id}`).then(banco => {
        
				const valor = parseInt(banco) - parseInt(pagar);
				db.set(`userBalance2.0_${message.author.id}`, valor);
			});

		};

	 });
  }
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['pay', 'pagamento', 'pagar', 'paypal'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Pay',
	category: '💳 Econômia',
	description: 'Faz um pagamento à algum amigo',
	usage: 'd!pay [@user]'
};