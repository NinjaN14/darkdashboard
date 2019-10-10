const Discord = require('discord.js');
let fs = require('fs');
var Jimp = require("jimp");

exports.run = async (client, message, args) => { 
  function doRandomSize() {
    var rand = [Jimp.FONT_SANS_64_BLACK]
    return rand[Math.floor(Math.random() * rand.length)];
  }
   var user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
    message.channel.startTyping()
    var url = user.avatarURL;

    Jimp.read(url).then(function (image) {

      image.resize(1024, 1024, Jimp.RESIZE_BEZIER);


      Jimp.loadFont(doRandomSize()).then(function (font) {
      
        image.greyscale()

        let outputfile = "./output_img/" + Math.random().toString(36).substr(2, 5) + "sad." + image.getExtension(); // create a random name for the output file
        image.write(outputfile, function () {
          message.channel.send({file: outputfile}).then(function () {
            fs.unlink(outputfile);
            message.channel.stopTyping()
          });
        });

      });




    }).catch(function (err) {
      console.error(err);
    });

    function onBuffer(err, buffer) {
      if (err) throw err;
      console.log(buffer);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sad'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Sad',
    category: '🎉 Diversão',
    description: 'Adiciona um filtro preto e branco à sua foto de perfil',
    usage: 'd!sad'
};