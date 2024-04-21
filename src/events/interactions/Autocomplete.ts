import {Interaction} from "discord.js";
import "../../utils/Extra";

const interaction = (interaction: Interaction): void => {
    if (!interaction.isAutocomplete()) {
        console.error("Interaction is not a autocomplete.");
        return;
    }

    const command = interaction.client.slashCommands.get(interaction.commandName);
    if (!command) {
        console.error("No command matching {1} was found.".format(interaction.commandName));
        return;
    }

    try {
        if (!command.autocomplete) return;
        command.autocomplete(interaction);
    } catch (error) {
        console.error(error);
    }
};

export default interaction;
