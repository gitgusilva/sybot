import {PermissionFlagsBits, ChannelType, SlashCommand, SlashCommandBuilder, SlashCommandNumberOption} from "discord.js";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("clear")
        .addNumberOption((option : SlashCommandNumberOption) => {
            return option.setName("quantity")
                .setMaxValue(100)
                .setMinValue(1)
                .setDescription("number of lines")
                .setRequired(true);
        })
        .setDescription("Clear current chat")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    ,
    execute: async (interaction) => {
        const messageCount = Number(interaction.options.get("quantity")?.value);

        interaction.channel?.messages.fetch({limit: messageCount})
            .then(async (messages) => {
                if (interaction.channel?.type === ChannelType.DM) return;
                const deletedMessages = await interaction.channel?.bulkDelete(messages, true);

                if (deletedMessages?.size === 0) await interaction.reply("No messages were deleted.");
                else await interaction.reply("Successfully deleted {1} message(s)".format(deletedMessages?.size));

                setTimeout(() => interaction.deleteReply(), 5000);
            });
    },
    cooldown: 10
};

export default command;
