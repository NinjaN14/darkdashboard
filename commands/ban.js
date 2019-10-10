const Discord = require('discord.js')
exports.run = (client, message, args)=>{
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`**<:error:631272670859886603> ${message.author} Você não tem permissão para banir!**`)
    var membro = message.mentions.members.first() || message.guild.members.get(args[0]);

    if (!membro) return message.channel.send(`**<:error:631272670859886603> ${message.author} Você não mencionou niguém.**`)

    if (membro == message.member) return message.reply(`**<:error:631272670859886603> ${message.author} Você não pode se banir.**`)
    const motivo = args.slice(1).join(" ");
    if (!motivo) return message.channel.send(`**<:error:631272670859886603> ${message.author} Diga um morivo válido**`);

    const embed = new Discord.RichEmbed()
    .setDescription(`**Você realmente deseja banir** ${membro}**?**`)
    .setColor(client.color)
    message.channel.send(embed).then(msg =>{ 
        msg.react("631272722101436436");
        
        let filtro = (reaction, usuario) => reaction.emoji.id === "631272722101436436" && usuario.id === message.author.id;
        const coletor = msg.createReactionCollector(filtro, {max: 1, time: 3000});

        coletor.on("collect", em => {
            const emb = new Discord.RichEmbed()
            .setDescription(`<:success:631272722101436436> ${membro} **Foi banido com sucesso por** ${message.author}\n**Motivo:** ${motivo}`)
            .setColor(client.color)
            em.remove(message.author.id);
            membro.ban();
            if (!membro.ban) return message.channel.send("Eu não tenho permissão para banir esse usuario")
            message.channel.send(emb)
            msg.delete()
        });
    });

}


exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['ban'],
	permLevel: 3,
  manu: false
};

exports.help = {
	name: 'Ban',
	category: '🛃 Moderação',
	description: 'Hora da marreta do Ban',
	usage: 'd!ban [@user] [motivo]'
};