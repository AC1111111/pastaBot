const { EmbedBuilder, Embed } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("geton")
		.setDescription("Get on already")

		.addStringOption((option) =>
			option
				.setName("game")
				.setDescription("Peak")
				.setRequired(true)
		)

		.addBooleanOption((option) =>
			option
				.setName("ping")
				.setDescription(
					"Ping all who have the appropriate role"
				)
				.setRequired(true)
		),

	async execute(interaction) {
		// Basically an Enum
		const EmbedURL = {
			MHW: "https://cdn.discordapp.com/attachments/1191016756333007019/1205532188552986704/get-on-monster-hunter-monster-hunter.gif?ex=65d8b657&is=65c64157&hm=f9a3568df6ca7050b6fcd7d054dd1fa9c8fadd58baa7419561e09ba22f4d1d6b&",
			Strive: "https://cdn.discordapp.com/attachments/1191016756333007019/1205541562621100082/jarl-swagdog-hop-on-strive.gif?ex=65d8bf12&is=65c64a12&hm=7557d2695157c2644fd74c016a1885cedaed680e98c63bbf316825c43a79941e&",
			LethalCompany:
				"https://cdn.discordapp.com/attachments/1191016756333007019/1205555839579197521/lethal-company-hop-on.gif?ex=65d8cc5e&is=65c6575e&hm=9a6ad7511933c6157765b60f96f36380cb8db285e8e116cb34591fea19e41576&",
			Default:
				"https://cdn.discordapp.com/attachments/1191016756333007019/1205541580467994785/hop-on-vc-lesbian.gif?ex=65d8bf16&is=65c64a16&hm=be926cd1171b801182948397d7bed69961222f4423997c8bb8878af62478b159&",
		};

		// The reason why this didnt work was cause of the const embed, don't ask me how exactly
		var embed;
		var content = "";
		var input = interaction.options
			.getString("game")
			.toLowerCase();

		switch (true) {
			case input === "mhw" ||
				input === "world" ||
				input.includes("monster hunter"):
				if (
					interaction.options.getBoolean("ping")
				) {
					content = "<@&1203950066138882070>";
				}
				embed = new EmbedBuilder().setImage(
					EmbedURL.MHW
				);
				break;

			case input === "strive" || input === "ggst":
				if (
					interaction.options.getBoolean("ping")
				) {
					content = "@everyone";
				}
				embed = new EmbedBuilder().setImage(
					EmbedURL.Strive
				);
				break;

			case input === "lethal" ||
				input === "lethal company" ||
				input === "lc":
				if (
					interaction.options.getBoolean("ping")
				) {
					content = "<@1202146567021408326>";
				}
				embed = new EmbedBuilder.setImage(
					EmbedURL.LethalCompany
				);
				break;

			default:
				embed = new EmbedBuilder.setImage(
					EmbedURL.Default
				);
				break;
		}
		if (content != "") {
			await interaction.reply({
				embeds: [embed],
				content: content,
			});
			// I skip adding content as an empty string here just to be safe, not sure if it would cause problem
		} else {
			await interaction.reply({
				embeds: [embed],
			});
		}
	},
};
