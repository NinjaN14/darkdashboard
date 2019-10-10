exports.run = async (client, message, args) => { 
  message.channel.send('*Acendendo Cigarro*').then(async msg => {
  setTimeout(() => {
    msg.edit('🚬');
  }, 500);
  setTimeout(() => {
    msg.edit('🚬 ☁ ');
  }, 1000);
  setTimeout(() => {
    msg.edit('🚬 ☁☁ ');
  }, 1500);
  setTimeout(() => {
    msg.edit('🚬 ☁☁☁ ');
  }, 2000);
  setTimeout(() => {
    msg.edit('🚬 ☁☁');
  }, 2500);
  setTimeout(() => {
    msg.edit('🚬 ☁');
  }, 3000);
  setTimeout(() => {
    msg.edit('🚬 ');
  }, 3500);
  setTimeout(() => {
    msg.edit(`Terminou de fumar.`);
  }, 4000);
});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['fumar', 'smoke'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Fumar',
    category: '🎉 Diversão',
    description: 'Faz uma animação de fumar',
    usage: 'd!fumar'
};