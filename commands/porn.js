const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
if (!message.channel.nsfw) return message.channel.send({embed: {
        title: `Boobs apenas em canais NSFW!`
    }});

    var subreddits = [
        'NSFW_Wallpapers',
        'SexyWallpapers',
        'HighResNSFW',
        'nsfw_hd',
        'UHDnsfw']

  var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

  randomPuppy(sub)
        .then(url => {
            const embed = new Discord.RichEmbed()
                .setColor(client.color)
                .setAuthor("4k", client.user.avatarURL)
                .setFooter("xD")
                .setImage(url);
            message.channel.send({
                embed
            });
        })

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['porn'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'Porn',
	category: '🔞 NSFW',
	description: 'Mostra um porno',
	usage: 'd!porn'
};