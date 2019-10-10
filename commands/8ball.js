const Discord = require('discord.js')
exports.run = async (client, message, args, level) => {
  var embed = [
    `${message.author} Isso não parece uma pergunta`
  ];
	var question = args.join(' ');
	var answers = client.config.eightBallResponses;
	if (!question) return message.channel.send(embed).then(msg => msg.delete(5000));
	var a = Math.floor(Math.random() * answers.length);

	let ballembed = new Discord.RichEmbed()
	.setAuthor(client.user.username, client.user.displayAvatarURL)
	.setColor(client.color)
	.addField("Pergunta", question)
	.addField("Resposta", answers[a])
	.setFooter(`Perguntado por ${message.author.tag}`);
	message.channel.send(ballembed);

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: '8ball',
	category: '🎉 Diversão',
	description: 'Responde a uma pergunta',
	usage: 'd!8ball [pergunta]'
};