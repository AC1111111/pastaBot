const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nine")
		.setDescription(
			"As talos is my witness, I'm fucking losing it"
		),
	async execute(interaction) {
		embedStrings = [
			"https://cdn.discordapp.com/attachments/1191016756333007019/1206808178591924286/by-the-nine-im-tweakin-elder-scrolls.gif?ex=65dd5ab3&is=65cae5b3&hm=37d69d542301e413db02fbc7d0ee7e83051d503522e7f9cc6bf2e0a82a11c702&",
			"https://cdn.discordapp.com/attachments/1191016756333007019/1206808193427185664/by-the-nine-im-tweaking-by-the-nine.gif?ex=65dd5ab6&is=65cae5b6&hm=e6c504ebe550764e580c530321b6f4d0387379e5c83b9d3e578b4284bc846643&",
			"https://cdn.discordapp.com/attachments/1191016756333007019/1206808203451568248/tweaking-ichiban.gif?ex=65dd5ab9&is=65cae5b9&hm=a186b18087708989da2821e81cb431c1e1a7492cc4f0f8beec3fbb596bbc3ba2&",
		];
		var randomNumber = Math.floor(
			Math.random() * embedStrings.length
		);
		const embed = new EmbedBuilder().setImage(
			embedStrings[randomNumber]
		);
		await interaction.reply({
			embeds: [embed],
		});
	},
};
