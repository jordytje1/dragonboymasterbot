const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "message",//aka the folder name without js
    aliases: ["message"],
    category: "message",//this is what ever ever dir you are in (dev, info, moderation, music)
    description: "message a user",
    usage: "message {user <@id>} {msg content}",
    run: async (client, message, args) => {
//your code goes here!
      
//const args = message.content.slice(`m+reply `.length).split( );
const memberr = args[1];
const userr = message.mentions.users.first();
const user = message.guild.member(userr);
      
//if (user.roles.has('746858184504770651')) {
if(message.member.roles.cache.some(role => role.name === '『💛』『support』')){

const argse = message.content.slice(`m+message ${userr}`.length).split( );
      
const messageMessage = argse;
      
const embed = new Discord.MessageEmbed()
  .setTitle(`Message Sent!`)
  .setDescription(`Successfully send the message to <@${user.id}> (${userr.tag})`)
  .addField("Message:", messageMessage)
  .setColor("62c95d")
  .setTimestamp()
message.author.send(embed)

const messageEmbed = new Discord.MessageEmbed()
  .setTitle(`New Message!`)
  .setDescription(`**You have recieved a message from ${message.author.tag}**`)
  .addField("Message:", messageMessage)
  .setColor("4f8edb")
  .setTimestamp()
user.send(messageEmbed)

  } else{

  message.message(`Error Code 403 ||| Solution: Please gain the role "Modmail Access" to run this command!`)
    
  }
      
//end code
  }
}
