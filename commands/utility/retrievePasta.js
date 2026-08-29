require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const copyPastaCollection = require("../../CopyPastas.json")


module.exports = {
	data: new SlashCommandBuilder()
		.setName("getpasta")
		.setDescription(
			"Make pasta spit your brainrot"
		)

		.addStringOption((option) =>
			option
				.setName("title")
				.setDescription("Pasta name")
				.setRequired(true)
		),

	async execute(interaction) {
		length = copyPastaCollection.length
		if (length > 0) {
			const doc = await copyPastaCollection.find((pasta)=> pasta.title == interaction.options.getString("title"));

			await interaction.reply(doc.body);
		}

		await interaction.reply(`${interaction.options.getString("title")} is not an existing pasta. Make that shit before you send it.`);
	},
};
