const superagent = require('superagent');
const Discord = require('discord.js');

exports.run = async (client, message, args, tools) => {
    let color = ''
      const { body } = await superagent
    .get('https://yesno.wtf/api/');

    const resposta = {
     'yes': 'Sim',
     'no' : 'Não'
    }[body.answer];

    if(body.answer === 'yes') color = client.color;
    if(body.answer === 'no') color = client.color;
    const embed = new Discord.RichEmbed()
    .setColor(color)
    .setImage(`${body.image}`)
    message.channel.send(`A resposta mágica é **${resposta}**`, {embed});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['yesorno'],
	permLevel: 3,
  manu: false
};

exports.help = {
	name: 'Yesorno',
	category: '🎉 Diversão',
	description: 'Diz sim ou não',
	usage: 'd!yesorno'
};