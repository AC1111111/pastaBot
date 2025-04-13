const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kirbo')
        .setDescription('Hypothetically'),
    async execute(interaction){
        await interaction.reply("<@746991684826562590> Let's say, hypothetically, I am a barbie girl. Okay let's even say I'm in a barbie world. Right so, in this scenario, I would know from personal experience that life in plastic is fantastic. Wouldn't it be reasonable to assume you could brush my hair and undress me  everywhere?");
    },
};