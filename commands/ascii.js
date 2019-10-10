const figlet = require('figlet')
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  if(args.join(' ').length > 14) return message.reply('No máximo  14 caracteres são aceitos'); 

  if(!args.join(' ')) return message.reply('Diga algo!');

    figlet(args.join(' '), (err, data) => {
      message.channel.send('```' + data + '```')
    })

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['ascii'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Ascii',
	category: '🎉 Diversão',
	description: 'Envia um texto em Ascii',
	usage: 'd!ascii [texto]'
};