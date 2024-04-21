import dotenv from "dotenv";
import {join} from "path";
import {Linguini} from "linguini";
import {Client, Command, SlashCommand, GuildInfo, Collection, GatewayIntentBits, ContextCommand} from "discord.js";
import {readdirSync} from "node:fs";

// models import
import Guild from "./models/Guild";
import Ticket from "./models/Ticket";
import Database from "./utils/Database";

if (process.env.NODE_ENV !== "production") dotenv.config();

try {
    Database.authenticate().then(async () => {
        console.log("[!]", "Connected in Database");

        const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;
        const client : Client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]});

        Guild.initModel(Database);
        Ticket.initModel(Database);

        await Guild.sync();
        await Ticket.sync();

        client.contextCommands = new Collection<string, ContextCommand>();
        client.slashCommands = new Collection<string, SlashCommand>();
        client.commands = new Collection<string, Command>();
        client.cooldowns = new Collection<string, number>();
        client.guildInfo = new Collection<string, GuildInfo>();

        /**
         *  Translations
         * **/

        client.guildLanguage = new Collection<string, string>();
        client.languages = ["en-us", "pt-br"];
        client.lang = new Linguini(join(__dirname, "./locales"), "lang");

        const handlersDir = join(__dirname, "./handlers");
        for (const handler of readdirSync(handlersDir)) {
            if (!handler.endsWith(".js")) continue;

            (await import(`${handlersDir}/${handler}`)).default(client);
        }

        // start the client
        await client.login(process.env.TOKEN);
    }).catch((e: any) => console.log(`Ocorreu um erro ao iniciar o bot. Erro: \n\n${e}`));
} catch (e) {
    console.error(e);
}
