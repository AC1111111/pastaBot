require("dotenv").config();

const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

const { callSploogeEvent, UserID } = require("../../index.js");

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

module.exports = {
	data: new SlashCommandBuilder()
		.setName("splooge")
		.setDescription(
			"The mf jacked off again didn't he"
		),
	// Holy shit when I think about what I'm doing, my code is actually readable and short??
	async execute(interaction) {
		await interaction.reply({
			content: await callSploogeEvent(),
		});
	},
};
