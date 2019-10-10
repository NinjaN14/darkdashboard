exports.run = async (client, message, args) => { 
 const msg = message;
 const Discord = require('discord.js');
 const db = require('quick.db');
 var guild = message.guild;

switch (args[0]) {
  case "set" : {
    switch (args[1]) {
     case "welcomeChannel" :{
      var channel =  message.mentions.channels.first().id || client.channels.get(args[2]).id;
      const Embed = new Discord.RichEmbed()
        .setTitle('<:pandinha:629077999312044073> Setado com Sucesso!')
        .setDescription('Canal de **Bem-Vindo** foi setado como <#'  + channel + '>');
      db.set(`guildSettings_${guild.id}_welcomeChannel`, channel);
      message.channel.send(Embed);
     }break;
        //
     case "byeChannel" : {
      var channel =  message.mentions.channels.first().id || client.channels.get(args[2]).id;
      const Embed = new Discord.RichEmbed()
        .setTitle('<:pandinha:629077999312044073> Setado com Sucesso!')
        .setDescription('Canal de **Saídas** foi setado como <#'  + channel + '>');
      db.set(`guildSettings_${guild.id}_byeChannel`, channel);
      message.channel.send(Embed);
     }break;
       //
     case "welcomeMessage" : {
      var req =  message.content.slice(26);
      var welMessage = req.replace('{user}', message.member.user).replace('{guild}', message.member.guild.name)
      const Embed = new Discord.RichEmbed()
        .setTitle('<:pandinha:629077999312044073> Setado com Sucesso!')
        .setDescription('Mensagem de **Boas-Vindas** foi setado como: "'  + welMessage + '"');
      db.set(`guildSettings_${guild.id}_welcomeMessage`, req);
      message.channel.send(Embed);
     }break;
      //
     case "byeMessage" : {
      var req =  message.content.slice(22);
      var byeMessage = req.replace('{user}', message.member.user.username).replace('{guild}', message.member.guild.name)
      const Embed = new Discord.RichEmbed()
        .setTitle('<:pandinha:629077999312044073> Setado com Sucesso!')
        .setDescription('Mensagem de **Despedidas** foi setado como: "'  + byeMessage + '"');
      db.set(`guildSettings_${guild.id}_byeMessage`, req);
      message.channel.send(Embed);
     }break;
     //
     case "auto-role" : {
      var role =  message.mentions.roles.first();
      const Embed = new Discord.RichEmbed()
        .setTitle('<:pandinha:629077999312044073> Setado com Sucesso!')
        .setDescription('**Auto-Role** foi setado como: '  + role + '');
      db.set(`guildSettings_${guild.id}_welcomeAutoRole`, role.id);
      message.channel.send(Embed);
     }break;
       //
     case "server-list" : {
      var req =  args[2];
      var res;
      if(req == 'sim' || req == 'true') {
        res = 'Visível'
       } else {
        res = 'Invisível'
       }
      const Embed = new Discord.RichEmbed()
        .setTitle('<:pandinha:629077999312044073> Setado com Sucesso!')
        .setDescription('**Server-List** foi setado como: **'  + res + '**');
      db.set(`guildSettings_${guild.id}_showInServersList`, req);
      message.channel.send(Embed);
     }break;
     
}
  }
  break;
}


  
  

  db.fetch(`guildSettings_${guild.id}_welcomeChannel`).then(welcomeChannel => {
  db.fetch(`guildSettings_${guild.id}_byeChannel`).then(byeChannel => {
  db.fetch(`guildSettings_${guild.id}_welcomeMessage`).then(welcomeMessage => {
  db.fetch(`guildSettings_${guild.id}_byeMessage`).then(byeMessage => {
  db.fetch(`guildSettings_${guild.id}_welcomeAutoRole`).then(welcomeAutoRole => {
    
  const guildSettings = {
   welcomeChannel: welcomeChannel,
   byeChannel: byeChannel,
   welcomeMessage: welcomeMessage,
   byeMessage: byeMessage,
   welcomeAutoRole: welcomeAutoRole,
  };

  client.guilds.get(guild.id).options =  guildSettings;

  });
  });
  });
  });
  });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['guild', 'guild'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Server',
    category: '🔨 Desenvolvimento',
    description: 'Configura alguns opções do servidor, como o canal de bem-vindo, despedidas...',
    usage: 'd!guild'
};