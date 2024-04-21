import {BotEvent, ChannelType, Command, Message} from "discord.js";
import {inCooldown} from "../utils/Extra";

const event: BotEvent = {
    name: "messageCreate",
    execute: async (message: Message) => {

        if (!message.guild || !message.member || message.member.user.bot) return;
        if (message.channel.type !== ChannelType.GuildText) return;

        const prefix = process.env.PREFIX;

        // if (mongoose.connection.readyState === 1) {
        //     const guildPrefix = await getGuildOption(message.guild, "prefix");
        //     if (guildPrefix) prefix = guildPrefix;
        // }

        if (!message.content.startsWith(prefix)) return;

        const args : string[] = message.content.substring(prefix.length).split(" ");
        let command : Command | undefined = message.client.commands.get(args[0]);

        if (!command) {
            command = message.client.commands.find((command) => command.aliases.includes(args[0]));
            if (!command) return;
        }

        if (await inCooldown(message, command?.cooldown)) return;
        //
        //
        // const neededPermissions = checkPermissions(message.member, command.permissions);
        // if (neededPermissions !== null)
        //     return sendTimedMessage(
        //         `
        //     You don't have enough permissions to use this command.
        //     \n Needed permissions: ${neededPermissions.join(", ")}
        //     `,
        //         message.channel,
        //         5000
        //     );

        command.execute(message, args);
    }
};

export default event;
