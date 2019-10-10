exports.run = async (client, message, args) => { 
var math = require('mathjs');

let input = args.join(" ");
    if (!input) {
        message.reply('Você precisa dizer algum calculo para eu calcular!');
        return;
    }

    const question = args.join(" ");

    let answer;
    try {
        answer = math.eval(question);
    } catch (err) {
        return message.reply(`**Invalid math equation:** ${err}`);
    }

    const Discord = require('discord.js');
    const embed = new Discord.RichEmbed()
        .setThumbnail("https://images-na.ssl-images-amazon.com/images/I/31QYTepQomL.png")
        .setColor(client.color)
        .addField("**Calculo:**", '```' + question + '```', true)
        .addField("**Resposta:**", '```' + answer + '```')

    message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['calc', 'calculator', 'calcular', 'calculadora'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Calculadora',
    category: '🔧 Sistema',
    description: 'Calcula algo para você',
    usage: 'd!calc 2+2'
};