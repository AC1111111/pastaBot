require("dotenv").config();
// const {
// 	MongoClient,
// 	ServerApiVersion,
// } = require("mongodb");

const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const copyPastaCollection = require("../../CopyPastas.json")
// TODO Probably remove all these fuckass mongodb commented lines. I'm leaving it in just in case of the 1 in a million chance we actually need something from one of these lines.
// mongoPassword = process.env.MONGO_PASSWORD;
// const uri = `mongodb+srv://adminpastabot:${mongoPassword}@clusterpasta.ketfdz1.mongodb.net/?retryWrites=true&w=majority`;

// const mongoClient = new MongoClient(uri, {
// 	serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 		deprecationErrors: true,
// 	},
// });

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
		// const pastaDB = mongoClient.db("PastaDB");
		// const copyPastaCollection =
		// 	pastaDB.collection("CopyPastas");

		//This should be 0	
		// const count = await copyPastaCollection.countDocuments({
		// 	title: interaction.options.getString("title")
		// });
		var doc = copyPastaCollection.find((pasta) => pasta.title == interaction.options.getString("title"))
		console.log("made it past var doc")
		// Replies and aborts the method if it found a matching title already
		if (doc !== undefined) {
			console.log("made it into count doc !== undefined")
			await interaction.reply("Pasta already exists (or one with this name anyway)");
		}
		// If we go here, that means count !== 0. 100% of the time.
		const newPasta = {
			title: interaction.options.getString("title"),
			body: interaction.options.getString("pasta")
		}
		copyPastaCollection.push(newPasta)
		// if (count == 0) {
		// 	//Simple document insertion
		// 	const doc = {
		// 		title: interaction.options.getString("title"),
		// 		body: interaction.options.getString("pasta"),
		// 	};
		// 	await copyPastaCollection.insertOne(doc);
		await interaction.reply(
			`New Pasta "${newPasta.title}" up and ready to go`
		);
	},
};
