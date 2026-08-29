require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

const copyPastaCollection = require("../../CopyPastas.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("listpasta")
		.setDescription(
			"Gets a list of all available pasta"
		),

	async execute(interaction) {
		var replyString = "Pastas: \n";
        //Get every document in the collection
        await copyPastaCollection.forEach((doc)=>{
            replyString = replyString + `${doc.title} \n`
        });

		await interaction.reply(replyString);
	},
};
