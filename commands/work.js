const discord = require('discord.js');
const db = require('quick.db');
const send = require('quick.hook');
const currencyFormatter = require('currency-formatter');
const ms = require('parse-ms');

exports.run = async (client, message, args) => { 

try {
    let cooldown = 1.44e+7;
    let amount = Math.floor((Math.random() * 200) + 50);
    let workplace = ["Escritório", "Shopping", "Restaurante", "Mercado", "Segurança", "Técnico de Informática"] // Different outputs match below, from 0 to 5 with an included error system.
    let workDaily = await db.fetch(`workDaily_${message.author.id}`) // Used for fetching the time on when work is available.
    let result = Math.floor((Math.random() * workplace.length))
    let timeObj = ms(cooldown - (Date.now() - workDaily))
    
    let workEmbed = new discord.RichEmbed()
    .setDescription(`**${message.author.tag}** Começou a trabalhar e foi pago ${currencyFormatter.format(amount, { code: 'BRL' })}`)
    .setColor(`GREEN`)

    let dailytEmbed = new discord.RichEmbed()
    .setDescription(`${message.author.tag} Tentando trabalhar, mas está em descanso! Tempo restando **${timeObj.hours}h, ${timeObj.minutes}m, e ${timeObj.seconds}s**`)
    .setColor(`RED`)

    
    try {
    db.fetch(`userBalance2.0_${message.author.id}`).then(rm => { // MODIFY - This checks your account to see if your account has a valid amount
    if(rm == null || 0){
        db.set(`userBalance2.0_${message.author.id}`, 50)} // MODIFY - This wipes any data & updates the account if it isn't a valid number

    else if (workDaily !== null && cooldown - (Date.now() - workDaily) > 0) {
        

        let workDailyEmbed = new discord.RichEmbed()
        .setAuthor(`${message.author.tag} || Descanso de trabalho!`, message.author.displayAvatarURL)
        .setColor(client.color)
        .setDescription(`**${message.author.tag}**, Você acabou de trabalhar por 4 horas! \nVocê precisa descansar por, **${timeObj.hours}h, ${timeObj.minutes}m**`)
        message.channel.send(workDailyEmbed)
    } else if (`${result}` == "0"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`userBalance2.0_${message.author.id}`, amount).then(i => {
            var discord = require('discord.js')
            let dailyEmbed = new discord.RichEmbed()
            .setAuthor(`${message.author.tag} Você trabalhou em um escritório e conferiu muitos documentos`, message.author.displayAvatarURL)
            .setColor(client.color)
            .addField(`Você foi pago pelo seu turno,`, `O gerente pagou a você: ${currencyFormatter.format(amount, { code: 'BRL' })}`)
            message.channel.send(dailyEmbed)
        })}
    else if (`${result}` == "1"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`userBalance2.0_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            let dailyEmbed = new discord.RichEmbed()
            .setAuthor(`${message.author.tag} Você estava trabalhando no shopping e vendeu muitas roupas`, message.author.displayAvatarURL)
            .setColor(client.color)
            .addField(`Você foi pago pelo seu turno,`, `O gerente pagou a você: ${currencyFormatter.format(amount, { code: 'BRL' })}`)
            message.channel.send(dailyEmbed)
        })}
    else if (`${result}` == "2"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`userBalance2.0_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            let dailyEmbed = new discord.RichEmbed()
            .setAuthor(`${message.author.tag} Acabamento de Cozinha e Limpeza`, message.author.displayAvatarURL)
            .setColor(client.color)
            .addField(`Você foi pago pelo seu turno,`, `O gerente pagou a você: ${currencyFormatter.format(amount, { code: 'BRL' })}`)
            message.channel.send(dailyEmbed)
        })}
    else if (`${result}` == "3"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`userBalance2.0_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            let dailyEmbed = new discord.RichEmbed()
            .setAuthor(`${message.author.tag} Você trabalhou no mercado e vendeu muitos melões`, message.author.displayAvatarURL)
            .setColor(client.color)
            .addField(`Você foi pago pelo seu turno,`, `O gerente pagou a você: ${currencyFormatter.format(amount, { code: 'BRL' })}`)
            message.channel.send(dailyEmbed)
        })}
    else if (`${result}` == "4"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`userBalance2.0_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            let dailyEmbed = new discord.RichEmbed()
            .setAuthor(`${message.author.tag} Terminou de trabalhou como segurança e cuidou de muitas pessoas!`, message.author.displayAvatarURL)
            .setColor(client.color)
            .addField(`Você foi pago pelo seu turno,`, `O gerente pagou a você: ${currencyFormatter.format(amount, { code: 'BRL' })}`)
            message.channel.send(dailyEmbed)
        })}
    else if (`${result}` == "5"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`userBalance2.0_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            let dailyEmbed = new discord.RichEmbed()
            .setAuthor(`${message.author.tag} Você trabalhou como Técnico de informática esmagando alguns erros de codificação`, message.author.displayAvatarURL)
            .setColor(client.color)
            .addField(`Você foi pago pelo seu turno,`, `O gerente pagou a você: ${currencyFormatter.format(amount, { code: 'BRL' })}`)
            message.channel.send(dailyEmbed)
        })}
    else {
        message.channel.send(`Oof .. você atingiu um erro enorme. Por favor, envie um relatório, \`d!bug [send] [relatório]\``)
        console.log(result)
    }
    })} catch(err) {console.log(err)}
    } catch(err) {console.log(`Error with work \n${err}`)}


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['work', 'trabalho'],
    permLevel: 0,
    manu: false
};

exports.help = {
    name: 'Trabalho',
    category: '💳 Econômia',
    description: 'Pegue seu trabalho e ganhe dinheiro por seu turno',
    usage: 'd!trabalho'
};