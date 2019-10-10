const { inspect } = require('util');

exports.run = async (client, message, [action, key, ...value], level) => {

	const settings = client.settings.get(message.guild.id);

	if (action === 'add') {
		if (!key) return message.reply('Por favor, especifique uma chave para adicionar');
		if (settings[key]) return message.reply('Esta chave já existe nas configurações');
		if (value.length < 1) return message.reply('Por favor especifique um valor');

		if (value.length > 1) {
			for (var i = 0; i < value.length; i++) {
				console.log(value[i]);
				value[i] = value[i].replace(',', '');
				console.log(value[i]);
			}
		} else if (value[0].indexOf(',') > -1) {
			value = value[0].split(',');
		} else {
			if (key === "swearWords" || key === "inviteWhitelist") {
				var vArray = [];
				value.indexOf(',') > -1 ? vArray = value[0].split(',') : vArray.push(value[0]);
				value = vArray;
			} else {
				value = value[0];
			}
		}

		settings[key] = value;

		client.settings.set(message.guild.id, settings);
		message.reply(`${key} adicionada com sucesso a ${value}`);
	} else

	if (action === 'edit') {
		if (!key) return message.reply('Por favor, especifique um valor para editar');
		if (!settings[key]) return message.reply('Este valor não existe nas configurações');
		if (value.length < 1) return message.reply('Por favor especifique um novo valor');
		if (value.length > 1) {
			for (var i = 0; i < value.length; i++) {
				console.log(value[i]);
				value[i] = value[i].replace(',', '');
				console.log(value[i]);
			}
		} else if (value[0].indexOf(',') > -1) {
			value = value[0].split(',');
		} else {
			value = value[0];
		}

		settings[key] = value;

		client.settings.set(message.guild.id, settings);
		message.reply(`${key} editado para ${value}`);
	} else

	if (action === 'del') {
		if (!key) return message.reply('Por favor, especifique um valor para excluir.');
		if (!settings[key]) return message.reply('Esta chave não existe nas configurações');

		const response = await client.awaitReply(message, `Tem certeza de que deseja excluir permanentemente ${key}? Isto não pode ser **DESFEITO**. Diga **Sim** para confirmar ou **Cancelar** para óbviamente cancelar.`);

		if (['sim', 'Sim'].includes(response)) {

			delete settings[key];
			client.settings.set(message.guild.id, settings);
			message.reply(`${key} foi excluído com sucesso.`);
		} else
		if (['Não', 'Cancelar'].includes(response)) {
			message.reply('Ação Cancelada.');
		}
	} else

	if (action === 'get') {
		if (!key) return message.reply('Por favor especifique um valor para ver');
		if (!settings[key]) return message.reply('Este valor não existe nas configurações');
		message.reply(`O valor de ${key} é atualmente ${settings[key]}`);
	} else {
		message.channel.send(inspect(settings), { code: 'json' });
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['setting', 'settings', 'config'],
	permLevel: 3,
  manu: true
};

exports.help = {
	name: 'Config',
	category: '🔧 Sistema',
  description: 'Visualize ou altere as configurações do seu servidor.',
	usage: `
  d!config [get] [key]
  d!set [edit] [key] [value]
  d!set [add] [key] {value} d!set [del] [key]
 `
};