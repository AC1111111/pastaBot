const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("bannedwords")
		.setDescription("Print or change banned words")
		.addBooleanOption((option) =>
			option
				.setName("print")
				.setDescription("Print out the words")
				.setRequired(true)
		)
		.addBooleanOption((option) =>
			option
				.setName("regenerate")
				.setDescription("Regenerate words")
				.setRequired(true)
		),
	async execute(interaction) {
		content = "";
		const Variables = require("../../index.js");
		if (interaction.options.getBoolean("print")) {
			content = `Banned words: ${Variables.printOutBannedWords()}`;
		}
		if (interaction.options.getBoolean("regenerate")) {
			var testVar =
				await Variables.generateBannedWords();
			content =
				content +
				`\nMade new banned words + ${Variables.printOutBannedWords()}`;
		}
		console.log(`${Variables.printOutBannedWords()}`);
		await interaction.reply({
			content: content,
		});
	},
};
