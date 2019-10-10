const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var time = Date.now();
	const embed = new Discord.RichEmbed()
		.setColor(client.color)
		.setTitle('Paleta de Cores')
    .addField('<:discordlogo:454695663620587541> **Discord:**', 'ㅤ')
		.addField(`Azoxo `, `#7289DA  <:Azoroxo:629059400170209320>`, true)
		.addField(`Totalmente Branco`, `#FFFFFF  <:TotalmenteBranco:629059400165883924>`)
		.addField(`Cinxo`, `#99AAB5  <:Cunxo:629059400102838272>`, true)
		.addField(`Escuro, mas não preto`, `#2C2F33  <:EscuroMasPreto:629059400140587019>`)
		.addField(`Não tão preto`, `#23272A  <:NotoMasPreto:629059400140718080> `)
    .addField('ㅤ', 'ㅤ')
    .addField('**WebSite:**', 'ㅤ')
    .addField('Barra de Navegação', '#375A7F <:Barra:629059399964557333>')
    .addField('Texto Destacado', '#009D54 <:TextoVerde:629059400145043486>')
		.setFooter(`Ping: ${Date.now() - time}ms`);
 message.channel.send({embed});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['cores',  'cor'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Cores',
	category: '💈 Utilitários',
	description: 'Informa algumas cores bases do Discord e do Design do Site',
	usage: 'd!cores'
};