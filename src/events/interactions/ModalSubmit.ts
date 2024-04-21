import {Interaction} from "discord.js";
import "../../utils/Extra";

const interaction = (interaction: Interaction): void => {
    if (!interaction.isModalSubmit()) {
        console.error("Interaction is not a modal submit.");
        return;
    }

    const command = interaction.client.slashCommands.get(interaction.customId);
    if (!command) {
        console.error("No command matching {1} was found.".format(interaction.customId));
        return;
    }

    try {
        if (!command.modal) return;
        command.modal(interaction);
    } catch (error) {
        console.error(error);
    }
};

export default interaction;
