import {EmbedBuilder, SlashCommand, SlashCommandBuilder} from "discord.js";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Shows the bot's ping")
    ,
    execute: async (interaction) => {
        const embed = new EmbedBuilder()
            .setColor("#000000")
            .addFields([
                {
                    name: "Connection Lattency",
                    value: `${Math.round(interaction.client.ws.ping)} ms`
                }
            ])
            .setAuthor({name: "Pong!"})
            .setTimestamp();

        await interaction.reply({embeds: [embed]});
    },
    cooldown: 10
};

export default command;
