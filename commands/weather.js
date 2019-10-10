const Discord = require('discord.js');
const weather = require('weather-js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if (err) message.channel.send(err);
      if (result === undefined || result.length === 0) {
          message.reply('Diga um lugar')
          return;
      }



      var current = result[0].current;
      var location = result[0].location;

      const embed = new Discord.RichEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Clima de ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor(client.color)
          .addField('Timezone',`UTC${location.timezone}`, true)
          .addField('Tipo de grau',location.degreetype, true)
          .addField('Temperatura',`${current.temperature} Graus`, true)
          .addField('Sensação', `${current.feelslike} Graus`, true)
          .addField('Ventos',current.winddisplay, true)
          .addField('Umidade', `${current.humidity}%`, true)
          message.channel.send({embed});
  })
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['tempo', 'clima'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Clima',
	category: '💈 Utilitários',
	description: 'Indica as informações climaticas de uma cidade',
	usage: 'd!clima [cidade]'
};