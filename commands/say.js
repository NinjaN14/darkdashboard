const got = require('got');

exports.run = async (client, message, args) => { 
   var text = args.join(' ');
   if(!text) return message.reply('Diga algo para mim escrever')
    await message.channel.send(text)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say', 'dizer'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Say',
    category: '🎉 Diversão',
    description: 'Envia um texto por você',
    usage: 'd!say [texto]'
};