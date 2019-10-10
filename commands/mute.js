const Discord = require('discord.js');
const ms = require("ms");

exports.run = async (client, message, args) => {

 if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
    if (args[0] == "help") {
        message.reply("d!mute <user> <TEMPO/m/h/d>");
        return;
    }
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("Por favor mencione um usuário!");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Eu não posso silenciar ele(a)!");
    let reason = args.slice(2).join(" ");
    if (!reason) return message.reply("Por favor, indique um motivo!");

    let muterole = message.guild.roles.find(`name`, "Mutado");

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Mutado",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    let mutetime = args[1];
    if (!mutetime) return message.reply("Obrigado por especificar um tempo");

    message.delete().catch(O_o => {});

    try {
        await tomute.send(`Oi! você foi mutado por ${mutetime}. Desculpe !`)
    } catch (e) {
        message.channel.send(`Um usuário sofreu uma mutação, mas seus DMs estão bloqueados, ele sofreu uma mutação por ${mutetime}`)
    }

    let muteembed = new Discord.RichEmbed()
        .setDescription(`Mute feito por ${message.author}`)
        .setColor(client.color)
        .addField("Usuário silenciado:", tomute)
        .addField("Silenciado no canal:", message.channel)
        .addField("Mudo à", message.createdAt)
        .addField("Tempo do mute", mutetime)
        .addField("Motivo", reason);

    message.channel.send(muteembed);
    await (tomute.addRole(muterole.id));
    setTimeout(function() {
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> foi desmutado!`);
    }, ms(mutetime));

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['mute', 'mutar', 'desmutar'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Mute',
    category: '🛃 Moderação',
    description: 'DESCRIÇÃO',
    usage: 'd!mute @user 10s'
};