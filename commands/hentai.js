const superagent = require("superagent");
const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

let {body} = await superagent
    .get(`https://nekos.life/api/v2/img/Random_hentai_gif`);
    if (!message.channel.nsfw) { 
    message.reply(" Você precisa estar em um canal de NSFW")
    return;
   }
  
    let hentaiEmbed = new Discord.RichEmbed()
    .setTitle("Hentai é arte")
    .setImage(body.url)
    .setColor(client.color)

    message.channel.send(hentaiEmbed);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['hentai', 'oi'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Hentai',
	category: '🔞 NSFW',
	description: 'Procura por hentai na internet',
	usage: 'd!hentai'
};