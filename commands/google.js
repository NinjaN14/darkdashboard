const Discord = require("discord.js");
const google = require("google");

exports.run = async (client, message, args) => { 
 google.resultsPerPage = 1
  google.protocol = 'https'
  var nextCounter = 0

  google(args, function (err, res) {
    if (err) console.log(err);

    for (var i = 0; i < res.links.length; ++i) {
      var link = res.links[i];

      message.channel.send(link.title + " " + link.href);
    }

    if (nextCounter < 1) {
      nextCounter += 1
      if (res.next) res.next()
    }

  });

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['google'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Google',
    category: '💈 Utilitários',
    description: 'Pesquisa por algo no Tio Google',
    usage: 'd!google'
};