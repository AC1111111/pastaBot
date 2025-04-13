const bannedwords = require("./commands/utility/bannedwords");

class Variables {
	static bannedWords = [""];

	async generateBannedWords() {
		let { generate } = await import("random-words");
		Variables.bannedWords = generate(5);
	}

	async initializeBannedWords() {
		Variables.bannedWords =
			await this.generateBannedWords();
	}

	printOutBannedWords() {
		var content =
			"Banned words in Variables: " +
			Variables.bannedWords;
		return content;
	}
	getBannedWordsLength() {
		return Variables.bannedWords.length;
	}
	getBannedWords() {
		return Variables.bannedWords;
	}
}

module.exports = new Variables();
