const Discord = require('discord.js');
const db = require('quick.db');
const utils = require("../utils/utils.js");
const Canvas = require('canvas');
const snekfetch = require('node-superfetch');

module.exports.run = async (client, message, args, ops) => {
let user = message.mentions.users.first() || message.author;
  
  let xp = await db.fetch(`xp_${message.guild.id}_${user.id}`);
  if (xp === null) xp = 0;
  
  let level = await db.fetch(`level_${message.guild.id}_${user.id}`);
  if (level === null) level = 0;
  let need = utils.need(level+1);
  
  const canvas = Canvas.createCanvas(284, 177);
  const ctx = canvas.getContext('2d');
  
  let perc = Math.round((xp*100)/need)
 
    let total_blocks = 15;


      let pc = (perc*total_blocks)/100;

    let msg = "";
    for (let i = 0; i<total_blocks; i++) {
    if (i < pc) {
      msg += "█";
    } else {
      msg += "";
    }  
  }
  
  const { body: a } = await snekfetch.get(user.avatarURL);
  const avatar = await Canvas.loadImage(a);
  ctx.drawImage(avatar, 26, 24, 66, 66);
  
   ctx.font = 'bold 14px Arial';
  ctx.fillStyle = "WHITE";
  ctx.fillText(msg, 30, 150);
  
  const { body: b } = await snekfetch.get("https://cdn.glitch.com/81ab71bf-50a3-495d-a7a3-57f04129918a%2Fcard.png?1549634334546");
  const rankimg = await Canvas.loadImage(b);
  ctx.drawImage(rankimg, 0, 0, 284, 177);
  

  
    
ctx.font = "bold 10px Arial";
  ctx.fillStyle = "WHITE";
  ctx.fillText(user.tag, 99, 42);
  
  
  
  if (perc >= 100) perc = 100;
  
  ctx.font = "bold 15px Arial";
  ctx.fillStyle = "WHITE";
  ctx.fillText(`Nível: ${level}`, 145, 70);
 
  ctx.fillStyle = "WHITE";
  ctx.fillText("XP:", 87, 88);
  
  ctx.fillStyle = "WHITE";
  ctx.fillText(xp, 130, 88);
  
  ctx.fillStyle = "WHITE";
  ctx.fillText(need, 190, 88);
  
  ctx.font = 'bold 12px Arial';
  ctx.fillStyle = "WHITE";
  ctx.fillText(`${perc}%`, 133, 127);
  
  
  const attach = new Discord.Attachment(canvas.toBuffer(), `${user.username}_card.png`);
  message.channel.send(attach);
  
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['rank'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'rank',
	category: '🎉 Diversão',
	description: 'Veja o seu rank ou de um outro usuario',
	usage: 'd!rank / d!rank [@user]'
};