const Discord = require('discord.js');
const Canvas = require('canvas');
const snekfetch = require('node-superfetch');
const db = require('quick.db');
const utils = require('../utils/utils.js');
module.exports = async (client, message) => {
	const args = message.content.split(/\s+/g);
//level

 let zxp = await db.fetch(`xp_${message.guild.id}_${message.author.id}`);
  if (zxp === null) zxp = 0;
  let zlevel = await db.fetch(`level_${message.guild.id}_${message.author.id}`);
  if (zlevel === null) zlevel = 0;
  if (zlevel >= 100) return;
   var add = Math.floor(Math.random()* 6) + 2;
   db.add(`xp_${message.guild.id}_${message.author.id}`, add);
   //console.log(`O usuário ${message.author.tag} ganhou ${add} xp no servidor ${message.guild.name} (${message.guild.id}) no canal ${message.channel.name} (${message.channel.id})`);

  
  while (zxp >= utils.need(zlevel+1)) {
    if (zxp >= utils.need(zlevel+1)) {
      db.subtract(`xp_${message.guild.id}_${message.author.id}`, utils.need(zlevel+1));
      db.add(`level_${message.guild.id}_${message.author.id}`, 1);
      zxp = await db.fetch(`xp_${message.guild.id}_${message.author.id}`);
      zlevel = await db.fetch(`level_${message.guild.id}_${message.author.id}`);
    }
  }  
  
let textinho = "Oie";

if(message.content.includes("<@"+ client.user.id + ">") && message.content.includes(textinho)) {
  message.channel.send(`Ola <3`)
}
	if (message.author.bot) return;

	const settings = client.config.defaultSettings;
	var command;

const EmbedBlackList = new Discord.RichEmbed()
.setTitle('Você está na BlackList!')
.setAuthor('', message.author.avatarURL)
.setColor(client.color)
.setDescription('Você não tem permissão alguma de executar algum comando do bot, por motivos que, <@'+client.config.ownerID+'> adicionou você na **BlackList**')


	message.settings = settings;

 const prefix = 'd!';
  
	command = args.shift().slice(prefix.length)
		.toLowerCase();
  
	const level = client.permlevel(message);

	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

	if (message.channel.type === 'dm') {
		if (!cmd) return;
		if (cmd.conf.guildOnly) return message.channel.send('Este comando está desativado em DMs');
	}

	if (message.channel.type !== 'dm') {
     const guild = message.guild;
		 const guildSettings = client.config.defaultSettings;
     db.fetch(`guildSettings_${guild.id}_inviteFilter`).then(config => {
		 if (message.content.match(/(discord\.(gg|me|io)|(discordapp\.com|discord\.com)\/invite).*/) && config == 'true' || message.content.match(/(discord\.(gg|me|io)|(discordapp\.com|discord\.com)\/invite).*/) && config == null) {
		 var msgInv = message.content.match(/discord\.gg\/[0-9A-Za-z-]+/);

			if (!msgInv) return;
			var dggInvCode = msgInv[0].replace(/discord\.gg\//, '');

			if (level >= 2 || message.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || message.member.hasPermission('MANAGE_NICKNAMES')  || message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('ADMINISTRATOR') ) {
				return console.log(`${message.author.tag} (${message.author.id}) ${level}`);
			}
			message.delete();
			message.reply('Convites não são permitidos neste servidor');
		}
});
    
		if (message.content.indexOf(client.config.prefix) !== 0) {
			return;
		}

                                                        
			client.talkedRecently.add(message.author.id);
			setTimeout(() => {
				client.talkedRecently.delete(message.author.id);
			}, parseInt(guildSettings.commandTimeout));

		if (guildSettings.logCommandUsage === 'true') {
			if (cmd) {
				if (level >= cmd.conf.permLevel) {
					if (cmd.conf.enabled === true) {
						cmd.run(client, message, args, level);
						 console.log(`${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) Executou o comando ${message.content}`);
					} else {
						message.reply('Este comando está desligado');
						console.log(`${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) Executou o comando desligado ${message.content}`);
					}
				} else {
					message.reply('Você não tem permissão para isso!')
					console.log(`${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) Executou o comando ${message.content} sem ter o nível de permissão`);
				}
			} else {
				console.log(`${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) tentou executar um comando enexistente ${message.content}`);
				message.reply('Este comando não existe, dê **d!ajuda** para ver meus comandos');
			}
		} else {
			cmd.run(client, message, args, level);
		}
	} else if (cmd) {
		if (level >= cmd.conf.permLevel) {
			if (cmd.conf.enabled) {
				cmd.run(client, message, args, level);
				if (client.config.defaultSettings.logCommandUsage === 'true') {
					console.log(`DM: ${message.author.username} (${message.author.id}) Executou o comando ${message.content}`);
				}
			} else if (client.config.defaultSettings.logCommandUsage === 'true') {
				console.log(`DM: ${message.author.username} (${message.author.id}) Executou o comando desligado ${message.content}`);
        message.reply('Este comando está desligado')
			}
		} else if (client.config.defaultSettings.logCommandUsage === 'true') {
			console.log(`DM: ${message.author.username} (${message.author.id}) Executou o comando ${message.content} sem ter o nível de permissão`);
			message.reply('Você não tem permissão para isso!')
		}
	}
};