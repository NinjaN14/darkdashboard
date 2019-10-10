const Discord = require('discord.js')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

//Tempo de Uptime

    let totalSeconds = process.uptime();
    let realTotalSecs = Math.floor(totalSeconds % 60);
    let days = Math.floor((totalSeconds % 31536000) / 86400);
    let hours = Math.floor((totalSeconds / 3600) % 24);
    let mins = Math.floor((totalSeconds / 60) % 60);


  const embed = new Discord.RichEmbed()
  .setTitle('Info')
  .setAuthor('Dark', 'https://cdn.discordapp.com/avatars/588520411025637387/7f7557f960c9ef3bb53db924efe152c2.png?s=size128')
  .setColor(client.color)
  .setDescription('Informações sobre Dark')
  .addField('<:onlineRYOUJI:629080355638345730> Ping:', `**${Date.now() - message.createdTimestamp}**ms`, true)
  .addField('<a:carregandoRYOUJI:629063691924406318> Tempo em que estou acordado', days + 'd ' + hours + 'h ' + mins + 'm ' + realTotalSecs +'s ', true)
  .addField('d!help', 'Dar lhe a lista completa de comandos que você tem acesso.')
  .addField('<:certoRYOUJI:629080363519442964>  Me adicione em seu Servidor', '[Clique Aqui](https://discordapp.com/api/oauth2/authorize?client_id=588520411025637387&permissions=470019271&scope=bot)')
  .addField('<:manutencao:629080356112564257>  Meu site', '[Clique Aqui](https://darkdashboard.glitch.me)')
  .addField('<:info:629080363834015744> Servidor de Support', '[Clique Aqui](https://discord.gg/nNjA7ga)')
  .addField('<:SimORNo:629080360361263104> Eu tenho:', `[${client.commandsNumber}] Comandos`)
  .setFooter('Versão ' + client.config.version)
  message.channel.send(embed);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['informações', 'info'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Info',
	category: '💈 Utilitários',
	description: 'Informações sobre Dark',
	usage: 'd!info'
};