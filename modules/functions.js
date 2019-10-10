var moment = require('moment');
var db = require('quick.db');

module.exports = (client) => {

	client.permlevel = message => {
		let permlvl = 0;

		var ownerID = client.config.ownerID;
    var admID = client.config.adms;

		if (message.author.id === ownerID) return 10;
    

		if (message.channel.type === 'dm' || !message.member) return 0;

		/*try {
			const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modLogChannel.toLowerCase());
			if (modRole && message.member.roles.has(modRole.id)) permlvl = 2;
		} catch (e) {
			console.warn('modRole não esta presente em guild settings. Skipping Moderator (level 2) check');
		}
		try {
			const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
			if (adminRole && message.member.roles.has(adminRole.id)) permlvl = 3;
		} catch (e) {
			console.warn('adminRole não esta presente em guild settings. Skipping Administrator (level 3) check');
		}
*/
		if (message.author === message.guild.owner) permlvl = 4;
    if (message.author === client.config.premiumIDs) permlvl = 5;
    if (message.author.id === admID) permlvl = 6;

		return permlvl;
	};

	client.permLevels = {
		0: 'Usuário',
		2: 'Moderador',
		3: 'Administrador',
		4: 'Dono do Servidor',
    5: 'Premium',
    6: 'Administrador do bot',
    9: 'WhiteList',
		10: 'Dono do Bot'
	};

	client.log = (type, msg, title) => {
		var time = moment().format(client.config.logTimeFormat);
		if (!title) title = 'Log';
		console.log(`${time}: [${type}] [${title}] ${msg}`);
	};

	client.clean = (client, text) => {
		if (typeof evaled !== 'string') text = require('util').inspect(text, {
			depth: 0
		});
		console.log(`T (${typeof text}): ${text}`);

		var t = text
			.replace(/`/g, '`' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
			.replace(/@/g, '@' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
			.replace(/\n/g, '\n' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
			.replace(client.config.token, '-- Sem Token --')
			.replace(client.config.dashboard.oauthSecret, '-- KK EAI MEN --')
			.replace(client.config.dashboard.sessionSecret, '-- PARA DE BISBILHOTA --')
			.replace(client.config.cleverbotToken, '-- Nooop --')
      .replace(undefined, '-- Indefinido --')
			.replace(client.config.googleAPIToken, '-- Procurar no Google Dashboard --');

		return t;
	};

	String.prototype.toProperCase = function() {
		return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};

	// `await wait(1000);` to "pause" for 1 second.
	global.wait = require('util').promisify(setTimeout);

	global.range = (count, start = 0) => {
		const myArr = [];
		for (var i = 0; i < count; i++) {
			myArr[i] = i + start;
		}
		return myArr;
	};

	client.version = require('../package.json').version;

};