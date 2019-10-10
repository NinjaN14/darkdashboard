const snekfetch = require('snekfetch');

exports.run = (client, message, args) => {
  let [title, contents] = args.join(" ").split("|");
  if(!args[0]) return message.reply('Você deve colocar alguma conquista né ?! Algo como **d!achievement Comer Chocolate**');
  if(!contents) {
    [title, contents] = ["Achievement Get!", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);
  if(args.join(" ").toLowerCase().includes("queimar")) rnd = 38;
  if(args.join(" ").toLowerCase().includes("biscoito")) rnd = 21;
  if(args.join(" ").toLowerCase().includes("bolo")) rnd = 10;
  if(args.join(" ").toLowerCase().includes("diamante")) rnd = 29;

  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  snekfetch.get(url)
   .then(r=> message.channel.send("", {files:[{attachment: r.body}]}));
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['conquista', 'achievement'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Achievement',
    category: '🎉 Diversão',
    description: 'Monta uma conquista para você',
    usage: 'd!conquista'
};