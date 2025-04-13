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
		.setName("makepasta")
		.setDescription(
			"Birth an abomination for pasta to spam. This is the joy of creation."
		)

		.addStringOption((option) =>
			option
				.setName("title")
				.setDescription("Name dat shit")
				.setRequired(true)
		)

		.addStringOption((option) =>
			option
				.setName("pasta")
				.setDescription("This pasta is a monster")
				.setRequired(true)
		),

	async execute(interaction) {
		// Connect to PastaDB within MongoDB
		const pastaDB = mongoClient.db("PastaDB");
		const copyPastaCollection =
			pastaDB.collection("CopyPastas");
		
		//This should be 0	
		const count = await copyPastaCollection.countDocuments({
			title: interaction.options.getString("title")
		});

		console.log(count);

		if(count == 0){
			//Simple document insertion
			const doc = {
				title: interaction.options.getString("title"),
				body: interaction.options.getString("pasta"),
			};
			await copyPastaCollection.insertOne(doc);

			await interaction.reply(
				`New Pasta "${doc.title}" up and ready to go`
			);
		}

		await interaction.reply("Pasta already exists (or one with this name anyway)");
	},
};
