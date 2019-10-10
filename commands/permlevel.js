exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	message.reply(`Seu nível de permissão sobre mim é: ${level} (${client.permLevels[level]})`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['PermLevel', 'permLevel', 'permlevel'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Perm Level',
	category: '🔧 Sistema',
	description: 'Diz seu nível de permissão',
	usage: 'd!permlevel'
};