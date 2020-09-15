const discord = require('discord.js')



module.exports = {
	name: 'channel',
	category: 'moderation',
	description: 'Feeling bored? Get some activities to do.',
	aliases: [],
	usage: 'channel',
	run: async (client, message, args) => {

  

 let logchannel = message.guild.channels.cache.find(ch => ch.name === "logchannel")

 if(!logchannel) return message.channel.send("Couldn't find log channel called 'logchannel'")

  

 let perms = message.member.hasPermission("ADMINISTRATOR")

 if(!perms) return message.channel.send("You do not have permission to do this!")

  

  if(!args[0]) return message.channel.send("Please include a name for the channel!")

  

  let createembed = new discord.MessageEmbed()

  .setColor('#15E3F0')

  .setTitle('Channel Created | ')

  .addField('Created By: ', `**${message.author.username}**`)

  .setTimestamp()

  .setFooter("Author: Exxon#0293")

  

  message.guild.channels.create(args.slice(0).join(" "), {type: 'text'});

  message.channel.send("Channel successfully created!");

  logchannel.send(createembed)
   },
};
