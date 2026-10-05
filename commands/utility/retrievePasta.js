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
		var doc;
		if (length > 0) {
			doc = await copyPastaCollection.find((pasta) => pasta.title == interaction.options.getString("title"));
		}
		if (doc === undefined) {
			// This should catch errors like "file not found" but im too lazy to do it rn so im putting it in this "else".
			await interaction.reply(`${interaction.options.getString("title")} is not an existing pasta. Make that shit before you send it.`);
		} else {
			await interaction.reply(doc.body);
		}
	}
}