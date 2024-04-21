import {
    Client,
    Command,
    ContextCommand,
    ContextMenuCommandBuilder,
    REST,
    Routes,
    SlashCommand,
    SlashCommandBuilder
} from "discord.js";
import {join} from "path";
import {readdirSync} from "node:fs";

export default async (client: Client) => {
    const commands : Command[] = [];
    const slashCommands : SlashCommandBuilder[] = [];
    const contextCommands: ContextMenuCommandBuilder[] = [];

    const commandsDir = join(__dirname, "../commands");
    const slashCommandsDir = join(commandsDir, "/slash");
    const contextCommandsDir = join(commandsDir, "/context");

    for (const file of readdirSync(commandsDir)) {
        if (!file.endsWith(".js")) continue;

        const command : Command = (await import(`${commandsDir}/${file}`)).default;
        commands.push(command);

        client.commands.set(command.name, command);
    }

    for (const file of readdirSync(slashCommandsDir)) {
        if (!file.endsWith(".js")) continue;

        const command : SlashCommand = (await import(`${slashCommandsDir}/${file}`)).default;
        slashCommands.push(command.command);

        client.slashCommands.set(command.command.name, command);
    }

    for (const file of readdirSync(contextCommandsDir)) {
        if (!file.endsWith(".js")) continue;

        const command : ContextCommand = (await import(`${contextCommandsDir}/${file}`)).default;
        contextCommands.push(command.command);

        client.contextCommands.set(command.command.name, command);
    }

    console.log("[✓]", `loaded ${commands.length} command(s)`);
    console.log("[✓]", `loaded ${slashCommands.length} slash command(s)`);
    console.log("[✓]", `loaded ${contextCommands.length} context command(s)`);
};
