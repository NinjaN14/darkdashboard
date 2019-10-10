const Discord = require('discord.js');

exports.run = async (client, message, args) => { 
  var rol = message.content.split(" ").slice(1).join(" ");
  let role = message.guild.roles.find("name", `${rol}`)
  var hata = new Discord.RichEmbed()
  .setColor(client.color)
  .setDescription("❌ Por favor, escreva um nome de função **Exemplo: d!roleinfo Member**");
  if(!role) return message.channel.send(message.author, hata);
  
  var moment = require("moment");
  var temps = moment(message.createdTimestamp).format("LLLL");
  var roleinfoEmbed = new Discord.RichEmbed()
  .setColor(role.hexColor)
  .addField('✏ Nome do cargo', role.name, true)
  .addField('🆔 ID', role.id, true)
  .addField('👥 Usuários com o cargo', role.members.size, true)
  .addField('💙 Cor', role.hexColor, true)
  .addField('📣 Mencionável ', role.mentionable ? '\nSim' : 'Não', true)
  .addField('📅 Criada em', moment(role.createdAt).format("LLLL").replace('January', 'Janeiro').replace('February', 'Fevereiro').replace('March', 'Março').replace('April', 'Abril').replace('May', 'Maio').replace('June', 'Junho').replace('July', 'Julho').replace('August', 'Agosto').replace('September', 'Setembro').replace('October', 'Outubro').replace('November', 'Novembro').replace('December', 'Dezembro').replace('Sunday', 'Domingo').replace('Monday', 'Segunda-Feira').replace('Tuesday', 'Terça-Feira').replace('Wednesday', 'Quarta-Feira').replace('Thursday', 'Quinta-Feira').replace('Friday', 'Sexta-Feira').replace('Saturday', 'Sábado'), true)
  .setFooter("");
  message.channel.send(message.author, roleinfoEmbed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['roleinfo'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'RoleInfo',
    category: '💈 Utilitários',
    description: 'Mostra as informações de um cargo',
    usage: 'd!roleinfo Membro'
};