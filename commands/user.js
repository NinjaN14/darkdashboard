exports.run = async (client, message, args) => { 
    const Discord = require('discord.js');
    const db = require('quick.db');
  
    let user = message.author;

    let profile = `https://darkdashboard.glitch.me/user/${user.id}`;

   
 switch (args[0]) {  
  case 'profile': {
    const profileEmbed = new Discord.RichEmbed()
    .setTitle('Perfil de **' + user.username + '**')
    .setDescription(`Link: **https://darkdashboard.glitch.me/user/${user.id}**`)
    .setColor(client.color)
   if(user.avatar) {
    profileEmbed.setThumbnail(user.avatarURL + '?size=512')
   }
    message.channel.send(profileEmbed)
  } break;

  case 'set': {
    switch (args[1]) {  
     case 'desc': {
      let text = args.join(' ')
       db.fetch(`userDesc_${user.id}`).then(desc => {
           if(desc == null) return message.author('Você não possui o item "Descrição". Digite: **d!buy Desc** para comprar esse item e ter direito de alterar isso!');
       });  
        if(!args[2]) return message.reply('Você deve escrever algo para setar como **Descrição**!');
        let txt = text.replace('set desc ', ' ');
        if(txt.length >= 150) return message.reply('Sua descrição possui mais de 150 caractéres!')
         db.set(`userDesc_${user.id}`, txt);
      
         let Embed = new Discord.RichEmbed()
             .setTitle('<:certoRYOUJI:629080363519442964> Alterado com Sucesso!')
             .setColor(client.color)
             .setDescription('Acesse seu perfil para ver a sua descrição. ' + profile);

          message.channel.send(user, Embed);
    
     break;
    }

     case 'dm': {
    // This will DM the message author..
     message.author.send('Hi!');
    }
   }
  }
}
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['user', 'account'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'User',
    category: '🔨 Desenvolvimento',
    description: 'Indisponível',
    usage: 'Indisponível'
};