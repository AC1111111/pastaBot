//Include dependencies
require("dotenv").config();
// TODO remove the following line of code if this works
// const pastaCollection = require("../pastaBot/PastaCollection.json")
const fs = require("node:fs");
const path = require("node:path");
const pastaCollectionPath = "../pastaBot/PastaCollection.json";
/*const {
	MongoClient,
	ServerApiVersion,
} = require("mongodb");*/
const {
	Client,
	Events,
	GatewayIntentBits,
	Collection,
	User,
} = require("discord.js");
const Variables = require("./variables.js");
const bannedwords = require("./commands/utility/bannedwords.js");
const axios = require("axios");
const express = require("express");
const { log } = require("node:console");

//Init variables
const token = process.env.TOKEN;
const app = express();
const port = process.env.PORT || 3000;
const deploymentLink = process.env.DEPLOYMENT_LINK;

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

// Never before invented: REUSABLE CODE. I'm a genius with the code Fax. 
module.exports = {
	pastaCollectionPath, UserID,
	writeToPastaCollection, readPastaCollection, callSploogeEvent,
}

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

/*
//Build MongoDB URI
mongoPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://adminpastabot:${mongoPassword}@clusterpasta.ketfdz1.mongodb.net/?retryWrites=true&w=majority`;
*/

//Console log to check if Pasta's still alive
client.once(Events.ClientReady, (readyClient) => {
	console.log(`We up ${readyClient.user.tag}`);
});

/*I'm gonna try and do this the write way by writing helper functions
This should also make it easier to add more counters later down the line */
// This is already damn good work, Fax. I think we should make all of these functions async tho. I doubt it would matter very much in practice but they could rarely block other stuff 
function readPastaCollection() {
	try {
		const data = fs.readFileSync(pastaCollectionPath)
		return JSON.parse(data)
	}
	catch (error) {
		console.error("Couldn't read PastaCollection.json", error)
	}
}

function writeToPastaCollection(data) {
	try {
		fs.writeFileSync(pastaCollectionPath, JSON.stringify(data, null, 2), 'utf-8')
	}
	catch (error) {
		console.error("Couldn't write to PastaCollection.json:", error)
	}
}

function updateCounter(collection, name, counterName, initDate) {
	var doc = collection.find(item => item.name === name || item.documentName === name);
	if (!doc) {
		doc = {
			name: name,
			[counterName]: 0,
			initDate: initDate || new Date().toISOString()
		};
		collection.push(doc);
	}
	doc[counterName] = (doc[counterName] || 0) + 1
	return doc;
}

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

// TODO: We should probably put this entire method somewhere else for readability but i cba to do it rn
//Byte, why am I not included in the test command... // My bad gang I forgor
client.on(Events.MessageCreate, async (message) => {
	pastaCollection = readPastaCollection();
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
		} else if (messageString.includes("dumpy") && messageString.includes("install")) {
			content = await callDumpyEvent();
			message.reply(content)
		}

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
	} else if (message.author.id === UserID.ByteID || message.author.id === UserID.FaxID) {
		if (messageString === "test") {
			message.reply("Fuck you");
		}
	}
});
async function callHellcatPersonEvent() {
	const collection = readPastaCollection()
	const initDate = "2024-02-18T00:00:00Z" //Fuck this I'm hard coding
	var doc = updateCounter(collection, "hellcatPersonCounter", "counter", initDate)
	writeToPastaCollection(collection)
	return `Board has said the n-word ${doc.hellcatPersonCounter} times since ${initDate}`;
}

async function callSploogeEvent() {
	const collection = readPastaCollection()
	const initDate = "2024-02-12T23:00:00Z"
	var doc = updateCounter(collection, "splooge", "counter", initDate)
	writeToPastaCollection(collection)
	// Why the fuck didn't I use UserID.SploofID here am I FUCKING STUPID
	//return `<@806964705008025611> has jacked off ${doc.counter} times since ${initDate}`
	return `<@${UserID.SploofID}> has jacked off ${doc.counter} times since ${initDate}`
}

async function callDumpyEvent() {
	content = "Stop talking about dumpies and move out of the dump. broke ass"
	return await content;
}

async function callEddEvent() {
	const initDate = new Date("February 18, 2024 00:00:00");
	const collection = readPastaCollection()
	var doc = updateCounter(collection, "fagCounter", "counter", initDate)
	writeToPastaCollection(collection)
	var content = `Edd has been homophobic ${numberToDisplay} times since ${dateToDisplay}`;
	return content;
}

function callBannedWordEvent() {
	console.log(
		`CallBannedWordEvent: ${Variables.printOutBannedWords()}`
	);
	return (content =
		"whoopsie doopsie you did a fuckie wuckie. get timed out lmao");
}
/*API endpoint. If we ever want to fuck around with REST we'll 
need to move everything into seperate folders and shit*/
app.get('/', (req, res) => {
	res.send("Make AWS free or I will simply steal")
})

//Server listening on port
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

//Make an API call to keep pasta alive
client.on("ready", () => {
	setInterval(async () => {
		client.channels.cache.get("1360946766526283917")
			.send("Make AWS free or I will simply steal")

		const result = await axios.get(deploymentLink)
		console.log(result.data)
	}, 14 * 60 * 1000)
})

module.exports = Variables;
