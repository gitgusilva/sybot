import {BotEvent, Interaction} from "discord.js";

const event : BotEvent = {
    name: "interactionCreate",
    execute: async (interaction: Interaction) => {
        if (interaction.user.bot) return;

        switch (true) {
            case interaction.isChatInputCommand():
                await (await import("./interactions/InputCommand")).default(interaction);
                break;
            case interaction.isAutocomplete():
                (await import("./interactions/Autocomplete")).default(interaction);
                break;
            case interaction.isModalSubmit():
                (await import("./interactions/ModalSubmit")).default(interaction);
                break;
            case interaction.isUserContextMenuCommand():
            case interaction.isMessageContextMenuCommand():
                await (await import("./interactions/ContextMenu")).default(interaction);
        }
    }
};

export default event;
