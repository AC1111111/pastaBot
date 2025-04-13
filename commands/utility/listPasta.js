require("dotenv").config();
const {
	MongoClient,
	ServerApiVersion,
} = require("mongodb");

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
		.setName("listpasta")
		.setDescription(
			"Gets a list of all available pasta"
		),

	async execute(interaction) {
		// Connect to PastaDB within MongoDB
		const pastaDB = mongoClient.db("PastaDB");
		const copyPastaCollection =
			pastaDB.collection("CopyPastas");


		var replyString = "Pastas: \n";
        //Get every document in the collection
        await copyPastaCollection.find({}).forEach((doc)=>{
            replyString = replyString + `${doc.title} \n`
        });

		await interaction.reply(replyString);
	},
};
