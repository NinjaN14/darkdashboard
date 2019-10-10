exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Você não possue permissão!");

    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if (!rMember) return message.reply("Por favor indique uma pessoa. **Exemplo:** d!verify @" + message.author.username);

    let role = args.join(" ").slice(22);

    if (!role) return message.reply("Indique um cargo para eu verificar. **Exemplo:** d!verify @" + message.author.username + ' Cargo');

    let aRole = message.guild.roles.find(`name`, role) || message.mentions.members.first();

    if (rMember.roles.has(aRole.id)) {
      rMember.setNickname(('changeNick ', `[${role}] ${rMember.user.username}`))
      message.channel.send('<:certo:628823491034087430> Verificado com Sucesso !')
      rMember.setNickname('[' + role + '] ' + rMember.user.username)
   } else {
      message.channel.send(rMember.user.username + ' não possui este cargo')
  }

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['verify'],
	permLevel: 10,
  manu: false
};

exports.help = {
	name: 'Verify',
	category: '🔧 Sistema',
	description: 'Verifica se um membro possui tal cargo e adiciona a tag ao seu apelido.',
	usage: 'd!verify [@user] [cargo]'
};