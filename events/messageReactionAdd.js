module.exports = async (client, messageReaction, user) => {
 if(user.bot !== true) {
 console.log(`${user.username} adicionou uma reação ${messageReaction.emoji}`)
 }
}