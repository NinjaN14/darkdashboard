const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => { 
 const itens = client.itens;
 const conta = `userBalance2.0_${message.author.id}`;
 

if(args[0]) {
switch (args[0]) {  
  case 'Badge': {
   const pagar = itens.badge.valor;
   db.fetch(conta).then(bucks => {
   if(bucks >= pagar) {   
   db.fetch(`userItems_${message.author.id}_badge1`).then(i => {
      if(i == null || i == 0) {
       db.subtract(conta, pagar);
        db.add(`userItems_${message.author.id}_badge1`, 1);
        message.channel.send('Você comprou minha badge!');
      } else {
        message.channel.send('Você já possui minha badge!');
      };
     });
    } else {
			message.reply('Você não tem dinheiro o suficiente');
		}
   });
    break;
  }

  case 'Premium': {
   const pagar = itens.premium.valor;
   db.fetch(conta).then(bucks => {
   if(bucks >= pagar) {   
   db.fetch(`userItems_${message.author.id}_premium1`).then(i => {
      if(i == null || i == 0) {
        db.subtract(conta, pagar);
        db.add(`userItems_${message.author.id}_premium1`, 1);
        message.channel.send('Você comprou o **Premium pass**!');
      } else {
        message.channel.send('Você já possui o **Premium Pass**!');
      };
     });
    } else {
			message.reply('Você não tem dinheiro o suficiente');
		}
   });
   break;
  }

  case 'Bonus': {
   const pagar = itens.bonus.valor;
   db.fetch(conta).then(bucks => {
    if(!bucks >= pagar) {
      message.reply('Você não tem dinheiro suficiente');
    } else if(bucks >= pagar) {
     db.fetch(`userItems_${message.author.id}_bonus1`).then(i => {
      if(i == null || i == 0) {
        db.subtract(conta, pagar);
        db.set(`userItems_${message.author.id}_bonus1`, 1);
        message.channel.send('Você comprou o **Bonus de XP**!');
      } else {
        message.channel.send('Você já possui o **Bonus**');
      }
     });
    }
   });
  break;
  }


  case 'Background': {
   const pagar = itens.background.valor;
   db.fetch(conta).then(bucks => {
   if(bucks >= pagar) {   
   db.fetch(`userItems_${message.author.id}_background1`).then(i => {
      if(i == null || i == 0) {
       db.subtract(conta, pagar);
        db.add(`userItems_${message.author.id}_background1`, 1);
        message.channel.send('Você comprou o **Background**! Dê **d!background**!');
      } else {
        message.channel.send('Você já possui o **Background**!');
      };
     });
    } else {
			message.reply('Você não tem dinheiro o suficiente');
		}
   });
   break;
  }
  case "Desc": {
   const pagar = itens.description.valor;
   db.fetch(conta).then(bucks => {
    if(bucks >= pagar) {   
     db.fetch(`userItems_${message.author.id}_desc1`).then(i => {
      if(i == null || i == 0) {
       db.subtract(conta, pagar);
        db.add(`userItems_${message.author.id}_desc1`, 1);
        message.channel.send('Você comprou a **Descrição**! Agora você pode dar **d!user set desc {textinho}**');
      } else {
        message.channel.send('Você já possui a **Descrição**!');
      };
     });
    } else {
			message.reply('Você não tem dinheiro o suficiente');
		}
   });
  } break;
 }
} else {
 message.reply(`Dê **d!lista** para ver os itens disponíveis para compra!`)
}
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['comprar', 'buy'],
    permLevel: 0,
    manu: true
};

exports.help = {
    name: 'Comprar',
    category: '💳 Econômia',
    description: 'Compre itens para customizações',
    usage: 'd!comprar [item]'
}; 