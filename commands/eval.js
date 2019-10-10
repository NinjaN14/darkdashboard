const Discord = require('discord.js')
const currencyFormatter = require('currency-formatter');
function clean(text) {if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)); else return text;};   


exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

const msg = message;
const db = require('quick.db');

    try {
      const code = args.join(" ");
      let evaled = eval(code) 
      if(!code)return msg.reply('Digite um código')
      if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);      
      const embed = new Discord.RichEmbed()
      .setTitle(":white_check_mark: Executado!")
      .setColor(client.color)
      .addField(`:inbox_tray: Input`, '```' + (code) + '```')
      .addField(`:outbox_tray: Output:`, '```' + clean(evaled) + '```')
      msg.channel.send({embed})
      msg.channel.send({code:"xl"});
    } catch (err) {
      var code = args.join(' ')
      const embed = new Discord.RichEmbed()
      .setTitle(":negative_squared_cross_mark: Error")
      .setColor("#ff0000")
      .addField(`:inbox_tray: Input`, '```' + (code) + '```')
      .addField(`:outbox_tray: Output:`, '```' + clean(err) + '```')
      msg.channel.send({embed})
    }

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['eval', 'exec', 'executar'],
	permLevel: 10,
  manu: false
};

exports.help = {
	name: 'Eval',
	category: '🔧 Sistema',
	description: 'Executar um código Java',
	usage: 'd!eval [código]'
};