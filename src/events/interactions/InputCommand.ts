import {Interaction} from "discord.js";
import "../../utils/Extra";
import {inCooldown} from "../../utils/Extra";

const interaction = async (interaction: Interaction): Promise<void> => {
    if (!interaction.isChatInputCommand()) {
        console.error("Interaction is not a chat input command.");
        return;
    }

    const command = interaction.client.slashCommands.get(interaction.commandName);
    if (!command || await inCooldown(interaction, command?.cooldown)) return;

    command.execute(interaction);
};

export default interaction;
