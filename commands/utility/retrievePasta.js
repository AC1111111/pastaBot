require("dotenv").config();
const {
	MongoClient,
	ServerApiVersion,
} = require("mongodb");

const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

mongoPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://adminpastabot:${mongoPassword}@clusterpasta.ketfdz1.mongodb.net/?retryWrites=true&w=majority`;

const mongoClient = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

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
		// Connect to PastaDB within MongoDB
		const pastaDB = mongoClient.db("PastaDB");
		const copyPastaCollection =
			pastaDB.collection("CopyPastas");
		
		//Check to see if the database has a pasta before trying to retrieve it
		const count = await copyPastaCollection.countDocuments({
			title : interaction.options.getString("title") 
		});

		if(count != 0)
		{
			const doc = await copyPastaCollection.findOne({
            	title : interaction.options.getString("title")
        	});

			await interaction.reply(doc.body);
		}

		await interaction.reply(`${interaction.options.getString("title")} is not an existing pasta. Make that shit before you send it.`);
	},
};
