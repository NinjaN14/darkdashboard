const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const fs = require("fs");

const client = new Discord.Client({fetchAllMembers: true});
const client2 = new Discord.Client({fetchAllMembers: true});

client2.on('ready', () => {
 console.log(`[LOG] ${client2.user.username} Logado com Sucesso!`)
});

client2.login(process.env.TOKEN2);

client.moment = require('moment');

client.premium = client2;

try {
	client.config = require('./config.js');
  client.itens = require('./itens.json');
  client.color = require("./config.js").color;
} catch (err) {
	console.error('Não foi possível carregar as configs! \n', err);
	process.exit(1);
}

require('./modules/functions.js')(client);
require('./modules/music.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.talkedRecently = new Set();

if (client.config.musicEnabled === 'true') {
	client.musicQueue = new Map();

	client.YouTube = new YouTube(client.config.googleAPIToken);
	client.ytdl = ytdl;
}

const init = async () => {

	const cmdFiles = await readdir('./commands/');
	client.commandsNumber = cmdFiles.length;
	console.log(`[LOG] Carregando ${client.commandsNumber} comandos [CARREGAMENTO]`);
	cmdFiles.forEach(f => {
		try {
			const props = require(`./commands/${f}`);
			if (f.split('.').slice(-1)[0] !== 'js') return;
			client.commands.set(props.help.name, props);
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name);
			});
		} catch (e) {
			client.log(`[ERRO] Não foi possível carregar o comando ${f} : ${e}`);
		}
	});

	const evtFiles = await readdir('./events/');
	console.log(`[LOG] Carregando ${evtFiles.length} eventos.[CARREGAMENTO]`);
	evtFiles.forEach(file => {
		const eventName = file.split('.')[0];
		const event = require(`./events/${file}`);
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});

	var token = client.config.token;

	client.login(token);
};

init();