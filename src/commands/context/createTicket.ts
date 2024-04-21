import {ApplicationCommandType, ContextCommand, ContextMenuCommandBuilder} from "discord.js";

const command: ContextCommand  = {
    command: new ContextMenuCommandBuilder()
        .setName("Create Ticket")
        .setType(ApplicationCommandType.Message)
    ,
    execute: async (interaction: any) => {
        interaction.reply(interaction.targetMessage + " - essa foi a interação krai");
    },
    cooldown: 10
};

export default command;
