//Include dependencies
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const {
	MongoClient,
	ServerApiVersion,
} = require("mongodb");
const {
	Client,
	Events,
	GatewayIntentBits,
	Collection,
	User,
} = require("discord.js");
const Variables = require("./variables.js");
const bannedwords = require("./commands/utility/bannedwords.js");

//Init variables
const token = process.env.TOKEN;
//Create client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMessages,
	],
});

client.commands = new Collection();

//Build MongoDB URI
mongoPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://adminpastabot:${mongoPassword}@clusterpasta.ketfdz1.mongodb.net/?retryWrites=true&w=majority`;

//Console log to check if Pasta's still alive
client.once(Events.ClientReady, (readyClient) => {
	console.log(`We up ${readyClient.user.tag}`);
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

var pastaDB;
var pastaCollection;
async function run() {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		await mongoClient.connect();
		// Send a ping to confirm a successful connection
		await mongoClient.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);
	} finally {
		// Ensures that the client will close when you finish/error
		await mongoClient.close();
	}
}
run().catch(console.dir);

//Setting up the bot to read the path and all of the commands
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`${filePath} don't got data or execute`
			);
		}
	}
}
client.login(token);
//Listener for the commands
client.on(Events.InteractionCreate, async (interaction) => {
	if (interaction.isChatInputCommand()) {
		const command = interaction.client.commands.get(
			interaction.commandName
		);
		if (!command) {
			console.error("No matching command found");
			return;
		}
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
		}
		return;
	} else {
		return;
	}
});

let lastCheckedDate = new Date();

function hasDateChanged() {
	const currentDate = new Date();

	if (
		currentDate.toDateString() !==
		lastCheckedDate.toDateString()
	) {
		// Date has changed
		lastCheckedDate = currentDate;
		return true;
	} else {
		// Date has not changed
		return false;
	}
}

async function initBannedWords() {
	await Variables.initializeBannedWords();
	var bannedwords = Variables.generateBannedWords();
}
initBannedWords();
// Example usage: Check if date has changed every 1 minute
setInterval(() => {
	const solBadguyID = "1190997030542258319";
	const _165ID = "714435782579978272";
	// Uncomment this later
	if (hasDateChanged()) {
		send165Message(solBadguyID, _165ID);
	}
}, 120000);

// TODO: We should probably put this entire method somewhere else for readability but i cba to do it rn
//Byte, why am I not included in the test command...
client.on(Events.MessageCreate, async (message) => {
	await mongoClient.connect();
	pastaDB = mongoClient.db("PastaDB");
	pastaCollection = pastaDB.collection("PastaCollection");
	// Basically Enums
	const ChannelID = {
		NutGeneralId: "1162085095532929144",
		StriveID: "1162161285618737184",
		SolBadguyID: "1190997030542258319",
		TekkenEightID: "1206822417541111848",
		BotTestCommandsID: "1190973937337769986",
	};
	const UserID = {
		FaxID: "405367041999241216",
		ByteID: "253108416518553600",
		SploofID: "806964705008025611",
		BoardID: "1081308415260885052",
		NimbusID: "720155708758425670",
		EddID: "515997929241182238",
		PastaID: "1190966073571426374",
	};

	// Check if Channel is contained in ChannelID Enums before posting / checking there
	isValidID = false;
	for (var ID in ChannelID) {
		if (
			ChannelID.hasOwnProperty(ID) &&
			ChannelID[ID] === message.channel.id
		) {
			isValidID = true;
		}
	}
	if (!isValidID) {
		return;
	}
	messageString = message.content
		.toLowerCase()
		.replace(/\s/g, "");
	// Basically calls splooge command when sploof writes jack(ing) off
	if (message.author.id === UserID.SploofID) {
		if (
			messageString.includes("jack") &&
			messageString.includes("off")
		) {
			content = await callSploogeEvent();
			message.reply(content);
		}
		// I fucking hate nimbus dude (real)
	} else if (message.author.id === UserID.EddID) {
		if (message.content.includes("fag")) {
			content = await callEddEvent();
			message.reply(content);
		}
	} else if (message.author.id === UserID.NimbusID) {
		if (messageString.includes("wilk")) {
			message.guild.members
				.fetch(UserID.NimbusID)
				.then((user) => {
					user.timeout(
						1 * 60 * 1000,
						"Admin timed you out."
					)
						.then(() => {
							console.log(
								"Timed user out for 9000 seconds."
							);
						})
						.catch(console.error);
				})
				.catch(console.error);
			message.reply(
				"Shut the fuck up about wilk nimbus I swear to god"
			);
		}
	} else if (message.author.id === UserID.BoardID) {
		if (messageString.includes("nigg")) {
			contentString = await callHellcatPersonEvent();
			message.reply({ content: contentString });
		}
	} else if (message.author.id === UserID.ByteID) {
		if (messageString === "test") {
			message.reply("Fuck you");
		}
	}

	/*
	var bannedWords = Variables.getBannedWords();
	contentString = "";
	for (var i = 0; i < bannedWords.length; i++) {
		word = bannedWords[i].toLowerCase();
		if (
			messageString.includes(word) &&
			message.author.id !== UserID.PastaID
		) {
			message.guild.members.cache.forEach(
				(member) => {
					if (member.id === message.author.id) {
						contentString =
							callBannedWordEvent();
						member
							.timeout(1 * 60 * 1000)
							.then(() =>
								console.log(
									"Timed out " +
										member.name
								)
							)
							.catch(console.log);
					}
				}
			);
			message.reply(contentString);
		}
	}
	*/
});
async function callHellcatPersonEvent() {
	const initDate = new Date("February 18, 2024 00:00:00");
	var hellcatPersonCounter = 0;
	var update;
	const projection = {
		name: 1,
		hellcatPersonCounter: 1,
		initDate: 1,
	};
	const cursor = pastaCollection
		.find({ name: "hellcatPersonCounter" })
		.project(projection);
	var welfareReceiverDoc = (await cursor.hasNext())
		? await cursor.next()
		: null;
	// Find out if friedChickenMuncherCounter exists already
	if (welfareReceiverDoc === null) {
		hellcatPersonCounter = 0;
		update = {
			$set: {
				name: "hellcatPersonCounter",
				hellcatPersonCounter:
					hellcatPersonCounter + 1,
				initDate: initDate,
			},
		};
	} else {
		hellcatPersonCounter =
			await welfareReceiverDoc.hellcatPersonCounter;
		update = {
			$set: {
				name: "hellcatPersonCounter",
				hellcatPersonCounter:
					hellcatPersonCounter + 1,
				initDate: initDate,
			},
		};
	}
	const query = { name: "hellcatPersonCounter" };
	const options = { upsert: true };
	await pastaCollection.updateOne(query, update, options);

	numberToDisplay = hellcatPersonCounter + 1;
	dateToDisplay = welfareReceiverDoc.initDate;
	var content = `Board has said the n-word ${numberToDisplay} times since ${dateToDisplay}`;
	return content;
}

async function callSploogeEvent() {
	// Connect to PastaDB within MongoDB
	const sploogeDocArray = await pastaCollection
		.find({
			documentName: "splooge",
		})
		.project({ jacks: 1, initDate: 1, _id: 0 })
		.toArray();
	// access the first and only element now
	const sploogeDoc = sploogeDocArray[0];
	const initDate = sploogeDoc.initDate;
	const filter = { documentName: "splooge" };
	const newJacks = sploogeDoc.jacks + 1;
	const updateDoc = {
		$set: { jacks: newJacks },
	};
	pastaCollection.updateOne(filter, updateDoc);
	content = `<@806964705008025611> has jacked off ${sploogeDoc.jacks - 1
		} times since ${initDate}`;
	return await content;
}

/*async function callEddEvent() {
	const initDate = new Date("February 18, 2024 00:00:00");
	var fagCounter = 0;
	var update;
	const projection = {
		name: 1,
		fagCounter: 1,
		initDate: 1,
	};
	const cursor = pastaCollection
		.find({ name: "fagCounter" })
		.project(projection);
	var fagCounterDoc = (await cursor.hasNext())
		? await cursor.next()
		: null;
	// Find out if fagCounter exists already
	if (fagCounterDoc === null) {
		fagCounter = 0;
		update = {
			$set: {
				name: "fagCounter",
				fagCounter: fagCounter + 1,
				initDate: initDate,
			},
		};
	} else {
		fagCounter = await fagCounterDoc.fagCounter;
		update = {
			$set: {
				name: "fagCounter",
				fagCounter: fagCounter + 1,
				initDate: initDate,
			},
		};
	}
	const query = { name: "fagCounter" };
	const options = { upsert: true };
	await pastaCollection.updateOne(query, update, options);

	numberToDisplay = fagCounter + 1;
	dateToDisplay = fagCounterDoc.initDate;
	var content = `Edd has been homophobic ${numberToDisplay} times since ${dateToDisplay}`;
	return content;
}*/

function callBannedWordEvent() {
	console.log(
		`CallBannedWordEvent: ${Variables.printOutBannedWords()}`
	);
	return (content =
		"whoopsie doopsie you did a fuckie wuckie. get timed out lmao");
}

/*function send165Message(channelID, userID) {
	const channel = client.channels.cache.get(channelID);
	channel.send(
		`<@${userID}> Perpetual reminder that Hollow Knight Silksong will never release`
	);
}*/

//Send a message to a channel to keep pasta online
client.on("ready", () => {
	setInterval(() => {
		client.channels.cache.get("1360946766526283917")
			.send("Make AWS free or I will simply steal")
	}, 14 * 60 * 1000)
})

module.exports = Variables;
