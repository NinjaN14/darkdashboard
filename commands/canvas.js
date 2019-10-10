const Discord = require('discord.js');
const Canvas = require('canvas');
const snekfetch = require('node-superfetch');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
  const canvas = Canvas.createCanvas(124, 124);
  const ctx = canvas.getContext('2d');
  
  
  const { body: a } = await snekfetch.get("https://d1csarkz8obe9u.cloudfront.net/posterpreviews/rainbow-background-2-design-template-fe8c45cb97e57d9bbda27f46ae6e7d55_screen.jpg?ts=1533045350");
  const rback = await Canvas.loadImage(a);
  ctx.drawImage(rback, 0, 0, 124, 124);
  
  const { body: b } = await snekfetch.get("https://beeimg.com/images/u25084035653.png");
  const conf = await Canvas.loadImage(b);
  ctx.drawImage(conf, 0, 0, 150, 124);
  
  const { body: c } = await snekfetch.get(message.author.avatarURL);
  const avatar = await Canvas.loadImage(c);
  ctx.drawImage(avatar, 20, 40, 80, 80);
  
  const { body: d } = await snekfetch.get("https://beeimg.com/images/o25554974793.png");
  const up = await Canvas.loadImage(d);
  ctx.drawImage(up, 5, -10, 110, 50);
  
  ctx.fillStyle = "rgb(0, 96, 128)";
  ctx.fillRect(100, 100, 40, 40);
  
  ctx.font = "23px Arial";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText(`${args[0]}`, 106, 122, 40, 40);
  

  
  const attach = new Discord.Attachment(canvas.toBuffer(), `${message.author.username}_level_up.png`);
  message.channel.send(attach);
  
  
  }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['canvas'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Canvas',
    category: '🎉 Diversão',
    description: 'Mostra as canvas do rank',
    usage: 'd!canvas'
};