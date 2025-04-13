const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("gambling")
		.setDescription(
			"99% of gamblers quit before they aw dang it"
		),
	async execute(interaction) {
		content =
			"https://youtu.be/ilhQlY7kP5Y?si=t3acn2HkcGpNPwuJ";
		await interaction.reply({
			content: `${content}`,
		});
	},
};
