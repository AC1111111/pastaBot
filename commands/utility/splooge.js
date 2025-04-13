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
		// Connect to PastaDB within MongoDB
		const pastaDB = mongoClient.db("PastaDB");
		const pastaCollection = pastaDB.collection(
			"PastaCollection"
		);
		// This returns an array even tho theres only one doc.
		// the method for returning only one doc exists and works technically but its cringe

		const sploogeDocArray = await pastaCollection
			.find({
				documentName: "splooge",
			})
			.project({ jacks: 1, initDate: 1, _id: 0 })
			.toArray();
		// access the first and only element now
		const sploogeDoc = sploogeDocArray[0];
		// maybe turn this into const initDate = sploogeDoc.initDate so its not the current time
		const initDate = sploogeDoc.initDate;
		const filter = { documentName: "splooge" };
		const newJacks = sploogeDoc.jacks + 1;
		const updateDoc = {
			$set: { jacks: newJacks },
		};
		pastaCollection.updateOne(filter, updateDoc);
		console.log("Splooge Initdate: " + initDate);
		await interaction.reply({
			content: `<@806964705008025611> has jacked off ${
				sploogeDoc.jacks - 1
			} times since ${initDate}`,
		});
	},
};
