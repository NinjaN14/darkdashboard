const { version } = require('discord.js');
const moment = require('moment');
const Discord = require('discord.js');


exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
 let roleName = args[0];
  
 if(roleName.startsWith('@' || '<' || '<@')) return message.reply('Não mencione um cargo, somente dê o nome do cargo que eu encontrarei!');
  
 if(!roleName) return message.reply('Diga um cargo para eu procurar!') 

    let membersWithRole = message.guild.members.filter(member => { 
        return member.roles.find("name", roleName);
    }).map(member => {
        return member.user.username;
    })


try {

    return message.channel.send(membersWithRole.join("\n"))
} catch(err) {
  message.channel.send('Perdão, ' + message.author + '. Mas o número de caracteres excede o número máximo permitido pelo Discord')
};
  };

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['inrole'],
	permLevel: 2,
  manu: false
};

exports.help = {
	name: 'Inrole',
	category: '🛃 Moderação',
	description: 'Mostra a lista de membros que possuem um cargo',
	usage: 'd!inrole [nome do cargo]'
};