exports.run = async (client, message, args) => {
 const msg = message; 
 const Discord = require('discord.js');
 const DB = require('quick.db');
 const send = require('quick.hook');
 const owner = client.config.ownerID;

 DB.fetch(`userItems_${msg.author.id}_background1`).then(background => {
    if(background >= 1) {
       DB.fetch(`userBackground_${msg.author.id}`).then(item => {
        if(item == null) {
           if(!args[0]) {
            msg.reply('Se você quiser você adicionar um background à seu perfil escreva **d!background list**, para ver os backgrounds disponíves e em seguida adicionar um deles.');
           }
        } else {
           if(!args[0]) {
            msg.reply('Se você quiser você alterar seu background atual escreva **d!background list**, para ver os backgrounds disponíves e em seguida adicionar um deles.');
           }
        }
       })
    } else {
      msg.reply('Você deve obter o **Background** na loja para ter acesso à esse comando. Compre usando **d!comprar Background**')
    }

   
//----------------// 
//   SETTINGS    //
//--------------//

switch (args[0]) {
  case "ping" : {
    message.channel.send('Pong!');
    break;
  }

  case "list" : {
    const Embed = new Discord.RichEmbed()
    .setTitle(':frame_photo: Lista de Backgrounds')
    .setColor(client.color)
    .addField('Azoxo', '<:Azoroxo:629059400170209320> **d!background set Azoxo**')
    .addField('Branco', '<:TotalmenteBranco:629059400165883924> **d!background set Branco**')
    .addField('Cinxo', '<:Cunxo:629059400102838272> **d!background set Cinxo**')
    .addField('Cinza', '<:EscuroMasPreto:629059400140587019> **d!background set Cinza**')
    .addField('Escuro', '<:NotoMasPreto:629059400140718080> **d!background set Escuro**')
    .addField('Rainbow', '<:rainbow2:629606993312612362> **d!background set Rainbow**')
    .addField('Flora', ':camping: **d!background set Flora**')
    .addField('Steams', ':gear: **d!background set Steams**')
    msg.channel.send(Embed)
    break;
  }

  case "reset" : {
     DB.set(`userBackground_${msg.author.id}`, null)
     const Embed = new Discord.RichEmbed()
     .setTitle('Seu Background foi resetado!')
     .setColor(client.color)
     .setAuthor(msg.author.username, msg.author.avatarURL)
     msg.channel.send(Embed)
   break;
  }  


  case "set" : {
   if(!args[1]) {
     msg.reply('Dê **d!background list**, para saber todos os backgrounds que você pode adicionar ao seu perfil!')
   } else {
    switch (args[1]) {
      case "Azoxo" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setColor('#7289DA')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://cdn.discordapp.com/attachments/470277456964747274/471389447447904276/Azoxo.png')
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'https://cdn.discordapp.com/attachments/470277456964747274/471389447447904276/Azoxo.png')
      break;
      }
   
      case "Branco" : {
            const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setColor('#FFFFFF')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://media.discordapp.net/attachments/470277456964747274/471390225785159680/Totalmente_branco.png')
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'https://media.discordapp.net/attachments/470277456964747274/471390225785159680/Totalmente_branco.png')
      break;
      }
      case "Cinxo" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setColor('#99AAB5')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://media.discordapp.net/attachments/470277456964747274/471390922316316701/Cunxo.png')
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'https://media.discordapp.net/attachments/470277456964747274/471390922316316701/Cunxo.png')
      break;
      }
      case "Cinza" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setColor('#2C2F33')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://cdn.discordapp.com/attachments/470277456964747274/471391400374566932/Escuro_mas_nao_preto.png')
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'https://cdn.discordapp.com/attachments/470277456964747274/471391400374566932/Escuro_mas_nao_preto.png')
      break;
      }
      case "Escuro" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setColor('#23272A')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://cdn.discordapp.com/attachments/470277456964747274/471391511590993920/Nao_tao_preto.png')
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'https://cdn.discordapp.com/attachments/470277456964747274/471391511590993920/Nao_tao_preto.png')
      break;
      }
      case "Rainbow" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('http://4.bp.blogspot.com/-stkUR7dTINk/TnWLnr48JPI/AAAAAAAAAh8/gw-rjcbc_lY/s1600/Abstract+Rainbow+Colored+Background+1366.jpg')
           .setColor('RANDOM')
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'http://4.bp.blogspot.com/-stkUR7dTINk/TnWLnr48JPI/AAAAAAAAAh8/gw-rjcbc_lY/s1600/Abstract+Rainbow+Colored+Background+1366.jpg')
      break;
      }
      case "Flora" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em:\nhttps://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://www.planwallpaper.com/static/images/desktop-backgrounds1_wvNeWqW.jpg')
           .setColor('GREEN')
           msg.channel.send(Embed)
           DB.set(`userBackground_${msg.author.id}`, 'https://www.planwallpaper.com/static/images/desktop-backgrounds1_wvNeWqW.jpg')
      break;
      }
      case "R6" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://www.windowscentral.com/sites/wpcentral.com/files/styles/xlarge/public/field/image/2018/05/rainbow-six-siege-elite-skins-hero.jpg?itok=bzr8ch4K')
           .setColor('GREY')
           msg.channel.send(Embed)
        DB.set(`userBackground_${msg.author.id}`, 'https://www.windowscentral.com/sites/wpcentral.com/files/styles/xlarge/public/field/image/2018/05/rainbow-six-siege-elite-skins-hero.jpg?itok=bzr8ch4K')
       break
      }
      case "Steams" : {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://i.imgur.com/6XxLQkY.gif')
           .setColor('#579164')
           msg.channel.send(Embed)
        DB.set(`userBackground_${msg.author.id}`, 'https://i.imgur.com/6XxLQkY.gif')
       break
      }
      case "Privado1" : {
        if (!owner){
          const ow = new Discord.RichEmbed()
          .setDescription('Você não tem permissão do meu dono para usar esse background!')
          .setColor(client.color)
          message.channel.send(ow)
        } else {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://i.imgur.com/6XxLQkY.gif')
           .setColor('#579164')
           msg.channel.send(Embed)
          DB.set(`userBackground_${msg.author.id}`, 'https://i.imgur.com/6XxLQkY.gif')}
       break
      }
      case "Privado2" : {
        if (!owner){
          const ow = new Discord.RichEmbed()
          .setDescription('Você não tem permissão do meu dono para usar esse background!')
          .setColor(client.color)
          message.channel.send(ow)
        } else {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://sodas2.sirv.com/dark/536426.png')
           .setColor('#579164')
           msg.channel.send(Embed)
          DB.set(`userBackground_${msg.author.id}`, 'https://sodas2.sirv.com/dark/536426.png')}
       break
      }
      case "Privado3" : {
        if (!owner){
          const ow = new Discord.RichEmbed()
          .setDescription('Você não tem permissão do meu dono para usar esse background!')
          .setColor(client.color)
          message.channel.send(ow)
        } else {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://sodas2.sirv.com/dark/320623.png')
           .setColor('#579164')
           msg.channel.send(Embed)
          DB.set(`userBackground_${msg.author.id}`, 'https://sodas2.sirv.com/dark/320623.png')}
       break
      }
      case "Privado4" : {
        if (!owner){
          const ow = new Discord.RichEmbed()
          .setDescription('Você não tem permissão do meu dono para usar esse background!')
          .setColor(client.color)
          message.channel.send(ow)
        } else {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://sodas2.sirv.com/dark/463438.jpg')
           .setColor('#579164')
           msg.channel.send(Embed)
          DB.set(`userBackground_${msg.author.id}`, 'https://sodas2.sirv.com/dark/463438.jpg')}
       break
      }
      case "Privado5" : {
        if (!owner){
          const ow = new Discord.RichEmbed()
          .setDescription('Você não tem permissão do meu dono para usar esse background!')
          .setColor(client.color)
          message.channel.send(ow)
        } else {
           const Embed = new Discord.RichEmbed()
           .setTitle('Você adicionou **' + args[1] + '** como seu novo background!')
           .setDescription('Agora, você pode ver seu perfil em: https://darkdashboard.glitch.me/user/' + msg.author.id)
           .setImage('https://sodas2.sirv.com/dark/536426.png')
           .setColor('#579164')
           msg.channel.send(Embed)
          DB.set(`userBackground_${msg.author.id}`, 'https://sodas2.sirv.com/dark/Privado3.png')}
       break
      }  
    }
   }
   break;
  }

 
}

 }); 
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['background'],
    permLevel: 0,
  manu: false
};

exports.help = {
    name: 'Background',
    category: '🌠 Cosméticos',
    description: 'Se você possuir o item Background, você poderá alterar o mesmo através desse comando',
    usage: 'd!background'
};