/* eslint-disable no-inner-declarations */
const { MessageEmbed } = require('discord.js');
const { capitalizeFirstLetter } = require('../../functions');
const { BOT_OWNER, BOT_PREFIX } = process.env;

module.exports = {
  name: 'help',
  aliases: ['h', 'commands'],
  category: 'Info',
  description: 'Returns the help page, or one specific command info.',
  usage: 'help [command/category]',
  run: async (client, message, args) => {
    if (args[0]) {
      const category = client.category.get(args[0].toLowerCase());
      const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));

      if (category) {
        if (args[0].toLowerCase() === 'owner' && message.author.id !== BOT_OWNER) return;
        const cembed = new MessageEmbed()
          .setTitle(`${category.category} Commands`)
          .setDescription(client.commands.filter(cmds => cmds.category.toLowerCase() === args[0].toLowerCase()).map(cmds => `\`${cmds.name}\``).join(' '))
          .setColor('BLUE')
          .setFooter(`Requested by ${message.author.tag} `)
          .setTimestamp();
        return message.channel.send(cembed);
      }
      else if (cmd) {
        if (cmd.category.toLowerCase() === 'owner' && message.author.id !== BOT_OWNER) return;
        const hembed = new MessageEmbed()
          .setTitle(`Information for ${cmd.name.toString().toLowerCase()} command`)
          .setColor('BLUE')
          .setTimestamp()
          .setFooter('Syntax: <> = required, [] = optional', `${client.user.avatarURL()}`)
          .setDescription([
            `**❯ Name:** ${cmd.name}`,
            `**❯ Category:** ${capitalizeFirstLetter(cmd.category.toString().toLowerCase())}`,
            `**❯ Description:** ${cmd.description}`,
            `**❯ Usage:** ${prefix}${cmd.usage}`,
            `**❯ Aliases:** ${cmd.aliases ? cmd.aliases.map((a) => `\`${a}\``).join(', ') : '`None`'}`,
          ]);
        return message.channel.send(hembed);
      }
    }
    else {
      const embed = new MessageEmbed()
        .setTitle(`${client.user.username}'s Commands`)
        .setFooter(`Requested by ${message.author.tag} `)
        .setTimestamp()
        .setColor('BLUE')
        .setDescription([`
				This server's prefix is \`${BOT_PREFIX}\`.
				For more info on a specific command, type \`${BOT_PREFIX}help <command>\`.
				Visit the bot's support server [here](https://discord.gg/QPjqKxj) for more info on certain features.
				`]);

      let categories;
      if (message.author.id !== BOT_OWNER) {
        categories = [...new Set(client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category))];
      }
      else {
        categories = [...new Set(client.commands.map(cmd => cmd.category))];
      }

      for (const id of categories) {
        const category = client.commands.filter(cmd => cmd.category === id);

        embed.addField(`${id} (${category.size})`, `\`${BOT_PREFIX}help ${id.toLowerCase()}\``, true);
      }
      message.channel.send(embed);
    }
  },
};
