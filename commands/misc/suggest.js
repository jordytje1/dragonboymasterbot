/* eslint-disable no-shadow */
const moment = require('moment');

module.exports = {
	name: 'suggest',
	category: 'Misc',
	description: 'Make suggestion for the bot\'s upcoming features.',
	aliases: [],
	usage: 'suggest <suggestion>',
	guildOnly: false,
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'<❌725270799124004934> Please provide valid text',
			);
		}
		const channel = client.channels.cache.get('734719742958633041');
		if (!channel) return;
		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` ❗ **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id}) has made a suggestion in **${message.guild.name}** (ID: ${message.guild.id}).\n\`[Suggestion]\` ${text}`,
		);
		await message.channel.send(
			'<✔️725270799098970112> Successfully made the suggestion.',
		).then(message.delete());
	},
};
