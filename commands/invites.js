const Discord = require('discord.js')

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars

try {
message.guild.fetchInvites().then(invites => {
        if (!invites) return message.reply('Este servidor não possui convites!');
     
            var rank    = invites.array().sort((a, b) => b.uses - a.uses).slice(0, 3);
            var primeiro  = rank[0];
            var segundo   = rank[1];
            var terceiro  = rank[2];
        
           let total = primeiro.uses + segundo.uses + terceiro.uses;

const Embed = new Discord.RichEmbed()
.setTitle('Top Invites')
.setAuthor('', message.guild.iconURL)
.setColor(client.color)
.addField(`:first_place: 1º ${primeiro.inviter.username}`, `Membros Recrutados: ${primeiro.uses}`)
.addField(`:second_place: 2º ${segundo.inviter.username}`, `Membros Recrutados: ${segundo.uses}`)
.addField(`:third_place: 3º ${terceiro.inviter.username}`, `Membros Recrutados: ${terceiro.uses}`)

.addField('Total: **' + total + '**', 'ㅤ')

  message.channel.send(Embed);
 });
} catch (err) {
 message.reply('Eu provavelmente não possuo permissões para ver isso.')
}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['top', 'topinvites'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'TopInvites',
	category: '💈 Utilitários',
	description: 'Mostra a lista de convites do servidor',
	usage: 'd!invites'
};