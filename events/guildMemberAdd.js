const Discord = require('discord.js');
const db = require('quick.db');

module.exports = (client, member) => {
    if (member.user.id === client.user.id) return;

    var welcomeMsg = client.guilds.get(member.guild.id).options.welcomeMessage;
    let welcomeMessage;
    if (welcomeMsg !== null) {
        welcomeMessage = welcomeMsg.replace('{user}', member.user).replace('{guild}', member.guild.name);
    } else if (welcomeMsg == null) {
        const text = 'Bem-vindo {user} ao **{guild}**!';
        welcomeMessage = text.replace('{user}', member.user).replace('{guild}', member.guild.name);
    };

    var welcomeChannel = client.guilds.get(member.guild.id).options.welcomeChannel;

    if (client.channels.get(welcomeChannel)) {
        member.guild.channels.get(welcomeChannel).send(welcomeMessage)
    };

    var roleID = client.guilds.get(member.guild.id).options.welcomeAutoRole; 
    if(roleID == null) return;
    var role = member.guild.roles.get(roleID).id;
    member.addRole(role);
};