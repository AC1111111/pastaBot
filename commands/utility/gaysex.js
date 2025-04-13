const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("sexwithaman")
		.setDescription("Steaming gay sex"),
	async execute(interaction) {
		const embed = new EmbedBuilder().setImage(
			"https://media.discordapp.net/attachments/1191016756333007019/1207679582237630494/1207679016274759740remix-1708003642691.png?ex=65e08642&is=65ce1142&hm=7367697d96f80ed97c0cdf604d3bc7b1a8174368f793f2ef61203957808ab912&=&format=webp&quality=lossless&width=949&height=1365"
		);
		await interaction.reply({
			embeds: [embed]
		});
	},
};