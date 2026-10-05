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

	async execute(interaction) {
		callSploogeEvent();
		await interaction.reply({
			content: await callSploogeEvent(),
		});
		// await interaction.reply({
		// 	content: `<@806964705008025611> has jacked off ${sploogeDoc.jacks - 1
		// 		} times since ${initDate}`,
		// });
	},
};
