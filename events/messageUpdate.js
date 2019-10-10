module.exports = (client, oldMessage, newMessage) => {
 if(oldMessage.author.bot !== true) {
 console.log(`${oldMessage.author.username} editou a mensagem [${oldMessage}] e agora ela é [${newMessage.content}]`)
 }
}