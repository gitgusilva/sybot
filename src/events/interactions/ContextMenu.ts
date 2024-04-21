import "../../utils/Extra";
import {inCooldown} from "../../utils/Extra";
import {Interaction} from "discord.js";

const interaction = async (interaction: Interaction): Promise<void> => {
    if (!interaction.isMessageContextMenuCommand() && !interaction.isUserContextMenuCommand()) {
        console.error("Interaction is not a context menu command.");
        return;
    }

    const command = interaction.client.contextCommands.get(interaction.commandName);
    if (!command || await inCooldown(interaction, command?.cooldown)) return;

    command.execute(interaction);
};

export default interaction;
