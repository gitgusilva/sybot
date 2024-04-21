import {BotEvent, Client, ContextCommand, SlashCommand} from "discord.js";
import command from "../commands/slash/ping";

const event : BotEvent = {
    name: "ready",
    once: true,
    execute: (client : Client) => {
        const activities = [
            `type ${process.env.PREFIX}help`,
            `digite ${process.env.PREFIX}ajuda`
        ];

        let i = 0;
        setInterval(() => client.user?.setActivity(`${activities[i++ % activities.length]}`, { type: 0 }), 15000);
        client.user?.setStatus("online");

        // set all slash commands...
        client.application?.commands.set(client?.slashCommands.map((command : SlashCommand) => command.command));

        // set all context commands...
        client.application?.commands.set(client?.contextCommands.map((command : ContextCommand) => command.command));

        console.log("\n" +
            "███████╗██╗   ██╗██████╗  ██████╗ ████████╗                            \n" +
            "██╔════╝╚██╗ ██╔╝██╔══██╗██╔═══██╗╚══██╔══╝                            \n" +
            "███████╗ ╚████╔╝ ██████╔╝██║   ██║   ██║                               \n" +
            "╚════██║  ╚██╔╝  ██╔══██╗██║   ██║   ██║                               \n" +
            "███████║   ██║   ██████╔╝╚██████╔╝   ██║                               \n" +
            "╚══════╝   ╚═╝   ╚═════╝  ╚═════╝    ╚═╝                               \n" +
            "                                                                       \n" +
            "██████╗ ██╗   ██╗    ███████╗████████╗ ██████╗ ███████╗██╗  ██╗███████╗\n" +
            "██╔══██╗╚██╗ ██╔╝    ██╔════╝╚══██╔══╝██╔═══██╗██╔════╝██║  ██║██╔════╝\n" +
            "██████╔╝ ╚████╔╝     ███████╗   ██║   ██║   ██║███████╗███████║█████╗  \n" +
            "██╔══██╗  ╚██╔╝      ╚════██║   ██║   ██║   ██║╚════██║██╔══██║██╔══╝  \n" +
            "██████╔╝   ██║       ███████║   ██║   ╚██████╔╝███████║██║  ██║███████╗\n" +
            "╚═════╝    ╚═╝       ╚══════╝   ╚═╝    ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝\n" +
            "                                                                       \n\n");

        console.log(`Bot (${client.user?.tag}) online`);
    }
};

export default event;
