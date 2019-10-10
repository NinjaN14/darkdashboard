exports.run = async (client, message, args) => { 

  const channel= message.member.voiceChannel;

if(!channel) {
 message.channel.send('Você deve estar em um canal')
}
  channel.join()
    .then(connection => message.channel.send('Conectado!'))
    .catch(console.error);

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['join', 'entrar'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Join',
    category: '🎵 Música',
    description: 'Entra no canal que você',
    usage: 'd!join'
};