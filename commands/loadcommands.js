const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!args[0]) return message.reply('Comando não encontrado');
  console.log(args[0]);
  if (client.commands.get(args[0])) return message.reply('Comando já carregado');
	const cmdFiles = await readdir(`${process.cwd()}/commands/`);
	client.commandsNumber = cmdFiles.length;
  var load = args[0];

			const props = require(`${process.cwd()}/commands/${load}`);
			client.log('log', `Carregando Comando: ${props.help.name}.`, 'LOAD');
			client.commands.set(props.help.name, props);
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name);
			});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['load', 'loadcommand'],
	permLevel: 10,
  manu: false
};

exports.help = {
	name: 'LoadCommand',
	category: '🔧 Sistema',
	description: 'Carrega algum comando semp precisar reiniciar o bot',
	usage: 'd!loadcommand [nome do comando]'
};