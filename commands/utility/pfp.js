const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("getpfp")
		.setDescription("Get any member's pfp")

		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription(
					"Nice pfp, would be a shame if I yoinked it"
				)
				.setRequired(true)
		)
		.addBooleanOption((option) =>
			option
				.setName("serverpfp")
				.setDescription(
					"Yoink the server avatar? Will yoink default avatar if set to False"
				)
				.setRequired(true)
		),
	async execute(interaction) {
		const baseString = "https://cdn.discordapp.com/";
		const target =
			interaction.options.getUser("target") ?? ""; //Why do I need to do this last part again?
		const guild = interaction.member.guild;
		const guildTarget = await guild.members.fetch(
			target
		);
		const guildTargetAvatar = guildTarget.avatar;
		var contentString = "";
		if (interaction.options.getBoolean("serverpfp")) {
			if (guildTarget.avatar != null) {
				fullString =
					baseString +
					`guilds/${guild.id}/users/${target.id}/avatars/${guildTargetAvatar}.webp`;
			} else {
				contentString =
					"This user does not have a server specific pfp, dumbass. I'll give you the normal one out of pity";
				fullString =
					baseString +
					`avatars/${target.id}/${target.avatar}.webp`;
			}
		} else {
			fullString =
				baseString +
				`avatars/${target.id}/${target.avatar}.webp`;
		}
		finalString = fullString + `?size=2048`;
		console.log(finalString);
		embed = new EmbedBuilder().setImage(finalString);
		await interaction.reply({
			content: contentString,
			embeds: [embed],
		});
	},
};

/*module.exports = {
    data: new SlashCommandBuilder()
        .setName('getpfp')
        .setDescription("Get any member's pfp")
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Nice pfp, would be a shame if I yoinked it')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target') ?? '';
        const embed = new EmbedBuilder()
            .setTitle(`${target.username}'s pfp`)
            .setImage(target.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }));
        await interaction.reply({embeds: [embed] });
    },
};*/
