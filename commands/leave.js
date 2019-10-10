exports.run = async (client, message, args) => { 

  const channel= message.member.voiceChannel;

if(!channel) {
 message.reply('Você deve estar em um canal')
}
   message.guild.voiceConnection.disconnect()

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['exit', 'leave', 'sair'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Leave',
    category: '🎵 Música',
    description: 'Sai do canal que você',
    usage: 'd!leave'
};